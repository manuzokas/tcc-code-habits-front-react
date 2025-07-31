import { useState, useCallback } from 'react';
import { personas } from '@/features/onboarding/data/personas';
import { questions } from '@/features/onboarding/data/questions';
import type { QuizAnswers, QuizResult, PersonaId } from '@/features/onboarding/types/personas';

export const usePersonaQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const calculateResult = useCallback((answers: QuizAnswers) => {
    const scores = personas.reduce((acc, persona) => ({
      ...acc,
      [persona.id]: 0
    }), {} as Record<PersonaId, number>);

    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answerValue);
      
      if (option?.personaWeights) {
        Object.entries(option.personaWeights).forEach(([personaId, weight]) => {
        scores[personaId as PersonaId] += weight;
      });
  }

    });

    const [personaId, score] = Object.entries(scores).reduce(
      (max, entry) => entry[1] > max[1] ? entry : max,
      ['conscious', 0]
    );

    const persona = personas.find(p => p.id === personaId) || personas[0];
    
    setResult({
      persona,
      score,
      recommendations: persona.recommendations
    });
  }, []);

  const handleAnswer = useCallback((questionId: string, answerValue: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult({ ...answers, [questionId]: answerValue });
    }
  }, [currentStep, answers, calculateResult]);

  const resetQuiz = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  }, []);

  return {
    currentStep,
    currentQuestion,
    questions,
    answers,
    progress,
    handleAnswer,
    result,
    resetQuiz,
    isComplete: result !== null
  };
};