import type { IconName } from "@/shared/types/iconTypes";

export const demoData = {
    postureQuality: "Boa",
    postureTime: "2h30m",
    eyeStrain: "Moderado",
    lastEyeBreak: "15min",
    waterIntake: "1.2L",
    waterReminder: "30min",
    stressLevel: "Controlado",
    lastBreak: "Pausa recente",
    focusTime: "2h 45m",
    energyLevel: "Médio",
    sleepQuality: "7.2h (82%)",
    movementTime: "45min",
    hydrationLevel: "68%",
    mentalFatigue: "Leve",
};

export const healthMetrics = [
    {
        name: "Postura",
        value: demoData.postureQuality,
        detail: demoData.postureTime,
        icon: "Accessibility" as IconName,
        color: "green",
        tip: "Alongue-se a cada 30 minutos",
    },
    {
        name: "Saúde Visual",
        value: demoData.eyeStrain,
        detail: `Última pausa: ${demoData.lastEyeBreak}`,
        icon: "Eye" as IconName,
        color: "blue",
        tip: "Regra 20-20-20 (20s a cada 20min)",
    },
    {
        name: "Hidratação",
        value: demoData.waterIntake,
        detail: `Próximo lembrete: ${demoData.waterReminder}`,
        icon: "Droplet" as IconName,
        color: "cyan",
        tip: "1 copo de água por hora",
    },
    {
        name: "Estresse",
        value: demoData.stressLevel,
        detail: demoData.lastBreak,
        icon: "Brain" as IconName,
        color: "purple",
        tip: "Respire fundo por 1 minuto",
    },
    {
        name: "Sono",
        value: demoData.sleepQuality,
        detail: "Qualidade do descanso",
        icon: "Moon" as IconName,
        color: "indigo",
        tip: "8 horas de sono ideal",
    },
    {
        name: "Movimento",
        value: demoData.movementTime,
        detail: "Tempo ativo hoje",
        icon: "StretchHorizontal" as IconName,
        color: "amber",
        tip: "Levante-se a cada hora",
    },
];