// src/contexts/SupabaseContext.ts
import { createContext } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/api/supabase";

// Define o tipo do contexto
export type SupabaseContextType = SupabaseClient;

// Cria o contexto com valor padrão
export const SupabaseContext = createContext<SupabaseContextType>(supabase);
