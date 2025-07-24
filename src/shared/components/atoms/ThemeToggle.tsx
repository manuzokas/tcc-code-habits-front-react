import { useTheme } from "@/shared/contexts/theme/hooks/useTheme";
import { cn } from "@/assets/styles/utils/tw";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
      className={cn(
        "p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
        theme === "dark"
          ? "bg-gray-700 text-blue-500 focus:ring-blue-50"
          : "bg-yellow-300 text-gray-700 focus:ring-gray-700",
        className
      )}
    >
      {theme === "dark" ? (
        <Moon size={20} className="transition-transform duration-300" />
      ) : (
        <Sun size={20} className="transition-transform duration-300" />
      )}
    </button>
  );
}
