import { Icon, type IconName } from "@/shared/components/atoms/Icon";
import { motion } from "framer-motion";

interface AchievementBadgeProps {
  title: string;
  progress: number;
  icon: IconName;
  bg: string;
  border: string;
  completed: boolean;
  compact?: boolean;
}

export const AchievementBadge = ({
  title,
  progress,
  icon,
  bg,
  border,
  completed,
  compact = false,
}: AchievementBadgeProps) => {
  const iconColor =
    icon === "Droplet"
      ? "cyan"
      : icon === "Accessibility"
        ? "green"
        : icon === "Eye"
          ? "blue"
          : "purple";

  return (
    <motion.div
      whileHover={{ scale: compact ? 1.02 : 1.05 }}
      className={`rounded-lg ${compact ? "p-2" : "p-3"} border ${border} ${bg} ${
        completed ? "opacity-100" : "opacity-70"
      }`}
    >
      <div className="flex items-start gap-2">
        <div
          className={`${compact ? "p-1.5" : "p-2"} rounded-md ${
            completed ? "bg-white/10" : "bg-gray-700/50"
          }`}
        >
          <Icon
            name={icon}
            className={compact ? "w-3.5 h-3.5" : "w-4 h-4"}
            color={iconColor}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={`${compact ? "text-xs" : "text-sm"} font-medium text-white truncate`}
          >
            {title}
          </h4>
          <div
            className={`w-full bg-gray-700 rounded-full ${compact ? "h-1 mt-1" : "h-1.5 mt-2"}`}
          >
            <div
              className={`${compact ? "h-1" : "h-1.5"} rounded-full ${
                completed
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                  : "bg-gray-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {!compact && (
            <p className="text-[0.65rem] text-gray-400 mt-1">
              {progress}% completo
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
