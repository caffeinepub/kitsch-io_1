import { useState, useCallback } from 'react';
import type { Song } from '../types/music';

interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: ExtendedSong[];
  createdAt: number;
}

const STORAGE_KEY = 'music_playlists_v2';

function loadPlaylists(): Playlist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Playlist[];
  } catch {
    return [];
  }
}

function savePlaylists(playlists: Playlist[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  } catch {
    // Storage quota exceeded or unavailable
  }
}

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>(loadPlaylists);

  const updateAndSave = useCallback((updater: (prev: Playlist[]) => Playlist[]) => {
    setPlaylists(prev => {
      const next = updater(prev);
      savePlaylists(next);
      return next;
    });
  }, []);

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      songs: [],
      createdAt: Date.now(),
    };
    updateAndSave(prev => [...prev, newPlaylist]);
    return newPlaylist.id;
  }, [updateAndSave]);

  const deletePlaylist = useCallback((playlistId: string) => {
    updateAndSave(prev => prev.filter(p => p.id !== playlistId));
  }, [updateAndSave]);

  const renamePlaylist = useCallback((playlistId: string, newName: string) => {
    updateAndSave(prev =>
      prev.map(p => p.id === playlistId ? { ...p, name: newName } : p)
    );
  }, [updateAndSave]);

  const addSongToPlaylist = useCallback((playlistId: string, song: ExtendedSong) => {
    updateAndSave(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        // Avoid duplicates
        if (p.songs.some(s => s.id === song.id)) return p;
        return { ...p, songs: [...p.songs, song] };
      })
    );
  }, [updateAndSave]);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    updateAndSave(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        return { ...p, songs: p.songs.filter(s => s.id !== songId) };
      })
    );
  }, [updateAndSave]);

  const getPlaylist = useCallback((playlistId: string): Playlist | undefined => {
    return playlists.find(p => p.id === playlistId);
  }, [playlists]);

  const getPlaylistSongs = useCallback((playlistId: string): ExtendedSong[] => {
    return playlists.find(p => p.id === playlistId)?.songs || [];
  }, [playlists]);

  return {
    playlists,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylist,
    getPlaylistSongs,
  };
}
