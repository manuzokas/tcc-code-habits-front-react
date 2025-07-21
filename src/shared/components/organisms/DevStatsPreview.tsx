"use client";

import { motion } from "framer-motion";
import { TerminalIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";

export function DevStatsPreview() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({
    commit: 60,
    pause: 0,
    water: 50,
    level: "Junior Dev III",
    xp: 1245,
    nextLevel: 1550,
  });

  const handleRefactor = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStats({
        commit: Math.floor(Math.random() * 100),
        pause: Math.floor(Math.random() * 100),
        water: Math.floor(Math.random() * 100),
        level: stats.level,
        xp: stats.xp + 10,
        nextLevel: stats.nextLevel,
      });
      setIsRefreshing(false);
    }, 800);
  };

  const renderProgressBar = (value: number, color: string) => {
    const blocks = Math.floor(value / 10);
    return (
      <span className={`text-${color}`}>
        {Array(blocks).fill("█").join("")}
        {Array(10 - blocks)
          .fill("░")
          .join("")}
      </span>
    );
  };

  return (
    <section className="px-6 py-20 bg-[#0d1117] border-t border-b border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <TerminalIcon className="text-green-500 h-6 w-6" />
          <h2 className="text-xl font-bold font-mono text-green-400">
            codehabits-cli --dashboard
          </h2>
          <span className="ml-auto px-2 py-1 text-xs font-mono bg-gray-800 text-green-400 rounded border border-gray-700">
            v2.1.3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-black/70 p-6 rounded-lg border border-gray-800 shadow-lg shadow-green-500/10 overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-auto text-xs text-gray-500 font-mono">
              ssh: dev@codehabits ~/stats
            </div>
          </div>

          {/* Terminal content */}
          <div className="font-mono text-sm text-green-400">
            <div className="mb-1">
              <span className="text-purple-400">$</span> codehabits --status
            </div>

            <div className="ml-4 mb-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-32">Commit streak:</span>
                {renderProgressBar(stats.commit, "green-400")}
                <span className="text-gray-500">{stats.commit}%</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="w-32">Pausas 1h:</span>
                {renderProgressBar(stats.pause, "red-400")}
                <span className="text-gray-500">{stats.pause}%</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="w-32">Hidratação:</span>
                {renderProgressBar(stats.water, "blue-400")}
                <span className="text-gray-500">{stats.water}%</span>
              </div>
            </div>

            <div className="mb-1">
              <span className="text-purple-400">$</span> codehabits --profile
            </div>
            <div className="ml-4 mb-4">
              <div className="flex gap-4 mb-1">
                <span className="w-32">Level:</span>
                <span className="text-yellow-400">{stats.level}</span>
              </div>
              <div className="flex gap-4 mb-1">
                <span className="w-32">XP:</span>
                <span>
                  {stats.xp}/
                  <span className="text-gray-500">{stats.nextLevel}</span>
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-6 pt-4 border-t border-gray-800">
              <span className="text-purple-400">$</span>
              <div>
                <div className="text-gray-500">
                  # Dica: use 'codehabits --refactor' para reiniciar seus
                  hábitos
                </div>
                <button
                  onClick={handleRefactor}
                  disabled={isRefreshing}
                  className="flex items-center gap-1 text-green-400 hover:text-green-300 mt-1"
                >
                  {isRefreshing ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <RefreshCwIcon className="h-4 w-4" />
                  )}
                  <span>codehabits --refactor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Animated cursor */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-green-400 ml-1"
          />
        </motion.div>
      </div>
    </section>
  );
}
