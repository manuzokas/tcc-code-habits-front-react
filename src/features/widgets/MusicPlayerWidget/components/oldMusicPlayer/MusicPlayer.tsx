// import { useState, useRef, useEffect } from "react";
// import {
//   Code,
//   Terminal,
//   Binary,
//   Volume2,
//   VolumeX,
//   Pause,
//   Play,
//   ListMusic,
//   SkipForward,
//   SkipBack,
//   Maximize2,
//   Minimize2,
//   Waves,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type Track = {
//   id: string;
//   title: string;
//   artist: string;
//   src: string;
//   duration: string;
//   cover?: string;
//   tags?: string[];
//   language?: string;
//   color?: string;
// };

// const devTracks: Track[] = [
//   {
//     id: "1",
//     title: "Async Await",
//     artist: "The Functions",
//     src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//     duration: "3:45",
//     cover:
//       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format",
//     tags: ["Lo-fi", "Concentration"],
//     language: "TypeScript",
//     color: "#3178C6",
//   },
//   {
//     id: "2",
//     title: "Quantum Bits",
//     artist: "Algorithm",
//     src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
//     duration: "5:20",
//     cover:
//       "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format",
//     tags: ["Deep Work", "Ambient"],
//     language: "Python",
//     color: "#3776AB",
//   },
//   {
//     id: "3",
//     title: "React State",
//     artist: "Hook Theory",
//     src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
//     duration: "4:15",
//     cover:
//       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format",
//     tags: ["Focus", "Electronic"],
//     language: "JavaScript",
//     color: "#F7DF1E",
//   },
// ];

// export const MusicPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState<Track>(devTracks[0]);
//   const [volume, setVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showPlaylist, setShowPlaylist] = useState(false);
//   const [isMiniMode, setIsMiniMode] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isHoveringProgress, setIsHoveringProgress] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   useEffect(() => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.play().catch((error) => {
//         console.error("Playback error:", error);
//         setIsPlaying(false);
//       });
//     } else {
//       audioRef.current.pause();
//     }
//   }, [isPlaying, currentTrack]);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = isMuted ? 0 : volume;
//     }
//   }, [volume, isMuted]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     audio.addEventListener("timeupdate", updateTime);

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//     };
//   }, []);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleTrackChange = (track: Track) => {
//     setCurrentTrack(track);
//     setCurrentTime(0);
//     if (isPlaying) {
//       setTimeout(() => {
//         audioRef.current?.play().catch(console.error);
//       }, 100);
//     }
//   };

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (isMuted && newVolume > 0) {
//       setIsMuted(false);
//     }
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const togglePlaylist = () => {
//     setShowPlaylist(!showPlaylist);
//   };

//   const toggleMiniMode = () => {
//     setIsMiniMode(!isMiniMode);
//     if (isMiniMode && showPlaylist) {
//       setShowPlaylist(false);
//     }
//   };

//   const handleNextTrack = () => {
//     const currentIndex = devTracks.findIndex((t) => t.id === currentTrack.id);
//     const nextIndex = (currentIndex + 1) % devTracks.length;
//     handleTrackChange(devTracks[nextIndex]);
//   };

//   const handlePrevTrack = () => {
//     const currentIndex = devTracks.findIndex((t) => t.id === currentTrack.id);
//     const prevIndex = (currentIndex - 1 + devTracks.length) % devTracks.length;
//     handleTrackChange(devTracks[prevIndex]);
//   };

//   const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!audioRef.current) return;
//     const newTime = parseFloat(e.target.value) * audioRef.current.duration;
//     audioRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const getTrackDuration = () => {
//     if (!audioRef.current) return currentTrack.duration;
//     return isNaN(audioRef.current.duration)
//       ? currentTrack.duration
//       : formatTime(audioRef.current.duration);
//   };

//   return (
//     <div
//       className={`relative bg-gradient-to-br from-green-950 to-blue-800/70 rounded-2xl overflow-hidden transition-all duration-300 ${
//         isMiniMode ? "w-72" : "w-fit"
//       } shadow-2xl border border-blue-900`}
//     >
//       {/* Glass morphism effect */}
//       <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />

//       {/* Main content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
//               <Terminal size={18} />
//             </div>
//             <div className="flex flex-col">
//               <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
//                 Dev Player
//               </span>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={toggleMiniMode}
//               className="p-1.5 rounded-full bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors"
//             >
//               {isMiniMode ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
//             </button>
//             <button
//               onClick={togglePlaylist}
//               className={`p-1.5 rounded-full transition-colors ${
//                 showPlaylist
//                   ? "bg-blue-600/80 text-white"
//                   : "bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white"
//               }`}
//             >
//               <ListMusic size={16} />
//             </button>
//           </div>
//         </div>

//         {/* Main player area */}
//         <AnimatePresence>
//           {!isMiniMode && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               {/* Visualizer area */}
//               <div className="relative h-48 w-full overflow-hidden">
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-950/80"
//                   style={{
//                     backgroundImage: currentTrack.cover
//                       ? `url(${currentTrack.cover})`
//                       : "none",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     filter: "blur(10px)",
//                     opacity: 0.6,
//                   }}
//                 />

//                 {/* Language badge */}
//                 {currentTrack.language && (
//                   <div
//                     className="z-10 absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm bg-black/30 border border-white/10"
//                     style={{ backgroundColor: currentTrack.color }}
//                   >
//                     {currentTrack.language}
//                   </div>
//                 )}

//                 {/* Album art or code visualization */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   {currentTrack.cover ? (
//                     <motion.div
//                       initial={{ scale: 0.9, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className="w-40 h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10"
//                     >
//                       <img
//                         src={currentTrack.cover}
//                         alt={currentTrack.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       initial={{ scale: 0.9, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className="w-40 h-40 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10"
//                     >
//                       <Code className="w-12 h-12 text-gray-500" />
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Track info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
//                   <motion.h3
//                     initial={{ y: 10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     className="text-xl font-bold text-white truncate"
//                   >
//                     {currentTrack.title}
//                   </motion.h3>
//                   <motion.p
//                     initial={{ y: 5, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                     className="text-sm text-gray-300"
//                   >
//                     {currentTrack.artist}
//                   </motion.p>
//                 </div>
//               </div>

//               {/* Progress bar */}
//               <div className="px-4 pt-4">
//                 <div className="relative">
//                   <div
//                     className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-opacity ${
//                       isHoveringProgress ? "opacity-30" : "opacity-100"
//                     }`}
//                     style={{
//                       width: audioRef.current
//                         ? `${(currentTime / audioRef.current.duration) * 100}%`
//                         : "0%",
//                     }}
//                   />
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={
//                       audioRef.current
//                         ? currentTime / audioRef.current.duration || 0
//                         : 0
//                     }
//                     onChange={handleProgressChange}
//                     onMouseEnter={() => setIsHoveringProgress(true)}
//                     onMouseLeave={() => setIsHoveringProgress(false)}
//                     className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
//                   />
//                   <div className="h-1 w-full bg-gray-800/50 rounded-full" />
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-400 mt-1">
//                   <span>{formatTime(currentTime)}</span>
//                   <span>{getTrackDuration()}</span>
//                 </div>
//               </div>

//               {/* Controls */}
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   {/* Volume control */}
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={toggleMute}
//                       className="text-gray-300 hover:text-white transition-colors"
//                     >
//                       {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={volume}
//                       onChange={handleVolumeChange}
//                       className="w-20 h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
//                     />
//                   </div>

//                   {/* Main controls */}
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={handlePrevTrack}
//                       className="text-gray-300 hover:text-white transition-colors p-2"
//                     >
//                       <SkipBack size={18} />
//                     </button>
//                     <button
//                       onClick={handlePlayPause}
//                       className={`p-3 rounded-full shadow-lg ${
//                         isPlaying
//                           ? "bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
//                           : "bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
//                       } text-white transition-all transform hover:scale-105`}
//                     >
//                       {isPlaying ? (
//                         <Pause size={20} fill="currentColor" />
//                       ) : (
//                         <Play
//                           size={20}
//                           fill="currentColor"
//                           className="ml-0.5"
//                         />
//                       )}
//                     </button>
//                     <button
//                       onClick={handleNextTrack}
//                       className="text-gray-300 hover:text-white transition-colors p-2"
//                     >
//                       <SkipForward size={18} />
//                     </button>
//                   </div>

//                   {/* Visualizer toggle */}
//                   <button className="text-gray-300 hover:text-white transition-colors">
//                     <Waves size={18} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Mini mode */}
//         <AnimatePresence>
//           {isMiniMode && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="flex items-center justify-between p-3">
//                 <div className="flex items-center gap-3">
//                   <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800/50">
//                     {currentTrack.cover ? (
//                       <img
//                         src={currentTrack.cover}
//                         alt={currentTrack.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <Code size={14} className="text-gray-500" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="max-w-[120px]">
//                     <h4 className="text-sm font-medium text-white truncate">
//                       {currentTrack.title}
//                     </h4>
//                     <p className="text-xs text-gray-400 truncate">
//                       {currentTrack.artist}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={handlePlayPause}
//                     className={`p-2 rounded-full ${
//                       isPlaying
//                         ? "bg-red-500/20 text-red-400"
//                         : "bg-green-500/20 text-green-400"
//                     }`}
//                   >
//                     {isPlaying ? (
//                       <Pause size={14} />
//                     ) : (
//                       <Play size={14} className="ml-0.5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Playlist */}
//         <AnimatePresence>
//           {showPlaylist && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="border-t border-gray-800/50 p-4">
//                 <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
//                   <ListMusic size={16} />
//                   Playlist
//                 </h4>
//                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900/30">
//                   {devTracks.map((track) => (
//                     <motion.div
//                       key={track.id}
//                       onClick={() => handleTrackChange(track)}
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
//                         currentTrack.id === track.id
//                           ? "bg-gray-800/70"
//                           : "hover:bg-gray-800/40"
//                       }`}
//                     >
//                       <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-800/50 flex-shrink-0">
//                         {track.cover ? (
//                           <img
//                             src={track.cover}
//                             alt={track.title}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <Binary size={14} className="text-gray-500" />
//                           </div>
//                         )}
//                         {track.language && (
//                           <div
//                             className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
//                             style={{ backgroundColor: track.color }}
//                           />
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-white truncate">
//                           {track.title}
//                         </p>
//                         <p className="text-xs text-gray-400 truncate">
//                           {track.artist}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {track.tags?.map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-[0.65rem] px-2 py-0.5 bg-gray-800/70 text-gray-300 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                         <span className="text-xs text-gray-500">
//                           {track.duration}
//                         </span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <audio ref={audioRef} src={currentTrack.src} onEnded={handleNextTrack} />
//     </div>
//   );
// };
