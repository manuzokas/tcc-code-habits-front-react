export const PATHS = {
  HOME: "/",
  LOGIN: "/sign-in",
  REGISTER: "/sign-up",
  DASHBOARD: "/dashboard",
  ONBOARDING: "/onboarding",
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
  
