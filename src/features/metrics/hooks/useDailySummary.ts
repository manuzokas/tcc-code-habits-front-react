import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export interface DailySummaryData {
  day: string;
  ife: number | null;
  mood_score: number | null;
  productivity_rating: number | null;
}

export const useDailySummary = () => {
  const [data, setData] = useState<DailySummaryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/metrics/daily-summary", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Falha ao buscar o resumo diário");
        }

        const result: DailySummaryData[] = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return { data, isLoading, error };
};
