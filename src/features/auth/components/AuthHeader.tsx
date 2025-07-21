// src/features/auth/components/AuthHeader.tsx
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface AuthHeaderProps {
  mode: "login" | "register";
}

export function AuthHeader({ mode }: AuthHeaderProps) {
  const title = mode === "login" ? "Login" : "Criar Conta";
  const subtitle =
    mode === "login"
      ? "Faça deploy da sua produtividade"
      : "Comece sua jornada dev saudável";

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <Terminal className="h-10 w-10 text-blue-500" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-gray-100 mt-4 font-mono"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-400 mt-2 font-mono"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
