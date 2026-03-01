import React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, Music2, ListMusic, ArrowLeft, Loader2 } from 'lucide-react';
import { useGetSongFavorites } from '../hooks/useSongFavorites';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import SongCard from '../components/SongCard';
import type { Song } from '../types/music';

interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

/**
 * Reconstruct a minimal Song object from a stored favorite ID and label.
 * Labels are stored as "Title - Artist".
 */
function reconstructSongFromFavorite(songId: string, label: string, index: number): ExtendedSong {
  const dashIndex = label.indexOf(' - ');
  const title = dashIndex >= 0 ? label.substring(0, dashIndex).trim() : label.trim();
  const artist = dashIndex >= 0 ? label.substring(dashIndex + 3).trim() : 'Unknown Artist';

  return {
    id: songId,
    index,
    title: title || 'Unknown Title',
    artist: artist || 'Unknown Artist',
    album: 'Unknown Album',
    genre: 'Unknown',
    year: 2020,
    duration: 180,
    audioUrl: undefined,
    imageUrl: undefined,
  };
}

export default function Favorites() {
  const { data: favoritesData, isLoading, error } = useGetSongFavorites();
  const { playQueue } = useMusicPlayer();

  const songs: ExtendedSong[] = (favoritesData || []).map(([id, label], i) =>
    reconstructSongFromFavorite(id, label, i)
  );

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playQueue(songs as any[], 0);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-silver/30 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-silver fill-current" />
            <h1 className="font-display text-4xl text-silver tracking-widest uppercase">
              Favorites
            </h1>
          </div>
          <p className="text-silver/60 text-sm font-body">
            Your saved tracks
          </p>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="bg-black/80 border-b border-silver/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 py-2">
            <Link
              to="/music"
              className="px-4 py-2 text-sm font-body font-medium text-silver/60 hover:text-silver hover:bg-silver/10 border border-transparent transition-colors flex items-center gap-1"
            >
              <Music2 className="w-3.5 h-3.5" />
              Browse
            </Link>
            <Link
              to="/music/favorites"
              className="px-4 py-2 text-sm font-body font-medium text-silver bg-silver/10 border border-silver/30 flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5" />
              Favorites
            </Link>
            <Link
              to="/playlists"
              className="px-4 py-2 text-sm font-body font-medium text-silver/60 hover:text-silver hover:bg-silver/10 border border-transparent transition-colors flex items-center gap-1"
            >
              <ListMusic className="w-3.5 h-3.5" />
              Playlists
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading && (
          <div className="flex items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 text-silver animate-spin" />
            <p className="text-silver/60 font-body text-sm">Loading favorites...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-silver/60 font-body text-sm">
              Please log in to view your favorites.
            </p>
            <Link
              to="/music"
              className="flex items-center gap-2 px-4 py-2 border border-silver/30 text-silver font-body text-sm hover:bg-silver/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Music
            </Link>
          </div>
        )}

        {!isLoading && !error && songs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Heart className="w-12 h-12 text-silver/20" />
            <p className="text-silver/60 font-body text-sm text-center">
              No favorites yet. Browse music and click the heart icon to save tracks.
            </p>
            <Link
              to="/music"
              className="flex items-center gap-2 px-4 py-2 border border-silver/30 text-silver font-body text-sm hover:bg-silver/10 transition-colors"
            >
              <Music2 className="w-4 h-4" />
              Browse Music
            </Link>
          </div>
        )}

        {!isLoading && !error && songs.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-silver/50 text-sm font-body">
                {songs.length} saved track{songs.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={handlePlayAll}
                className="px-4 py-2 bg-silver text-black font-body font-semibold text-sm hover:bg-silver/80 transition-colors"
              >
                ▶ Play All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {songs.map((song, idx) => (
                <SongCard key={song.id} song={song as any} index={idx} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
