// src/app/providers.tsx
"use client";

import { ThemeProvider } from "@/features/theme/context/ThemeProvider";
import { AuthProvider } from "@/features/auth/provider/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
