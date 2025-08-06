import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";

export const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
  mode,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  mode: "local" | "spotify";
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max={mode === "local" ? "1" : "100"}
            step="0.01"
            value={volume}
            onChange={onVolumeChange}
            className="w-20 h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onPrev}
            className="text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Previous track"
          >
            <SkipBack size={18} />
          </button>
          <button
            onClick={onPlayPause}
            className={`p-3 rounded-full shadow-lg ${
              isPlaying
                ? "bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                : "bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            } text-white transition-all transform hover:scale-105`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <button
            onClick={onNext}
            className="text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Next track"
          >
            <SkipForward size={18} />
          </button>
        </div>

        <button
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="Visualizer"
        >
          <Waves size={18} />
        </button>
      </div>
    </div>
  );
};
