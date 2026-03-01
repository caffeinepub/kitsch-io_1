import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMusic, apiSongToSong, AVAILABLE_GENRES } from '../services/musicApiService';
import type { Song } from '../types/music';

export type { AVAILABLE_GENRES };

const PAGE_SIZE = 20;
const DEBOUNCE_MS = 400;

export interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

interface UseMusicSearchResult {
  songs: ExtendedSong[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  availableGenres: string[];
  refetch: () => void;
  usingFallback: boolean;
}

export function useMusicSearch(): UseMusicSearchResult {
  const [songs, setSongs] = useState<ExtendedSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchIdRef = useRef(0);

  // Debounce search query
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  const doFetch = useCallback(
    async (query: string, genre: string, currentOffset: number, append: boolean) => {
      const myFetchId = ++fetchIdRef.current;

      if (!append) {
        setIsLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const result = await fetchMusic({
          query: query || undefined,
          genre: genre || undefined,
          offset: currentOffset,
          limit: PAGE_SIZE,
        });

        // Ignore stale responses
        if (myFetchId !== fetchIdRef.current) return;

        // Always show tracks — either from API or fallback
        const newSongs = result.songs;

        if (append) {
          setSongs(prev => {
            const existingIds = new Set(prev.map(s => s.id));
            const dedupedNew = newSongs
              .filter(s => !existingIds.has(s.id))
              .map((s, i) => apiSongToSong(s, prev.length + i) as ExtendedSong);
            return [...prev, ...dedupedNew];
          });
        } else {
          setSongs(newSongs.map((s, i) => apiSongToSong(s, i) as ExtendedSong));
        }

        setHasMore(result.hasMore);
        setUsingFallback(result.usingFallback ?? false);
        // Only set error if there are truly no songs at all
        if (newSongs.length === 0 && !append) {
          setError('No tracks found. Try a different search or genre.');
        } else {
          setError(null);
        }
      } catch (err) {
        if (myFetchId !== fetchIdRef.current) return;
        // Even on error, don't show error state — the service handles fallback internally
        // This catch is a last-resort safety net
        console.error('[useMusicSearch] Unexpected error:', err);
        setError(null);
        // Ensure we at least have fallback tracks
        if (!append) {
          const { getFilteredFallbackTracks } = await import('../data/fallbackMusic');
          const fallback = getFilteredFallbackTracks({ query: query || undefined, genre: genre || undefined });
          setSongs(fallback.map((s, i) => apiSongToSong(s, i) as ExtendedSong));
          setUsingFallback(true);
        }
      } finally {
        if (myFetchId !== fetchIdRef.current) return;
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  // Reset and re-fetch when search/genre changes
  useEffect(() => {
    setOffset(0);
    setSongs([]);
    doFetch(debouncedQuery, selectedGenre, 0, false);
  }, [debouncedQuery, selectedGenre, doFetch]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    const nextOffset = offset + PAGE_SIZE;
    setOffset(nextOffset);
    doFetch(debouncedQuery, selectedGenre, nextOffset, true);
  }, [isLoadingMore, hasMore, offset, debouncedQuery, selectedGenre, doFetch]);

  const refetch = useCallback(() => {
    setOffset(0);
    setSongs([]);
    doFetch(debouncedQuery, selectedGenre, 0, false);
  }, [debouncedQuery, selectedGenre, doFetch]);

  return {
    songs,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    availableGenres: AVAILABLE_GENRES,
    refetch,
    usingFallback,
  };
}
