import { Github, Gitlab } from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";

type AuthSocialButtonsProps = {
  mode: "register" | "login";
  onProviderClick: (provider: "github" | "google" | "gitlab") => void;
  isLoading?: boolean;
};

export function AuthSocialButtons({
  onProviderClick,
  isLoading,
}: AuthSocialButtonsProps) {
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
        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => onProviderClick("github")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-black/10 dark:bg-white/10">
            <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            GitHub
          </span>
        </Button>

        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => onProviderClick("gitlab")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-orange-500/10">
            <Gitlab className="h-5 w-5 text-orange-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            GitLab
          </span>
        </Button>

        <Button
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={() => onProviderClick("google")}
          disabled={isLoading}
        >
          <div className="p-2 rounded-full bg-red-500/10">
            {/* Ícone do Google */}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Google
          </span>
        </Button>
      </div>
    </div>
  );
}
