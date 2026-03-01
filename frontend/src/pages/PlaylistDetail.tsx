import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Play, Music2, ListMusic, Heart } from 'lucide-react';
import { usePlaylists } from '../hooks/usePlaylists';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import SongCard from '../components/SongCard';
import type { Song } from '../types/music';

interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

export default function PlaylistDetail() {
  const { playlistId } = useParams({ from: '/playlists/$playlistId' });
  const { getPlaylist, removeSongFromPlaylist } = usePlaylists();
  const { playQueue } = useMusicPlayer();

  const playlist = getPlaylist(playlistId);

  if (!playlist) {
    return (
      <div className="min-h-screen pb-32 flex flex-col items-center justify-center gap-4">
        <Music2 className="w-12 h-12 text-silver/20" />
        <p className="text-silver/60 font-body text-sm">Playlist not found.</p>
        <Link
          to="/playlists"
          className="flex items-center gap-2 px-4 py-2 border border-silver/30 text-silver font-body text-sm hover:bg-silver/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Playlists
        </Link>
      </div>
    );
  }

  const songs: ExtendedSong[] = (playlist.songs || []) as ExtendedSong[];

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playQueue(songs as any[], 0);
    }
  };

  const handleRemoveSong = (songId: string) => {
    removeSongFromPlaylist(playlistId, songId);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-silver/30 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/playlists"
            className="flex items-center gap-2 text-silver/60 hover:text-silver text-sm font-body mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Playlists
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <ListMusic className="w-8 h-8 text-silver" />
            <h1 className="font-display text-4xl text-silver tracking-widest uppercase">
              {playlist.name}
            </h1>
          </div>
          <p className="text-silver/60 text-sm font-body">
            {songs.length} track{songs.length !== 1 ? 's' : ''}
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
              className="px-4 py-2 text-sm font-body font-medium text-silver/60 hover:text-silver hover:bg-silver/10 border border-transparent transition-colors flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5" />
              Favorites
            </Link>
            <Link
              to="/playlists"
              className="px-4 py-2 text-sm font-body font-medium text-silver bg-silver/10 border border-silver/30 flex items-center gap-1"
            >
              <ListMusic className="w-3.5 h-3.5" />
              Playlists
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Music2 className="w-12 h-12 text-silver/20" />
            <p className="text-silver/60 font-body text-sm text-center">
              This playlist is empty. Add songs from the music browser.
            </p>
            <Link
              to="/music"
              className="flex items-center gap-2 px-4 py-2 border border-silver/30 text-silver font-body text-sm hover:bg-silver/10 transition-colors"
            >
              <Music2 className="w-4 h-4" />
              Browse Music
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-silver/50 text-sm font-body">
                {songs.length} track{songs.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-4 py-2 bg-silver text-black font-body font-semibold text-sm hover:bg-silver/80 transition-colors"
              >
                <Play className="w-4 h-4" />
                Play All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {songs.map((song, idx) => (
                <SongCard
                  key={song.id}
                  song={song as any}
                  index={idx}
                  onRemove={() => handleRemoveSong(song.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
