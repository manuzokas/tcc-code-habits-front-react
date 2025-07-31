// src/features/onboarding/components/ResultScreen.tsx
import { Button } from "@/shared/components/atoms/Button";
import type { QuizResult } from "@/features/onboarding/types/personas";

interface ResultScreenProps {
  result: QuizResult;
  onComplete: () => void;
  onRetry: () => void;
}

export const ResultScreen = ({
  result,
  onComplete,
  onRetry,
}: ResultScreenProps) => (
  <div className="space-y-6">
    <div className={`p-6 rounded-lg bg-gradient-to-r ${result.persona.color}`}>
      <h2 className="text-xl font-bold text-white">{result.persona.name}</h2>
      <p className="text-white/90">{result.persona.description}</p>
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-white">Seus principais traços:</h3>
      <ul className="space-y-2">
        {result.persona.traits.map((trait, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span className="text-white/90">{trait}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex gap-4 pt-4">
      <Button
        onClick={onComplete}
        className="flex-1 bg-green-600 hover:bg-green-700"
      >
        Continuar para o Dashboard
      </Button>
      <Button
        onClick={onRetry}
        className="flex-1 text-white border-white/30 hover:bg-white/10"
      >
        Refazer teste
      </Button>
    </div>
  </div>
);
