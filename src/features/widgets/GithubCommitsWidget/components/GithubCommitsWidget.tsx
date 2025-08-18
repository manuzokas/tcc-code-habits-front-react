import React from "react";
import { FaGithub } from "react-icons/fa";
import { useGithubCommits } from "../hooks/useGithubCommits";
import { SpinnerIcon } from "@phosphor-icons/react";
import { Button } from "@/shared/components/atoms/Button";
import { Card } from "@/shared/components/atoms/Card";

export const GithubCommitsWidget: React.FC = () => {
  const { isGithubConnected, commitsCount, isLoading, error, handleConnect } =
    useGithubCommits();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-4">
          <SpinnerIcon size={24} className="animate-spin text-blue-500" />
        </div>
      );
    }

    if (!isGithubConnected || error) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <FaGithub className="text-4xl text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 mb-3">
            Conecte sua conta do GitHub para acompanhar seus commits diários.
          </p>
          <Button
            onClick={handleConnect}
            className="bg-gray-800 hover:bg-gray-700 text-sm text-white"
          >
            <FaGithub className="mr-2" /> Conectar ao GitHub
          </Button>
          {error && <p className="text-red-500 mt-2 text-xs">{error}</p>}
        </div>
      );
    }

    return (
      <div className="text-sm text-gray-400 text-center mt-4">
        {commitsCount === 0
          ? "Nenhum commit hoje. Vamos codificar!"
          : `Você está indo muito bem! Continue assim.`}
      </div>
    );
  };

  return (
    <Card className="w-full rounded-xl shadow-lg bg-gray-900 border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaGithub className="text-xl" />
          GitHub Activity
        </h2>

        {isGithubConnected && !isLoading && !error && (
          <div className="flex items-center gap-2 text-right">
            <h3 className="text-2xl font-bold text-white leading-none">
              {commitsCount ?? "-"}
            </h3>
            <p className="text-xs text-gray-400 leading-none mt-1">
              Commits
              <br />
              Hoje
            </p>
          </div>
        )}
      </div>

      {renderContent()}
    </Card>
  );
};

export default GithubCommitsWidget;
