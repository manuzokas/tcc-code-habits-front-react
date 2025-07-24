import type { IconName } from "@/shared/types/iconTypes";

export const healthTips = [
    {
        title: "Postura Ergonômica",
        description: "Ajuste sua cadeira para manter os pés apoiados e coluna reta",
        icon: "Accessibility" as IconName,
        category: "Postura",
        recommendedFor: ["chronic", "anxious"],
    },
    {
        title: "Regra 20-20-20",
        description: "A cada 20 minutos, olhe para algo a 20 pés (6m) por 20 segundos",
        icon: "Eye" as IconName,
        category: "Visão",
        recommendedFor: ["chronic", "anxious"],
    },
    {
        title: "Hidratação Constante",
        description: "Mantenha uma garrafa de água visível e tome pequenos goles frequentemente",
        icon: "Droplet" as IconName,
        category: "Hidratação",
        recommendedFor: ["chronic", "anxious"],
    },
    {
        title: "Micro Pausas",
        description: "Faça pausas de 2-5 minutos a cada 30-60 minutos de codificação",
        icon: "Coffee" as IconName,
        category: "Produtividade",
        recommendedFor: ["chronic", "anxious"],
    },
];