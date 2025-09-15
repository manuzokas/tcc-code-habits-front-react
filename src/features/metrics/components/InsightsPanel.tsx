// src/features/metrics/components/InsightsPanel.tsx
import React, { useMemo } from "react";
import { useDailySummary } from "../hooks/useDailySummary";
import { useInterruptionsSummary } from "../hooks/useInterruptionsSummary";
import { useHealthAdherence } from "../hooks/useHealthAdherence";
import { generateInsights, type Insight } from "../utils/insightsEngine";
import { Icon } from "@/shared/components/atoms/Icon";

const InsightItem: React.FC<{ insight: Insight }> = ({ insight }) => {
  const iconMap = {
    positive: <Icon name="BadgeCheck" className="text-green-400" />,
    negative: <Icon name="TriangleAlert" className="text-yellow-400" />,
    neutral: <Icon name="Info" className="text-blue-400" />,
  };

  return (
    <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
      <div className="flex-shrink-0 mt-1">{iconMap[insight.type]}</div>
      <p className="text-sm text-gray-300">{insight.text}</p>
    </li>
  );
};

export const InsightsPanel: React.FC = () => {
  const { data: dailySummary, isLoading: isLoadingSummary } = useDailySummary();
  const { data: interruptionsSummary, isLoading: isLoadingInterruptions } =
    useInterruptionsSummary();
  const { data: healthAdherence, isLoading: isLoadingHealth } =
    useHealthAdherence();

  const isLoading =
    isLoadingSummary || isLoadingInterruptions || isLoadingHealth;

  const insights = useMemo(() => {
    if (
      isLoading ||
      !dailySummary ||
      !interruptionsSummary ||
      !healthAdherence
    ) {
      return [];
    }
    return generateInsights(
      dailySummary,
      interruptionsSummary,
      healthAdherence
    );
  }, [isLoading, dailySummary, interruptionsSummary, healthAdherence]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Icon name="Bot" className="w-6 h-6 animate-pulse mr-2" />
          Analisando seus dados...
        </div>
      );
    }

    if (insights.length === 0) {
      return (
        <div className="text-center">Nenhum insight disponível no momento.</div>
      );
    }

    return (
      <ul className="space-y-3">
        {insights.map((insight) => (
          <InsightItem key={insight.id} insight={insight} />
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg h-full">
      <h3 className="text-xl font-bold text-white mb-1">
        Insights & Recomendações
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Análises automáticas da sua rotina para te ajudar a otimizar o dia a
        dia.
      </p>
      <div className="text-gray-400">{renderContent()}</div>
    </div>
  );
};
