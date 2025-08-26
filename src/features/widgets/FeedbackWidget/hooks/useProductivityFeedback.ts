import { useState, useCallback, useEffect } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useProductivityFeedback = () => {
  const supabase = useSupabase();
  const { user } = useAuth();

  const [currentFeedback, setCurrentFeedback] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTodayDateString = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchTodaysFeedback = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const today = getTodayDateString();

      const { data, error } = await supabase
        .from("productivity_feedback")
        .select("rating")
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error(
          "Erro ao buscar feedback de produtividade:",
          error.message
        );
      }

      if (data) {
        setCurrentFeedback(data.rating);
      } else {
        setCurrentFeedback(null);
      }

      setIsLoading(false);
    };

    fetchTodaysFeedback();
  }, [user, supabase]);

  const saveFeedback = useCallback(
    async (rating: number) => {
      if (!user) {
        console.error("Usuário não autenticado para salvar feedback.");
        return;
      }

      const today = getTodayDateString();

      const { error } = await supabase.from("productivity_feedback").upsert({
        user_id: user.id,
        date: today,
        rating: rating,
      });

      if (error) {
        console.error(
          "Erro ao salvar feedback de produtividade:",
          error.message
        );
      } else {
        setCurrentFeedback(rating);
      }
    },
    [user, supabase]
  );

  const clearFeedback = useCallback(async () => {
    if (!user) {
      console.error("Usuário não autenticado para limpar feedback.");
      return;
    }

    const today = getTodayDateString();

    const { error } = await supabase
      .from("productivity_feedback")
      .delete()
      .eq("user_id", user.id)
      .eq("date", today);

    if (error) {
      console.error("Erro ao limpar feedback de produtividade:", error.message);
    } else {
      setCurrentFeedback(null);
    }
  }, [user, supabase]);

  return { currentFeedback, isLoading, saveFeedback, clearFeedback };
};
