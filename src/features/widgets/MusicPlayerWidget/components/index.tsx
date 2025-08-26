import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Maximize2,
  Minimize2,
  ListMusic,
  Code,
  Pause,
  Play,
} from "lucide-react";

import { SpotifyAuth } from "./SpotifyAuth";
import { PlayerControls } from "./PlayerControls";
import { TrackInfo } from "./TrackInfo";
import { Playlist } from "./Playlist";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import {
  useSpotifyPlayer,
  type SpotifyTrack as SpotifyApiTrack,
} from "../hooks/useSpotify";

import type { Track, PlayerMode } from "../types/playerTypes";

interface MusicPlayerProps {
  spotifyAccessToken: string | null;
  onLogout: () => void;
}

export const MusicPlayer = ({
  spotifyAccessToken,
  onLogout,
}: MusicPlayerProps) => {
  const [mode, setMode] = useState<PlayerMode>("local");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMiniMode, setIsMiniMode] = useState(true);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [spotifyTracks, setSpotifyTracks] = useState<Track[]>([]);
  const [hasFetchedTracks, setHasFetchedTracks] = useState(false);

  const localPlayer = useAudioPlayer();
  const localAudioRef = localPlayer.audioRef;

  const spotifyPlayer = useSpotifyPlayer(spotifyAccessToken);

  useEffect(() => {
    let isMounted = true;

    const fetchTracks = async () => {
      if (
        spotifyPlayer.isAuthenticated &&
        spotifyPlayer.deviceId &&
        !hasFetchedTracks
      ) {
        setMode("spotify");

        try {
          const tracks = await spotifyPlayer.getUsersTopTracks();
          if (isMounted) {
            const convertedTracks = tracks.map((track: SpotifyApiTrack) => ({
              id: track.id,
              title: track.title,
              artist: track.artist,
              cover: track.cover,
              src: undefined,
              spotifyId: track.id,
              spotifyUri: track.uri,
              duration: `${Math.floor(track.duration / 60)}:${String(
                track.duration % 60
              ).padStart(2, "0")}`,
            }));
            setSpotifyTracks(convertedTracks);
            setHasFetchedTracks(true);
          }
        } catch (error) {
          console.error("Erro ao buscar top tracks:", error);
        }
      } else if (!spotifyPlayer.isAuthenticated) {
        setMode("local");
        setHasFetchedTracks(false);
        setSpotifyTracks([]);
      }
    };

    fetchTracks();

    return () => {
      isMounted = false;
    };
  }, [
    spotifyPlayer.isAuthenticated,
    spotifyPlayer.deviceId,
    hasFetchedTracks,
  ]); 

  const currentTrack: Track | null =
    mode === "local"
      ? localPlayer.currentTrack
      : spotifyPlayer.currentTrack
        ? ({
            id: spotifyPlayer.currentTrack.id,
            title: spotifyPlayer.currentTrack.title,
            artist: spotifyPlayer.currentTrack.artist,
            album: spotifyPlayer.currentTrack.album,
            cover: spotifyPlayer.currentTrack.cover,
            uri: spotifyPlayer.currentTrack.uri,
            spotifyUri: spotifyPlayer.currentTrack.uri,
            duration: `${Math.floor(
              spotifyPlayer.currentTrack.duration / 60
            )}:${String(spotifyPlayer.currentTrack.duration % 60).padStart(
              2,
              "0"
            )}`,
          } as Track)
        : localPlayer.currentTrack;

  const isPlaying =
    mode === "local" ? localPlayer.isPlaying : spotifyPlayer.isPlaying;

  const volume =
    mode === "local" ? localPlayer.volume : spotifyPlayer.volume / 100;

  const isMuted = mode === "local" ? localPlayer.isMuted : volume === 0;

  const handlePlayPause = () => {
    if (mode === "local") {
      localPlayer.handlePlayPause();
    } else {
      spotifyPlayer.togglePlay();
    }
  };

  const handleNextTrack = () => {
    if (mode === "local") {
      localPlayer.handleNextTrack();
    } else {
      spotifyPlayer.nextTrack();
    }
  };

  const handlePrevTrack = () => {
    if (mode === "local") {
      localPlayer.handlePrevTrack();
    } else {
      spotifyPlayer.prevTrack();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (mode === "local") {
      localPlayer.handleVolumeChange(e);
    } else {
      spotifyPlayer.setPlayerVolume(newVolume * 100);
    }
  };

  const toggleMute = () => {
    if (mode === "local") {
      localPlayer.toggleMute();
    } else {
      const newVolume = isMuted ? 50 : 0;
      spotifyPlayer.setPlayerVolume(newVolume);
    }
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const toggleMiniMode = () => {
    setIsMiniMode(!isMiniMode);
    if (isMiniMode && showPlaylist) {
      setShowPlaylist(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col bg-gradient-to-br from-black to-blue-950 ring-2 ring-green-600 rounded-2xl overflow-hidden transition-all duration-300 ${
        isMiniMode ? "w-72" : "w-[300px]"
      } shadow-2xl border border-green-200`}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
      <div className="relative z-10 flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <Terminal size={18} />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                Dev Player
              </span>
              <span className="text-xs text-gray-400">
                {mode === "local" ? "Modo Local" : "Spotify Premium"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 ">
            <button
              onClick={togglePlaylist}
              className={`p-1.5 rounded-full transition-colors ${
                showPlaylist
                  ? "bg-blue-600/80 text-white"
                  : "bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white"
              }`}
              aria-label="Mostrar playlist"
            >
              <ListMusic size={16} />
            </button>
            <button
              onClick={toggleMiniMode}
              className="p-1.5 rounded-full bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors"
              aria-label={isMiniMode ? "Expandir" : "Minimizar"}
            >
              {isMiniMode ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
          </div>
        </div>

        <SpotifyAuth
          spotifyAccessToken={spotifyAccessToken}
          onLogin={() => {
            window.location.href = "http://localhost:4000/login";
          }}
          onLogout={onLogout}
        />

        <AnimatePresence>
          {!isMiniMode && !showPlaylist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {currentTrack && (
                <TrackInfo
                  track={currentTrack}
                  currentTime={mode === "local" ? localPlayer.currentTime : 0}
                  duration={currentTrack.duration}
                  onProgressChange={
                    mode === "local"
                      ? localPlayer.handleProgressChange
                      : () => {}
                  }
                  isHoveringProgress={isHoveringProgress}
                  setIsHoveringProgress={setIsHoveringProgress}
                />
              )}

              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNextTrack}
                onPrev={handlePrevTrack}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                isMuted={isMuted}
                onToggleMute={toggleMute}
                mode={mode}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMiniMode && !showPlaylist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800/50">
                    {currentTrack?.cover ? (
                      <img
                        src={currentTrack.cover}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code size={14} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="max-w-[120px]">
                    <h4 className="text-sm font-medium text-white truncate">
                      {currentTrack?.title || "Nenhuma música"}
                    </h4>
                    <p className="text-xs text-gray-400 truncate">
                      {currentTrack?.artist || "---"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className={`p-2 rounded-full ${
                      isPlaying
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                    aria-label={isPlaying ? "Pausar" : "Tocar"}
                  >
                    {isPlaying ? (
                      <Pause size={14} />
                    ) : (
                      <Play size={14} className="ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Playlist
          tracks={mode === "local" ? localPlayer.tracks : spotifyTracks}
          currentTrackId={currentTrack?.id || ""}
          onTrackChange={(track: Track) => {
            if (mode === "local") {
              localPlayer.handleTrackChange(track);
            } else if (track.spotifyUri) {
              spotifyPlayer.playTrack(track.spotifyUri);
            }
          }}
          showPlaylist={showPlaylist}
        />
      </div>

      <audio
        ref={localAudioRef}
        src={mode === "local" ? currentTrack?.src : undefined}
        onEnded={mode === "local" ? localPlayer.handleNextTrack : undefined}
      />
    </div>
  );
};
