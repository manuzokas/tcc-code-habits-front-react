import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "@/routes/path";
import { Home } from "@/pages/home/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { RootLayout } from "@/layouts/Layout";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { OnboardingPage } from "@/features/onboarding/pages/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <RootLayout />
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
