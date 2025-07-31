// src/features/auth/types/authTypes.ts
import type { PersonaType } from "@/features/onboarding/types/personas";
import type { Session, User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  hasCompletedPersonaQuiz: boolean;
  persona?: PersonaType;
  avatarUrl?: string;
}

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (params: {
    email: string;
    password: string;
    name: string;
  }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithProvider: (provider: "github" | "google" | "gitlab") => Promise<void>;
  signOut: () => Promise<void>;
};

// Tipo para o perfil no Supabase
export interface Profile {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  current_focus_time: number;
  has_completed_persona_quiz: boolean;
  persona?: string;
  created_at: string;
  updated_at: string;
  last_activity_at?: string;
}