import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useSupabase
 } from '@/hooks/useSupabase';

type Profile = {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  current_focus_time: number;
  has_completed_persona_quiz: boolean;
  created_at: string;
  updated_at: string;
};

export const useProfileManagement = () => {
  const { session, isLoading } = useAuth();
  const supabase = useSupabase();

  useEffect(() => {
    const initializeUserProfile = async () => {
      if (isLoading || !session?.user) return;

      const user = session.user;
      
      try {
        // Verifica se o perfil já existe
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!existingProfile) {
          console.log(`Profile not found for user ${user.id}. Creating...`);
          
          const newProfileData: Omit<Profile, 'created_at' | 'updated_at'> = {
            id: user.id,
            email: user.email || `user_${user.id}@example.com`,
            username: user.user_metadata?.full_name || `user_${user.id}`,
            avatar_url: user.user_metadata?.avatar_url || null,
            xp: 0,
            current_focus_time: 0,
            has_completed_persona_quiz: false
          };

          const { error: insertError } = await supabase
            .from('profiles')
            .insert(newProfileData);

          if (insertError) throw insertError;
        }
      } catch (error) {
        console.error('Profile Management Error:', error);
      }
    };

    initializeUserProfile();
  }, [session, isLoading, supabase]);
};