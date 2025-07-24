// src/features/gamification/constants/achievementsData.ts

// Importe IconName de shared/types
import type { IconName } from "@/shared/types/iconTypes";

export const healthAchievements = [
    {
        title: "Hidratação PRO",
        progress: 85,
        icon: "Droplet" as IconName,
        bg: "bg-gradient-to-br from-cyan-900/30 to-blue-900/30",
        border: "border-cyan-500/20",
        completed: true,
    },
    {
        title: "Postura Perfeita",
        progress: 65,
        icon: "Accessibility" as IconName,
        bg: "bg-gradient-to-br from-green-900/30 to-emerald-900/30",
        border: "border-green-500/20",
        completed: false,
    },
    {
        title: "Visão de Águia",
        progress: 45,
        icon: "Eye" as IconName,
        bg: "bg-gradient-to-br from-blue-900/30 to-indigo-900/30",
        border: "border-blue-500/20",
        completed: false,
    },
    {
        title: "Mente Zen",
        progress: 30,
        icon: "Brain" as IconName,
        bg: "bg-gradient-to-br from-purple-900/30 to-violet-900/30",
        border: "border-purple-500/20",
        completed: false,
    },
];