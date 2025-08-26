import { Button } from "@/shared/components/atoms/Button";
import type { QuizResult } from "@/features/onboarding/types/personas";

interface ResultScreenProps {
  result: QuizResult;
  onComplete: () => void;
  onRetry: () => void;
  isSubmitting: boolean; // 1. Adiciona a nova prop
}

export const ResultScreen = ({
  result,
  onComplete,
  onRetry,
  isSubmitting, // 2. Recebe a nova prop
}: ResultScreenProps) => (
  <div className="space-y-6">
    <div className={`p-6 rounded-lg bg-gradient-to-r ${result.persona.color}`}>
      <h2 className="text-xl font-bold text-white">{result.persona.name}</h2>
      <p className="text-white/90">{result.persona.description}</p>
    </div>

    {/* ... (o resto do seu JSX de traços e lista) ... */}

    <div className="flex gap-4 pt-4">
      <Button
        onClick={onComplete}
        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={isSubmitting} // 3. Usa a prop para desabilitar o botão
      >
        {isSubmitting ? "Salvando..." : "Continuar para o Hub"}
      </Button>
      <Button
        onClick={onRetry}
        className="flex-1 text-white border-white/30 hover:bg-white/10"
        disabled={isSubmitting} // Desabilita também para evitar confusão
      >
        Refazer teste
      </Button>
    </div>
  </div>
);
