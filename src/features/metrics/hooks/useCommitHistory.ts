import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Tipagem para os dados do histórico
export interface CommitHistoryData {
  date: string;
  commits: number;
}

// Tipagem para o período
export type Period = "today" | "7days" | "30days";

// API call para o histórico
const fetchCommitHistoryAPI = async (
  userId: string,
  period: Period
): Promise<CommitHistoryData[]> => {
  const response = await fetch(
    `http://localhost:4000/github/commits-period?userId=${userId}&period=${period}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch commit history");
  }
  const data = await response.json();
  return data.history || [];
};

export const useCommitHistory = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>("today");
  const [history, setHistory] = useState<CommitHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    // Para 'today', não precisamos chamar a nova rota, pois o gráfico já é diferente.
    // A lógica de 'today' será tratada diretamente na página.
    if (period === "today") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCommitHistoryAPI(user.id, period);
      setHistory(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    period,
    setPeriod,
    history,
    isLoading,
    error,
  };
};
