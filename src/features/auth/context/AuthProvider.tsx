import { useEffect, useState } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import type { AuthContextType, User } from "@/features/auth/types/authTypes";

import {
  useUser as useClerkUser,
  useSignIn,
  useSignUp,
  useClerk,
} from "@clerk/clerk-react";
import type { PersonaType } from "@/features/onboarding/types/personas";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, user: clerkUser } = useClerkUser();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signOut, setActive } = useClerk();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && clerkUser) {
      const metadata = clerkUser.unsafeMetadata || {};
      setUser({
        id: clerkUser.id,
        name: clerkUser.fullName || "",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        hasCompletedPersonaQuiz: metadata.hasCompletedPersonaQuiz === true,
        persona: metadata.persona as PersonaType | undefined,
      });
    } else {
      setUser(null);
    }
  }, [isSignedIn, clerkUser]);

  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    return "Ocorreu um erro inesperado.";
  };

  const login: AuthContextType["login"] = async (email, password) => {
    if (!signInLoaded) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        throw new Error("Login incompleto.");
      }
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register: AuthContextType["register"] = async (userData) => {
    if (!signUpLoaded) return;
    setIsLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: userData.email,
        password: userData.password,
      });
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const completePersonaQuiz: AuthContextType["completePersonaQuiz"] = async (
    persona
  ) => {
    if (!clerkUser) return;

    try {
      await clerkUser.update({
        unsafeMetadata: {
          hasCompletedPersonaQuiz: true,
          persona,
        },
      });

      setUser((prev) =>
        prev
          ? {
              ...prev,
              hasCompletedPersonaQuiz: true,
              persona,
            }
          : null
      );
    } catch (err) {
      console.error("Erro ao salvar metadados no Clerk:", err);
      throw err;
    }
  };

  const logout: AuthContextType["logout"] = async () => {
    await signOut();
    setUser(null);
  };

  const clearError: AuthContextType["clearError"] = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        completePersonaQuiz,
        logout,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
