import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export interface HealthAdherenceData {
  habit_name: string;
  adherence_percentage: number;
}

export const useHealthAdherence = () => {
  const [data, setData] = useState<HealthAdherenceData[]>([]);
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
        const response = await fetch("/api/metrics/health-adherence", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Falha ao buscar dados de adesão aos hábitos"
          );
        }

        const result: HealthAdherenceData[] = await response.json();
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
