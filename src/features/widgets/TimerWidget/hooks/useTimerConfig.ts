import { useState, useEffect } from "react";
import type { TimerConfig, NewTimerConfig } from "../types/timers";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { supabase } from "@/api/supabase";

const DEFAULT_TIMER_CONFIG: NewTimerConfig = {
  focus_duration_minutes: 25,
  short_break_duration_minutes: 5,
  long_break_duration_minutes: 15,
  pomodoros_before_long_break: 4,
};

export const useTimerConfig = () => {
  const [config, setConfig] = useState<TimerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConfig = async () => {
      setIsLoading(true);
      if (!user) {
        setConfig(null);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("timers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") { 
        console.error("Error fetching timer config:", error.message);
      }

      if (data) {
        setConfig(data);
      } else {
        const newConfig = { ...DEFAULT_TIMER_CONFIG, user_id: user.id };
        const { data: newData, error: newError } = await supabase
          .from("timers")
          .insert(newConfig)
          .select()
          .single();
        
        if (newError) {
          console.error("Error creating new timer config:", newError.message);
        } else {
          setConfig(newData);
        }
      }
      setIsLoading(false);
    };

    fetchConfig();
  }, [user]);

  const updateConfig = async (updatedConfig: NewTimerConfig) => {
    if (!user || !config) return;

    const { data, error } = await supabase
      .from("timers")
      .update(updatedConfig)
      .eq("id", config.id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating timer config:", error.message);
    } else {
      setConfig(data);
    }
  };

  return { config, isLoading, updateConfig };
};