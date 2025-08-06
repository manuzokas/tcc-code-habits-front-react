import { useState, useRef, useEffect } from "react";
import type { Track } from "../types/playerTypes";

const devTracks: Track[] = [
  {
    id: "1",
    title: "Async Await",
    artist: "The Functions",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:45",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format",
    tags: ["Lo-fi", "Concentration"],
    language: "TypeScript",
    color: "#3178C6",
  },
  {
    id: "2",
    title: "Quantum Bits",
    artist: "Algorithm",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "5:20",
    cover:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format",
    tags: ["Deep Work", "Ambient"],
    language: "Python",
    color: "#3776AB",
  },
  {
    id: "3",
    title: "React State",
    artist: "Hook Theory",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "4:15",
    cover:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format",
    tags: ["Focus", "Electronic"],
    language: "JavaScript",
    color: "#F7DF1E",
  },
];

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(devTracks[0]);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!audioRef.current || !isReady) return;

    const handlePlay = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.error("Playback error:", error);
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      handlePlay();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack, isReady]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);

    const handleCanPlay = () => setIsReady(true);
    audio.addEventListener("canplay", handleCanPlay);

    const handleEnded = () => handleNextTrack();
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    setCurrentTime(0);
    if (isPlaying) {
      setIsPlaying(false);

      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentTrack, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleNextTrack = () => {
    const currentIndex = devTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % devTracks.length;
    handleTrackChange(devTracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = devTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + devTracks.length) % devTracks.length;
    handleTrackChange(devTracks[prevIndex]);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const newTime = parseFloat(e.target.value) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const getTrackDuration = () => {
    if (!audioRef.current) return currentTrack.duration || "0:00";

    return isNaN(audioRef.current.duration)
      ? currentTrack.duration || "0:00"
      : formatTime(audioRef.current.duration);
  };

  return {
    isPlaying,
    currentTrack,
    volume,
    isMuted,
    currentTime,
    audioRef,
    tracks: devTracks,
    formatTime,
    handlePlayPause,
    handleTrackChange,
    handleVolumeChange,
    toggleMute,
    handleNextTrack,
    handlePrevTrack,
    handleProgressChange,
    getTrackDuration,
    isReady,
  };
};
