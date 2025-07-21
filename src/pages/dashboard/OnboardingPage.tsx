import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PersonaQuiz } from "@/shared/components/organisms/persona/PersonaQuiz";
import { PATHS } from "@/app/routes/path";

export function OnboardingPage() {
  const { user, completePersonaQuiz } = useAuth();
  const navigate = useNavigate();
  const [isCompletingQuiz, setIsCompletingQuiz] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate(PATHS.LOGIN);
      return;
    }

    if (user.hasCompletedPersonaQuiz) {
      navigate(PATHS.DASHBOARD);
    }
  }, [user, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = async (persona: any) => {
    if (isCompletingQuiz) return;

    setIsCompletingQuiz(true);
    try {
      await completePersonaQuiz(persona);
      navigate(PATHS.DASHBOARD);
    } catch (err) {
      console.error("Erro ao completar questionário:", err);
    } finally {
      setIsCompletingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-950 flex items-center justify-center pt-30">
      <div className="w-full max-w-2xl bg-gray-900/80 border border-green-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Complete seu perfil DEV
        </h1>

        <PersonaQuiz
          onComplete={handleComplete}
          isSubmitting={isCompletingQuiz}
        />
      </div>
    </div>
  );
}
