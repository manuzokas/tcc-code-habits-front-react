export const MISSIONS = {
    water: {
      name: "Hidratação",
      description: "Beber 2L de água (500ml por copo)",
      icon: "Droplet",
      current: 2,
      total: 4,
      xp: 20,
      color: "emerald" as const,
      increment: 1,
      incrementUnit: "copo"
    },
    stretch: {
      name: "Alongamento",
      description: "Fazer 3 pausas para alongar",
      icon: "Move",
      current: 1,
      total: 3,
      xp: 15,
      color: "amber" as const,
      increment: 1,
      incrementUnit: "pausa"
    },
    eyeRest: {
      name: "20-20-20",
      description: "Descanso visual (20 segundos)",
      icon: "Eye",
      current: 0,
      total: 1,
      xp: 10,
      color: "blue" as const,
      increment: 1,
      incrementUnit: "vez"
    }
  } as const;
  
  export const COLORS = {
    emerald: {
      bg: "bg-emerald-500/10",
      hoverBg: "bg-emerald-500/20",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      hoverBorder: "border-emerald-400/40",
      full: "bg-emerald-600/80",
      hoverFull: "bg-emerald-500/90",
      bgDark: "bg-emerald-900/40"
    },
    amber: {
      bg: "bg-amber-500/10",
      hoverBg: "bg-amber-500/20",
      text: "text-amber-400",
      border: "border-amber-500/20",
      hoverBorder: "border-amber-400/40",
      full: "bg-amber-600/80",
      hoverFull: "bg-amber-500/90",
      bgDark: "bg-amber-900/40"
    },
    blue: {
      bg: "bg-blue-500/10",
      hoverBg: "bg-blue-500/20",
      text: "text-blue-400",
      border: "border-blue-500/20",
      hoverBorder: "border-blue-400/40",
      full: "bg-blue-600/80",
      hoverFull: "bg-blue-500/90",
      bgDark: "bg-blue-900/40"
    }
  } as const;