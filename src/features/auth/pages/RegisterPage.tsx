// src/features/auth/pages/RegisterPage.tsx
import { AuthHeader } from "../components/AuthHeader";
import { AuthForm } from "../components/AuthForm";
import { AuthSocialButtons } from "../components/AuthSocialButtons";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PATHS } from "@/routes/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { signUp, signInWithProvider, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    setError(null);

    try {
      const { error } = await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) {
        throw error;
      }

      // Redireciona após registro bem-sucedido
      navigate(PATHS.DASHBOARD);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro durante o registro"
      );
    }
  };

  const handleSocialLogin = async (
    provider: "github" | "google" | "gitlab"
  ) => {
    try {
      setError(null);
      await signInWithProvider(provider);
      // O redirecionamento é tratado pelo AuthProvider
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao autenticar com o provedor"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 py-35">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader mode="register" />

        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <AuthForm
            mode="register"
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-sm text-red-400 font-mono"
            >
              {error}
            </motion.div>
          )}

          <div className="mt-6">
            <AuthSocialButtons
              mode="register"
              onProviderClick={handleSocialLogin}
              isLoading={isLoading}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-gray-500 font-mono"
        >
          Já tem uma conta?{" "}
          <a
            href={PATHS.LOGIN}
            className="text-blue-400 hover:text-blue-300"
            onClick={(e) => {
              e.preventDefault();
              navigate(PATHS.LOGIN);
            }}
          >
            Faça login
          </a>
        </motion.div>
      </div>
    </div>
  );
}
