import { motion } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { ActivityItem } from "./ActivityItem";
import { Hourglass, ThumbsUp, RefreshCw } from "lucide-react";
import { useRecentActivities } from "../hooks/useRecentActivities";
import { useState } from "react";

export const RecentActivitiesSection = () => {
  const { activities, isLoading, refetch } = useRecentActivities();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing activities:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-xl border border-green-700 p-4 relative"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-medium text-white flex items-center gap-2">
          <Icon name="Activity" className="w-4 h-4 text-green-400" />
          Atividades Recentes
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            isRefreshing
              ? "bg-emerald-900/30 text-emerald-400"
              : "bg-emerald-900/10 text-emerald-300 hover:bg-emerald-900/20 hover:text-emerald-200"
          }`}
          aria-label="Recarregar atividades"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center p-4 text-zinc-400">
            <Hourglass size={20} className="animate-spin mr-2" />
            Carregando atividades...
          </div>
        ) : activities && activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              action={activity.action}
              xp={activity.xp}
              time={activity.time}
              healthImpact={activity.healthImpact}
              completed={activity.completed}
              icon={activity.icon}
              compact
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-zinc-400 text-center">
            <ThumbsUp size={24} className="mb-2" />
            <p className="text-sm">
              Nenhuma atividade recente. Complete uma missão para começar!
            </p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              <RefreshCw size={14} />
              Recarregar
            </button>
          </div>
        )}
      </div>

      {/* Efeito sutil ao recarregar */}
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
