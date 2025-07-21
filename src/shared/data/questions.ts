import type { QuestionType } from '@/shared/types/personas';

export const questions: QuestionType[] = [
  {
    id: 'work_hours',
    text: "Quantas horas você normalmente trabalha/coda por dia?",
    options: [
      {
        value: 'less_than_8',
        text: "Menos de 8 horas",
        personaWeights: { conscious: 3, disorganized: 1, anxious: 0, chronic: 0 }
      },
      {
        value: '8_to_10',
        text: "8-10 horas",
        personaWeights: { conscious: 2, disorganized: 1, anxious: 1, chronic: 0 }
      },
      {
        value: '10_to_12',
        text: "10-12 horas",
        personaWeights: { conscious: 0, disorganized: 2, anxious: 2, chronic: 1 }
      },
      {
        value: 'more_than_12',
        text: "Mais de 12 horas",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 1, chronic: 3 }
      }
    ]
  },
  {
    id: 'breaks_frequency',
    text: "Com que frequência você faz pausas durante o trabalho?",
    options: [
      {
        value: 'every_25_min',
        text: "A cada 25-30 minutos (Técnica Pomodoro)",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 1, chronic: 0 }
      },
      {
        value: 'every_hour',
        text: "A cada 1 hora",
        personaWeights: { conscious: 2, disorganized: 1, anxious: 1, chronic: 0 }
      },
      {
        value: 'irregular',
        text: "De forma irregular, quando lembro",
        personaWeights: { conscious: 0, disorganized: 3, anxious: 1, chronic: 1 }
      },
      {
        value: 'rarely',
        text: "Raramente, só quando necessário",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 2, chronic: 3 }
      }
    ]
  },
  {
    id: 'hydration',
    text: "Como é seu consumo de água durante o trabalho?",
    options: [
      {
        value: 'measured',
        text: "Tenho uma garrafa e bebo conscientemente",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 1, chronic: 0 }
      },
      {
        value: 'when_thirsty',
        text: "Bebo quando sinto sede",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'forget',
        text: "Muitas vezes esqueço de beber água",
        personaWeights: { conscious: 0, disorganized: 3, anxious: 1, chronic: 2 }
      },
      {
        value: 'only_coffee',
        text: "Basicamente só tomo café/energéticos",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 3, chronic: 3 }
      }
    ]
  },
  {
    id: 'posture',
    text: "Como você descreve sua postura ao trabalhar?",
    options: [
      {
        value: 'ergonomic',
        text: "Cuidadosa, com mobiliário ergonômico",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 1, chronic: 0 }
      },
      {
        value: 'regular',
        text: "Normal, mas não perfeita",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'poor',
        text: "Péssima, muitas dores posturais",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 2, chronic: 3 }
      },
      {
        value: 'varies',
        text: "Varia muito, trabalho em vários lugares",
        personaWeights: { conscious: 1, disorganized: 3, anxious: 1, chronic: 1 }
      }
    ]
  },
  {
    id: 'sleep_quality',
    text: "Como você avalia a qualidade do seu sono?",
    options: [
      {
        value: 'excellent',
        text: "Excelente, durmo bem e acordo descansado",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 0, chronic: 0 }
      },
      {
        value: 'regular',
        text: "Regular, mas poderia ser melhor",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'poor',
        text: "Ruim, tenho insônia ou sono agitado",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 3, chronic: 2 }
      },
      {
        value: 'irregular',
        text: "Muito irregular, sem horários fixos",
        personaWeights: { conscious: 0, disorganized: 3, anxious: 2, chronic: 1 }
      }
    ]
  },
  {
    id: 'exercise',
    text: "Com que frequência você pratica exercícios físicos?",
    options: [
      {
        value: 'regular',
        text: "Regularmente (3+ vezes por semana)",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 1, chronic: 0 }
      },
      {
        value: 'sometimes',
        text: "Ocasionalmente (1-2 vezes por semana)",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'rarely',
        text: "Raramente",
        personaWeights: { conscious: 0, disorganized: 2, anxious: 1, chronic: 2 }
      },
      {
        value: 'never',
        text: "Quase nunca",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 2, chronic: 3 }
      }
    ]
  },
  {
    id: 'stress_level',
    text: "Como você descreve seu nível de estresse no trabalho?",
    options: [
      {
        value: 'low',
        text: "Baixo, consigo gerenciar bem",
        personaWeights: { conscious: 3, disorganized: 1, anxious: 0, chronic: 0 }
      },
      {
        value: 'moderate',
        text: "Moderado, mas sob controle",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'high',
        text: "Alto, frequentemente sobrecarregado",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 3, chronic: 2 }
      },
      {
        value: 'extreme',
        text: "Extremo, muitas vezes à beira do burnout",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 3, chronic: 3 }
      }
    ]
  },
  {
    id: 'meals',
    text: "Como são suas refeições durante o trabalho?",
    options: [
      {
        value: 'planned',
        text: "Planejadas e balanceadas",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 0, chronic: 0 }
      },
      {
        value: 'regular',
        text: "Em horários regulares, mas não perfeitas",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'skipping',
        text: "Muitas vezes pulo refeições",
        personaWeights: { conscious: 0, disorganized: 2, anxious: 2, chronic: 2 }
      },
      {
        value: 'junk_food',
        text: "Muito fast food/comida rápida",
        personaWeights: { conscious: 0, disorganized: 3, anxious: 1, chronic: 3 }
      }
    ]
  },
  {
    id: 'work_life_balance',
    text: "Como você avalia seu equilíbrio entre vida pessoal e trabalho?",
    options: [
      {
        value: 'excellent',
        text: "Excelente, consigo separar bem",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 0, chronic: 0 }
      },
      {
        value: 'good',
        text: "Bom, com alguns deslizes",
        personaWeights: { conscious: 1, disorganized: 2, anxious: 1, chronic: 1 }
      },
      {
        value: 'poor',
        text: "Ruim, trabalho invade minha vida pessoal",
        personaWeights: { conscious: 0, disorganized: 2, anxious: 3, chronic: 2 }
      },
      {
        value: 'nonexistent',
        text: "Praticamente inexistente",
        personaWeights: { conscious: 0, disorganized: 1, anxious: 3, chronic: 3 }
      }
    ]
  },
  {
    id: 'eye_care',
    text: "Como você cuida da saúde dos seus olhos durante longas sessões de código?",
    options: [
      {
        value: '20_20_20',
        text: "Uso a regra 20-20-20 (20min, 20s, 20 pés)",
        personaWeights: { conscious: 3, disorganized: 0, anxious: 1, chronic: 0 }
      },
      {
        value: 'breaks',
        text: "Faço pausas regulares para descansar",
        personaWeights: { conscious: 2, disorganized: 1, anxious: 1, chronic: 0 }
      },
      {
        value: 'drops',
        text: "Uso colírios quando sinto desconforto",
        personaWeights: { conscious: 0, disorganized: 2, anxious: 1, chronic: 2 }
      },
      {
        value: 'ignore',
        text: "Não faço nada específico",
        personaWeights: { conscious: 0, disorganized: 3, anxious: 1, chronic: 3 }
      }
    ]
  }
];