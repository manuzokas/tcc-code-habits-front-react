import type { IconName } from "../../../shared/components/atoms/Icon";
import type { COLORS } from "../constants/missions";

export type MissionColor = keyof typeof COLORS;

export type Mission = {
  name: string;
  description: string;
  icon: IconName;
  current: number;
  total: number;
  xp: number;
  color: MissionColor;
  increment: number;
  incrementUnit: string;
};

export type Missions = {
  water: Mission;
  stretch: Mission;
  eyeRest: Mission;
};

export type MissionKeyType = keyof Missions;

export type MissionColors = typeof COLORS;