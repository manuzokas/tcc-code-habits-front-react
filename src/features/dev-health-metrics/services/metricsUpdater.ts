import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { missionToMetricsMap } from "@/features/gamification/utils/missionMetricsMappers";
import type { Missions } from "@/features/gamification/types/missions";

export const useMetricsUpdater = () => {
  const supabase = useSupabase();
  const { user } = useAuth();

  const updateMetrics = async (updates: MetricUpdate[]) => {
    console.group('[METRICS] Executando updateMetrics');
    if (!user) {
      console.error('Usuário não autenticado');
      console.groupEnd();
      return false;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      console.log('Atualizando métricas para:', today, 'Updates:', updates);

      const { data, error } = await supabase
        .from("health_metrics_daily")
        .upsert(
          updates.map(update => ({
            user_id: user.id,
            metric_type: update.type,
            value: update.value,
            context: update.context || null,
            date: today,
            last_updated: new Date().toISOString()
          })),
          { 
            onConflict: 'user_id,metric_type,date',
            ignoreDuplicates: false
          }
        )
        .select();

      if (error) throw error;
      
      console.log('Métricas atualizadas com sucesso:', data);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar métricas:', error);
      return false;
    } finally {
      console.groupEnd();
    }
  };

  const syncMissionProgress = async (missions: Missions) => {
    console.group('[METRICS] Sincronizando missões');
    if (!user) {
      console.log('Usuário não autenticado - abortando');
      console.groupEnd();
      return false;
    }

    try {
      console.log('Missões recebidas:', missions);
      const updates: MetricUpdate[] = [];
      
      Object.entries(missions).forEach(([key, mission]) => {
        const mapper = missionToMetricsMap[key as keyof typeof missionToMetricsMap];
        if (mapper) {
          const metricUpdates = mapper(mission.current, mission.isCompleted);
          console.log(`Missão ${key} → Métricas:`, metricUpdates);
          updates.push(...metricUpdates);
        }
      });

      if (updates.length > 0) {
        console.log('Total de atualizações:', updates.length);
        const result = await updateMetrics(updates);
        console.log('Resultado da atualização:', result);
        return result;
      }
      
      console.log('Nenhuma atualização necessária');
      return true;
    } finally {
      console.groupEnd();
    }
  };

  return { 
    updateMetrics,
    syncMissionProgress
  };
};

interface MetricUpdate {
  type: string;
  value: string;
  context?: string;
}