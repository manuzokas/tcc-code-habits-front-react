// src/components/SpotifyAuth.tsx
import React from "react";
import { SpotifyLogoIcon } from "@phosphor-icons/react";

interface SpotifyAuthProps {
  spotifyAccessToken: string | null;
  onLogin: () => void;
  className?: string;
}

export const SpotifyAuth: React.FC<SpotifyAuthProps> = ({
  spotifyAccessToken,
  onLogin,
  className,
}) => {
  return (
    <div className={className}>
      {spotifyAccessToken ? (
        <div className="flex items-center justify-center gap-2 p-1 text-green-400">
          <SpotifyLogoIcon size={18} weight="fill" className="text-green-500" />
          <span className="text-xs font-semibold">Spotify Conectado</span>
        </div>
      ) : (
        <button
          onClick={onLogin}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/70 hover:bg-gray-700/90 text-white transition-colors"
        >
          <SpotifyLogoIcon size={16} className="text-green-500" />
          <span className="text-xs font-semibold">Conectar Spotify</span>
        </button>
      )}
    </div>
  );
};
