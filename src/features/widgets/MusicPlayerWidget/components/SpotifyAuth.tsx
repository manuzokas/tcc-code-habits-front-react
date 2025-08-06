import React from "react";

interface SpotifyAuthProps {
  spotifyAccessToken: string | null;
}

export const SpotifyAuth: React.FC<SpotifyAuthProps> = ({
  spotifyAccessToken,
}) => {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/login";
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      {spotifyAccessToken ? (
        <div className="flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-600/30">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Spotify Conectado
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-gray-800/70 hover:bg-gray-700/90 text-gray-300 hover:text-white px-3 py-1 rounded-full text-xs border border-gray-700 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Conectar Spotify
        </button>
      )}
    </div>
  );
};
