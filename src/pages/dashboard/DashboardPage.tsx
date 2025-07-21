// Redesigned DevHealth Dashboard with Sidebar
import { useState } from "react";
// import { useAuth } from "@/features/auth/hooks/useAuth";
import { motion } from "framer-motion";
// import { Icon } from "@/shared/components/atoms/Icon";
import { ProductivityTimer } from "@/shared/components/organisms/TimerWidget";
import { MusicPlayer } from "@/shared/components/organisms/MusicPlayer/MusicPlayer";
import { AchievementsSection } from "@/shared/components/organisms/HealthDashboard/AchievementsSection";
import { HealthMetricsSection } from "@/shared/components/organisms/HealthDashboard/HealthMetricsSection";
import { RecentActivitiesSection } from "@/shared/components/organisms/HealthDashboard/ActivitiesSection";
// import { HealthTipsSection } from "@/shared/components/organisms/HealthDashboard/HealthTipsSection";
import { Sidebar } from "@/shared/components/organisms/sidebar/Sidebar";
import { SidebarToggle } from "@/shared/components/atoms/SidebarToggle";
import PreCodeSetupCheck from "@/shared/components/organisms/PreCodeSetupCheck";
import SmartAlarms from "@/shared/components/organisms/SmartAlarms";
import { DashboardHeader } from "@/shared/components/organisms/DashboardHeader";
import { MoodWidget } from "@/shared/components/organisms/MoodWidget";
import { MiniCalendar } from "@/shared/components/organisms/MiniCalendar";

export function DashboardPage() {
  // const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-green-900 to-blue-900/60 text-white overflow-y-auto">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar Toggle Button */}
      <SidebarToggle toggleSidebar={toggleSidebar} />

      {/* import do dashboard header */}
      <DashboardHeader sidebarOpen={sidebarOpen} />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 opacity-20 blur-2xl animate-pulse" />

      {/* Main Grid */}
      <main
        className={`w-full mx-auto px-5 py-10 transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-20"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* primeira coluna: como vc esta se sentindo + metricas saude dev */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Widget de Humor - Versão Dev */}
            <MoodWidget
              onMoodSelect={(mood) => {
                // logica para salvar o humor selecionado
                console.log("Humor selecionado:", mood);
              }}
            />

            <section className="bg-gray-900 rounded-xl border border-green-400 p-5 shadow-lg shadow-green-500">
              <HealthMetricsSection />
            </section>
          </motion.div>

          {/* segunda coluna: missoes do dia + timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 h-fit"
          >
            <PreCodeSetupCheck />
            <SmartAlarms />
            <section className="bg-gray-400/5 shadow-lg shadow-blue-500 rounded-xl w-fit mx-auto justify-center border border-white/10 p-5">
              <ProductivityTimer />
            </section>
            <MiniCalendar />
          </motion.div>

          {/* terceira coluna: player de musica + atividades recentes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* section do player de musica */}
            <section className="bg-white/5 rounded-xl w-fit mx-auto justify-center border border-white/10 p-5 shadow-lg shadow-green-400">
              <div className="w-fit rounded-xl shadow-lg shadow-blue-500">
                <MusicPlayer />
              </div>
            </section>

            {/* section das atividades recentes */}
            <section className="bg-black/50 rounded-xl border border-green-500 p-5 shadow-lg">
              <RecentActivitiesSection />
            </section>

            {/* section das conquistas */}
            <section className="bg-black/50 rounded-xl border border-green-500 p-5 shadow-xl">
              <AchievementsSection />
            </section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
