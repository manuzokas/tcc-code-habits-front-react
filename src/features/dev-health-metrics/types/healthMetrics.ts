// shared/types/healthMetrics.ts

import type { IconName } from "@/shared/types/iconTypes";

export type HealthMetricColor = "green" | "blue" | "cyan" | "purple" | "indigo" | "amber";

export interface HealthMetricDisplay {
  id: string;
  name: string;
  value: string;
  detail: string;
  icon: IconName;
  color: HealthMetricColor;
  tip: string;
  lastUpdated: string;
  metricType: string;
}

export type HealthMetricUpdate = {
  type: string;
  value: string;
  context?: string;
};