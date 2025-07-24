import { motion } from "framer-motion";
import { Icon, type IconName } from "@/shared/components/atoms/Icon";
import { AchievementBadge } from "@/features/gamification/components/AchievementBadge";
import { healthAchievements } from "@/shared/constants/healthDashboard";

export const AchievementsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl border border-gray-700 p-4"
    >
      <h3 className="text-base font-medium text-white flex items-center gap-2 mb-3">
        <Icon name="Trophy" className="w-4 h-4 text-amber-400" />
        Conquistas de Saúde
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {healthAchievements.map((badge, index) => (
          <AchievementBadge
            key={index}
            title={badge.title}
            progress={badge.progress}
            icon={badge.icon as IconName}
            bg={badge.bg}
            border={badge.border}
            completed={badge.completed}
            compact
          />
        ))}
      </div>
    </motion.div>
  );
};
