const API_BASE_URL = "http://localhost:4000";

export const connectToGithub = (userId: string) => {
  window.location.href = `${API_BASE_URL}/github/connect?userId=${userId}`;
};

export interface RecentCommit {
  repoName: string;
  message: string;
  time: string; // e.g., "14:23"
}

export interface GithubCommitsResponse {
  count: number;
  recentCommits: RecentCommit[];
}

export const fetchDailyCommits = async (
  userId: string
): Promise<GithubCommitsResponse> => {
  if (!userId) {
    throw new Error("User ID is required to fetch commits.");
  }

  const response = await fetch(
    `${API_BASE_URL}/github/commits?userId=${userId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub account not linked.");
    }
    throw new Error("Failed to fetch daily commits from the server.");
  }

  const data = await response.json();

  return {
    count: data.count || 0,
    recentCommits: data.recentCommits || [],
  };
};
