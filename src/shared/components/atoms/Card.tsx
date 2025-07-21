import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({
  children,
  className = "",
  hoverEffect = true,
}: CardProps) => {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? { scale: 1.02, boxShadow: "0px 10px 30px rgba(74, 222, 128, 0.2)" }
          : {}
      }
      className={`rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
};
