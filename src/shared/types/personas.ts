import type { IconName } from "../components/atoms/Icon";

export type PersonaType = {
    id: string;
    name: string;
    description: string;
    traits: string[];
    color: string;
    recommendations: {
      hydration: string[];
      breaks: string[];
      exercise: string[];
      nutrition: string[];
      sleep: string[];
      mental: string[];
    };
  };
  
  export type QuestionType = {
    id: string;
    text: string;
    options: {
      value: string;
      text: string;
      personaWeights: Record<string, number>;
    }[];
  };

  export type HealthTip = {
    title: string;
    description: string;
    category: string;
    icon: IconName;
    recommendedFor?: string[];
  };
  
  export type UserPersona = {
    persona: PersonaType;
    score: number;
  };
  
  export type ApiUser = {
    id: string;
    name: string;
    email: string;
    hasCompletedPersonaQuiz: boolean;
    persona?: PersonaType; 
  };