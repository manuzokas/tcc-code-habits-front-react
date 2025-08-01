import { MoodIcon } from "../MoodIcon";
import { MoodButton } from "../MoodButton";
import { MOOD_OPTIONS, MOOD_WIDGET_VERSION } from "../../constants/mood";
import type { MoodWidgetProps } from "../../types/mood";
import { useMood } from "../../hooks/useMood";

export const MoodWidget = ({ className = "" }: MoodWidgetProps) => {
  const { currentMood, isLoading, saveMood, clearMood } = useMood();

  const handleMoodSelect = (mood: string) => {
    saveMood(mood);
  };

  return (
    <section
      className={`bg-gradient-to-br from-black/90 to-blue-900/50 rounded-xl border border-green-400 p-5 shadow-lg shadow-blue-500/10 hover:shadow-purple-500/20 transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <MoodIcon />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Debug Your Mood
            </span>
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Selecione seu status emocional hoje
          </p>
        </div>
        <span className="text-xs px-2 py-1 bg-blue-900/50 text-green-300 rounded-full border border-green-700">
          {MOOD_WIDGET_VERSION}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {isLoading ? (
          <p className="text-gray-400 col-span-4 text-center">Carregando...</p>
        ) : (
          MOOD_OPTIONS.map((mood, i) => (
            <MoodButton
              key={i}
              {...mood}
              isSelected={currentMood === mood.label}
              onClick={() => handleMoodSelect(mood.label)}
            />
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-green-700 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Status atual: {currentMood || "Não definido"}
        </span>
        <button
          className="text-xs text-green-300 hover:text-purple-100 flex items-center gap-1"
          onClick={() => clearMood()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 16h5v5"></path>
          </svg>
          Limpar
        </button>
      </div>
    </section>
  );
};
