import { Navigate, Outlet, useLocation } from "react-router-dom"; 
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PATHS } from "@/routes/path";

export const ProtectedRoute = () => {
  const { isLoaded, isSignedIn, hasCompletedPersonaQuiz } = useAuth();
  const location = useLocation(); 

  if (!isLoaded) {
    return <div>Carregando autenticação da rota protegida...</div>;
  }

  // se nao estiver autenticado, sempre redirecione para o login
  if (!isSignedIn) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  if (!hasCompletedPersonaQuiz && location.pathname !== PATHS.ONBOARDING) {
    return <Navigate to={PATHS.ONBOARDING} replace />;
  }

  if (hasCompletedPersonaQuiz && location.pathname === PATHS.ONBOARDING) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
};
