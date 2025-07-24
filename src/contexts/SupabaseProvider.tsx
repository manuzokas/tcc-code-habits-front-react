import React, { type ReactNode } from "react";
import {
  SupabaseContext,
  type SupabaseContextType,
} from "@/contexts/SupabaseContext";

import { supabase } from "@/api/supabase";

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const contextValue: SupabaseContextType = {
    supabase,
  };

  return (
    <SupabaseContext.Provider value={contextValue}>
      {children}
    </SupabaseContext.Provider>
  );
};
