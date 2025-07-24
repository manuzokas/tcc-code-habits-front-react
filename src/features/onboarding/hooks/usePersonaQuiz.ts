import { useState } from 'react';
import type { PersonaType, UserPersona } from '@/features/onboarding/types/personas';
import { personas } from '@/features/onboarding/data/personas';
import { questions } from '@/features/onboarding/data/questions';

export const usePersonaQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<UserPersona | null>(null);
  
  const currentQuestion = questions[currentStep];
  
  const handleAnswer = (questionId: string, answerValue: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
    }
  };
  
  const calculateResult = () => {
    const scores: Record<string, number> = {};
    
    personas.forEach(persona => {
      scores[persona.id] = 0;
    });
    
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        const option = question.options.find(opt => opt.value === answerValue);
        if (option) {
          Object.entries(option.personaWeights).forEach(([personaId, weight]) => {
            scores[personaId] += weight;
          });
        }
      }
    });
    
    let maxScore = 0;
    let selectedPersona: PersonaType = personas[0];
    
    Object.entries(scores).forEach(([personaId, score]) => {
      if (score > maxScore) {
        maxScore = score;
        selectedPersona = personas.find(p => p.id === personaId) || personas[0];
      }
    });
    
    setResult({
      persona: selectedPersona,
      score: maxScore
    });
  };
  
  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };
  
  return {
    currentStep,
    currentQuestion,
    questions,
    answers,
    handleAnswer,
    result,
    resetQuiz,
    isComplete: result !== null
  };
};