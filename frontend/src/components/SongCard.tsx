import React, { useState } from 'react';
import { Heart, Plus, Play, Pause, Music, ExternalLink } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { useAddSongFavorite, useRemoveSongFavorite, useGetSongFavorites } from '../hooks/useSongFavorites';
import AddToPlaylistModal from './AddToPlaylistModal';
import type { Song } from '../types/music';

interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

interface SongCardProps {
  song: ExtendedSong;
  index: number;
  onRemove?: () => void;
}

export default function SongCard({ song, index, onRemove }: SongCardProps) {
  const { currentSong, isPlaying, playSong, playQueue, togglePlay } = useMusicPlayer();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const { data: favoritesData } = useGetSongFavorites();
  const addFavorite = useAddSongFavorite();
  const removeFavorite = useRemoveSongFavorite();

  const isCurrentSong = currentSong?.id === song.id;
  const isFavorited = favoritesData?.some(([id]) => id === song.id) ?? false;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      // Pass the song with audioUrl for API tracks
      playSong(song as any);
    }
  };

  const handleFavoriteToggle = async () => {
    if (isFavorited) {
      removeFavorite.mutate(song.id);
    } else {
      addFavorite.mutate({ songId: song.id, songLabel: `${song.title} - ${song.artist}` });
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div
        className={`group relative flex flex-col bg-black/60 border transition-all duration-200 ${
          isCurrentSong
            ? 'border-silver shadow-silver-sm'
            : 'border-silver/20 hover:border-silver/50'
        }`}
      >
        {/* Album art / placeholder */}
        <div className="relative aspect-square bg-black/80 overflow-hidden">
          {(song as ExtendedSong).imageUrl ? (
            <img
              src={(song as ExtendedSong).imageUrl}
              alt={`${song.album} cover`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              onError={e => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-12 h-12 text-silver/20" />
            </div>
          )}

          {/* Play overlay */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={isCurrentSong && isPlaying ? 'Pause' : 'Play'}
          >
            <div className="w-12 h-12 rounded-full bg-silver/90 flex items-center justify-center">
              {isCurrentSong && isPlaying ? (
                <Pause className="w-5 h-5 text-black" />
              ) : (
                <Play className="w-5 h-5 text-black ml-0.5" />
              )}
            </div>
          </button>

          {/* Now playing indicator */}
          {isCurrentSong && (
            <div className="absolute top-2 left-2 flex gap-0.5 items-end h-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-1 bg-silver ${isPlaying ? 'animate-bounce' : ''}`}
                  style={{
                    height: `${8 + i * 4}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-body font-semibold text-silver text-sm truncate leading-tight">
                {song.title}
              </p>
              <Link
                to="/music/artist/$artistName"
                params={{ artistName: encodeURIComponent(song.artist) }}
                className="text-silver/60 text-xs hover:text-silver transition-colors truncate block"
              >
                {song.artist}
              </Link>
            </div>
            <span className="text-silver/40 text-xs font-body shrink-0 mt-0.5">
              {formatDuration(song.duration)}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs px-1.5 py-0.5 bg-silver/10 border border-silver/20 text-silver/60 font-body truncate max-w-[80px]">
              {song.genre}
            </span>
            <span className="text-xs text-silver/30 font-body">{song.year}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-silver/10">
            <button
              onClick={handlePlay}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-silver/10 hover:bg-silver/20 border border-silver/20 text-silver text-xs font-body transition-colors"
              aria-label="Play"
            >
              {isCurrentSong && isPlaying ? (
                <><Pause className="w-3 h-3" /> Pause</>
              ) : (
                <><Play className="w-3 h-3" /> Play</>
              )}
            </button>

            <button
              onClick={handleFavoriteToggle}
              disabled={addFavorite.isPending || removeFavorite.isPending}
              className={`p-1.5 border transition-colors ${
                isFavorited
                  ? 'bg-silver/20 border-silver/50 text-silver'
                  : 'border-silver/20 text-silver/50 hover:text-silver hover:border-silver/40'
              }`}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setShowPlaylistModal(true)}
              className="p-1.5 border border-silver/20 text-silver/50 hover:text-silver hover:border-silver/40 transition-colors"
              aria-label="Add to playlist"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {onRemove && (
              <button
                onClick={onRemove}
                className="p-1.5 border border-silver/20 text-silver/50 hover:text-red-400 hover:border-red-400/40 transition-colors"
                aria-label="Remove"
              >
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showPlaylistModal && (
        <AddToPlaylistModal
          song={song as any}
          onClose={() => setShowPlaylistModal(false)}
        />
      )}
    </>
  );
}
