// src/features/mood/hooks/useMood.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { MoodEntry } from "../types/mood";
import { startOfDay } from 'date-fns';

const MOOD_QUERY_KEY = ["moodEntries"];

export const useMood = () => {
  const supabase = useSupabase();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  // busca a entrada de humor do DIA atual
  const { data: moodEntry, isLoading, error } = useQuery<MoodEntry | null, Error>({
    queryKey: [MOOD_QUERY_KEY, userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const today = startOfDay(new Date()).toISOString();

      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", userId)
        .gte("recorded_at", today)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data || null;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60,
  });

  // salva ou atualiza uma entrada de humor
  const saveMood = useMutation({
    mutationFn: async (mood: string) => {
      if (!userId) throw new Error("User not authenticated.");

      let data;
      let upsertError;

      const today = startOfDay(new Date()).toISOString();

      // verifica se ja existe uma entrada para hoje
      const { data: existingEntry } = await supabase
        .from("mood_entries")
        .select("id")
        .eq("user_id", userId)
        .gte("recorded_at", today)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .single();

      if (existingEntry) {
        // se a entrada existe, atualize-a
        const { data: updatedData, error } = await supabase
          .from("mood_entries")
          .update({ mood, recorded_at: new Date().toISOString() })
          .eq("id", existingEntry.id)
          .select()
          .single();
        data = updatedData;
        upsertError = error;
      } else {
        // se não existir, crie uma nova
        const { data: newData, error } = await supabase
          .from("mood_entries")
          .insert({ user_id: userId, mood })
          .select()
          .single();
        data = newData;
        upsertError = error;
      }

      if (upsertError) throw upsertError;
      return data as MoodEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY, userId] });
    },
  });

  const clearMood = useMutation({
    mutationFn: async () => {
      if (!userId || !moodEntry?.id) return;
      
      const { error } = await supabase
        .from("mood_entries")
        .delete()
        .eq("id", moodEntry.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY, userId] });
    },
  });

  return {
    currentMood: moodEntry?.mood || null,
    isLoading,
    error,
    saveMood: saveMood.mutate,
    clearMood: clearMood.mutate,
  };
};