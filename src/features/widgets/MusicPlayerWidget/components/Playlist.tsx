import { motion, AnimatePresence } from "framer-motion";
import { ListMusic, Binary } from "lucide-react";
import type { Track } from "../types/playerTypes";

export const Playlist = ({
  tracks,
  currentTrackId,
  onTrackChange,
  showPlaylist,
}: {
  tracks: Track[];
  currentTrackId: string;
  onTrackChange: (track: Track) => void;
  showPlaylist: boolean;
}) => {
  return (
    <AnimatePresence>
      {showPlaylist && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="border-t border-gray-800/50 p-4">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <ListMusic size={16} />
              Playlist
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900/30">
              {tracks.map((track) => (
                <motion.div
                  key={track.id}
                  onClick={() => onTrackChange(track)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    currentTrackId === track.id
                      ? "bg-gray-800/70"
                      : "hover:bg-gray-800/40"
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-800/50 flex-shrink-0">
                    {track.cover ? (
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Binary size={14} className="text-gray-500" />
                      </div>
                    )}
                    {track.language && (
                      <div
                        className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: track.color }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {track.artist}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {track.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] px-2 py-0.5 bg-gray-800/70 text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-500">
                      {track.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
