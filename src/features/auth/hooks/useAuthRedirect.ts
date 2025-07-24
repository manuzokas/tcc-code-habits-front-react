import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth'; 
import { PATHS } from '@/routes/path';

export const useAuthRedirect = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoading && user) {
      if (user.hasCompletedPersonaQuiz) {
        navigate(PATHS.DASHBOARD);
      } else {
        navigate(PATHS.ONBOARDING);
      }
    }
    // considerar também redirecionar para login/home se o user sair (isSignedIn se tornar false)
    // isso pode ser uma lógica separada ou integrada aqui, dependendo do fluxo.
    // ex: if (!isLoading && !user && window.location.pathname !== PATHS.LOGIN) { navigate(PATHS.HOME); }
  }, [user, isLoading, navigate]);
};