import { motion } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { useHealthMetrics } from "@/features/dev-health-metrics/hooks/useHealthMetrics";
import type { IconName } from "@/shared/types/iconTypes";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

interface HealthMetricCard {
  id: string;
  type: string;
  name: string;
  value: string;
  detail: string;
  icon: IconName;
  color: "green" | "blue" | "cyan" | "purple" | "indigo" | "amber";
  tip: string;
  lastUpdated: string;
}

const METRIC_CONFIG: Record<
  string,
  {
    name: string;
    icon: IconName;
    color: "green" | "blue" | "cyan" | "purple" | "indigo" | "amber";
    tip: string;
    detail: string;
  }
> = {
  hydration: {
    name: "Hidratação",
    icon: "Droplet",
    color: "blue",
    tip: "1 copo de água por hora",
    detail: "Próximo lembrete: 30min",
  },
  posture: {
    name: "Postura",
    icon: "Accessibility",
    color: "green",
    tip: "Alongue-se a cada 30 minutos",
    detail: "Última pausa: Nunca",
  },
  eye_health: {
    name: "Saúde Visual",
    icon: "Eye",
    color: "cyan",
    tip: "Regra 20-20-20 (20s a cada 20min)",
    detail: "Última pausa: Nunca",
  },
  stress: {
    name: "Estresse",
    icon: "Brain",
    color: "purple",
    tip: "Respire fundo por 1 minuto",
    detail: "Última pausa: Nenhuma",
  },
  sleep: {
    name: "Sono",
    icon: "Moon",
    color: "indigo",
    tip: "8 horas de sono ideal",
    detail: "Qualidade do descanso",
  },
  activity: {
    name: "Movimento",
    icon: "StretchHorizontal",
    color: "amber",
    tip: "Levante-se a cada hora",
    detail: "Tempo ativo hoje",
  },
};

const DEFAULT_COLOR = "green";
const DEFAULT_ICON = "Activity";

export const HealthMetricsSection = () => {
  const { metrics, isLoading, refetch } = useHealthMetrics();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const metricCards = metrics.map((metric) => {
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
      className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl border border-gray-700 p-4 relative"
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
            className={`p-1.5 rounded-full transition-all duration-200 ${
              isRefreshing
                ? "bg-emerald-900/30 text-emerald-400"
                : "bg-emerald-900/10 text-emerald-300 hover:bg-emerald-900/20 hover:text-emerald-200"
            }`}
            aria-label="Recarregar métricas de saúde"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-800/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {metricCards.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}

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

const MetricCard = ({ metric }: { metric: HealthMetricCard }) => {
  const colorClasses = {
    green: {
      border: "border-green-500/20",
      bg: "bg-green-900/10",
      iconBg: "bg-green-900/30",
      text: "text-green-400",
    },
    blue: {
      border: "border-blue-500/20",
      bg: "bg-blue-900/10",
      iconBg: "bg-blue-900/30",
      text: "text-blue-400",
    },
    cyan: {
      border: "border-cyan-500/20",
      bg: "bg-cyan-900/10",
      iconBg: "bg-cyan-900/30",
      text: "text-cyan-400",
    },
    purple: {
      border: "border-purple-500/20",
      bg: "bg-purple-900/10",
      iconBg: "bg-purple-900/30",
      text: "text-purple-400",
    },
    indigo: {
      border: "border-indigo-500/20",
      bg: "bg-indigo-900/10",
      iconBg: "bg-indigo-900/30",
      text: "text-indigo-400",
    },
    amber: {
      border: "border-amber-500/20",
      bg: "bg-amber-900/10",
      iconBg: "bg-amber-900/30",
      text: "text-amber-400",
    },
  };

  const safeColor = colorClasses[metric.color] ? metric.color : DEFAULT_COLOR;
  const colors = colorClasses[safeColor];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-2 rounded-lg border ${colors.border} ${colors.bg}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <div className={`p-1 rounded ${colors.iconBg}`}>
            <Icon name={metric.icon} className="w-4 h-4" color={safeColor} />
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
