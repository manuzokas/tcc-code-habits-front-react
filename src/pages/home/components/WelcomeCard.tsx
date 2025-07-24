import { motion } from "framer-motion";
import { Card } from "@/shared/components/atoms/Card";
import { Icon } from "@/shared/components/atoms/Icon";
import { MetricCard } from "@/shared/components/atoms/MetricCard";
import { demoData } from "@/shared/constants/healthDashboard";
import type { PersonaType } from "@/features/onboarding/types/personas";

interface WelcomeCardProps {
  userName?: string;
  persona?: PersonaType;
}

export const WelcomeCard = ({ userName, persona }: WelcomeCardProps) => {
  return (
    <Card
      className="w-full col-span-1 md:col-span-2 rounded-xl mb-4 relative overflow-hidden bg-gray-800/50 border border-gray-700 hover:border-green-500/30 transition-colors"
      hoverEffect
    >
      <div className="relative h-full px-4 py-4">
        <motion.div
          className="absolute top-1/2 left-1/2 w-full h-full bg-green-500/3 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0, 0.03, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="mr-2 p-1 rounded-md bg-gradient-to-br from-green-500/80 to-blue-600/80">
                <Icon name="HeartPulse" className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Olá, {userName || "Dev"}!
                </h3>
                <p className="text-[0.65rem] text-gray-400">
                  {persona?.description || "Seu acompanhamento de bem-estar"}
                </p>
              </div>
            </div>
            <span className="text-[0.65rem] font-medium bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded-full border border-green-500/20 flex items-center gap-1">
              <Icon name="Activity" className="w-2.5 h-2.5" />
              {persona?.name || "Perfil"}{" "}
            </span>
          </div>

          {/* Message */}
          <div className="mb-3 text-gray-300">
            <p className="text-xs leading-snug">
              Equilíbrio entre{" "}
              <span className="font-medium text-green-300">produtividade</span>{" "}
              e <span className="font-medium text-blue-300">saúde</span>
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <MetricCard
              icon="Accessibility"
              title="Postura"
              value={demoData.postureQuality}
              detail={`${demoData.postureTime} alertas`}
              color="green"
              compact
            />
            <MetricCard
              icon="Eye"
              title="Visão"
              value={demoData.eyeStrain}
              detail={`${demoData.lastEyeBreak} atrás`}
              color="blue"
              compact
            />
            <MetricCard
              icon="Droplet"
              title="Água"
              value={demoData.waterIntake}
              detail={`Próxima ${demoData.waterReminder}`}
              color="cyan"
              compact
            />
          </div>

          {/* Tip */}
          <div className="mt-auto p-1.5 bg-yellow-400/10 rounded border border-yellow-500/20">
            <div className="flex items-start">
              <Icon
                name="Lightbulb"
                className="w-3 h-3 mt-px mr-1.5 text-yellow-400 flex-shrink-0"
              />
              <p className="text-[0.65rem] text-gray-300 leading-snug">
                <span className="font-medium">Dica:</span> 50min código → 10min
                alongamento
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full filter blur-lg -z-10"></div>
      </div>
    </Card>
  );
};
