// src/contexts/SupabaseContext.ts
import { createContext } from "react";
import { supabase } from "@/api/supabase";

// tipagem para o valor do contexto
export interface SupabaseContextType {
  supabase: typeof supabase;
}

export const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);
