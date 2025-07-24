import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PATHS } from "@/routes/path";

export const ProtectedRoute = ({
  requireOnboarding = true,
}: {
  requireOnboarding?: boolean;
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  if (requireOnboarding && !user.hasCompletedPersonaQuiz) {
    return <Navigate to={PATHS.ONBOARDING} />;
  }

  return <Outlet />;
};
