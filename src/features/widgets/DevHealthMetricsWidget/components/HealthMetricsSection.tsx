import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { MetricCard } from "./MetricCard";
import {
  METRIC_CONFIG,
  DEFAULT_COLOR,
  DEFAULT_ICON,
} from "../constants/healthMetrics";
import type { HealthMetricCardData } from "../types/healthMetrics";
import { useHealthMetrics } from "@/features/dev-health-metrics/hooks/useHealthMetrics";

export const HealthMetricsSection = () => {
  const { metrics, isLoading, refetch } = useHealthMetrics();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing health metrics:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const metricCards: HealthMetricCardData[] = metrics.map((metric) => {
    const config = METRIC_CONFIG[metric.type] || {
      name: metric.type,
      icon: DEFAULT_ICON,
      color: DEFAULT_COLOR,
      tip: "Complete tarefas para melhorar",
      detail: "",
    };
    return {
      id: metric.id,
      type: metric.type,
      name: config.name,
      value: metric.value,
      detail: metric.context || config.detail,
      icon: config.icon,
      color: config.color,
      tip: config.tip,
      lastUpdated: metric.lastUpdated,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900 to-gray-900 rounded-xl border border-emerald-400 p-4 relative"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-white flex items-center gap-2">
          <Icon name="Activity" className="w-4 h-4 text-green-400" />
          Saúde do Dev
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[0.65rem] bg-green-900 border border-green-300 font-semibold text-gray-300 px-1.5 py-0.5 rounded-full">
            Atualizado hoje
          </span>
          <button
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            className={`p-1.5 rounded-full transition-all duration-200 ${isRefreshing ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-900/10 text-emerald-300 hover:bg-emerald-900/20 hover:text-emerald-200"}`}
            aria-label="Recarregar métricas de saúde"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full bg-emerald-900/10 text-emerald-300 hover:bg-emerald-900/20 hover:text-emerald-200 transition-all duration-200"
            aria-label={isExpanded ? "Recolher" : "Expandir"}
          >
            <Icon
              name="ChevronUp"
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "" : "rotate-180"}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="metrics-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isLoading ? (
              <div className="grid grid-cols-1 gap-2 pt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-800/50 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 pt-2">
                {metricCards.map((metric) => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isRefreshing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  );
};
