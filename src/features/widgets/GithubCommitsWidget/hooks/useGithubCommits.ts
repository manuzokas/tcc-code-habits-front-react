import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserProfile } from "@/features/auth/hooks/useAuth";
import {
  connectToGithub,
  fetchDailyCommits,
  type RecentCommit,
} from "../api/githubApi"; 

interface GithubCommitData {
  isGithubConnected: boolean;
  commitsCount: number | null;
  commitTimestamps: string[];
  recentCommits: RecentCommit[]; 
  isLoading: boolean;
  error: string | null;
  handleConnect: () => void;
  refetchCommits: () => void;
}

export const useGithubCommits = (): GithubCommitData => {
  const { user, profile } = useAuth();
  const [commitsCount, setCommitsCount] = useState<number | null>(null);
  const [commitTimestamps, setCommitTimestamps] = useState<string[]>([]);
  const [recentCommits, setRecentCommits] = useState<RecentCommit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isGithubConnected = !!(profile as UserProfile)?.github_username;
  const userId = user?.id || "";

  const getCommits = useCallback(async () => {
    if (!isGithubConnected || !userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchDailyCommits(userId);

      setCommitsCount(data.count);
      setCommitTimestamps(data.timestamps);
      setRecentCommits(data.recentCommits);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isGithubConnected, userId]);

  useEffect(() => {
    if (profile && isGithubConnected && userId) {
      getCommits();
    } else if (profile) {
      setIsLoading(false);
    }
  }, [profile, isGithubConnected, userId, getCommits]);

  const handleConnect = () => {
    if (userId) {
      connectToGithub(userId);
    } else {
      setError("User must be logged in to connect to GitHub.");
    }
  };

  const refetchCommits = () => {
    getCommits();
  };

  return {
    isGithubConnected,
    commitsCount,
    commitTimestamps,
    recentCommits,
    isLoading,
    error,
    handleConnect,
    refetchCommits,
  };
};
