import { useState, useEffect, useCallback, useRef } from 'react';
import {
  TmdbMovie,
  fetchPopularMovies,
  searchMovies,
  fetchMoviesByGenre,
  TMDB_GENRES,
} from '../services/tmdbService';

const DEBOUNCE_MS = 400;

export interface MovieSearchState {
  movies: TmdbMovie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalPages: number;
}

export function useMovieSearch(query: string, genre: string): MovieSearchState {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentParams = useRef({ query, genre });

  const doFetch = useCallback(async (q: string, g: string, p: number, append: boolean) => {
    if (append) setIsLoadingMore(true);
    else { setIsLoading(true); setError(null); }

    try {
      let results: TmdbMovie[] = [];

      if (q.trim()) {
        results = await searchMovies(q, p);
      } else if (g && g !== 'All') {
        const genreObj = TMDB_GENRES.find(gn => gn.name === g);
        if (genreObj) {
          results = await fetchMoviesByGenre(genreObj.id, p);
        } else {
          results = await fetchPopularMovies(p);
        }
      } else {
        results = await fetchPopularMovies(p);
      }

      if (append) {
        setMovies(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          return [...prev, ...results.filter(m => !existingIds.has(m.id))];
        });
      } else {
        setMovies(results);
      }

      setHasMore(results.length >= 20);
      setTotalPages(p + 1);
    } catch (e) {
      setError('Failed to load movies. Please try again.');
      if (!append) setMovies([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    currentParams.current = { query, genre };
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      doFetch(query, genre, 1, false);
    }, DEBOUNCE_MS);

    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [query, genre, doFetch]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    doFetch(currentParams.current.query, currentParams.current.genre, nextPage, true);
  }, [isLoadingMore, hasMore, page, doFetch]);

  return { movies, isLoading, isLoadingMore, error, hasMore, loadMore, totalPages };
}
