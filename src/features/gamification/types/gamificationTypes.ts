
export interface UserProfileGamification {
  xp: number;
  level: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string | null; 
  xp_reward: number;
  type: string; 
  related_metric_type: string | null; 
  target_value: number | null; 
  is_active: boolean;
  created_at: string;
  is_repeatable?: boolean;
}

export interface UserMission {
  id: string;
  user_id: string;
  mission_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  current_progress: number;
  completed_at: string | null;
  last_updated_at: string;
  mission: Mission;
}

export interface Achievement {
  id: string;
  name: string;
  description: string | null; 
  image_url: string | null; 
  xp_bonus: number; 
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievements: Achievement;
}