import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { IconName } from "@/shared/components/atoms/Icon";
import type { Database } from "@/lib/database.types";

type UserAchievement = Database["public"]["Tables"]["user_achievements"]["Row"];
type Achievement = Database["public"]["Tables"]["achievements"]["Row"];

export interface AchievementData {
  id: string;
  title: string;
  progress: number;
  icon: IconName;
  bg: string;
  border: string;
  completed: boolean;
}

const mapAchievementToBadgeData = (
  achievement: Achievement & { user_achievements?: UserAchievement[] }
): AchievementData => {
  const isCompleted = achievement.user_achievements !== null && achievement.user_achievements !== undefined && achievement.user_achievements.length > 0;
  
  const progress = isCompleted ? 100 : 50; 

  let icon: IconName = "Target";
  let bg = "bg-gray-800/30";
  let border = "border-gray-500/20";

  if (achievement.name.includes("Hidratação")) {
    icon = "Droplet";
    bg = "bg-gradient-to-br from-cyan-900/30 to-blue-900/30";
    border = "border-cyan-500/20";
  } else if (achievement.name.includes("Postura")) {
    icon = "Accessibility";
    bg = "bg-gradient-to-br from-green-900/30 to-emerald-900/30";
    border = "border-green-500/20";
  } else if (achievement.name.includes("Visão")) {
    icon = "Eye";
    bg = "bg-gradient-to-br from-blue-900/30 to-indigo-900/30";
    border = "border-blue-500/20";
  } else if (achievement.name.includes("Mente")) {
    icon = "Brain";
    bg = "bg-gradient-to-br from-purple-900/30 to-violet-900/30";
    border = "border-purple-500/20";
  }

  return {
    id: achievement.id,
    title: achievement.name,
    progress,
    icon,
    bg,
    border,
    completed: isCompleted,
  };
};

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useSupabase();
  const { user } = useAuth();

  const fetchAchievements = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("achievements")
      .select(`
        *,
        user_achievements!left(
          id
        )
      `)
      .order("created_at");

    if (error) {
      console.error("Erro ao buscar conquistas:", error);
      setAchievements([]);
    } else {
      const formattedAchievements = data.map(mapAchievementToBadgeData);
      setAchievements(formattedAchievements);
    }
    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return { achievements, isLoading, refetch: fetchAchievements };
};