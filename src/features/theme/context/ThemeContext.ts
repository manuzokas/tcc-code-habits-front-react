// src/features/theme/context/ThemeContext.ts
import { createContext } from "react";

// Adicione 'export' antes do tipo
export type Theme = "light" | "dark"; // <-- Esta é a linha crucial que faltava

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);