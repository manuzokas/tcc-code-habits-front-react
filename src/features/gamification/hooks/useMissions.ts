import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MISSIONS } from "../constants/missions";
import type { Missions, MissionKeyType, UserMissionProgress } from "../types/missions";
import { startOfDay } from 'date-fns';
import { useMetricsUpdater } from "@/features/dev-health-metrics/services/metricsUpdater";

const MISSION_QUERY_KEY = ["userMissions"];

export const useMissions = () => {
  console.groupCollapsed('[useMissions] Inicializando hook');
  const supabase = useSupabase();
  const { user, updateXp } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;
  const { syncMissionProgress } = useMetricsUpdater();

  console.log('Usuário:', userId ? 'Autenticado' : 'Não autenticado');
  console.groupEnd();

  // verificando se precisa resetar as missoes diariamente
  const checkIfNeedsReset = (lastUpdatedAt: string | null) => {
    if (!lastUpdatedAt) return true;
    const lastUpdateDate = startOfDay(new Date(lastUpdatedAt));
    const today = startOfDay(new Date());
    return lastUpdateDate.getTime() < today.getTime();
  };

  // query principal para buscar/atualizar missões
  const { 
    data: userMissionProgressData, 
    isLoading: isLoadingMissions, 
    error: missionsError,
    refetch: refetchMissions
  } = useQuery<UserMissionProgress[], Error>({
    queryKey: [MISSION_QUERY_KEY, userId],
    queryFn: async () => {
      console.groupCollapsed('[useMissions] Executando query de missões');
      if (!userId) {
        console.log('Usuário não autenticado - retornando array vazio');
        console.groupEnd();
        return [];
      }

      console.log('Iniciando busca de missões...');
      
      // 1. buscando missões existentes
      const { data, error } = await supabase
        .from("user_missions")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error('Erro ao buscar missões:', error);
        console.groupEnd();
        throw error;
      }

      console.log(`Missões encontradas: ${data.length}`, data);

      // 2. verificando missões faltantes
      const existingMissionKeys = data.map(m => m.mission_key);
      const allMissionKeys = Object.keys(MISSIONS) as MissionKeyType[];
      const missingMissions = allMissionKeys.filter(key => !existingMissionKeys.includes(key));

      console.log('Missões faltantes:', missingMissions);

      // 3. criando missões faltantes
      if (missingMissions.length > 0) {
        console.log('Criando missões faltantes...');
        const todayIso = new Date().toISOString();
        const insertData = missingMissions.map(key => ({
          user_id: userId,
          mission_key: key,
          current_progress: 0,
          is_completed: false,
          last_updated_at: todayIso,
          completed_at: null,
        }));

        console.log('Dados para inserção:', insertData);

        const { error: insertError } = await supabase
          .from("user_missions")
          .insert(insertData);

        if (insertError) {
          console.error('Erro ao criar missões faltantes:', insertError);
          console.groupEnd();
          throw insertError;
        }
        console.log('Missões faltantes criadas com sucesso');
      }

      // 4. verificando se precisa de reset diário
      const needsReset = data.some(mission => checkIfNeedsReset(mission.last_updated_at));
      console.log('Necessita reset diário?', needsReset);

      if (needsReset || data.length === 0) {
        console.log('Executando reset diário...');
        const todayIso = new Date().toISOString();
        const upsertData = allMissionKeys.map(key => ({
          user_id: userId,
          mission_key: key,
          current_progress: 0,
          is_completed: false,
          last_updated_at: todayIso,
          completed_at: null,
        }));

        console.log('Dados para upsert:', upsertData);

        const { data: upsertedData, error: upsertError } = await supabase
          .from("user_missions")
          .upsert(upsertData, { onConflict: "user_id,mission_key" })
          .select('*');

        if (upsertError) {
          console.error('Erro no reset diário:', upsertError);
          console.groupEnd();
          throw upsertError;
        }
        console.log('Reset diário concluído:', upsertedData);
        console.groupEnd();
        return upsertedData as UserMissionProgress[];
      }

      // 5. buscando dados atualizados após possíveis inserções/updates
      console.log('Buscando dados atualizados...');
      const { data: updatedData, error: updatedError } = await supabase
        .from("user_missions")
        .select("*")
        .eq("user_id", userId);

      if (updatedError) {
        console.error('Erro ao buscar dados atualizados:', updatedError);
        console.groupEnd();
        throw updatedError;
      }
      
      console.log('Retornando missões atualizadas:', updatedData);
      console.groupEnd();
      return updatedData as UserMissionProgress[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: true,
  });

  // combinando dados das missões com progresso do usuário
  const getCombinedMissions = (): Missions => {
    console.groupCollapsed('[useMissions] getCombinedMissions');
    if (!userMissionProgressData) {
      console.log('Sem dados de progresso - retornando objeto vazio');
      console.groupEnd();
      return {} as Missions;
    }
    
    const combined = Object.keys(MISSIONS).reduce((acc, key) => {
      const missionKey = key as MissionKeyType;
      const template = MISSIONS[missionKey];
      const userProgress = userMissionProgressData.find(m => m.mission_key === missionKey);

      acc[missionKey] = {
        ...template,
        key: missionKey,
        current: userProgress?.current_progress ?? 0,
        isCompleted: userProgress?.is_completed ?? false,
      };
      return acc;
    }, {} as Missions);

    console.log('Missões combinadas:', combined);
    console.groupEnd();
    return combined;
  };

  // incrementa progresso da missão
  const incrementMissionProgress = useMutation({
    mutationFn: async (missionKey: MissionKeyType) => {
      console.groupCollapsed(`[useMissions] incrementMissionProgress (${missionKey})`);
      
      if (!userId) {
        console.error('Usuário não autenticado');
        console.groupEnd();
        throw new Error("User not authenticated.");
      }
      
      const combinedMissions = getCombinedMissions();
      const currentMission = combinedMissions[missionKey];
      console.log('Missão atual:', currentMission);
      
      if (currentMission.isCompleted) {
        console.warn('Missão já está completa - abortando');
        console.groupEnd();
        return;
      }

      const newProgress = Math.min(
        currentMission.current + currentMission.increment, 
        currentMission.total
      );
      const isNowCompleted = newProgress >= currentMission.total;

      console.log('Novo progresso calculado:', { newProgress, isNowCompleted });

      const updatePayload = {
        current_progress: newProgress,
        last_updated_at: new Date().toISOString(),
        ...(isNowCompleted && { 
          is_completed: true,
          completed_at: new Date().toISOString() 
        })
      };

      console.log('Payload para atualização:', updatePayload);

      try {
        console.log('Executando atualização no Supabase...');
        const { error: updateError } = await supabase
          .from("user_missions")
          .update(updatePayload)
          .eq("user_id", userId)
          .eq("mission_key", missionKey);

        if (updateError) {
          console.error('Erro na atualização:', updateError);
          throw updateError;
        }

        console.log('Missão atualizada com sucesso no DB.');

        console.log('Buscando estado atualizado de todas as missões para sincronia...');
        const { data: freshUserProgress, error: fetchError } = await supabase
          .from("user_missions")
          .select("*")
          .eq("user_id", userId);

        if (fetchError) {
          console.error('Erro ao buscar missões atualizadas para sincronia:', fetchError);
          throw fetchError;
        }

        const freshCombinedMissions = Object.keys(MISSIONS).reduce((acc, key) => {
          const mKey = key as MissionKeyType;
          const template = MISSIONS[mKey];
          const userProgress = freshUserProgress.find(m => m.mission_key === mKey);
          acc[mKey] = {
            ...template,
            key: mKey,
            current: userProgress?.current_progress ?? 0,
            isCompleted: userProgress?.is_completed ?? false,
          };
          return acc;
        }, {} as Missions);

        console.log('Iniciando sincronização de métricas com dados frescos:', freshCombinedMissions);
        const syncResult = await syncMissionProgress(freshCombinedMissions);
        console.log('Resultado da sincronização:', syncResult);

        if (isNowCompleted && updateXp) {
          console.log(`Adicionando ${currentMission.xp} XP...`);
          await updateXp(currentMission.xp);
          console.log('XP atualizado');
        }

        console.groupEnd();
        return freshUserProgress;
      } catch (error) {
        console.error('Erro capturado:', error);
        console.groupEnd();
        throw error;
      }
    },
    onSuccess: (variables) => {
      console.groupCollapsed(`[useMissions] onSuccess - incrementMissionProgress (${variables})`);
      console.log('Invalidando queries...');
      queryClient.invalidateQueries({ queryKey: [MISSION_QUERY_KEY, userId] });
      console.log('Queries invalidadas');
      console.groupEnd();
    },
    onError: (error, variables) => {
      console.groupCollapsed(`[useMissions] onError - incrementMissionProgress (${variables})`);
      console.error('Erro na mutation:', error);
      console.groupEnd();
    }
  });

  // completa missão manualmente
  const completeMission = useMutation({
    mutationFn: async (missionKey: MissionKeyType) => {
      console.groupCollapsed(`[useMissions] completeMission (${missionKey})`);
      
      if (!userId) {
        console.error('Usuário não autenticado');
        console.groupEnd();
        throw new Error("User not authenticated.");
      }

      const combinedMissions = getCombinedMissions();
      const currentMission = combinedMissions[missionKey];
      console.log('Missão atual:', currentMission);
      
      if (currentMission.isCompleted) {
        console.warn('Missão já está completa - abortando');
        console.groupEnd();
        return;
      }

      console.log('Completando missão manualmente...');

      try {
        const { error: updateError } = await supabase
          .from("user_missions")
          .update({
            current_progress: currentMission.total,
            is_completed: true,
            last_updated_at: new Date().toISOString(),
            completed_at: new Date().toISOString(),
          })
          .eq("user_id", userId)
          .eq("mission_key", missionKey);

        if (updateError) {
          console.error('Erro ao completar missão:', updateError);
          throw updateError;
        }

        console.log('Missão completada com sucesso no DB.');
        
        console.log('Buscando estado atualizado de todas as missões para sincronia...');
        const { data: freshUserProgress, error: fetchError } = await supabase
          .from("user_missions")
          .select("*")
          .eq("user_id", userId);

        if (fetchError) {
          console.error('Erro ao buscar missões atualizadas para sincronia:', fetchError);
          throw fetchError;
        }

        const freshCombinedMissions = Object.keys(MISSIONS).reduce((acc, key) => {
          const mKey = key as MissionKeyType;
          const template = MISSIONS[mKey];
          const userProgress = freshUserProgress.find(m => m.mission_key === mKey);
          acc[mKey] = {
            ...template,
            key: mKey,
            current: userProgress?.current_progress ?? 0,
            isCompleted: userProgress?.is_completed ?? false,
          };
          return acc;
        }, {} as Missions);

        console.log('Iniciando sincronização de métricas com dados frescos:', freshCombinedMissions);
        const syncResult = await syncMissionProgress(freshCombinedMissions);
        console.log('Resultado da sincronização:', syncResult);

        if (updateXp) {
          console.log(`Adicionando ${currentMission.xp} XP...`);
          await updateXp(currentMission.xp);
          console.log('XP atualizado');
        }

        console.groupEnd();
        return freshUserProgress;
      } catch (error) {
        console.error('Erro capturado:', error);
        console.groupEnd();
        throw error;
      }
    },
    onSuccess: (variables) => {
      console.groupCollapsed(`[useMissions] onSuccess - completeMission (${variables})`);
      console.log('Invalidando queries...');
      queryClient.invalidateQueries({ queryKey: [MISSION_QUERY_KEY, userId] });
      console.log('Queries invalidadas');
      console.groupEnd();
    },
    onError: (error, variables) => {
      console.groupCollapsed(`[useMissions] onError - completeMission (${variables})`);
      console.error('Erro na mutation:', error);
      console.groupEnd();
    }
  });

  // calcula XP total acumulado
  const calculateTotalXp = () => {
    console.groupCollapsed('[useMissions] calculateTotalXp');
    if (isLoadingMissions) {
      console.log('Carregando - retornando 0');
      console.groupEnd();
      return 0;
    }
    
    const missions = getCombinedMissions();
    const total = Object.values(missions).reduce(
      (total, mission) => total + (mission.isCompleted ? mission.xp : 0),
      0
    );
    
    console.log('XP total calculado:', total);
    console.groupEnd();
    return total;
  };

  // verifica se todas as missões estão completas
  const isAllMissionsCompleted = () => {
    console.groupCollapsed('[useMissions] isAllMissionsCompleted');
    if (isLoadingMissions) {
      console.log('Carregando - retornando false');
      console.groupEnd();
      return false;
    }
    
    const missions = getCombinedMissions();
    const allCompleted = Object.values(missions).every(m => m.isCompleted);
    
    console.log('Todas completas?', allCompleted);
    console.groupEnd();
    return allCompleted;
  };

  return {
    missions: getCombinedMissions(),
    isLoadingMissions,
    missionsError,
    refetchMissions,
    handleAdd: incrementMissionProgress.mutate, 
    handleComplete: completeMission.mutate,
    calculateTotalXp,
    isAllMissionsCompleted: isAllMissionsCompleted,
  };
};