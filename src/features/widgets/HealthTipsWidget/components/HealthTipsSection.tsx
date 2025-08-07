import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { useState, useEffect } from "react";

const healthTips = [
  {
    title: "Faça Pausas Curtas",
    tip: "A cada 50 minutos de trabalho, faça uma pausa de 10. Isso melhora o foco e evita a fadiga.",
  },
  {
    title: "Alongue-se na Cadeira",
    tip: "Alongamentos simples de pescoço, ombros e pulsos a cada hora reduzem a tensão muscular.",
  },
  {
    title: "Hidrate-se Constantemente",
    tip: "Beber água ao longo do dia é crucial para manter a energia, o foco e a função cerebral.",
  },
  {
    title: "Desconecte-se após o Trabalho",
    tip: "Evite checar e-mails e mensagens de trabalho fora do expediente para recarregar as energias.",
  },
  {
    title: "Pratique a Respiração",
    tip: "Tire 1 minuto para respirar fundo e lentamente. Isso acalma o sistema nervoso e reduz o estresse.",
  },
];

export const HealthTipsWidget = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentTip = healthTips[currentTipIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-xl border border-green-500 p-4 relative"
    >
      <h3 className="text-base font-medium bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2 mb-2">
        <Icon name="HeartPulse" className="w-4 h-4 text-red-400" />
        Dica de Saúde
      </h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTipIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="h-fit"
        >
          <h4 className="text-sm font-medium text-white mb-1">
            {currentTip.title}
          </h4>
          <p className="text-xs text-gray-400">{currentTip.tip}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
