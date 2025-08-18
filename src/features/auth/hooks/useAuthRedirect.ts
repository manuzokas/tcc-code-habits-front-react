import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { PATHS, isPublicPath } from "@/routes/path";

export const useAuthRedirect = () => {
  const { session, hasCompletedPersonaQuiz, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const currentPath = location.pathname;
    const isSignedIn = !!session;

    if (isSignedIn) {
      if (currentPath === PATHS.LOGIN || currentPath === PATHS.REGISTER) {
        if (hasCompletedPersonaQuiz) {
          navigate(PATHS.DASHBOARD, { replace: true });
        } else {
          navigate(PATHS.ONBOARDING, { replace: true });
        }
        return;
      }

      if (!hasCompletedPersonaQuiz && currentPath !== PATHS.ONBOARDING) {
        navigate(PATHS.ONBOARDING, { replace: true });
        return;
      }

      if (hasCompletedPersonaQuiz && currentPath === PATHS.ONBOARDING) {
        navigate(PATHS.DASHBOARD, { replace: true });
        return;
      }
    } else {
      if (!isPublicPath(currentPath)) {
        navigate(PATHS.LOGIN, { replace: true });
      }
    }
  }, [isLoaded, session, hasCompletedPersonaQuiz, navigate, location.pathname]);
};
