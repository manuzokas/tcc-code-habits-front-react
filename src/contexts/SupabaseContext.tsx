import { createContext } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/api/supabase";

export type SupabaseContextType = SupabaseClient;

export const SupabaseContext = createContext<SupabaseContextType>(supabase);
