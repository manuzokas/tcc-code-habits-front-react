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
  persona_data: any | null;
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
      console.log("useAuth: Buscando perfil do usuário com ID:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("useAuth: Erro ao buscar perfil do usuário:", error.message);
        setProfile(null); 
      } else if (data) {
        const profileWithXp: UserProfile = { ...data, xp: data.xp ?? 0 } as UserProfile;
        setProfile(profileWithXp);
        console.log("useAuth: Perfil do usuário carregado:", profileWithXp);
      }
      setIsLoadingProfile(false);
    };

    fetchUserProfile();
  }, [userId, supabase]);

  const updateXp = async (amount: number): Promise<UserProfile | null> => {
    if (!userId || !profile) {
      console.error("useAuth: Usuário não autenticado ou perfil não carregado para atualizar XP.");
      return null;
    }

    const newXp = (profile.xp ?? 0) + amount;
    console.log(`useAuth: Atualizando XP para ${newXp} (antigo: ${profile.xp}, ganho: ${amount}) para o usuário ${userId}`);

    const { data, error } = await supabase
      .from('profiles')
      .update({ xp: newXp, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select('*') 
      .single();

    if (error) {
      console.error("useAuth: Erro ao atualizar XP no banco de dados:", error.message);
      return null;
    } else if (data) {
      setProfile(data as UserProfile);
      console.log("useAuth: XP do perfil atualizada com sucesso:", data);
      return data as UserProfile;
    }
    return null;
  };

  const completePersonaQuiz = async (personaData: PersonaData) => {
    console.log("useAuth: Início de completePersonaQuiz");

    if (!userId) {
      console.error("useAuth: Usuário não autenticado ao tentar completar o quiz.");
      throw new Error("User not authenticated");
    }

    const userEmail = context.session?.user?.email;
    console.log("useAuth: ID do usuário autenticado:", userId);
    console.log("useAuth: Dados da persona a serem enviados:", personaData);

    try {
      console.log("useAuth: Tentando operação de UPDATE no perfil...");
      const { data: updatedProfileData, error: updateError } = await supabase
        .from("profiles")
        .update({
          has_completed_persona_quiz: true,
          persona: personaData.result.persona.id,
          persona_data: personaData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select('*')
        .single();

      if (updateError) {
        console.warn("useAuth: Erro na tentativa de UPDATE:", updateError);
        if (updateError.code === "PGRST116" || updateError.code === "406") {
          console.log("useAuth: Perfil não encontrado, tentando operação de UPSERT...");
          const { data: upsertedProfileData, error: createError } = await supabase
            .from("profiles")
            .upsert(
              {
                id: userId,
                email: userEmail || '',
                has_completed_persona_quiz: true,
                persona: personaData.result.persona.id,
                persona_data: personaData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                xp: 0, 
              },
              {
                onConflict: "id",
                ignoreDuplicates: false
              }
            )
            .select('*') 
            .single();

          if (createError) {
            console.error("useAuth: Erro na tentativa de UPSERT:", createError);
            throw createError;
          }
          console.log("useAuth: UPSERT do perfil realizado com sucesso. Perfil:", upsertedProfileData);
          setProfile(upsertedProfileData as UserProfile);
        } else {
          console.error("useAuth: Erro inesperado no UPDATE do perfil:", updateError);
          throw updateError;
        }
      } else {
        console.log("useAuth: UPDATE do perfil realizado com sucesso. Perfil atualizado:", updatedProfileData);
        setProfile(updatedProfileData as UserProfile); 
      }

      console.log("useAuth: Atualizando user_metadata da sessão para setar has_completed_persona_quiz para true.");
      const { data: { user: updatedAuthUser }, error: updateAuthError } = await supabase.auth.updateUser({
        data: {
          has_completed_persona_quiz: true,
        }
      });

      if (updateAuthError) {
        console.error("useAuth: Erro ao atualizar user_metadata na sessão:", updateAuthError);
      } else {
        console.log("useAuth: user_metadata atualizado na sessão. Novo user:", updatedAuthUser);
      }

      return { success: true, profile: profile };
    } catch (error: any) {
      console.error("useAuth: Erro capturado em completePersonaQuiz:", error);
      console.error('useAuth: Erro completo (detalhes):', {
        code: error.code,
        message: error.message,
        details: error.details,
        userId: userId
      });
      throw error;
    }
  };

  const hasCompletedPersonaQuiz = profile?.has_completed_persona_quiz ?? false;

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