import { useInterruptions } from "../hooks/useInterruptions";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/shared/components/atoms/Icon";
import { Tooltip } from "@/shared/components/atoms/Tooltip";
import { InterruptionsIcon } from "./InterruptionsIcon";
import { TimerDisplay } from "./TimerDisplay";

export const InterruptionsWidget = () => {
  const {
    isLoading,
    activeInterruption,
    elapsedTime,
    startInterruption,
    stopInterruption,
    interruptionToReview,
    finalizeInterruption,
  } = useInterruptions();

  const renderContent = () => {
    if (activeInterruption) {
      const isMeeting = activeInterruption.type === "MEETING";
      return (
        <motion.div
          key="active"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isMeeting ? "bg-blue-400" : "bg-red-400"} animate-pulse`}
            ></div>
            <p className="text-sm text-gray-300">
              {isMeeting ? "Reunião" : "Bug Urgente"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <TimerDisplay elapsedSeconds={elapsedTime} />
            <Tooltip content="Finalizar">
              <button
                onClick={stopInterruption}
                className="p-2 bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg border border-gray-700 hover:border-red-500/50 transition-colors"
              >
                <Icon name="Square" className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </motion.div>
      );
    }

    if (interruptionToReview) {
      const isMeeting = interruptionToReview.type === "MEETING";
      const question = isMeeting
        ? "A reunião foi produtiva?"
        : "O bug foi resolvido?";
      const yesOutcome = isMeeting ? "PRODUCTIVE" : "RESOLVED";
      const noOutcome = isMeeting ? "UNPRODUCTIVE" : "UNRESOLVED";

      return (
        <motion.div
          key="review"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full flex flex-col items-center gap-3"
        >
          <p className="text-sm text-gray-300">{question}</p>
          <div className="w-full grid grid-cols-2 gap-2">
            <button
              onClick={() => finalizeInterruption(yesOutcome)}
              className="py-2 bg-green-500/10 hover:bg-green-500/20 text-green-300 rounded-md text-sm font-semibold transition-colors"
            >
              Sim
            </button>
            <button
              onClick={() => finalizeInterruption(noOutcome)}
              className="py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-md text-sm font-semibold transition-colors"
            >
              Não
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="inactive"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full flex items-center justify-center"
      >
        <div className="flex items-center p-1 bg-gray-800 rounded-full border border-gray-700">
          <Tooltip content="Reunião de Última Hora">
            <button
              onClick={() => startInterruption("MEETING")}
              className="p-2 rounded-full hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Icon name="Users" className="w-5 h-5" />
            </button>
          </Tooltip>
          <div className="w-px h-4 bg-gray-700 mx-1"></div>{" "}
          <Tooltip content="Bug Urgente">
            <button
              onClick={() => startInterruption("BUG")}
              className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Icon name="Bug" className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="w-fit bg-red-950/30 border border-red-200 rounded-xl px-3 flex mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InterruptionsIcon />
          <h2 className="text-sm font-semibold text-gray-200">
            Registrar Interrupção
          </h2>
          <Tooltip content="Registre interrupções não planejadas, como reuniões ou bugs urgentes.">
            <Icon name="Info" className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
      </div>
      <div className=" rounded-lg p-3 min-h-[52px] flex items-center">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <p className="text-xs text-center w-full text-gray-500">
              Carregando...
            </p>
          ) : (
            renderContent()
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
