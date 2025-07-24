import { motion } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { healthMetrics } from "@/shared/constants/healthDashboard";

export const HealthMetricsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl border border-gray-700 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-white flex items-center gap-2">
          <Icon name="Activity" className="w-4 h-4 text-green-400" />
          Saúde do Dev
        </h3>
        <span className="text-[0.65rem] bg-gray-700/50 text-gray-300 px-1.5 py-0.5 rounded-full">
          Atualizado agora
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            className={`p-2 rounded-lg border ${
              metric.color === "green"
                ? "border-green-500/20 bg-green-900/10"
                : metric.color === "blue"
                  ? "border-blue-500/20 bg-blue-900/10"
                  : metric.color === "cyan"
                    ? "border-cyan-500/20 bg-cyan-900/10"
                    : metric.color === "purple"
                      ? "border-purple-500/20 bg-purple-900/10"
                      : metric.color === "indigo"
                        ? "border-indigo-500/20 bg-indigo-900/10"
                        : "border-amber-500/20 bg-amber-900/10"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div
                  className={`p-1 rounded ${
                    metric.color === "green"
                      ? "bg-green-900/30"
                      : metric.color === "blue"
                        ? "bg-blue-900/30"
                        : metric.color === "cyan"
                          ? "bg-cyan-900/30"
                          : metric.color === "purple"
                            ? "bg-purple-900/30"
                            : metric.color === "indigo"
                              ? "bg-indigo-900/30"
                              : "bg-amber-900/30"
                  }`}
                >
                  <Icon
                    name={metric.icon}
                    className="w-4 h-4"
                    color={metric.color}
                  />
                </div>
                <span className="text-xs font-medium text-white">
                  {metric.name}
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm font-semibold text-white">
                  {metric.value}
                </span>
                <span className="text-[0.65rem] text-gray-400 ml-1">
                  {metric.detail}
                </span>
              </div>
            </div>
            <div className="mt-1 text-[0.65rem] text-gray-400">
              <span className="font-medium">Dica:</span> {metric.tip}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
