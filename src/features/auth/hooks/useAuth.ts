import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSupabase } from "@/hooks/useSupabase";
import type { PersonaData } from "@/features/onboarding/types/personas";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const supabase = useSupabase();

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const completePersonaQuiz = async (personaData: PersonaData) => {
    console.log("useAuth: Início de completePersonaQuiz");

    if (!context.session?.user?.id) {
      console.error("useAuth: Usuário não autenticado ao tentar completar o quiz.");
      throw new Error("User not authenticated");
    }

    const userId = context.session.user.id;
    const userEmail = context.session.user.email;
    console.log("useAuth: ID do usuário autenticado:", userId);
    console.log("useAuth: Dados da persona a serem enviados:", personaData);

    try {
      console.log("useAuth: Tentando operação de UPDATE no perfil...");
      const { data: updatedProfile, error: updateError } = await supabase
        .from("profiles")
        .update({
          has_completed_persona_quiz: true,
          persona: personaData.result.persona.id,
          persona_data: personaData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (updateError) {
        console.warn("useAuth: Erro na tentativa de UPDATE:", updateError);
        if (updateError.code === "PGRST116" || updateError.code === "406") {
          console.log("useAuth: Perfil não encontrado, tentando operação de UPSERT...");
          const { error: createError } = await supabase
            .from("profiles")
            .upsert(
              {
                id: userId,
                email: userEmail,
                has_completed_persona_quiz: true,
                persona: personaData.result.persona.id,
                persona_data: personaData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "id",
              }
            );

          if (createError) {
            console.error("useAuth: Erro na tentativa de UPSERT:", createError);
            throw createError;
          }
          console.log("useAuth: UPSERT do perfil realizado com sucesso.");

        } else {
          console.error("useAuth: Erro inesperado no UPDATE do perfil:", updateError);
          throw updateError;
        }
      } else {
        console.log("useAuth: UPDATE do perfil realizado com sucesso. Perfil atualizado:", updatedProfile);
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

      return { success: true, profile: updatedProfile };
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

  const hasCompletedPersonaQuiz =
    context.session?.user?.user_metadata?.has_completed_persona_quiz ?? false;

  return {
    ...context,
    isSignedIn: !!context.session,
    isLoaded: !context.isLoading,
    completePersonaQuiz,
    hasCompletedPersonaQuiz,
    user: context.session?.user ?? null,
  };
};