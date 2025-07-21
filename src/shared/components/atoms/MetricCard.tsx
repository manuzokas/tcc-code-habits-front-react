import { Icon, type IconName } from "@/shared/components/atoms/Icon";

interface MetricCardProps {
  icon: IconName;
  title: string;
  value: string;
  detail: string;
  color: "green" | "blue" | "cyan" | "purple" | "indigo" | "amber";
  compact?: boolean;
}

export const MetricCard = ({
  icon,
  title,
  value,
  detail,
  color,
  compact = false,
}: MetricCardProps) => {
  const colorClasses = {
    green: {
      text: "text-green-400",
      border: "border-green-500/20",
      bg: "bg-green-900/10",
    },
    blue: {
      text: "text-blue-400",
      border: "border-blue-500/20",
      bg: "bg-blue-900/10",
    },
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "bg-cyan-900/10",
    },
    purple: {
      text: "text-purple-400",
      border: "border-purple-500/20",
      bg: "bg-purple-900/10",
    },
    indigo: {
      text: "text-indigo-400",
      border: "border-indigo-500/20",
      bg: "bg-indigo-900/10",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-500/20",
      bg: "bg-amber-900/10",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`${compact ? "p-2" : "p-3"} rounded-lg border ${colors.border} ${colors.bg}`}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon
          name={icon}
          className={compact ? "w-3 h-3" : "w-4 h-4"}
          color={color}
        />
        <span
          className={`${compact ? "text-[0.65rem]" : "text-xs"} ${colors.text}`}
        >
          {title}
        </span>
      </div>
      <div
        className={`${compact ? "text-sm" : "text-lg"} font-medium text-white`}
      >
        {value}
      </div>
      <div
        className={`${compact ? "text-[0.6rem]" : "text-xs"} mt-0.5 ${colors.text}`}
      >
        {detail}
      </div>
    </div>
  );
};
