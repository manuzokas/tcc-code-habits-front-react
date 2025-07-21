import { useState } from "react";
import { AuthHeader } from "../components/AuthHeader";
import { AuthForm } from "../components/AuthForm";
import { AuthSocialButtons } from "../components/AuthSocialButtons";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLocalError(null);
    try {
      if (!login) throw new Error("Login function is not available.");
      await login(data.email, data.password);
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Erro desconhecido ao realizar login.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 py-35">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader mode="login" />

        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <AuthForm
            mode="login"
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
            <AuthSocialButtons mode="login" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-gray-500 font-mono"
        >
          Novo no CodeHabits?{" "}
          <a href="/sign-up" className="text-blue-400 hover:text-blue-300">
            Crie uma conta
          </a>
        </motion.div>
      </div>
    </div>
  );
}
