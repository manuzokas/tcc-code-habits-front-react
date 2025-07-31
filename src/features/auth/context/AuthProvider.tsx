import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useSupabase } from "@/hooks/useSupabase";
import type { Session, User, AuthError } from "@supabase/supabase-js";
import type { PostgrestError } from "@supabase/supabase-js";

type AuthOperationError = AuthError | PostgrestError | null;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AuthProvider: Inicializando autenticação...");
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      console.log("AuthProvider: Sessão inicial carregada:", session);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(`AuthProvider: Evento de autenticação: ${_event}`, session);
      setSession(session);
      setUser(session?.user ?? null);
    });

    initializeAuth();
    return () => {
      console.log("AuthProvider: Desinscrevendo do listener de autenticação.");
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleAuthError = (error: unknown): AuthOperationError => {
    console.error("AuthProvider: handleAuthError chamado com:", error);
    if (error === null) return null;
    if (typeof error === "object" && error !== null) {
      if ("message" in error && "code" in error) {
        return error as AuthError | PostgrestError;
      }
    }
    return {
      message: "Ocorreu um erro desconhecido",
      name: "UnknownError",
    } as unknown as AuthError;
  };

  const signUp = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ error: AuthOperationError }> => {
    setIsLoading(true);
    console.log("AuthProvider: Iniciando signUp para:", email);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: import.meta.env.VITE_SUPABASE_SIGNUP_REDIRECT,
        },
      });

      if (authError) {
        console.error("AuthProvider: Erro no signUp:", authError);
        return { error: authError };
      }

      console.log("AuthProvider: signUp bem-sucedido. authData:", authData);

      return { error: null };
    } catch (error) {
      console.error("AuthProvider: Erro inesperado no signUp (catch):", error);
      return { error: handleAuthError(error) };
    } finally {
      setIsLoading(false);
      console.log("AuthProvider: Finalizando signUp.");
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: AuthOperationError }> => {
    setIsLoading(true);
    console.log("AuthProvider: Iniciando signIn para:", email);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("AuthProvider: Erro no signIn:", error);
      } else {
        console.log("AuthProvider: signIn bem-sucedido.");
      }
      return { error };
    } catch (error) {
      console.error("AuthProvider: Erro inesperado no signIn (catch):", error);
      return { error: handleAuthError(error) };
    } finally {
      setIsLoading(false);
      console.log("AuthProvider: Finalizando signIn.");
    }
  };

  const signInWithProvider = async (
    provider: "github" | "google" | "gitlab"
  ): Promise<{ error: AuthOperationError }> => {
    setIsLoading(true);
    console.log("AuthProvider: Iniciando signIn com provedor:", provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL },
      });
      if (error) {
        console.error("AuthProvider: Erro no signInWithProvider:", error);
      } else {
        console.log(
          "AuthProvider: signInWithProvider bem-sucedido (redirecionamento esperado)."
        );
      }
      return { error };
    } catch (error) {
      console.error(
        "AuthProvider: Erro inesperado no signInWithProvider (catch):",
        error
      );
      return { error: handleAuthError(error) };
    } finally {
      setIsLoading(false);
      console.log("AuthProvider: Finalizando signInWithProvider.");
    }
  };

  const signOut = async (): Promise<{ error: AuthOperationError }> => {
    console.log("AuthProvider: Iniciando signOut.");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AuthProvider: Erro no signOut:", error);
      } else {
        console.log("AuthProvider: signOut bem-sucedido.");
      }
      return { error };
    } catch (error) {
      console.error("AuthProvider: Erro inesperado no signOut (catch):", error);
      return { error: handleAuthError(error) };
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
