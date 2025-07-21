// src/features/auth/components/AuthForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Label } from "@/shared/components/atoms/Label";
import type { AuthMode } from "@/features/auth/types/types";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  isLoading?: boolean;
}

export function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, ...(mode === "register" && { name }) });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-400 font-mono">
            Nome de Usuário
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-gray-200 font-mono"
            placeholder="dev_example"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-400 font-mono">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-800 border-gray-700 text-gray-200 font-mono"
          placeholder="dev@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-400 font-mono">
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-800 border-gray-700 text-gray-200 font-mono"
          placeholder="••••••••"
          minLength={6}
        />
      </div>

      {mode === "login" && (
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-400 hover:text-blue-300 font-mono"
          >
            Esqueceu a senha?
          </button>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 font-mono"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-pulse">Processando...</span>
        ) : mode === "login" ? (
          "Fazer Login"
        ) : (
          "Criar Conta"
        )}
      </Button>
    </motion.form>
  );
}
