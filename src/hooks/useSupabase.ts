import { useContext } from "react";
import { SupabaseContext } from "@/contexts/SupabaseContext";

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  
  if (context === undefined) {
    throw new Error("useSupabase deve ser usado dentro de um SupabaseProvider");
  }
  
  return context;
};