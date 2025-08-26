import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "@/routes/path";
import { Home } from "@/pages/home/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { RootLayout } from "@/layouts/Layout";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import { HubPage } from "@/pages/hub/HubPage";
import { OnboardingPage } from "@/features/onboarding/pages/OnboardingPage";
import { MetricsPage } from "@/pages/metrics/MetricsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // rootLayout é o layout principal
    children: [
      // rotas PUBLICAS (nao exigem autenticacao)
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: PATHS.SPOTIFY_CALLBACK,
        element: <HubPage />,
      },
      // --- rotas PROTEGIDAS (exigem autenticacao) ---
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHS.ONBOARDING,
            element: <OnboardingPage />,
          },
          {
            path: PATHS.DASHBOARD,
            element: <HubPage />,
          },
          {
            path: PATHS.METRICS,
            element: <MetricsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <div>404 - Página Não Encontrada</div>,
      },
    ],
  },
]);
