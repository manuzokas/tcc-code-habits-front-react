import { motion } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { ActivityItem } from "@/shared/components/molecules/ActivityItem";
import { recentActivities } from "@/shared/constants/healthDashboard";

export const RecentActivitiesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl border border-gray-700 p-4"
    >
      <h3 className="text-base font-medium text-white flex items-center gap-2 mb-3">
        <Icon name="Activity" className="w-4 h-4 text-green-400" />
        Atividades Recentes
      </h3>
      <div className="space-y-2">
        {recentActivities.map((activity, index) => (
          <ActivityItem
            key={index}
            action={activity.action}
            xp={activity.xp}
            time={activity.time}
            healthImpact={activity.healthImpact}
            completed={activity.completed}
            icon={activity.icon}
            compact
          />
        ))}
      </div>
    </motion.div>
  );
};
