import { motion } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { backgroundEffects } from "@/shared/constants/healthDashboard";
import { WelcomeCard } from "@/shared/components/organisms/HealthDashboard/WelcomeCard";
import { TimerSection } from "@/shared/components/organisms/HealthDashboard/TimerSection";
import { HealthTipsSection } from "@/shared/components/organisms/HealthDashboard/HealthTipsSection";
import { MusicPlayerSection } from "@/shared/components/organisms/HealthDashboard/MusicPlayerSection";
import { RecentActivitiesSection } from "@/shared/components/organisms/HealthDashboard/ActivitiesSection";
import { HealthMetricsSection } from "@/shared/components/organisms/HealthDashboard/HealthMetricsSection";
import { AchievementsSection } from "@/shared/components/organisms/HealthDashboard/AchievementsSection";
import { WelcomeBanner } from "./HealthDashboard/WelcomeBanner";

export function HealthDashboard() {
  return (
    <section className="relative py-8 px-4 sm:px-6 bg-gradient-to-br from-gray-900/30 to-gray-900/10 min-h-screen overflow-hidden">
      {/* Efeitos de fundo com tema saúde */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {backgroundEffects.map((effect, index) => (
          <div
            key={index}
            className={`absolute ${effect.position} ${effect.size} rounded-full ${effect.color} blur-[100px] ${effect.animation}`}
          ></div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIHg9IjAiIHk9IjAiIGZpbGw9InJnYmEoNzQsMjIyLDEyOCwwLjAxKSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header com tema saúde dev */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/20 border border-green-800/50 mb-4">
            <Icon name="HeartPulse" className="w-4 h-4 text-green-400 mr-2" />
            <span className="font-mono text-[12px] text-green-300">
              DEV HEALTH MONITOR DEMO v2.4
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Cuide da sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              saúde
            </span>{" "}
            enquanto{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              codifica
            </span>
          </h2>
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            Monitoramento inteligente para manter seu bem-estar durante longas
            sessões de desenvolvimento
          </p>
        </motion.div>

        <WelcomeCard />

        {/* Seção Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Saúde Física */}
          <div className="space-y-6">
            <TimerSection />
            <HealthTipsSection />
          </div>

          {/* Coluna Central */}
          <div className="space-y-6">
            <MusicPlayerSection />
            <WelcomeBanner />
            <RecentActivitiesSection />
          </div>

          {/* Coluna Direita */}
          <div className="space-y-6">
            <HealthMetricsSection />
            <AchievementsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
