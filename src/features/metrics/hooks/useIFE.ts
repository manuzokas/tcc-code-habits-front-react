import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export interface IFEData {
  day: string;
  ife: number;
}

export const useIFE = () => {
  const [data, setData] = useState<IFEData[]>([]);
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
        const response = await fetch("/api/metrics/ife", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar dados do Índice de Foco Efetivo");
        }

        const result: IFEData[] = await response.json();
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
