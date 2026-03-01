import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import type { Song } from '../types/music';

interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

interface MusicPlayerContextValue {
  currentSong: ExtendedSong | null;
  queue: ExtendedSong[];
  queueIndex: number;
  isPlaying: boolean;
  progress: number;       // 0–100
  duration: number;       // seconds
  volume: number;         // 0–1
  playSong: (song: ExtendedSong) => void;
  playQueue: (songs: ExtendedSong[], startIndex: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (pct: number) => void;
  setVolume: (v: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<ExtendedSong | null>(null);
  const [queue, setQueue] = useState<ExtendedSong[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      // Auto-advance to next track
      setQueueIndex(prev => {
        const next = prev + 1;
        return next;
      });
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.pause();
      audio.src = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle queue index changes (auto-advance)
  useEffect(() => {
    if (queue.length > 0 && queueIndex < queue.length && queueIndex > 0) {
      const song = queue[queueIndex];
      loadAndPlay(song);
    }
  }, [queueIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAndPlay = useCallback((song: ExtendedSong) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentSong(song);
    setProgress(0);
    setDuration(0);

    if (song.audioUrl) {
      audio.src = song.audioUrl;
      audio.load();
      audio.play().catch(err => {
        console.warn('Audio play failed:', err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      // No audio URL — simulated playback for generated songs
      audio.src = '';
      setIsPlaying(true);
    }
  }, []);

  const playSong = useCallback((song: ExtendedSong) => {
    setQueue([song]);
    setQueueIndex(0);
    loadAndPlay(song);
  }, [loadAndPlay]);

  const playQueue = useCallback((songs: ExtendedSong[], startIndex: number) => {
    if (songs.length === 0) return;
    setQueue(songs);
    setQueueIndex(startIndex);
    loadAndPlay(songs[startIndex]);
  }, [loadAndPlay]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.src) {
        audio.play().catch(err => console.warn('Play failed:', err));
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentSong]);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;
    const next = (queueIndex + 1) % queue.length;
    setQueueIndex(next);
    loadAndPlay(queue[next]);
  }, [queue, queueIndex, loadAndPlay]);

  const prevTrack = useCallback(() => {
    if (queue.length === 0) return;
    const audio = audioRef.current;
    // If more than 3 seconds in, restart current track
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const prev = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prev);
    loadAndPlay(queue[prev]);
  }, [queue, queueIndex, loadAndPlay]);

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (pct / 100) * audio.duration;
    setProgress(pct);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        queue,
        queueIndex,
        isPlaying,
        progress,
        duration,
        volume,
        playSong,
        playQueue,
        togglePlay,
        nextTrack,
        prevTrack,
        seek,
        setVolume,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  return ctx;
}
