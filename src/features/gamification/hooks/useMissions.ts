import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MISSIONS } from "../constants/missions";
import type { Missions, MissionKeyType, UserMissionProgress } from "../types/missions";
import { startOfDay } from 'date-fns';

const MISSION_QUERY_KEY = ["userMissions"];

export const useMissions = () => {
  const supabase = useSupabase();
  const { user, updateXp } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  const checkIfNeedsReset = (lastUpdatedAt: string | null) => {
    if (!lastUpdatedAt) return true;
    const lastUpdateDate = startOfDay(new Date(lastUpdatedAt));
    const today = startOfDay(new Date());
    return lastUpdateDate.getTime() < today.getTime();
  };

  // query para buscar o progresso das missões do usuário
  const { data: userMissionProgressData, isLoading: isLoadingMissions, error: missionsError } = useQuery<UserMissionProgress[], Error>({
    queryKey: [MISSION_QUERY_KEY, userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("user_missions")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      // logica de reset diario
      const needsReset = data.some(mission => checkIfNeedsReset(mission.last_updated_at));
      if (needsReset || data.length === 0) {
        const todayIso = new Date().toISOString();
        const upsertData = Object.keys(MISSIONS).map(key => ({
          user_id: userId,
          mission_key: key as MissionKeyType,
          current_progress: 0,
          is_completed: false,
          last_updated_at: todayIso,
          completed_at: null,
        }));

        const { data: upsertedData, error: upsertError } = await supabase
          .from("user_missions")
          .upsert(upsertData, { onConflict: "user_id, mission_key" })
          .select('*');

        if (upsertError) throw upsertError;
        return upsertedData as UserMissionProgress[];
      }

      return data as UserMissionProgress[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  // para incrementar o progresso de uma missão
  const incrementMissionProgress = useMutation({
    mutationFn: async (missionKey: MissionKeyType) => {
      if (!userId) throw new Error("User not authenticated.");
      
      const combinedMissions = getCombinedMissions();
      const currentMission = combinedMissions[missionKey];
      if (currentMission.isCompleted) return;

      const newProgress = Math.min(currentMission.current + currentMission.increment, currentMission.total);
      const isNowCompleted = newProgress >= currentMission.total;

      const updatePayload: Partial<UserMissionProgress> = {
        current_progress: newProgress,
        last_updated_at: new Date().toISOString(),
      };
      if (isNowCompleted) {
        updatePayload.is_completed = true;
        updatePayload.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("user_missions")
        .update(updatePayload)
        .eq("user_id", userId)
        .eq("mission_key", missionKey)
        .select('*')
        .single();
      
      if (error) throw error;
      
      // adiciona XP se a missão foi completada AGORA
      if (isNowCompleted && !currentMission.isCompleted && updateXp) {
        await updateXp(currentMission.xp);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MISSION_QUERY_KEY, userId] });
    },
  });

  // para marcar uma missão como completa (útil para missões de 1 vez)
  const completeMission = useMutation({
    mutationFn: async (missionKey: MissionKeyType) => {
      if (!userId) throw new Error("User not authenticated.");

      const combinedMissions = getCombinedMissions();
      const currentMission = combinedMissions[missionKey];
      if (currentMission.isCompleted) return;

      const { data, error } = await supabase
        .from("user_missions")
        .update({
          current_progress: currentMission.total,
          is_completed: true,
          last_updated_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("mission_key", missionKey)
        .select('*')
        .single();

      if (error) throw error;
      
      // adiciona XP
      if (updateXp) {
        await updateXp(currentMission.xp);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MISSION_QUERY_KEY, userId] });
    },
  });

  // combina os dados estaticos com o progresso do usuário
  const getCombinedMissions = (): Missions => {
    return Object.keys(MISSIONS).reduce((acc, key) => {
      const missionKey = key as MissionKeyType;
      const template = MISSIONS[missionKey];
      const userProgress = userMissionProgressData?.find(m => m.mission_key === missionKey);

      acc[missionKey] = {
        ...template,
        key: missionKey,
        current: userProgress?.current_progress ?? 0,
        isCompleted: userProgress?.is_completed ?? false,
      };
      return acc;
    }, {} as Missions);
  };
  
  const combinedMissions = getCombinedMissions();

  // calcula o XP total das missões
  const calculateTotalXp = () => {
    if (isLoadingMissions) return 0;
    return Object.values(combinedMissions).reduce((total, mission) => {
      return total + (mission.isCompleted ? mission.xp : 0);
    }, 0);
  };

  return {
    missions: combinedMissions,
    isLoadingMissions,
    missionsError,
    handleAdd: incrementMissionProgress.mutate, 
    handleComplete: completeMission.mutate,
    calculateTotalXp,
    isAllMissionsCompleted: Object.values(combinedMissions).every(m => m.isCompleted),
  };
};