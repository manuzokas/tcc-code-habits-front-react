import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export const Tooltip = ({ children, content, className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 pointer-events-none"
          >
            <div
              className={`relative backdrop-blur-md bg-gray-900/80 border border-emerald-400/30 text-gray-100 text-xs font-medium rounded-lg shadow-lg px-3.5 py-2.5 w-60 text-center whitespace-normal break-words ${className}`}
            >
              {content}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3">
                <div className="w-3 h-3 bg-gray-900/80 border-r border-b border-emerald-400/30 rotate-45 transform origin-top-left backdrop-blur-md"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
