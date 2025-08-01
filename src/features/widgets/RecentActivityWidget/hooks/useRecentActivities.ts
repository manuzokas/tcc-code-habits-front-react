import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import type { Database } from "@/lib/database.types";
import type { IconName } from "@/shared/components/atoms/Icon";
import { useAuth } from "@/features/auth/hooks/useAuth";

type TActivities = Database["public"]["Tables"]["activities"]["Row"];

export interface RecentActivity {
  id: TActivities["id"];
  action: string;
  xp: string;
  time: string;
  healthImpact: string;
  completed: boolean;
  icon: IconName;
}

const mapActivityTypeToDisplay = (activityType: string) => {
  switch (activityType) {
    case "mission_completed":
      return {
        icon: "Target" as IconName,
        healthImpact: "Bem-estar +",
        xp: "+50XP",
      };
    case "drink_water":
      return {
        icon: "Droplet" as IconName,
        healthImpact: "Hidratação +5%",
        xp: "+20XP",
      };
    case "stretching":
      return {
        icon: "StretchHorizontal" as IconName,
        healthImpact: "Postura melhorada",
        xp: "+30XP",
      };
    default:
      return {
        icon: "Code2" as IconName,
        healthImpact: "N/A",
        xp: "+0XP",
      };
  }
};

const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}min atrás`;
  }
  if (diffInMinutes < 1440) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h atrás`;
  }
  return past.toLocaleDateString();
};

export const useRecentActivities = () => {
  const [activities, setActivities] = useState<RecentActivity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useSupabase();
  const { user } = useAuth();

  const fetchAndSetActivities = useCallback(async () => {
    console.log("[useRecentActivities] Iniciando busca inicial de atividades...");
    if (!user) {
      setIsLoading(false);
      setActivities([]);
      console.log("[useRecentActivities] Usuário não logado. Abortando busca inicial.");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("activities")
      .select(`id, description, activity_type, created_at`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("[useRecentActivities] Erro ao buscar atividades recentes:", error);
      setActivities([]);
    } else {
      console.log("[useRecentActivities] Atividades buscadas com sucesso:", data);
      const formattedActivities: RecentActivity[] = data.map((item) => {
        const displayData = mapActivityTypeToDisplay(item.activity_type);

        return {
          id: item.id,
          action: item.description,
          xp: displayData.xp,
          time: formatTimeAgo(item.created_at),
          healthImpact: displayData.healthImpact,
          completed: true,
          icon: displayData.icon,
        };
      });
      setActivities(formattedActivities);
      console.log("[useRecentActivities] Estado de atividades atualizado com dados iniciais.");
    }
    setIsLoading(false);
  }, [user, supabase]);

  const addLocalActivity = useCallback((newActivity: Omit<RecentActivity, 'id'>) => {
    console.log("[useRecentActivities] Tentativa de adicionar atividade local (otimista):", newActivity);
    setActivities(prev => {
      const tempId = `temp-${Date.now()}`;
      const activityWithId = { ...newActivity, id: tempId };
      const newActivities = prev ? [activityWithId, ...prev.slice(0, 4)] : [activityWithId];
      console.log("[useRecentActivities] Estado de atividades atualizado de forma otimista:", newActivities);
      return newActivities;
    });
  }, []);

  useEffect(() => {
    fetchAndSetActivities();
  }, [fetchAndSetActivities]);

  return { 
    activities, 
    isLoading, 
    refetch: fetchAndSetActivities,
    addLocalActivity 
  };
};