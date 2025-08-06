import { motion } from "framer-motion";
import { Binary } from "lucide-react";
import type { Track } from "../types/playerTypes";

export const TrackInfo = ({
  track,
  currentTime,
  duration,
  onProgressChange,
  isHoveringProgress,
  setIsHoveringProgress,
}: {
  track: Track;
  currentTime: number;
  duration: string;
  onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isHoveringProgress: boolean;
  setIsHoveringProgress: (hovering: boolean) => void;
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="relative h-48 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-950/80"
          style={{
            backgroundImage: track.cover ? `url(${track.cover})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            opacity: 0.6,
          }}
        />

        {/* Language badge */}
        {track.language && (
          <div
            className="z-10 absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm bg-black/30 border border-white/10"
            style={{ backgroundColor: track.color }}
          >
            {track.language}
          </div>
        )}

        {/* Album art or code visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          {track.cover ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-40 h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10"
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-40 h-40 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10"
            >
              <Binary className="w-12 h-12 text-gray-500" />
            </motion.div>
          )}
        </div>

        {/* Track info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold text-white truncate"
          >
            {track.title}
          </motion.h3>
          <motion.p
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-300"
          >
            {track.artist}
          </motion.p>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="relative">
          <div
            className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-opacity ${
              isHoveringProgress ? "opacity-30" : "opacity-100"
            }`}
            style={{
              width: `${(currentTime / (track.duration ? parseInt(track.duration.split(":")[0]) * 60 : 1)) * 100}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              currentTime /
                (track.duration
                  ? parseInt(track.duration.split(":")[0]) * 60
                  : 1) || 0
            }
            onChange={onProgressChange}
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => setIsHoveringProgress(false)}
            className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
          />
          <div className="h-1 w-full bg-gray-800/50 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{duration}</span>
        </div>
      </div>
    </>
  );
};
