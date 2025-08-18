import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PersonaQuiz } from "@/features/onboarding/components/PersonaQuiz";
import { usePersonaQuiz } from "../hooks/usePersonaQuiz";
import { ResultScreen } from "../components/ResultScreen";
import { ProgressBar } from "@/shared/components/atoms/ProgressBar";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/path";

export function OnboardingPage() {
  const { completePersonaQuiz, isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!result) {
      setError("Resultado do quiz não encontrado. Por favor, tente refazer.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await completePersonaQuiz({
        answers,
        result: {
          persona: result.persona,
          score: result.score,
          recommendations: result.recommendations,
        },
        completedAt: new Date().toISOString(),
      });

      console.log(
        "OnboardingPage: Quiz salvo com sucesso. Navegando para o dashboard..."
      );
      navigate(PATHS.DASHBOARD, { replace: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("OnboardingPage: Erro capturado em handleComplete:", err);
      setError(
        err.message || "Ocorreu um erro ao salvar seu perfil. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Redirecionando...
      </div>
    );
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
            isSubmitting={isSubmitting}
          />
        ) : (
          <PersonaQuiz question={currentQuestion} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
}
