import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "@/app/routes/path";
import { Home } from "@/pages/home";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { Providers } from "../providers";
import { RootLayout } from "@/app/components/Layout";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { OnboardingPage } from "@/pages/dashboard/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        <RootLayout />
      </Providers>
    ),
    children: [
      {
        path: PATHS.HOME,
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
        path: PATHS.ONBOARDING,
        element: <OnboardingPage />,
      },
      {
        path: PATHS.DASHBOARD,
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);
