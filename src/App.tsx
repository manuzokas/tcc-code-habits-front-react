// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { ThemeProvider } from "@/shared/contexts/theme/ThemeProvider";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crie uma única instância do QueryClient fora do componente para que ela não seja recriada em cada renderização
const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Suspense fallback={<div>Carregando...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
