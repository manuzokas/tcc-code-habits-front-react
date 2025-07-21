"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Zap,
  Coffee,
  Pause,
  Play,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Hourglass,
  CheckCircle,
  Code2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

type SessionType = "focus" | "break";

export function ProductivityTimer() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const [isMiniMode, setIsMiniMode] = useState<boolean>(false);
  const [healthTip, setHealthTip] = useState<string>("");
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  // Estado de 'settings' agora é dinâmico com setSettings
  const [settings, setSettings] = useState({
    focusDuration: 50 * 60,
    breakDuration: 10 * 60,
    enableHealthTips: true,
    autoSwitch: true,
    longBreakAfter: 4,
  });

  const switchSession = useCallback(() => {
    const next: SessionType = sessionType === "focus" ? "break" : "focus";
    setSessionType(next);
    setTime(0);
    setIsActive(settings.autoSwitch); // Inicia automaticamente se a opção estiver ligada
  }, [sessionType, settings.autoSwitch]);

  const getHealthTip = useCallback((): string => {
    const tips: Record<SessionType, string[]> = {
      focus: [
        "Evite distrações enquanto codifica",
        "Postura importa: ajuste sua cadeira",
        "Hidrate-se para manter o raciocínio afiado",
        "Use temas escuros para conforto visual",
        "Evite sobrecarga de notificações",
      ],
      break: [
        "Faça alongamentos de punho e ombro",
        "Caminhe por 3 minutos para estimular o cérebro",
        "Beba água e respire fundo",
        "Feche os olhos e relaxe a mandíbula",
        "Olhe para fora da tela por 20 segundos",
      ],
    };
    return tips[sessionType][
      Math.floor(Math.random() * tips[sessionType].length)
    ];
  }, [sessionType]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const currentDuration =
      sessionType === "focus" ? settings.focusDuration : settings.breakDuration;

    if (isActive && time < currentDuration) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (isActive && time >= currentDuration) {
      if (sessionType === "focus") {
        setCompletedSessions((prev) => prev + 1);
      }
      if (settings.autoSwitch) {
        switchSession();
      } else {
        setIsActive(false);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, sessionType, settings, switchSession]);

  useEffect(() => {
    if (!settings.enableHealthTips || isMiniMode) {
      setHealthTip("");
      return;
    }

    setHealthTip(getHealthTip());
    const tipInterval = setInterval(() => {
      setHealthTip(getHealthTip());
    }, 30000);

    return () => clearInterval(tipInterval);
  }, [sessionType, settings.enableHealthTips, getHealthTip, isMiniMode]);

  const formatTime = (seconds: number): string => {
    const currentDuration =
      sessionType === "focus" ? settings.focusDuration : settings.breakDuration;
    const remaining = currentDuration - seconds;
    return `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(
      remaining % 60
    ).padStart(2, "0")}`;
  };

  const progressPercentage = (): number => {
    const currentDuration =
      sessionType === "focus" ? settings.focusDuration : settings.breakDuration;
    return (time / currentDuration) * 100;
  };

  const isLongBreak =
    sessionType === "break" &&
    completedSessions > 0 &&
    completedSessions % settings.longBreakAfter === 0;

  const toggleSession = () => {
    const max =
      sessionType === "focus" ? settings.focusDuration : settings.breakDuration;
    if (time >= max && settings.autoSwitch) return switchSession();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  const handleSessionButtonClick = (type: SessionType) => {
    setSessionType(type);
    resetTimer();
  };

  return (
    <div
      className={`relative mx-auto w-full max-w-md border border-zinc-800 rounded-xl bg-black/60 shadow-2xl backdrop-blur-md p-6 transition-all duration-500 ${
        sessionType === "focus"
          ? "ring-2 ring-blue-500/30"
          : "ring-2 ring-green-500/30"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-md font-medium text-zinc-200">
          <Code2 size={16} className="text-green-400" />
          <span>
            {sessionType === "focus"
              ? "Modo Dev: Foco"
              : isLongBreak
                ? "Pausa Longa"
                : "Pausa Rápida"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMiniMode(!isMiniMode)}
            className="text-zinc-400 hover:text-zinc-100"
          >
            {isMiniMode ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`transition-colors ${showSettings ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* PAINEL DE CONFIGURAÇÕES RESTAURADO */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 space-y-4">
              <h3 className="font-semibold text-center text-zinc-200">
                Configurações
              </h3>

              <div>
                <label className="block text-sm text-zinc-300 mb-1">
                  Foco: {settings.focusDuration / 60}min
                </label>
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={settings.focusDuration / 60}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      focusDuration: parseInt(e.target.value) * 60,
                    })
                  }
                  className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-300 mb-1">
                  Pausa: {settings.breakDuration / 60}min
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={settings.breakDuration / 60}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      breakDuration: parseInt(e.target.value) * 60,
                    })
                  }
                  className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-green-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-sm text-zinc-300">
                  Troca automática
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoSwitch}
                    onChange={(e) =>
                      setSettings({ ...settings, autoSwitch: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-300">
                  Dicas de produtividade
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableHealthTips}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableHealthTips: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-300">
                  Pausa longa após
                </label>
                <select
                  value={settings.longBreakAfter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      longBreakAfter: parseInt(e.target.value),
                    })
                  }
                  className="bg-zinc-800 text-zinc-200 text-sm rounded-md px-2 py-1 border border-zinc-700"
                >
                  {[2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} sessões
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mb-6">
        <div className="flex justify-center items-center relative w-64 h-64 mx-auto">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#27272a"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={sessionType === "focus" ? "#60a5fa" : "#34d399"}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 283 }}
              animate={{
                strokeDashoffset: 283 - (283 * progressPercentage()) / 100,
              }}
              transition={{ duration: 0.5 }}
              strokeDasharray="283"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="relative text-5xl font-mono text-zinc-100">
            {formatTime(time)}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => handleSessionButtonClick("focus")}
          className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors ${
            sessionType === "focus"
              ? "bg-blue-700 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          <Zap size={16} /> Foco
        </button>
        <button
          onClick={toggleSession}
          className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors ${
            isActive ? "bg-red-700 text-white" : "bg-zinc-700 text-zinc-100"
          }`}
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}{" "}
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => handleSessionButtonClick("break")}
          className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors ${
            sessionType === "break"
              ? "bg-green-700 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          <Coffee size={16} /> Pausa
        </button>
      </div>

      <AnimatePresence>
        {!isMiniMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex justify-between text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <Hourglass size={14} /> Sessões: {completedSessions}
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} />{" "}
                {Math.floor(
                  (completedSessions / settings.longBreakAfter) * 100
                )}
                %
              </div>
            </div>
            {healthTip && (
              <div className="text-xs text-zinc-300 bg-zinc-800/50 p-2 rounded-lg text-center">
                💡 {healthTip}
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={resetTimer}
                className="text-xs text-zinc-200 bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded flex items-center gap-1"
              >
                <RefreshCw size={14} /> Reiniciar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
