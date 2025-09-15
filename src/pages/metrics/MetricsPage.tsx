import React from "react";
import { cn } from "@/assets/styles/utils/tw";
import { DailySummaryChart } from "@/features/metrics/components/DailySummaryChart";
import { InterruptionsImpactChart } from "@/features/metrics/components/InterruptionsImpactChart";
import { HealthAdherenceChart } from "@/features/metrics/components/HealthAdherenceChart";
import { InsightsPanel } from "@/features/metrics/components/InsightsPanel";
import { useCommitMood } from "@/features/metrics/hooks/useCommitMood";
import { CommitMoodChart } from "@/features/metrics/components/CommitMoodChart";
import { SpinnerIcon } from "@phosphor-icons/react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const MetricsPage: React.FC = () => {
  const {
    period,
    setPeriod,
    data: commitMoodData,
    isLoading,
    error,
  } = useCommitMood();
  const { profile } = useAuth(); 

  const renderCommitMoodChart = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[300px]">
          <SpinnerIcon size={32} className="animate-spin text-green-400" />
        </div>
      );
    }
    if (error) {
      return (
        <p className="text-red-400 text-center mt-4 h-[300px] flex items-center justify-center">
          Erro ao carregar os dados.
        </p>
      );
    }
    if (!profile?.github_username) {
      return (
        <p className="text-gray-400 text-center mt-4 h-[300px] flex items-center justify-center">
          Conecte sua conta do GitHub para ver esta métrica.
        </p>
      );
    }
    if (commitMoodData.length === 0) {
      return (
        <p className="text-gray-400 text-center mt-4 h-[300px] flex items-center justify-center">
          Nenhum dado de commit encontrado para este período.
        </p>
      );
    }
    return <CommitMoodChart data={commitMoodData} />;
  };

  const periodOptions = [
    { key: "7days", label: "Últimos 7 dias" },
    { key: "30days", label: "Últimos 30 dias" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Dashboard de Produtividade e Bem-Estar
        </h1>
        <p className="text-gray-400 mt-1">
          Analise seus padrões de trabalho para otimizar sua rotina e prevenir o
          esgotamento.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* --- SEÇÃO 1: GRID PRINCIPAL 2x2 --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailySummaryChart />
          <HealthAdherenceChart />

          {/* --- CARD DO NOVO GRÁFICO COMMIT X HUMOR --- */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 sm:p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Atividade de Commits e Humor
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Visualize a relação entre seus commits e seu humor diário.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg mt-4 sm:mt-0 flex-shrink-0">
                {periodOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setPeriod(option.key as typeof period)}
                    className={cn(
                      "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                      period === option.key
                        ? "bg-green-500 text-white shadow"
                        : "text-gray-300 hover:bg-gray-700"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            {renderCommitMoodChart()}
          </div>

          <InterruptionsImpactChart />
        </div>

        {/* --- SEÇÃO 2: A INTELIGÊNCIA ACIONÁVEL --- */}
        <div className="lg:col-span-2">
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
