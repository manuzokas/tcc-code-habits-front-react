import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: typeof Spotify.Player;
    };
  }
}

export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  uri: string;
}

interface SpotifyTopTrackItem {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  uri: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSpotifyPlayer = (accessToken: string | null) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [cachedTopTracks, setCachedTopTracks] = useState<{
    data: SpotifyTrack[];
    timestamp: number;
  }>({
    data: [],
    timestamp: 0,
  });

  const playerRef = useRef<Spotify.Player | null>(null);

  useEffect(() => {
    if (!accessToken) {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
      setPlayer(null);
      setCurrentTrack(null);
      setIsPlaying(false);
      return;
    }

    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.head.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Dev Player",
        getOAuthToken: (cb: (token: string) => void) => cb(accessToken),
        volume: volume / 100,
      });

      setPlayer(spotifyPlayer);
      playerRef.current = spotifyPlayer;

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        console.log("Spotify Player está pronto! Device ID:", device_id);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.warn("Dispositivo não está pronto:", device_id);
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          setCurrentTrack(null);
          setIsPlaying(false);
          return;
        }

        const track = state.track_window.current_track;
        if (track) {
          setCurrentTrack({
            id: track.id!,
            title: track.name,
            artist: track.artists.map((a) => a.name).join(", "),
            album: track.album.name,
            cover: track.album.images[0]?.url || "",
            duration: state.duration,
            uri: track.uri,
          });
          setIsPlaying(!state.paused);
        } else {
          setCurrentTrack(null);
          setIsPlaying(false);
        }
      });

      spotifyPlayer.connect().then((success) => {
        if (!success) {
          setError("Falha ao conectar o Spotify Player.");
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [accessToken, volume]);

  const playTrack = async (trackUri: string) => {
    if (!accessToken || !deviceId) {
      setError("Não foi possível tocar. Token ou Device ID ausente.");
      return;
    }

    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            uris: [trackUri],
          }),
        }
      );
    } catch (err) {
      console.error("Erro ao iniciar a reprodução no Spotify:", err);
      setError("Erro ao iniciar a reprodução. Tente novamente.");
    }
  };

  const getUsersTopTracks = async (): Promise<SpotifyTrack[]> => {
    if (!accessToken) return [];

    const currentTime = Date.now();
    const cacheDuration = 15 * 60 * 1000;

    if (
      cachedTopTracks.data.length > 0 &&
      currentTime - cachedTopTracks.timestamp < cacheDuration
    ) {
      console.log("Usando dados em cache para as top tracks.");
      return cachedTopTracks.data;
    }

    let retries = 0;
    const maxRetries = 5;
    const initialDelay = 1000;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=5",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const waitTime = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : initialDelay * 2 ** retries;

          console.warn(
            `Limite de taxa atingido. Tentando novamente em ${waitTime / 1000}s...`
          );

          await delay(waitTime);
          retries++;
          continue;
        }

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        const tracks = data.items.map((item: SpotifyTopTrackItem) => ({
          id: item.id,
          title: item.name,
          artist: item.artists.map((a) => a.name).join(", "),
          album: item.album.name,
          cover: item.album.images[0]?.url || "",
          uri: item.uri,
        }));

        setCachedTopTracks({
          data: tracks,
          timestamp: currentTime,
        });

        return tracks;
      } catch (err) {
        console.error("Erro ao buscar top tracks:", err);
        if (retries === maxRetries) {
          setError(
            "Falha ao carregar as top tracks do Spotify após várias tentativas."
          );
          return [];
        }
        const backoffTime = initialDelay * 2 ** retries;
        await delay(backoffTime);
        retries++;
      }
    }

    setError("Falha inesperada ao carregar as top tracks.");
    return [];
  };

  const togglePlay = async () => {
    if (!player) return;
    try {
      await player.togglePlay();
    } catch (err) {
      console.error("Erro ao pausar/tocar:", err);
      setError("Erro ao pausar/tocar a música.");
    }
  };

  const nextTrack = async () => {
    if (!player) return;
    await player.nextTrack();
  };

  const prevTrack = async () => {
    if (!player) return;
    await player.previousTrack();
  };

  const setPlayerVolume = async (newVol: number) => {
    if (!player) return;
    try {
      await player.setVolume(newVol / 100);
      setVolume(newVol);
    } catch (err) {
      console.error("Erro ao ajustar volume:", err);
      setError("Erro ao ajustar o volume.");
    }
  };

  return {
    player,
    isAuthenticated: !!accessToken,
    currentTrack,
    isPlaying,
    volume,
    deviceId,
    error,
    playTrack,
    getUsersTopTracks,
    togglePlay,
    nextTrack,
    prevTrack,
    setPlayerVolume,
  };
};
