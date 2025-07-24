import { motion } from "framer-motion";
import { Icon, type IconName } from "@/shared/components/atoms/Icon";
import { HealthTipCard } from "@/features/dev-health-metrics/components/HealthTipCard";
import { healthTips } from "@/shared/constants/healthDashboard";
import type { PersonaType } from "@/features/onboarding/types/personas";

interface HealthTipsSectionProps {
  persona?: PersonaType;
}

export const HealthTipsSection = ({ persona }: HealthTipsSectionProps) => {
  // Filtra dicas baseadas na persona se existir
  const filteredTips = persona
    ? healthTips.filter((tip) => tip.recommendedFor?.includes(persona.id))
    : healthTips;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl border border-gray-700 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-white flex items-center gap-2">
          <Icon name="Lightbulb" className="w-4 h-4 text-yellow-400" />
          Dicas de Saúde {persona?.name ? `para ${persona.name}` : "Dev"}
        </h3>
        <span className="text-[0.65rem] bg-yellow-900/20 text-yellow-400 px-1.5 py-0.5 rounded-full">
          {filteredTips.length} recomendações
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {filteredTips.map((tip, index) => (
          <HealthTipCard
            key={index}
            title={tip.title}
            description={tip.description}
            category={tip.category}
            icon={tip.icon as IconName}
            compact
          />
        ))}
      </div>
    </motion.div>
  );
};
