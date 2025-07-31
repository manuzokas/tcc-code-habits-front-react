import { Button } from "@/shared/components/atoms/Button";
import type { QuestionType } from "@/features/onboarding/types/personas";

interface PersonaQuizProps {
  question: QuestionType;
  onAnswer: (questionId: string, value: string) => void;
}

export const PersonaQuiz = ({ question, onAnswer }: PersonaQuizProps) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-white">{question.text}</h2>
      {question.description && (
        <p className="text-white/70">{question.description}</p>
      )}
    </div>

    <div className="space-y-3">
      {question.options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onAnswer(question.id, option.value)}
          className="w-full justify-start text-white hover:bg-white/10 border-white/30"
        >
          {option.text}
        </Button>
      ))}
    </div>
  </div>
);
