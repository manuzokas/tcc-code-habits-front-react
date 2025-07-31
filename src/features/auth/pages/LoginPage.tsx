// src/features/auth/pages/LoginPage.tsx
import { AuthHeader } from "../components/AuthHeader";
import { AuthForm } from "../components/AuthForm";
import { AuthSocialButtons } from "../components/AuthSocialButtons";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const { signIn, signInWithProvider, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) setError(error.message);
  };

  const handleSocialLogin = (provider: "github" | "google" | "gitlab") => {
    signInWithProvider(provider).catch((err) => {
      setError(err.message);
    });
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
              mode="login"
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
          Novo no CodeHabits?{" "}
          <a href="/sign-up" className="text-blue-400 hover:text-blue-300">
            Crie uma conta
          </a>
        </motion.div>
      </div>
    </div>
  );
}
