import { motion } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import type { HealthMetricCardData } from "../types/healthMetrics";
import {
  METRIC_COLOR_CLASSES,
  DEFAULT_COLOR,
} from "../constants/healthMetrics";

interface MetricCardProps {
  metric: HealthMetricCardData;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const safeColor = METRIC_COLOR_CLASSES[metric.color]
    ? metric.color
    : DEFAULT_COLOR;
  const colors = METRIC_COLOR_CLASSES[safeColor];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-2 rounded-lg border ${colors.border} ${colors.bg}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <div className={`p-1 rounded ${colors.iconBg}`}>
            <Icon name={metric.icon} className={`w-4 h-4 ${colors.text}`} />
          </div>
          <span className="text-xs font-medium text-white">{metric.name}</span>
        </div>
        <span className="text-[0.6rem] text-gray-400">
          {metric.lastUpdated}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold text-white">
            {metric.value}
          </span>
          {metric.detail && (
            <span className="text-[0.65rem] text-gray-400 ml-1">
              {metric.detail}
            </span>
          )}
        </div>
      </div>
      <div className="mt-1 text-[0.65rem] text-gray-400">
        <span className="font-medium">Dica:</span> {metric.tip}
      </div>
    </motion.div>
  );
};
