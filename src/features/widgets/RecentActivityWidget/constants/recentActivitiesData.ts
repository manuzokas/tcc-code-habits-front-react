import type { IconName } from "@/shared/types/iconTypes";

export const recentActivities = [
    {
        action: "Pausa para hidratação",
        xp: "+30XP",
        time: "15min atrás",
        completed: true,
        icon: "Droplet" as IconName,
        healthImpact: "Hidratação +5%",
    },
    {
        action: "Alongamento pós-commit",
        xp: "+50XP",
        time: "1h atrás",
        completed: true,
        icon: "StretchHorizontal" as IconName,
        healthImpact: "Postura melhorada",
    },
    {
        action: "Exercício para os olhos",
        xp: "+40XP",
        time: "2h atrás",
        completed: true,
        icon: "EyeOff" as IconName,
        healthImpact: "Visão descansada",
    },
    {
        action: "Meditação pós-standup",
        xp: "+80XP",
        time: "Ontem",
        completed: false,
        icon: "Brain" as IconName,
        healthImpact: "Estresse reduzido",
    },
];