import { createContext } from "react";
import type { Session, User, AuthError } from "@supabase/supabase-js";
import type { PostgrestError } from "@supabase/supabase-js";

type AuthOperationError = AuthError | PostgrestError | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (params: {
    email: string;
    password: string;
    name: string;
  }) => Promise<{ error: AuthOperationError }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthOperationError }>;
  signInWithProvider: (
    provider: "github" | "google" | "gitlab"
  ) => Promise<{ error: AuthOperationError }>;
  signOut: () => Promise<{ error: AuthOperationError }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
