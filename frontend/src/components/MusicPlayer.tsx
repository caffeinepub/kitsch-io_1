import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
  } = useMusicPlayer();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentTime = duration > 0 ? (progress / 100) * duration : 0;

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (v > 0) setPrevVolume(v);
  };

  const song = currentSong as any;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t-2 border-silver/40 shadow-lg">
      {/* Progress bar */}
      <div
        className="h-1 bg-silver/20 cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-silver transition-all duration-100 group-hover:bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 max-w-7xl mx-auto">
        {/* Album art */}
        <div className="shrink-0 w-10 h-10 bg-black/80 border border-silver/20 overflow-hidden flex items-center justify-center">
          {song.imageUrl ? (
            <img
              src={song.imageUrl}
              alt={song.album}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <Music className="w-5 h-5 text-silver/40" />
          )}
        </div>

        {/* Song info */}
        <div className="min-w-0 flex-1 sm:flex-none sm:w-48">
          <p className="text-silver text-sm font-body font-semibold truncate leading-tight">
            {currentSong.title}
          </p>
          <p className="text-silver/50 text-xs font-body truncate">
            {currentSong.artist}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 mx-auto">
          <button
            onClick={prevTrack}
            className="p-1.5 text-silver/60 hover:text-silver transition-colors"
            aria-label="Previous"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-9 h-9 flex items-center justify-center bg-silver text-black hover:bg-silver/80 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-1.5 text-silver/60 hover:text-silver transition-colors"
            aria-label="Next"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Time */}
        <div className="hidden sm:flex items-center gap-1 text-silver/50 text-xs font-body shrink-0">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Genre badge */}
        {currentSong.genre && (
          <span className="hidden md:block text-xs px-2 py-0.5 bg-silver/10 border border-silver/20 text-silver/60 font-body shrink-0">
            {currentSong.genre}
          </span>
        )}

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={handleMuteToggle}
            className="text-silver/60 hover:text-silver transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-silver cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
