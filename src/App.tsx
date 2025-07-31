import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { ThemeProvider } from "@/shared/contexts/theme/ThemeProvider";
import { Suspense } from "react";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Suspense fallback={<div>Carregando...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}
