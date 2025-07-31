// src/features/onboarding/pages/OnboardingPage.tsx
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PersonaQuiz } from "@/features/onboarding/components/PersonaQuiz";
import { usePersonaQuiz } from "../hooks/usePersonaQuiz";
import { ResultScreen } from "../components/ResultScreen";
import { ProgressBar } from "@/shared/components/atoms/ProgressBar";
import { supabase } from "@/api/supabase";

export function OnboardingPage() {
  const { completePersonaQuiz, isSignedIn, isLoaded } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const {
    currentQuestion,
    progress,
    handleAnswer,
    result,
    resetQuiz,
    isComplete,
    answers,
  } = usePersonaQuiz();

  const handleComplete = async () => {
    console.log("OnboardingPage: Início de handleComplete.");
    if (!result) {
      console.warn("OnboardingPage: Resultado do quiz ainda não disponível.");
      setError("Por favor, complete o quiz.");
      return;
    }
    setError(null); // Limpa erros anteriores

    try {
      console.log(
        "OnboardingPage: Forçando refresh da sessão antes de completePersonaQuiz..."
      );
      await supabase.auth.refreshSession();
      console.log(
        "OnboardingPage: Sessão refreshada. Chamando completePersonaQuiz..."
      );
      console.log("OnboardingPage: Chamando completePersonaQuiz...");
      const { success } = await completePersonaQuiz({
        answers,
        result: {
          persona: result.persona,
          score: result.score,
          recommendations: result.recommendations,
        },
        completedAt: new Date().toISOString(),
      });

      if (success) {
        console.log(
          "OnboardingPage: completePersonaQuiz retornou sucesso. Forçando refresh da sessão para garantir metadados atualizados para redirecionamento."
        );
        
        await supabase.auth.refreshSession();
        console.log(
          "OnboardingPage: Quiz completado com sucesso. Deixando o useAuthRedirect lidar com a navegação para o dashboard."
        );
      } else {
        console.log(
          "OnboardingPage: completePersonaQuiz não retornou sucesso, mas não lançou erro."
        );
        setError("Ocorreu um problema ao salvar os dados. Tente novamente.");
      }
    } catch (error: any) {
      console.error(
        "OnboardingPage: Erro capturado em handleComplete (do completePersonaQuiz):",
        error
      );
      let errorMessage = "Erro ao salvar resultados.";

      if (error.code === "23505") {
        errorMessage = "Perfil já existe. Redirecionando...";
        console.log(
          "OnboardingPage: Erro 23505 (Conflito), o useAuthRedirect cuidará do redirecionamento."
        );
      } else if (error.code === "PGRST116" || error.code === "406") {
        errorMessage =
          "Dados não encontrados ou não aceitáveis. Tente novamente.";
        console.log(
          "OnboardingPage: Erro PGRST116/406 (Não encontrado/Não Aceitável)."
        );
      } else if (error.code === "42501") {
        errorMessage =
          "Erro de permissão: Você não tem acesso para realizar esta operação. Verifique as políticas de RLS.";
        console.error("OnboardingPage: Erro de RLS 42501 detectado!");
      }

      setError(errorMessage);
      console.error("OnboardingPage: Erro detalhado (para o usuário):", {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900/80 border border-green-800 rounded-xl p-6 shadow-lg space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white text-center">
            {isComplete ? "Seu Perfil DEV" : "Complete seu perfil DEV"}
          </h1>
          <ProgressBar progress={progress} className="h-2" />
        </div>

        {error && (
          <div className="p-3 bg-red-900/50 text-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        {isComplete && result ? ( 
          <ResultScreen
            result={result}
            onComplete={handleComplete}
            onRetry={resetQuiz}
          />
        ) : (
          <PersonaQuiz question={currentQuestion} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
}
