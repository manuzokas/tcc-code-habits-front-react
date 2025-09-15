import type { DailySummaryData } from "../hooks/useDailySummary";
import type { InterruptionsSummaryData } from "../hooks/useInterruptionsSummary";
import type { HealthAdherenceData } from "../hooks/useHealthAdherence";

export interface Insight {
  id: string;
  text: string;
  type: "positive" | "negative" | "neutral";
}

const getAverage = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

export const generateInsights = (
  dailySummary: DailySummaryData[],
  interruptionsSummary: InterruptionsSummaryData[],
  healthAdherence: HealthAdherenceData[]
): Insight[] => {
  const insights: Insight[] = [];
  const insightIds = new Set<string>();

  const addInsight = (insight: Insight) => {
    if (!insightIds.has(insight.id)) {
      insights.push(insight);
      insightIds.add(insight.id);
    }
  };

  const last7DaysSummary = dailySummary.slice(-7);
  const last7DaysInterruptions = interruptionsSummary.slice(-7);

  if (last7DaysSummary.length < 3) {
    return [
      {
        id: "no-data",
        text: "Continue registrando suas atividades diárias para receber análises e recomendações personalizadas.",
        type: "neutral",
      },
    ];
  }


  const recentMoods = last7DaysSummary
    .map((d) => d.mood_score)
    .filter((m) => m !== null) as number[];
  if (recentMoods.length >= 5) {
    const avgLast3Days = getAverage(recentMoods.slice(-3));
    const avgPrevious4Days = getAverage(recentMoods.slice(0, 4));
    if (avgLast3Days < avgPrevious4Days * 0.75) {
      // queda de 25%
      addInsight({
        id: "mood-drop",
        text: "Notamos que seu humor esteve consideravelmente mais baixo nos últimos dias. Lembre-se de fazer pausas e priorizar seu bem-estar.",
        type: "negative",
      });
    }
  }

  const frustrationDays = last7DaysSummary.filter(
    (d) =>
      d.ife !== null &&
      d.ife > 70 &&
      d.productivity_rating !== null &&
      d.productivity_rating <= 2
  );
  if (frustrationDays.length >= 2) {
    addInsight({
      id: "frustration-pattern",
      text: "Identificamos dias em que você teve alto foco, mas ainda assim avaliou sua produtividade como baixa. Esse padrão pode levar à frustração e esgotamento.",
      type: "negative",
    });
  }

  healthAdherence.forEach((habit) => {
    if (habit.adherence_percentage < 30) {
      addInsight({
        id: `low-adherence-${habit.habit_name}`,
        text: `Sua aderência ao hábito de '${habit.habit_name}' está baixa. Cuidar desta área pode melhorar seus níveis de energia e foco.`,
        type: "negative",
      });
    }
  });


  const totalInterruptionsLast7Days = last7DaysInterruptions.reduce(
    (sum, day) =>
      sum + day.bug_count + day.meeting_count + day.personal_break_count,
    0
  );
  if (totalInterruptionsLast7Days > 15) {
    addInsight({
      id: "high-total-interruptions",
      text: 'Sua semana foi marcada por um alto número de interrupções, o que pode fragmentar seu foco e diminuir o "deep work".',
      type: "negative",
    });
  }

  if (totalInterruptionsLast7Days > 5) {
    const bugCount = last7DaysInterruptions.reduce(
      (s, d) => s + d.bug_count,
      0
    );
    const meetingCount = last7DaysInterruptions.reduce(
      (s, d) => s + d.meeting_count,
      0
    );
    let villain = "";
    if (bugCount > meetingCount && bugCount > 3) villain = "bugs urgentes";
    else if (meetingCount > bugCount && meetingCount > 3)
      villain = "reuniões de última hora";

    if (villain) {
      addInsight({
        id: "main-villain",
        text: `A principal fonte de interrupções na sua semana foram os ${villain}. Avalie se é possível otimizar esses processos.`,
        type: "neutral",
      });
    }
  }


  const avgAdherence = getAverage(
    healthAdherence.map((h) => h.adherence_percentage)
  );
  if (avgAdherence > 75) {
    addInsight({
      id: "great-self-care",
      text: "Parabéns! Sua adesão geral aos hábitos de saúde está excelente, indicando uma rotina de autocuidado bem equilibrada.",
      type: "positive",
    });
  }

  const flowStateDays = last7DaysSummary.filter(
    (d) =>
      d.ife !== null &&
      d.ife >= 90 &&
      d.productivity_rating !== null &&
      d.productivity_rating >= 4
  );
  if (flowStateDays.length >= 2) {
    addInsight({
      id: "flow-state",
      text: 'Você teve múltiplos dias de altíssimo foco e produtividade (estado de "flow"). Identifique o que tornou esses dias especiais e tente replicar!',
      type: "positive",
    });
  }

  if (insights.length === 0) {
    addInsight({
      id: "all-good",
      text: "Analisamos seus dados e seus padrões de trabalho e bem-estar parecem estáveis e saudáveis. Continue o ótimo trabalho!",
      type: "positive",
    });
  }

  return insights;
};
