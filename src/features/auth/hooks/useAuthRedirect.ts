// src/features/auth/hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { PATHS, isAppPath, type AppPath, type PublicPath } from '@/routes/path';
import { useSupabase } from '@/hooks/useSupabase';

export const useAuthRedirect = () => {
  const { session, isLoading } = useAuth();
  const supabase = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('--- useAuthRedirect useEffect evaluation ---');
    console.log('isLoading:', isLoading);
    console.log('Current Path:', location.pathname);
    console.log('Session exists:', !!session);
    if (session) {
      console.log('Session User ID (from useAuth):', session.user?.id);
      console.log('has_completed_persona_quiz (from session.user_metadata):', session.user?.user_metadata?.has_completed_persona_quiz);
    }
    console.log('-------------------------------------------');


    if (isLoading) {
      console.log('useAuthRedirect: Still loading, returning.');
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('useAuthRedirect: onAuthStateChange event:', event, 'Session (from listener):', currentSession);
      if (event === 'SIGNED_IN') navigate(PATHS.DASHBOARD, { replace: true });
      if (event === 'SIGNED_OUT') navigate(PATHS.LOGIN, { replace: true }); 
    });

    const currentPath = location.pathname;

    if (!isAppPath(currentPath)) {
      console.error(`useAuthRedirect: Rota inválida: ${currentPath}`);
      navigate(PATHS.HOME, { replace: true });
      return;
    }

    const isSignedIn = !!session;

    if (isSignedIn) {
      const hasCompletedQuiz = session.user?.user_metadata?.has_completed_persona_quiz ?? false;
      console.log('useAuthRedirect: User is signed in. hasCompletedQuiz:', hasCompletedQuiz);

      if (hasCompletedQuiz && currentPath !== PATHS.DASHBOARD) {
        console.log('useAuthRedirect: Quiz completo e não no dashboard. Redirecionando para DASHBOARD.');
        navigate(PATHS.DASHBOARD as AppPath, { replace: true });
      } else if (!hasCompletedQuiz && currentPath !== PATHS.ONBOARDING) {
        console.log('useAuthRedirect: Quiz NÃO completo e não no onboarding. Redirecionando para ONBOARDING.');
        navigate(PATHS.ONBOARDING as AppPath, { replace: true });
      } else {
        console.log('useAuthRedirect: Usuário está na rota correta ou já no processo de redirecionamento.');
      }
    } else {
      console.log('useAuthRedirect: User is NOT signed in.');
      const publicPaths: PublicPath[] = [PATHS.HOME, PATHS.LOGIN, PATHS.REGISTER];
      if (!publicPaths.includes(currentPath as PublicPath)) {
        console.log('useAuthRedirect: Não logado e não em rota pública. Redirecionando para LOGIN.');
        navigate(PATHS.LOGIN as PublicPath, { replace: true });
      } else {
        console.log('useAuthRedirect: Não logado e em rota pública. Permanece.');
      }
    }

    return () => {
      console.log('useAuthRedirect: Unsubscribing from onAuthStateChange.');
      subscription.unsubscribe();
    };
  }, [session, isLoading, navigate, supabase, location.pathname]);
};