// src/hooks/useSupabase.ts
import { useContext } from 'react';
import { SupabaseContext } from '@/contexts/SupabaseContext';

// Hook customizado para consumir o contexto do Supabase
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    // Lança um erro se o hook for usado fora do provedor
    throw new Error('useSupabase deve ser usado dentro de um SupabaseProvider');
  }
  return context;
};