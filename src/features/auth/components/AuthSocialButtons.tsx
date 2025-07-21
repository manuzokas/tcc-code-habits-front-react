import { Github, Gitlab } from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

type AuthSocialButtonsProps = {
  mode: "register" | "login";
};

export function AuthSocialButtons({ mode }: AuthSocialButtonsProps) {
  const { login, isLoading } = useAuth();

  const handleSocialLogin = (provider: string) => {
    const mockUser = {
      email: `${provider.toLowerCase()}@example.com`,
      password: "password123",
    };

    login(mockUser.email, mockUser.password).catch(() => {});
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Ou continue com
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* GitHub Button */}
        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-black/10 dark:bg-white/10">
            <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === "register" ? "GitHub" : "GitHub"}
          </span>
        </Button>

        {/* GitLab Button */}
        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => handleSocialLogin("gitlab")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-orange-500/10">
            <Gitlab className="h-5 w-5 text-orange-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === "register" ? "GitLab" : "GitLab"}
          </span>
        </Button>

        {/* Google Button */}
        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-red-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === "register" ? "Google" : "Google"}
          </span>
        </Button>

        {/* Microsoft Button - Adicionei como exemplo extra */}
        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => handleSocialLogin("microsoft")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-blue-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path fill="#f25022" d="M1 1h10v10H1z" />
              <path fill="#00a4ef" d="M12 1h10v10H12z" />
              <path fill="#7fba00" d="M1 12h10v10H1z" />
              <path fill="#ffb900" d="M12 12h10v10H12z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === "register" ? "Microsoft" : "Microsoft"}
          </span>
        </Button>
      </div>
    </div>
  );
}
