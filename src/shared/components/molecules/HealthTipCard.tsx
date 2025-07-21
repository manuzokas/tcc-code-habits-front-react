import { Icon, type IconName } from "@/shared/components/atoms/Icon";
import { motion } from "framer-motion";

interface HealthTipCardProps {
  title: string;
  description: string;
  category: string;
  icon: IconName;
  compact?: boolean;
}

export const HealthTipCard = ({
  title,
  description,
  category,
  icon,
  compact = false,
}: HealthTipCardProps) => {
  const categoryStyles = {
    Postura: {
      border: "border-green-500/20",
      bg: "bg-green-900/10",
      iconBg: "bg-green-900/30",
      text: "text-green-400",
      iconColor: "green",
    },
    Visão: {
      border: "border-blue-500/20",
      bg: "bg-blue-900/10",
      iconBg: "bg-blue-900/30",
      text: "text-blue-400",
      iconColor: "blue",
    },
    Hidratação: {
      border: "border-cyan-500/20",
      bg: "bg-cyan-900/10",
      iconBg: "bg-cyan-900/30",
      text: "text-cyan-400",
      iconColor: "cyan",
    },
    Produtividade: {
      border: "border-amber-500/20",
      bg: "bg-amber-900/10",
      iconBg: "bg-amber-900/30",
      text: "text-amber-400",
      iconColor: "amber",
    },
  };

  const styles =
    categoryStyles[category as keyof typeof categoryStyles] ||
    categoryStyles.Postura;

  return (
    <motion.div
      whileHover={{ y: compact ? -1 : -2 }}
      className={`${compact ? "p-2" : "p-3"} rounded-lg border ${styles.border} ${styles.bg}`}
    >
      <div className="flex items-start gap-2">
        <div
          className={`${compact ? "p-1.5" : "p-2"} rounded-md ${styles.iconBg}`}
        >
          <Icon
            name={icon}
            className={compact ? "w-4 h-4" : "w-5 h-5"}
            color={styles.iconColor}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`${compact ? "text-xs" : "text-sm"} font-medium text-white mb-1`}
          >
            {title}
          </h4>
          <p
            className={`${compact ? "text-[0.65rem]" : "text-xs"} text-gray-400`}
          >
            {description}
          </p>
          <span
            className={`${compact ? "text-[0.6rem]" : "text-xs"} mt-1 inline-block ${styles.text} bg-opacity-20 px-1.5 py-0.5 rounded`}
          >
            {category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
