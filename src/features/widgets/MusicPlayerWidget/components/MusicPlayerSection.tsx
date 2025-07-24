import { motion } from "framer-motion";
import { MusicPlayer } from "@/features/widgets/MusicPlayerWidget/components/MusicPlayer/MusicPlayer";

export const MusicPlayerSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-none p-10"
    >
      <div className="relative flex items-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-20"></div>
        <div className="relative shadow-xl shadow-green-300/70 bg-green-800/20 rounded-xl p-3 border border-gray-700">
          <MusicPlayer />
        </div>
      </div>
    </motion.div>
  );
};
