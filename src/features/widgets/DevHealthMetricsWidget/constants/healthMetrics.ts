import type { IconName } from "@/shared/types/iconTypes";
import type { MetricColor } from "../types/healthMetrics";

export const METRIC_CONFIG: Record<
  string,
  {
    name: string;
    icon: IconName;
    color: MetricColor;
    tip: string;
    detail: string;
  }
> = {
  hydration: {
    name: "Hidratação",
    icon: "Droplet",
    color: "blue",
    tip: "1 copo de água por hora",
    detail: "Próximo lembrete: 30min",
  },
  posture: {
    name: "Postura",
    icon: "Accessibility",
    color: "green",
    tip: "Alongue-se a cada 30 minutos",
    detail: "Última pausa: Nunca",
  },
  eye_health: {
    name: "Saúde Visual",
    icon: "Eye",
    color: "cyan",
    tip: "Regra 20-20-20 (20s a cada 20min)",
    detail: "Última pausa: Nunca",
  },
  stress: {
    name: "Estresse",
    icon: "Brain",
    color: "purple",
    tip: "Respire fundo por 1 minuto",
    detail: "Última pausa: Nenhuma",
  },
  sleep: {
    name: "Sono",
    icon: "Moon",
    color: "indigo",
    tip: "8 horas de sono ideal",
    detail: "Qualidade do descanso",
  },
  activity: {
    name: "Movimento",
    icon: "StretchHorizontal",
    color: "amber",
    tip: "Levante-se a cada hora",
    detail: "Tempo ativo hoje",
  },
};

export const DEFAULT_COLOR: MetricColor = "green";
export const DEFAULT_ICON: IconName = "Activity";

export const METRIC_COLOR_CLASSES: Record<
  MetricColor,
  { border: string; bg: string; iconBg: string; text: string }
> = {
  green: {
    border: "border-green-500/20",
    bg: "bg-green-900/10",
    iconBg: "bg-green-900/30",
    text: "text-green-400",
  },
  blue: {
    border: "border-blue-500/20",
    bg: "bg-blue-900/10",
    iconBg: "bg-blue-900/30",
    text: "text-blue-400",
  },
  cyan: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-900/10",
    iconBg: "bg-cyan-900/30",
    text: "text-cyan-400",
  },
  purple: {
    border: "border-purple-500/20",
    bg: "bg-purple-900/10",
    iconBg: "bg-purple-900/30",
    text: "text-purple-400",
  },
  indigo: {
    border: "border-indigo-500/20",
    bg: "bg-indigo-900/10",
    iconBg: "bg-indigo-900/30",
    text: "text-indigo-400",
  },
  amber: {
    border: "border-amber-500/20",
    bg: "bg-amber-900/10",
    iconBg: "bg-amber-900/30",
    text: "text-amber-400",
  },
};
