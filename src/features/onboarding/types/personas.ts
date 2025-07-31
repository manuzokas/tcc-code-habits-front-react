// src/features/onboarding/types/personas.ts
export type PersonaId = 'chronic' | 'anxious' | 'disorganized' | 'conscious';

export type PersonaTrait = string;

export type PersonaRecommendations = {
  hydration: string[];
  breaks: string[];
  exercise: string[];
  nutrition: string[];
  sleep: string[];
  mental: string[];
};

export type PersonaType = {
  id: PersonaId;
  name: string;
  description: string;
  traits: PersonaTrait[];
  color: string;
  recommendations: PersonaRecommendations;
};

export type QuestionOption = {
  value: string;
  text: string;
  personaWeights: Record<PersonaId, number>;
};

export type QuestionType = {
  id: string;
  text: string;
  description?: string;
  options: QuestionOption[];
};

export type QuizAnswers = Record<string, string>;

export type QuizResult = {
  persona: PersonaType;
  score: number;
  recommendations: PersonaRecommendations;
};

export type PersonaData = {
  answers: QuizAnswers;
  result: QuizResult;
  completedAt: string;
};