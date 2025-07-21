import type { PersonaType } from '@/shared/types/personas';

export const personas: PersonaType[] = [
  {
    id: 'chronic',
    name: "O Crônico",
    description: "Vive no código, esquece do corpo",
    traits: ["12+ horas/dia", "Dores posturais", "Baixa hidratação", "Esquece refeições", "Sono irregular"],
    color: "from-red-500 to-rose-600",
    recommendations: {
      hydration: [
        "Defina alarmes a cada hora para beber água",
        "Tenha uma garrafa de 2L visível na mesa",
        "Aplicativos de hidratação como Water Drink Reminder"
      ],
      breaks: [
        "Pausas de 5 minutos a cada 25 minutos (Técnica Pomodoro)",
        "Levante e caminhe durante as pausas",
        "Alongamento rápido a cada 1 hora de código"
      ],
      exercise: [
        "Alongamentos para punhos e coluna a cada 2h",
        "Yoga para programadores (15min/dia)",
        "Exercícios posturais simples na cadeira"
      ],
      nutrition: [
        "Refeições regulares mesmo durante sprints",
        "Lanches saudáveis (nozes, frutas) na mesa",
        "Meal prep no fim de semana"
      ],
      sleep: [
        "Horário fixo para dormir (mesmo nos fins de semana)",
        "Desligar telas 1h antes de dormir",
        "Técnicas de relaxamento noturno"
      ],
      mental: [
        "Limite de horas de trabalho diárias",
        "Fim de semana sem código",
        "Terapia para equilíbrio emocional"
      ]
    }
  },
  {
    id: 'anxious',
    name: "O Ansioso",
    description: "Pressão = Burnout em progresso",
    traits: ["Multitarefa excessiva", "Dificuldade em desligar", "Sono irregular", "Auto-cobrança excessiva", "Síndrome do impostor"],
    color: "from-amber-500 to-yellow-600",
    recommendations: {
      hydration: [
        "Bebidas calmantes como chás",
        "Garrafa térmica para manter temperatura ideal",
        "Evitar excesso de café/energéticos"
      ],
      breaks: [
        "Técnica 20-20-20 (olhos, postura, mente)",
        "Meditação rápida (5min) entre tarefas",
        "Pausas conscientes longe das telas"
      ],
      exercise: [
        "Atividades aeróbicas para aliviar estresse",
        "Yoga ou pilates para ansiedade",
        "Caminhadas ao ar livre"
      ],
      nutrition: [
        "Alimentos ricos em magnésio (contra ansiedade)",
        "Refeições sem telas (mindful eating)",
        "Evitar junk food em momentos de estresse"
      ],
      sleep: [
        "Rotina noturna relaxante (banho quente, leitura)",
        "Apps de sono como Calm ou Headspace",
        "Journaling antes de dormir"
      ],
      mental: [
        "Terapia cognitivo-comportamental",
        "Limites claros de horário de trabalho",
        "Técnicas de gestão de ansiedade (4-7-8 breathing)"
      ]
    }
  },
  {
    id: 'disorganized',
    name: "O Desorganizado",
    description: "Sem rotina, caos no workflow",
    traits: ["Pausas irregulares", "Má gestão de tempo", "Alimentação desregrada", "Ambiente de trabalho bagunçado", "Procrastinação"],
    color: "from-blue-500 to-indigo-600",
    recommendations: {
      hydration: [
        "Meta diária de água (ex: 2L)",
        "Garrafa com marcador de tempo",
        "App de acompanhamento (ex: WaterMinder)"
      ],
      breaks: [
        "Agendar pausas no calendário",
        "Técnica Pomodoro com timer físico",
        "Micro-pausas a cada conclusão de tarefa"
      ],
      exercise: [
        "Rotina matinal de 10min de exercício",
        "Alongamentos vinculados a hábitos existentes",
        "Caminhada pós-almoço fixa"
      ],
      nutrition: [
        "Refeições em horários fixos",
        "Planejamento semanal de refeições",
        "Lanches pré-porcionados"
      ],
      sleep: [
        "Alarme para hora de dormir",
        "Ritual noturno consistente",
        "Evitar telas 30min antes de dormir"
      ],
      mental: [
        "Método Getting Things Done (GTD)",
        "Ferramentas de organização (Notion, Trello)",
        "Time blocking no calendário"
      ]
    }
  },
  {
    id: 'conscious',
    name: "O Consciente",
    description: "Equilíbrio em construção",
    traits: ["Pausas regulares", "Alongamentos", "Hidratação ok", "Rotina de sono", "Autoconhecimento"],
    color: "from-emerald-500 to-teal-600",
    recommendations: {
      hydration: [
        "Experimentar águas saborizadas naturais",
        "Monitorar consumo em diferentes períodos",
        "Incluir chás funcionais"
      ],
      breaks: [
        "Experimentar novas técnicas de produtividade",
        "Pausas criativas (desenho, música)",
        "Caminhadas mindful"
      ],
      exercise: [
        "Variar atividades físicas regularmente",
        "Exercícios específicos para programadores",
        "Alongamentos avançados"
      ],
      nutrition: [
        "Dieta balanceada com macros controlados",
        "Superalimentos para cognição",
        "Jejum intermitente supervisionado"
      ],
      sleep: [
        "Otimizar ciclo circadiano",
        "Experimentar técnicas avançadas de sono",
        "Monitorar qualidade do sono (wearables)"
      ],
      mental: [
        "Desafios de crescimento pessoal",
        "Meditação avançada",
        "Workshops de inteligência emocional"
      ]
    }
  }
];