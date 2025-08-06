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
  Save,
} from "lucide-react";
import { useState, useEffect, useCallback, type ChangeEvent } from "react";
import { useTimerConfig } from "../../hooks/useTimerConfig";

type SessionType = "focus" | "break";

export function ProductivityTimer() {
  const { config, isLoading, updateConfig } = useTimerConfig();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const [isMiniMode, setIsMiniMode] = useState<boolean>(false);
  const [healthTip, setHealthTip] = useState<string>("");
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const [localSettings, setLocalSettings] = useState<{
    focus_duration_minutes: number;
    short_break_duration_minutes: number;
    long_break_duration_minutes: number;
    pomodoros_before_long_break: number;
  } | null>(null);

  const switchSession = useCallback(() => {
    if (!config) return;

    if (sessionType === "focus") {
      setCompletedSessions((prev) => prev + 1);
      setSessionType("break");
      setTime(0);
    } else {
      setSessionType("focus");
      setTime(0);
    }
    setIsActive(true);
  }, [sessionType, config]);

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
        "Caminhe por 3 minutos",
        "Beba água e respire fundo",
        "Feche os olhos e relaxe a mandíbula",
        "Olhe para fora da tela por 20 segundos",
      ],
    };
    return (
      tips[sessionType]?.[
        Math.floor(Math.random() * tips[sessionType].length)
      ] || ""
    );
  }, [sessionType]);

  const handleReset = useCallback(() => {
    if (!config) return;
    setIsActive(false);
    setSessionType("focus");
    setTime(0);
    setCompletedSessions(0);
  }, [config]);

  useEffect(() => {
    if (config) {
      setLocalSettings({
        focus_duration_minutes: config.focus_duration_minutes,
        short_break_duration_minutes: config.short_break_duration_minutes,
        long_break_duration_minutes: config.long_break_duration_minutes,
        pomodoros_before_long_break: config.pomodoros_before_long_break,
      });
      setTime(0);
    }
  }, [config]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!config) return;

    const currentDurationInSeconds =
      sessionType === "focus"
        ? config.focus_duration_minutes * 60
        : (completedSessions + 1) % config.pomodoros_before_long_break === 0
          ? config.long_break_duration_minutes * 60
          : config.short_break_duration_minutes * 60;

    if (isActive && time < currentDurationInSeconds) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (isActive && time >= currentDurationInSeconds) {
      setIsActive(false);
      switchSession();
    }

    return () => clearInterval(interval);
  }, [isActive, time, sessionType, config, switchSession, completedSessions]);

  useEffect(() => {
    if (isMiniMode) {
      setHealthTip("");
      return;
    }

    setHealthTip(getHealthTip());
    const tipInterval = setInterval(() => {
      setHealthTip(getHealthTip());
    }, 30000);

    return () => clearInterval(tipInterval);
  }, [sessionType, getHealthTip, isMiniMode]);

  if (isLoading || !config || !localSettings) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-zinc-400">
        <Hourglass size={32} className="animate-spin mr-2" />
        Carregando configurações...
      </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const currentDurationInSeconds =
      sessionType === "focus"
        ? config.focus_duration_minutes * 60
        : (completedSessions + 1) % config.pomodoros_before_long_break === 0
          ? config.long_break_duration_minutes * 60
          : config.short_break_duration_minutes * 60;

    const remaining = currentDurationInSeconds - seconds;
    return `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(
      remaining % 60
    ).padStart(2, "0")}`;
  };

  const progressPercentage = (): number => {
    const currentDurationInSeconds =
      sessionType === "focus"
        ? config.focus_duration_minutes * 60
        : (completedSessions + 1) % config.pomodoros_before_long_break === 0
          ? config.long_break_duration_minutes * 60
          : config.short_break_duration_minutes * 60;
    return (time / currentDurationInSeconds) * 100;
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSessionButtonClick = (type: SessionType) => {
    setIsActive(false);
    setSessionType(type);
    setTime(0);
  };

  const handleSettingsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalSettings((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: parseInt(value),
      };
    });
  };

  const handleSaveSettings = () => {
    if (localSettings) {
      updateConfig({
        focus_duration_minutes: localSettings.focus_duration_minutes,
        short_break_duration_minutes:
          localSettings.short_break_duration_minutes,
        long_break_duration_minutes:
          localSettings.short_break_duration_minutes * 3,
        pomodoros_before_long_break: localSettings.pomodoros_before_long_break,
      });
      setShowSettings(false);
    }
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
          <span>{sessionType === "focus" ? "Modo Dev: Foco" : "Pausa"}</span>
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

      {/* PAINEL DE CONFIGURAÇÕES */}
      <AnimatePresence>
        {showSettings && localSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 space-y-4">
              <h3 className="font-semibold text-center text-zinc-200">
                Configurações do Timer
              </h3>

              <div>
                <label className="block text-sm text-zinc-300 mb-1">
                  Duração do Foco: {localSettings.focus_duration_minutes}min
                </label>
                <input
                  type="range"
                  name="focus_duration_minutes"
                  min="5"
                  max="120"
                  step="5"
                  value={localSettings.focus_duration_minutes}
                  onChange={handleSettingsChange}
                  className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-300 mb-1">
                  Duração da Pausa: {localSettings.short_break_duration_minutes}
                  min
                </label>
                <input
                  type="range"
                  name="short_break_duration_minutes"
                  min="1"
                  max="30"
                  step="1"
                  value={localSettings.short_break_duration_minutes}
                  onChange={handleSettingsChange}
                  className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-green-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-300">
                  Número de Sessões:
                </label>
                <select
                  name="pomodoros_before_long_break"
                  value={localSettings.pomodoros_before_long_break}
                  onChange={handleSettingsChange}
                  className="bg-zinc-800 text-zinc-200 text-sm rounded-md px-2 py-1 border border-zinc-700"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} sessões
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSaveSettings}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Save size={16} /> Salvar
                </button>
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
          onClick={handleToggle}
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
                <Hourglass size={14} /> Foco Completado: {completedSessions} de{" "}
                {config.pomodoros_before_long_break}
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} />{" "}
                {Math.floor(
                  (completedSessions / config.pomodoros_before_long_break) * 100
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
                onClick={handleReset}
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
