import type { IconName } from "../../../shared/components/atoms/Icon";
import type { COLORS } from "../constants/missions";

export type MissionColor = keyof typeof COLORS;
export type MissionKeyType = "water" | "stretch" | "eyeRest";

// type para o template de missao (meus dados estaticos)
export type MissionTemplate = {
  name: string;
  description: string;
  icon: IconName;
  total: number;
  xp: number;
  color: MissionColor;
  increment: number;
  incrementUnit: string;
};

// type para os dados de progresso do usuário no DB
export type UserMissionProgress = {
  id: string;
  user_id: string;
  mission_key: MissionKeyType;
  current_progress: number;
  is_completed: boolean;
  last_updated_at: string;
  completed_at: string | null;
};

export type Mission = MissionTemplate & {
  key: MissionKeyType;
  current: number;
  isCompleted: boolean;
};

export type Missions = {
  [key in MissionKeyType]: Mission;
};