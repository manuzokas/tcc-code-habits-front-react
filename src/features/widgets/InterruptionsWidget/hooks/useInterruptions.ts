import { useState, useEffect } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type {
  ActiveInterruption,
  InterruptionType,
  InterruptionOutcome,
} from "../types/interruptions";

export const useInterruptions = () => {
  const supabase = useSupabase();
  const { user } = useAuth();
  const [activeInterruption, setActiveInterruption] =
    useState<ActiveInterruption | null>(null);
  const [interruptionToReview, setInterruptionToReview] =
    useState<ActiveInterruption | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnfinishedInterruption = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      const { data } = await supabase
        .from("interruptions")
        .select("id, type, start_time")
        .eq("user_id", user.id)
        .is("end_time", null)
        .single();
      if (data) setActiveInterruption(data);
      setIsLoading(false);
    };
    fetchUnfinishedInterruption();
  }, [user, supabase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeInterruption) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = new Date(activeInterruption.start_time).getTime();
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeInterruption]);

  const startInterruption = async (type: InterruptionType) => {
    if (!user || activeInterruption) return;
    const { data } = await supabase
      .from("interruptions")
      .insert({ user_id: user.id, type })
      .select("id, type, start_time")
      .single();
    if (data) setActiveInterruption(data);
  };

  const stopInterruption = () => {
    if (!activeInterruption) return;
    setInterruptionToReview(activeInterruption);
    setActiveInterruption(null);
    setElapsedTime(0);
  };

  const finalizeInterruption = async (outcome: InterruptionOutcome) => {
    if (!user || !interruptionToReview) return;

    const startTime = new Date(interruptionToReview.start_time);
    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / (1000 * 60)
    );

    await supabase
      .from("interruptions")
      .update({
        end_time: endTime.toISOString(),
        duration_minutes: duration,
        outcome: outcome,
      })
      .eq("id", interruptionToReview.id);

    setInterruptionToReview(null);
  };

  const cancelReview = () => {
    // Caso o usuário feche o app, o registro fica sem 'end_time' e será pego no próximo load.
    setInterruptionToReview(null);
  };

  return {
    isLoading,
    activeInterruption,
    elapsedTime,
    startInterruption,
    stopInterruption,
    interruptionToReview,
    finalizeInterruption,
    cancelReview,
  };
};
