// src/features/auth/pages/RegisterPage.tsx

import { AuthHeader } from "../components/AuthHeader";
import { AuthForm } from "../components/AuthForm";
import { AuthSocialButtons } from "../components/AuthSocialButtons";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PATHS } from "@/app/routes/path";
import { useState } from "react";

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth(); 
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    email: string;
    password: string;
    name?: string;
  }) => {
    try {
      if (!data.name) {
        throw new Error("Nome é obrigatório");
      }

      if (!register) {
        throw new Error("Função de registro não disponível");
      }

      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // O redirecionamento é feito automaticamente pelo AuthContext
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Erro desconhecido ao registrar");
      }
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

          {(error || localError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-sm text-red-400 font-mono"
            >
              {error || localError}
            </motion.div>
          )}

          <div className="mt-6">
            <AuthSocialButtons mode="register" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-gray-500 font-mono"
        >
          Já tem uma conta?{" "}
          <a href={PATHS.LOGIN} className="text-blue-400 hover:text-blue-300">
            Faça login
          </a>
        </motion.div>
      </div>
    </div>
  );
}
