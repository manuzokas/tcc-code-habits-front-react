import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useGithubCommits } from "../hooks/useGithubCommits";
import { SpinnerIcon } from "@phosphor-icons/react";
import { Button } from "@/shared/components/atoms/Button";
import { Card } from "@/shared/components/atoms/Card";

export const GithubCommitsWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_COMMITS_VISIBLE = 3;

  const {
    isGithubConnected,
    commitsCount,
    recentCommits,
    isLoading,
    error,
    handleConnect,
  } = useGithubCommits();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <SpinnerIcon size={32} className="animate-spin text-blue-500" />
        </div>
      );
    }

    if (!isGithubConnected || error) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <FaGithub className="text-4xl text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 mb-3">
            Connect your GitHub account to track your daily commits and boost
            productivity.
          </p>
          <Button
            onClick={handleConnect}
            className="bg-blue-600 hover:bg-blue-700 text-sm"
          >
            <FaGithub className="mr-2" /> Connect to GitHub
          </Button>
          {error && <p className="text-red-500 mt-2 text-xs">{error}</p>}
        </div>
      );
    }

    const commitsToShow = isExpanded
      ? recentCommits
      : recentCommits.slice(0, MAX_COMMITS_VISIBLE);

    const hasMoreCommits =
      recentCommits && recentCommits.length > MAX_COMMITS_VISIBLE;

    return (
      <div className="flex flex-col">
        {commitsToShow && commitsToShow.length > 0 ? (
          <div className="space-y-2 mt-4">
            {commitsToShow.map((commit, idx) => (
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="block bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">
                    {commit.repoName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {commit.time}
                  </span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 truncate">
                  {commit.message}
                </p>
              </a>
            ))}

            {hasMoreCommits && !isExpanded && (
              <button
                onClick={handleToggleExpand}
                className="w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                Expandir
              </button>
            )}
            {isExpanded && (
              <button
                onClick={handleToggleExpand}
                className="w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                Recolher
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center mt-4">
            No commits found today.
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full rounded-xl shadow-lg bg-white dark:bg-gray-900 border dark:border-green-600 p-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold bg-gradient-to-l from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
          <FaGithub className="text-xl text-white" />
          GitHub Activity
        </h2>

        {isGithubConnected && !isLoading && !error && (
          <div className="flex gap-2 items-center text-right">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-none">
              {commitsCount ?? "-"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
              Commits Today
            </p>
          </div>
        )}
      </div>

      {renderContent()}
    </Card>
  );
};

export default GithubCommitsWidget;
