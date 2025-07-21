import type { ApiUser, PersonaType } from "@/shared/types/personas";

export type User = ApiUser & {
  persona?: PersonaType;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  completePersonaQuiz: (persona: PersonaType) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
};
