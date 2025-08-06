// src/features/widgets/MusicPlayerWidget/types/playerTypes.ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  src?: string;
  spotifyId?: string;
  spotifyUri?: string;
  duration: string;
  tags?: string[];
  language?: string; 
  color?: string; 
}

export type PlayerMode = "local" | "spotify";
