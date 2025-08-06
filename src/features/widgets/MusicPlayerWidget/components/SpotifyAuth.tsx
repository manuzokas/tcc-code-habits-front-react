// src/components/SpotifyAuth.tsx
import React from "react";
import { SpotifyLogoIcon } from "@phosphor-icons/react";
import { LogOut } from "lucide-react";

interface SpotifyAuthProps {
  spotifyAccessToken: string | null;
  onLogin: () => void;
  onLogout: () => void; // Nova prop para a função de logout
  className?: string;
}

export const SpotifyAuth: React.FC<SpotifyAuthProps> = ({
  spotifyAccessToken,
  onLogin,
  onLogout,
  className,
}) => {
  return (
    <div className={className}>
      {spotifyAccessToken ? (
        <div className="flex items-center justify-between mx-auto my-2 p-1 text-green-400 max-w-fit rounded-full bg-gray-800/70">
          <div className="flex items-center gap-2 px-2">
            <SpotifyLogoIcon
              size={18}
              weight="fill"
              className="text-green-500"
            />
            <span className="text-xs font-semibold">Spotify Conectado</span>
          </div>
          <button
            onClick={onLogout}
            className="p-1 rounded-full text-red-500 hover:text-red-700 transition-colors"
            aria-label="Sair do Spotify"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={onLogin}
          className="flex items-center justify-center mx-auto m-2 gap-2 px-3 py-1 rounded-full bg-gray-800/70 hover:bg-gray-700/90 text-white transition-colors"
        >
          <SpotifyLogoIcon size={16} className="text-green-500" />
          <span className="text-xs font-semibold">Conectar Spotify</span>
        </button>
      )}
    </div>
  );
};
