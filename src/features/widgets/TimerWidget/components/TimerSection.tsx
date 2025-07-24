import { motion } from "framer-motion";
import { ProductivityTimer } from "@/features/widgets/TimerWidget/components/TimerWidget/index";

export const TimerSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-none flex p-10"
    >
      <div className="relative shadow-xl shadow-green-300/70 bg-green-800/40 rounded-xl p-3 border border-gray-700">
        <ProductivityTimer />
      </div>
    </motion.div>
  );
};
