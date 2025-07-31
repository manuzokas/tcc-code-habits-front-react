import { useAuth } from "@/features/auth/hooks/useAuth"; 

const XP_PER_LEVEL = 1000; 

export const useGamification = () => {
  const { profile, isLoadingProfile } = useAuth();

  const userXp = profile?.xp ?? 0;

  const userLevel = Math.floor(userXp / XP_PER_LEVEL) + 1;

  const xpCurrentLevel = userXp % XP_PER_LEVEL;

  const xpProgressPercentage = (xpCurrentLevel / XP_PER_LEVEL) * 100;

  const xpToNextLevel = XP_PER_LEVEL - xpCurrentLevel;

  return {
    userXp,
    userLevel,
    xpCurrentLevel,
    xpProgressPercentage,
    xpToNextLevel,
    isLoadingGamification: isLoadingProfile,
  };
};