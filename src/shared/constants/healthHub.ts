type IconName = "HeartPulse" | "Brain" | "Droplet" | "Trophy" | "Activity" | 
                "Eye" | "Accessibility" | "Lightbulb" | "StretchHorizontal" | 
                "EyeOff" | "Coffee" | "Moon" | "LayoutGrid";

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
  
  export const healthTips = [
    {
      title: "Postura Ergonômica",
      description: "Ajuste sua cadeira para manter os pés apoiados e coluna reta",
      icon: "Accessibility",
      category: "Postura",
      recommendedFor: ["chronic", "anxious"],
    },
    {
      title: "Regra 20-20-20",
      description: "A cada 20 minutos, olhe para algo a 20 pés (6m) por 20 segundos",
      icon: "Eye",
      category: "Visão",
      recommendedFor: ["chronic", "anxious"],
    },
    {
      title: "Hidratação Constante",
      description: "Mantenha uma garrafa de água visível e tome pequenos goles frequentemente",
      icon: "Droplet",
      category: "Hidratação",
      recommendedFor: ["chronic", "anxious"],
    },
    {
      title: "Micro Pausas",
      description: "Faça pausas de 2-5 minutos a cada 30-60 minutos de codificação",
      icon: "Coffee",
      category: "Produtividade",
      recommendedFor: ["chronic", "anxious"],
    },
  ];
  
  export const healthAchievements = [
    {
      title: "Hidratação PRO",
      progress: 85,
      icon: "Droplet",
      bg: "bg-gradient-to-br from-cyan-900/30 to-blue-900/30",
      border: "border-cyan-500/20",
      completed: true,
    },
    {
      title: "Postura Perfeita",
      progress: 65,
      icon: "Accessibility",
      bg: "bg-gradient-to-br from-green-900/30 to-emerald-900/30",
      border: "border-green-500/20",
      completed: false,
    },
    {
      title: "Visão de Águia",
      progress: 45,
      icon: "Eye",
      bg: "bg-gradient-to-br from-blue-900/30 to-indigo-900/30",
      border: "border-blue-500/20",
      completed: false,
    },
    {
      title: "Mente Zen",
      progress: 30,
      icon: "Brain",
      bg: "bg-gradient-to-br from-purple-900/30 to-violet-900/30",
      border: "border-purple-500/20",
      completed: false,
    },
  ];
  
  export const backgroundEffects = [
    {
      position: "top-1/4 left-1/4",
      size: "w-64 h-64",
      color: "bg-green-500/10",
      animation: "animate-float"
    },
    {
      position: "bottom-1/3 right-1/3",
      size: "w-72 h-72",
      color: "bg-blue-500/10",
      animation: "animate-float-delay"
    }
  ];