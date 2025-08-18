import { motion } from "framer-motion";
import { MusicPlayerSection } from "@/features/widgets/MusicPlayerWidget/components/MusicPlayerSection";
import { ProductivityTimer } from "@/features/widgets/TimerWidget/components/TimerWidget";
import { AchievementsSection } from "@/features/gamification/components/AchievementsSection";
import { HealthMetricsSection } from "@/features/widgets/DevHealthMetricsWidget/components/HealthMetricsSection";
import { RecentActivitiesSection } from "@/features/widgets/RecentActivityWidget/components/ActivitiesSection";
import PreCodeSetupCheck from "@/features/widgets/PreCodeSetupWidget/components/PreCodeSetupCheck";
import SmartAlarms from "@/features/widgets/AlarmsWidget/components/SmartAlarms";
import { DashboardHeader } from "@/pages/dashboard/components/DashboardHeader";
import { MoodWidget } from "@/features/widgets/MoodWidget/components/MoodWidget";
import { MiniCalendar } from "@/features/widgets/CalendarWidget/components/MiniCalendar";
import GithubCommitsWidget from "@/features/widgets/GithubCommitsWidget/components/GithubCommitsWidget";
import { HealthTipsSection } from "../../features/widgets/HealthTipsWidget/components/HealthTipsSection";

export function DashboardPage() {

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-green-950/80 via-blue-950/80 to-purple-950/40">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-10 py-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <MoodWidget />
          <section className="bg-gray-900 rounded-xl border border-green-400 p-5 shadow-lg shadow-green-500">
            <HealthMetricsSection />
          </section>
          <HealthTipsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-6 h-fit"
        >
          <PreCodeSetupCheck />
          <SmartAlarms />
          <section className="bg-gray-900/20 shadow-lg shadow-blue-200 rounded-xl w-fit mx-auto justify-center border border-white/10 p-5">
            <ProductivityTimer />
          </section>
          <MiniCalendar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-7"
        >
          <MusicPlayerSection />
          <GithubCommitsWidget />
          <RecentActivitiesSection />
          <AchievementsSection />
        </motion.div>
      </div>
    </div>
  );
}
