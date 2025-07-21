import { motion } from "framer-motion";

interface TimerDisplayProps {
  time: number;
  isActive: boolean;
  className?: string;
}

export function TimerDisplay({ time, isActive, className }: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      animate={{
        scale: isActive ? [1, 1.05, 1] : 1,
        color: isActive ? "#ffffff" : "#9ca3af",
      }}
      transition={{ duration: isActive ? 1.5 : 0.5 }}
      className={`text-8xl font-bold font-mono ${className}`}
    >
      {formatTime(time)}
    </motion.div>
  );
}
