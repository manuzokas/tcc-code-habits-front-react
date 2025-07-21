// src/features/auth/context/AuthContext.ts

import { createContext } from "react";
import type { AuthContextType } from "@/features/auth/types/authTypes";

// Cria o contexto vazio (placeholder)
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
