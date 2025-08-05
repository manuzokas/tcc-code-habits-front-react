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
  },
  breathBreak: {
    name: "Respiração",
    description: "Fazer 1 pausa para respirar fundo",
    icon: "Wind",
    current: 0,
    total: 1,
    xp: 10,
    color: "purple" as const,
    increment: 1,
    incrementUnit: "vez"
  },
  sleep: {
    name: "Sono",
    description: "Dormir 8 horas",
    icon: "Moon",
    current: 0,
    total: 1,
    xp: 30,
    color: "indigo" as const,
    increment: 1,
    incrementUnit: "hora"
  },
  walk: {
    name: "Caminhada",
    description: "Andar por 5 minutos",
    icon: "Footprints",
    current: 0,
    total: 1,
    xp: 15,
    color: "green" as const,
    increment: 1,
    incrementUnit: "minuto"
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
  },
  purple: {
    bg: "bg-purple-500/10",
    hoverBg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/20",
    hoverBorder: "border-purple-400/40",
    full: "bg-purple-600/80",
    hoverFull: "bg-purple-500/90",
    bgDark: "bg-purple-900/40"
  },
  indigo: {
    bg: "bg-indigo-500/10",
    hoverBg: "bg-indigo-500/20",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    hoverBorder: "border-indigo-400/40",
    full: "bg-indigo-600/80",
    hoverFull: "bg-indigo-500/90",
    bgDark: "bg-indigo-900/40"
  },
  green: {
    bg: "bg-green-500/10",
    hoverBg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/20",
    hoverBorder: "border-green-400/40",
    full: "bg-green-600/80",
    hoverFull: "bg-green-500/90",
    bgDark: "bg-green-900/40"
  }
} as const;