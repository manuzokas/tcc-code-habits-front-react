// src/features/gamification/components/MissionButton/index.tsx
import { Icon } from "@/shared/components/atoms/Icon";
import { COLORS } from "../../constants/missions";
import type { Mission } from "../../types/missions";

interface MissionButtonProps {
  mission: Mission;
  onAdd: (missionKey: Mission["key"]) => void;
  onComplete: (missionKey: Mission["key"]) => void;
}

export const MissionButton = ({
  mission,
  onAdd,
  onComplete,
}: MissionButtonProps) => {
  const colors = COLORS[mission.color];
  const progressPercentage = (mission.current / mission.total) * 100;
  const isCompleted = mission.isCompleted;

  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/90 px-3 py-2 rounded-lg border ${colors.border} hover:${colors.hoverBorder} transition-all duration-300 w-full ${isCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isCompleted}
      >
        <div
          className={`w-6 h-6 rounded-full ${colors.bg} group-hover:${colors.hoverBg} flex items-center justify-center transition-colors`}
        >
          <Icon name={mission.icon} className={`w-4 h-4 ${colors.text}`} />
        </div>

        <div className="text-left flex-1 min-w-0">
          <span className="block text-xs font-medium text-white truncate">
            {mission.name}
          </span>
          <span className={`block text-xs ${colors.text}`}>
            {isCompleted
              ? "COMPLETA!"
              : `${mission.current}/${mission.total} ${mission.incrementUnit}`}
          </span>
          <div className="mt-1 w-full bg-gray-700 rounded-full h-1">
            <div
              className={`h-full rounded-full ${isCompleted ? "bg-green-500" : `bg-gradient-to-r ${colors.full} to-${colors.hoverFull}`}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <span
          className={`text-xs font-mono ${colors.text} px-2 py-1 rounded ${colors.bgDark}`}
        >
          +{mission.xp} XP
        </span>
      </button>

      {!isCompleted && (
        <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-gray-800 rounded-lg border border-gray-700 shadow-lg z-10 w-full min-w-[200px]">
          <button
            className={`w-full text-left px-3 py-2 text-xs ${colors.full} hover:${colors.hoverFull} transition-colors flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(mission.key);
            }}
          >
            <span>
              +{mission.increment} {mission.incrementUnit}
            </span>
          </button>
          <button
            className="w-full text-left px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onComplete(mission.key);
            }}
          >
            <span>
              Completar ({mission.total} {mission.incrementUnit})
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
