import type { IconName } from "@/shared/types/iconTypes";

export type MetricColor =
  | "green"
  | "blue"
  | "cyan"
  | "purple"
  | "indigo"
  | "amber";

export interface HealthMetric {
  id: string;
  type: string;
  value: string;
  context: string | null;
  lastUpdated: string;
}

export interface HealthMetricCardData {
  id: string;
  type: string;
  name: string;
  value: string;
  detail: string;
  icon: IconName;
  color: MetricColor;
  tip: string;
  lastUpdated: string;
}
