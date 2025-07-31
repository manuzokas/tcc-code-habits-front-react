// src/contexts/SupabaseProvider.tsx
import React from "react";
import { SupabaseContext } from "./SupabaseContext";
import { supabase } from "@/api/supabase";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
