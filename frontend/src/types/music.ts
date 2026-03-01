export interface Song {
  id: string;
  index: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
  duration: number; // seconds
}

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
  createdAt: number;
}
