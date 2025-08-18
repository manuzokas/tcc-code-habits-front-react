import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSupabase } from "@/hooks/useSupabase";
import type { PersonaData } from "@/features/onboarding/types/personas";

export interface UserProfile {
  id: string;
  created_at: string;
  username: string | null;
  avatar_url: string | null;
  email: string;
  xp: number;
  current_focus_time: number;
  last_activity_at: string | null;
  updated_at: string;
  has_completed_persona_quiz: boolean | null;
  persona: string | null;
  persona_data: unknown | null;
  github_username?: string | null;
  github_access_token?: string | null;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const supabase = useSupabase();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const userId = context.session?.user?.id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setProfile(null);
        setIsLoadingProfile(false);
        return;
      }

      setIsLoadingProfile(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error(
          "useAuth: Erro ao buscar perfil do usuário:",
          error.message
        );
        setProfile(null);
      } else if (data) {
        setProfile(data as UserProfile);
      }
      setIsLoadingProfile(false);
    };

    fetchUserProfile();
  }, [userId, supabase]);

  const updateXp = async (amount: number): Promise<UserProfile | null> => {
    if (!userId || !profile) {
      console.error(
        "useAuth: Usuário não autenticado ou perfil não carregado para atualizar XP."
      );
      return null;
    }
    const newXp = (profile.xp ?? 0) + amount;
    const { data, error } = await supabase
      .from("profiles")
      .update({ xp: newXp, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      console.error(
        "useAuth: Erro ao atualizar XP no banco de dados:",
        error.message
      );
      return null;
    } else if (data) {
      setProfile(data as UserProfile);
      return data as UserProfile;
    }
    return null;
  };

  const completePersonaQuiz = async (
    personaData: PersonaData
  ): Promise<{ success: boolean; profile: UserProfile | null }> => {
    if (!userId) {
      throw new Error("Usuário não autenticado");
    }

    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update({
        has_completed_persona_quiz: true,
        persona: personaData.result.persona.id,
        persona_data: personaData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      console.error("useAuth: Erro ao atualizar o perfil:", error);
      throw error;
    }

    setProfile(updatedProfile as UserProfile);

    supabase.auth.updateUser({
      data: { has_completed_persona_quiz: true },
    });

    return { success: true, profile: updatedProfile as UserProfile };
  };

  const hasCompletedPersonaQuiz =
    profile?.has_completed_persona_quiz ||
    context.session?.user?.user_metadata?.has_completed_persona_quiz ||
    false;

  return {
    ...context,
    isSignedIn: !!context.session,
    isLoaded: !context.isLoading && !isLoadingProfile,
    user: context.session?.user ?? null,
    profile,
    isLoadingProfile,
    updateXp,
    completePersonaQuiz,
    hasCompletedPersonaQuiz,
  };
};
