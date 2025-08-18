import React from "react";
import { useGithubCommits } from "@/features/widgets/GithubCommitsWidget/hooks/useGithubCommits";
import { CommitActivityChart } from "@/features/metrics/components/CommitActivityChart"; // Verifique o caminho
import { SpinnerIcon } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa";

export const MetricsPage: React.FC = () => {
  const { isGithubConnected, commitTimestamps, isLoading, error } =
    useGithubCommits();

  const renderChartContent = () => {
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

    if (commitTimestamps.length === 0) {
      return (
        <p className="text-gray-400 text-center mt-4 h-64 flex items-center justify-center">
          Nenhum commit encontrado hoje para gerar o gráfico.
        </p>
      );
    }

    return <CommitActivityChart timestamps={commitTimestamps} />;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Métricas de Produtividade
        </h1>
        <p className="text-gray-400 mt-1">
          Analise seus padrões de trabalho e bem-estar.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-white">
          Atividade de Commits por Hora (Hoje)
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Este gráfico mostra em quais horas do dia você esteve mais ativo.
        </p>
        {renderChartContent()}
      </div>
    </div>
  );
};

export default MetricsPage;
