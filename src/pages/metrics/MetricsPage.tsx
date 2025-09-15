import React from "react";
import { useGithubCommits } from "@/features/widgets/GithubCommitsWidget/hooks/useGithubCommits";
import { useCommitHistory } from "@/features/metrics/hooks/useCommitHistory";
import { CommitActivityChart } from "@/features/metrics/components/CommitActivityChart";
import { CommitHistoryChart } from "@/features/metrics/components/CommitHistoryChart";
import { SpinnerIcon } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/assets/styles/utils/tw";
import { IFEChart } from "@/features/metrics/components/IFEChart";

export const MetricsPage: React.FC = () => {
  const {
    isGithubConnected,
    commitTimestamps,
    isLoading: isLoadingToday,
    error: errorToday,
  } = useGithubCommits();
  const {
    period,
    setPeriod,
    history,
    isLoading: isLoadingHistory,
    error: errorHistory,
  } = useCommitHistory();

  const renderCommitChartContent = () => {
    const isLoading = period === "today" ? isLoadingToday : isLoadingHistory;
    const error = period === "today" ? errorToday : errorHistory;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <SpinnerIcon size={32} className="animate-spin text-green-400" />
        </div>
      );
    }

    if (error) {
      return (
        <p className="text-red-400 text-center mt-4">
          Erro ao carregar os dados.
        </p>
      );
    }

    if (!isGithubConnected) {
      return (
        <div className="text-center py-10">
          <FaGithub className="mx-auto text-5xl text-gray-500 mb-4" />
          <h3 className="text-lg font-semibold text-white">
            Conecte sua conta do GitHub
          </h3>
          <p className="text-gray-400 mt-1">
            Para visualizar suas métricas de commits, primeiro conecte sua conta
            no widget do GitHub no dashboard.
          </p>
        </div>
      );
    }

    if (period === "today") {
      if (commitTimestamps.length === 0)
        return (
          <p className="text-gray-400 text-center mt-4 h-64 flex items-center justify-center">
            Nenhum commit encontrado hoje.
          </p>
        );
      return <CommitActivityChart timestamps={commitTimestamps} />;
    } else {
      if (history.length === 0)
        return (
          <p className="text-gray-400 text-center mt-4 h-64 flex items-center justify-center">
            Nenhum dado de commit encontrado para este período.
          </p>
        );
      return <CommitHistoryChart history={history} period={period} />;
    }
  };

  const periodOptions = [
    { key: "today", label: "Hoje" },
    { key: "7days", label: "Últimos 7 dias" },
    { key: "30days", label: "Últimos 30 dias" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Métricas de Produtividade
        </h1>
        <p className="text-gray-400 mt-1">
          Analise seus padrões de trabalho e bem-estar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IFEChart />

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Atividade de Commits
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Visualize a frequência de seus commits ao longo do tempo.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg mt-4 sm:mt-0">
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
          {renderCommitChartContent()}
        </div>

      </div>
    </div>
  );
};

export default MetricsPage;
