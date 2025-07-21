import { Icon, type IconName } from "@/shared/components/atoms/Icon";
import { motion } from "framer-motion";

interface ActivityItemProps {
  action: string;
  xp: string;
  time: string;
  healthImpact: string;
  completed: boolean;
  icon: IconName;
  compact?: boolean;
}

export const ActivityItem = ({
  action,
  xp,
  time,
  healthImpact,
  completed,
  icon,
  compact = false,
}: ActivityItemProps) => {
  const iconColor = completed
    ? icon === "Droplet"
      ? "cyan-400"
      : icon === "StretchHorizontal"
        ? "green-400"
        : icon === "EyeOff"
          ? "blue-400"
          : "purple-400"
    : "gray-400";

  return (
    <motion.div
      whileHover={{ y: compact ? -1 : -2 }}
      className={`${compact ? "py-2 px-2.5" : "p-3"} rounded-lg border ${
        completed
          ? "border-green-500/20 bg-green-900/10"
          : "border-gray-700 bg-gray-800/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`${compact ? "p-1" : "p-1.5"} rounded-md ${completed ? "bg-gray-800/50" : "bg-gray-700/50"}`}
          >
            <Icon
              name={icon}
              className={compact ? "w-3.5 h-3.5" : "w-4 h-4"}
              color={iconColor}
            />
          </div>
          <div className="min-w-0">
            <h4
              className={`${compact ? "text-xs" : "text-sm"} font-medium text-white truncate`}
            >
              {action}
            </h4>
            <p
              className={`${compact ? "text-[0.65rem]" : "text-xs"} text-gray-400`}
            >
              {time} • {healthImpact}
            </p>
          </div>
        </div>
        <span
          className={`${compact ? "text-[0.65rem]" : "text-xs"} font-mono ${
            completed ? "text-green-400" : "text-gray-500"
          }`}
        >
          {xp}
        </span>
      </div>
    </motion.div>
  );
};
