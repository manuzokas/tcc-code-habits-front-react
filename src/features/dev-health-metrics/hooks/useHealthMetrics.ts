import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";

type MetricType = 
  | 'hydration' 
  | 'posture' 
  | 'eye_health' 
  | 'stress' 
  | 'sleep' 
  | 'activity';

interface HealthMetric {
  id: string;
  type: MetricType;
  value: string;
  context?: string;
  lastUpdated: string;
}

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();
  const { user } = useAuth();

  const formatLastUpdated = useCallback((dateString: string): string => {
    try {
      const diffMins = Math.round((Date.now() - new Date(dateString).getTime()) / (1000 * 60));
      
      if (diffMins < 1) return "Agora";
      if (diffMins < 60) return `Há ${diffMins} min`;
      if (diffMins < 24 * 60) return `Há ${Math.floor(diffMins / 60)} h`;
      return `Há ${Math.floor(diffMins / (60 * 24))} d`;
    } catch (e) {
      console.error("[useHealthMetrics] Erro ao formatar data:", e);
      return "Nunca";
    }
  }, []);

  const fetchMetrics = useCallback(async () => {
    console.log("[useHealthMetrics] Iniciando busca de métricas...");
    
    if (!user) {
      console.log("[useHealthMetrics] Usuário não autenticado - retornando métricas vazias");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      console.log(`[useHealthMetrics] Buscando métricas para ${today}...`);
      
      const { data, error: supabaseError } = await supabase
        .from("health_metrics_daily")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .order("last_updated", { ascending: false });

      if (supabaseError) {
        console.error("[useHealthMetrics] Erro ao buscar métricas:", supabaseError);
        throw supabaseError;
      }

      console.log("[useHealthMetrics] Dados recebidos do Supabase:", data);

      const defaultMetrics: HealthMetric[] = [
        { id: '1', type: 'hydration', value: '0L', lastUpdated: 'Nunca' },
        { id: '2', type: 'posture', value: '0 vezes', lastUpdated: 'Nunca' },
        { id: '3', type: 'eye_health', value: 'Inativo', lastUpdated: 'Nunca' },
        { id: '4', type: 'stress', value: 'Moderado', lastUpdated: 'Nunca' },
        { id: '5', type: 'sleep', value: '0h', lastUpdated: 'Nunca' },
        { id: '6', type: 'activity', value: '0min', lastUpdated: 'Nunca' }
      ];

      const processedMetrics = defaultMetrics.map(metric => {
        const updated = data?.find(m => m.metric_type === metric.type);
        
        if (updated) {
          console.log(`[useHealthMetrics] Atualizando métrica ${metric.type} com dados do banco`);
          return {
            ...metric,
            value: updated.value || metric.value,
            context: updated.context || metric.context,
            lastUpdated: updated.last_updated 
              ? formatLastUpdated(updated.last_updated) 
              : metric.lastUpdated
          };
        }
        
        console.log(`[useHealthMetrics] Mantendo valor padrão para métrica ${metric.type}`);
        return metric;
      });

      console.log("[useHealthMetrics] Métricas processadas:", processedMetrics);
      setMetrics(processedMetrics);
    } catch (err) {
      console.error("[useHealthMetrics] Erro ao buscar métricas:", err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase, formatLastUpdated]);

  useEffect(() => {
    console.log("[useHealthMetrics] Efeito disparado - buscando métricas");
    fetchMetrics();
  }, [fetchMetrics]);

  return { 
    metrics, 
    isLoading,
    error,
    refetch: fetchMetrics
  };
};