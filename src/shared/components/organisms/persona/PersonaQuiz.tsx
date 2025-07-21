import { motion } from "framer-motion";
import { usePersonaQuiz } from "@/shared/hooks/usePersonaQuiz";
import { Button } from "@/shared/components/atoms/Button";
import { PersonaCard } from "@/shared/components/molecules/persona/PersonaCard";
import { useEffect } from "react";
import type { PersonaType } from "@/shared/types/personas";

interface PersonaQuizProps {
  onComplete: (persona: PersonaType) => void;
  isSubmitting?: boolean;
}

export const PersonaQuiz = ({ onComplete, isSubmitting }: PersonaQuizProps) => {
  const {
    currentStep,
    currentQuestion,
    questions,
    handleAnswer,
    result,
    resetQuiz,
    isComplete,
  } = usePersonaQuiz();

  useEffect(() => {
    if (isComplete && result && onComplete) {
      onComplete(result.persona);
    }
  }, [isComplete, result, onComplete]);

  if (isComplete && result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Seu perfil é:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              {result.persona.name}
            </span>
          </h3>
          <p className="text-gray-400">{result.persona.description}</p>
        </motion.div>

        <PersonaCard persona={result.persona} isResult />

        <div className="mt-8 text-center">
          <Button
            onClick={resetQuiz}
            className="px-6 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 transition-all group"
            disabled={isSubmitting} // Adicione esta linha
          >
            <span className="relative z-10">Refazer questionário</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span className="font-mono">Questionário de perfil</span>
          <span className="font-mono">
            Pergunta {currentStep + 1} de {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
            className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className="mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 font-mono">
          {currentQuestion.text}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                !isSubmitting && handleAnswer(currentQuestion.id, option.value)
              }
              className={`w-full text-left p-4 ${
                isSubmitting
                  ? "bg-gray-800/30"
                  : "bg-gray-800/50 hover:bg-gray-800"
              } border border-gray-700 rounded-lg transition-all font-mono text-gray-200`}
              disabled={isSubmitting}
            >
              {option.text}
              {isSubmitting && (
                <span className="ml-2 inline-block animate-spin">↻</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="text-center text-sm text-gray-500 font-mono">
        {isSubmitting
          ? "Processando suas respostas..."
          : "Responda honestamente para obter um perfil preciso"}
      </div>
    </div>
  );
};
