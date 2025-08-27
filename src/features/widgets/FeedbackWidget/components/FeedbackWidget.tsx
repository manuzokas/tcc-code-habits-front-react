/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductivityFeedback } from "../hooks/useProductivityFeedback";
import type { ProductivityFeedbackWidgetProps } from "../types/feedback";
import { FeedbackIcon } from "./FeedbackIcon";
import { Tooltip } from "@/shared/components/atoms/Tooltip";
import { Icon } from "@/shared/components/atoms/Icon";

const feedbackOptions = [
  {
    rating: 1,
    label: "Improdutivo",
    colorClass: "text-red-500",
    borderClass: "border-red-500/50",
  },
  {
    rating: 2,
    label: "Pouco produtivo",
    colorClass: "text-orange-400",
    borderClass: "border-orange-400/50",
  },
  {
    rating: 3,
    label: "Neutro",
    colorClass: "text-yellow-400",
    borderClass: "border-yellow-400/50",
  },
  {
    rating: 4,
    label: "Produtivo",
    colorClass: "text-green-400",
    borderClass: "border-green-400/50",
  },
  {
    rating: 5,
    label: "Muito produtivo",
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-400/50",
  },
];

export const FeedbackWidget = ({
  className = "",
}: ProductivityFeedbackWidgetProps) => {
  const { currentFeedback, isLoading, saveFeedback, clearFeedback } =
    useProductivityFeedback();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    if (currentFeedback !== null) {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, [currentFeedback]);

  const handleMouseDown = useCallback(() => {
    setIsHolding(true);
    const timer = setTimeout(() => {
      setIsUnlocked(true);
      setIsHolding(false);
    }, 1500);

    (window as any).holdTimer = timer;
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsHolding(false);
    if ((window as any).holdTimer) {
      clearTimeout((window as any).holdTimer);
    }
  }, []);

  return (
    <section
      className={`bg-gradient-to-br from-gray-950 to-blue-900/40 rounded-xl border border-emerald-500 p-5 shadow-lg shadow-blue-500/10 transition-colors duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FeedbackIcon />
          <h2 className="text-md font-semibold text-gray-200">
            Retrospectiva do Dia
          </h2>
          <Tooltip content="Após finalizar seu dia de trabalho, faça uma autoavaliação da sua produtividade.">
            <Icon name="Info" className="w-4 h-4 text-gray-500 cursor-help" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          {isUnlocked && currentFeedback !== null && (
            <Tooltip content="Refazer avaliação">
              <button
                onClick={() => clearFeedback()}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Icon name="RotateCcw" className="w-4 h-4" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      <motion.div
        className="relative rounded-lg overflow-hidden"
        animate={{ height: isUnlocked ? "auto" : 116 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-fit backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6"
            >
              <p className="text-sm text-gray-300 mb-3">
                Já finalizou por hoje?
              </p>
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="relative w-full h-10 flex items-center justify-center overflow-hidden text-center bg-gray-800 border border-gray-700 rounded-full px-4 text-sm font-semibold text-gray-200"
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-emerald-500/30"
                  initial={{ width: "0%" }}
                  animate={{ width: isHolding ? "100%" : "0%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Icon name="Moon" className="w-4 h-4" />
                  Segure para Avaliar
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex items-center justify-between gap-2 transition-all duration-300 ${
            !isUnlocked ? "blur-sm pointer-events-none" : ""
          }`}
        >
          {isLoading ? (
            <p className="w-full text-gray-400 text-center text-sm py-4">
              Carregando...
            </p>
          ) : (
            feedbackOptions.map((option) => (
              <Tooltip content={option.label} key={option.rating}>
                <button
                  onClick={() => saveFeedback(option.rating)}
                  disabled={!isUnlocked}
                  className={`flex-1 aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 border-2
                    ${
                      currentFeedback === option.rating
                        ? `${option.borderClass} bg-white/10 scale-110`
                        : "border-transparent hover:bg-white/5"
                    }
                    ${!isUnlocked ? "cursor-not-allowed" : ""}
                  `}
                >
                  <span className={option.colorClass}>{option.rating}</span>
                </button>
              </Tooltip>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};
