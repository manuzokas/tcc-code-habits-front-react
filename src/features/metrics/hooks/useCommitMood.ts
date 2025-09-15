import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export type Mood = "Motivado" | "Neutro" | "Preocupado" | "Esgotado" | null;

export interface CommitMoodData {
  day_out: string;
  commit_count_out: number;
  mood_out: Mood;
}

export type Period = "7days" | "30days";

export const useCommitMood = () => {
  const { user, session } = useAuth();
  const [period, setPeriod] = useState<Period>("7days");
  const [data, setData] = useState<CommitMoodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id || !session) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Usamos o proxy do Vite para chamar a rota da nossa API
      const response = await fetch(
        `/api/metrics/commit-mood?period=${period}`,
        {
          headers: { Authorization: `Bearer ${session.access_token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao buscar dados de commits e humor");
      }
      const result: CommitMoodData[] = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, session, period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { period, setPeriod, data, isLoading, error };
};
