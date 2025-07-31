export const PATHS = {
  HOME: '/',
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
} as const;

export type AppPath = typeof PATHS[keyof typeof PATHS];

export const isAppPath = (path: string): path is AppPath => {
  return Object.values(PATHS).includes(path as AppPath);
};

export type PublicPath = 
  | typeof PATHS.HOME
  | typeof PATHS.LOGIN
  | typeof PATHS.REGISTER;