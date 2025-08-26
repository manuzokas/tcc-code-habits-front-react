export const PATHS = {
  HOME: "/",
  LOGIN: "/sign-in",
  REGISTER: "/sign-up",
  DASHBOARD: "/dashboard",
  HUB: "/hub",
  ONBOARDING: "/onboarding",
  METRICS: "/metrics",
  SPOTIFY_CALLBACK: "/dashboard/spotify-callback",
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];

export const isAppPath = (path: string): path is AppPath => {
  return Object.values(PATHS).some((p) => path.startsWith(p as string));
};

export type PublicPath =
  | typeof PATHS.HOME
  | typeof PATHS.LOGIN
  | typeof PATHS.REGISTER
  | typeof PATHS.SPOTIFY_CALLBACK;

export const isPublicPath = (path: string): path is PublicPath => {
  return (
    path === PATHS.HOME ||
    path === PATHS.LOGIN ||
    path === PATHS.REGISTER ||
    path === PATHS.SPOTIFY_CALLBACK
  );
};
