// src/features/auth/context/AuthContext.ts

import { createContext } from "react";
import type { AuthContextType } from "@/features/auth/types/authTypes";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
