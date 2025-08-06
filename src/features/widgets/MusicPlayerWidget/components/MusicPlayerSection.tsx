import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MusicPlayer } from "./"; 
import { PATHS } from "@/routes/path"; 

export const MusicPlayerSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState<string | null>(
    null
  );
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState<string | null>(
    null
  );
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshSpotifyToken = async (currentRefreshToken: string) => {
    try {
      const response = await fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: currentRefreshToken }),
      });

      if (!response.ok) {
        throw new Error("Falha ao refrescar o token");
      }

      const data = await response.json();
      const { access_token, refresh_token, expires_in } = data;

      setSpotifyAccessToken(access_token);
      setSpotifyRefreshToken(refresh_token);
      setTokenExpiresAt(Date.now() + expires_in * 1000);

      localStorage.setItem("spotify_access_token", access_token);
      localStorage.setItem("spotify_refresh_token", refresh_token);
      localStorage.setItem(
        "spotify_token_expires_at",
        (Date.now() + expires_in * 1000).toString()
      );

      console.log("Token do Spotify refrescado com sucesso!");
    } catch (error) {
      console.error("Erro ao refrescar o token:", error);
      setSpotifyAccessToken(null);
      setSpotifyRefreshToken(null);
      setTokenExpiresAt(null);
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_refresh_token");
      localStorage.removeItem("spotify_token_expires_at");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiresIn = params.get("expires_in");

    if (accessToken && refreshToken && expiresIn) {
      const expiresAt = Date.now() + parseInt(expiresIn) * 1000;
      setSpotifyAccessToken(accessToken);
      setSpotifyRefreshToken(refreshToken);
      setTokenExpiresAt(expiresAt);

      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_refresh_token", refreshToken);
      localStorage.setItem("spotify_token_expires_at", expiresAt.toString());

      navigate(PATHS.DASHBOARD, { replace: true });
    } else {
      const storedAccessToken = localStorage.getItem("spotify_access_token");
      const storedRefreshToken = localStorage.getItem("spotify_refresh_token");
      const storedExpiresAt = localStorage.getItem("spotify_token_expires_at");

      if (storedAccessToken && storedRefreshToken && storedExpiresAt) {
        const expiresAtNum = parseInt(storedExpiresAt);
        if (Date.now() < expiresAtNum) {
          setSpotifyAccessToken(storedAccessToken);
          setSpotifyRefreshToken(storedRefreshToken);
          setTokenExpiresAt(expiresAtNum);
        } else {
          console.log("Token expirado, tentando refrescar...");
          refreshSpotifyToken(storedRefreshToken);
        }
      }
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    if (spotifyRefreshToken && tokenExpiresAt) {
      const timeToRefresh = tokenExpiresAt - Date.now() - 5 * 60 * 1000;

      if (timeToRefresh > 0) {
        console.log(
          `Próximo refresh em ${Math.floor(timeToRefresh / 1000 / 60)} minutos.`
        );
        refreshIntervalRef.current = setInterval(() => {
          console.log("Executando refresh automático do token...");
          refreshSpotifyToken(spotifyRefreshToken);
        }, timeToRefresh);
      } else {
        console.log("Token já expirado ou muito próximo, refrescando agora...");
        refreshSpotifyToken(spotifyRefreshToken);
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [spotifyRefreshToken, tokenExpiresAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-none py-0 mx-auto"
    >
      <div className="relative flex items-center">
        <div className="relative shadow-xl shadow-green-400/60 bg-green-800/20 rounded-xl p-3 border border-gray-700">
          <MusicPlayer spotifyAccessToken={spotifyAccessToken} />
        </div>
      </div>
    </motion.div>
  );
};
