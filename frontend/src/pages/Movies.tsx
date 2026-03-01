import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Search, Film, Loader2, AlertCircle } from 'lucide-react';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { TmdbMovie, getMovieTrailer, TMDB_GENRES } from '../services/tmdbService';

const GENRE_OPTIONS = ['All', ...TMDB_GENRES.map(g => g.name).sort()];

function MovieCard({ movie }: { movie: TmdbMovie }) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(movie.trailerUrl);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleWatch = async () => {
    if (trailerUrl) {
      window.open(trailerUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setLoadingTrailer(true);
    const url = await getMovieTrailer(movie.tmdbId);
    setLoadingTrailer(false);
    if (url) {
      setTrailerUrl(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="border-2 border-primary bg-background/80 hover:bg-primary/5 transition-colors group flex flex-col">
      {/* Poster */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Film size={48} className="text-muted-foreground" />
          </div>
        )}
        {movie.rating > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 text-xs font-display px-2 py-1">
            ★ {movie.rating}
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-lg text-primary leading-tight">{movie.title}</h3>
          <span className="text-muted-foreground text-xs shrink-0">{movie.year || '—'}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genres.slice(0, 2).map(g => (
            <span key={g} className="text-xs border border-muted px-1.5 py-0.5 text-muted-foreground uppercase font-display">
              {g}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
          {movie.synopsis || 'No synopsis available.'}
        </p>
        <button
          onClick={handleWatch}
          disabled={loadingTrailer}
          className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-primary-foreground font-display text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loadingTrailer ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ExternalLink size={14} />
          )}
          WATCH TRAILER
        </button>
      </div>
    </div>
  );
}

export default function Movies() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const { movies, isLoading, isLoadingMore, error, hasMore, loadMore } = useMovieSearch(search, genre);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && hasMore && !isLoadingMore) loadMore(); },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
  }, [hasMore, isLoadingMore, loadMore]);

  useEffect(() => { setupObserver(); }, [setupObserver]);
  useEffect(() => () => { observerRef.current?.disconnect(); }, []);

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-primary mb-8">
        <img
          src="/assets/generated/movies-header-deco.dim_800x200.png"
          alt=""
          className="w-full h-40 object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-display text-5xl text-primary tracking-widest drop-shadow-lg">MOVIES</h1>
          <p className="text-muted-foreground text-sm mt-1 tracking-wider">REAL MOVIES FROM TMDB — TRAILERS & INFO</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent border-2 border-primary pl-9 pr-4 py-2 font-display text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="bg-background border-2 border-primary px-4 py-2 font-display text-sm text-foreground focus:outline-none"
          >
            {GENRE_OPTIONS.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 size={32} className="animate-spin text-primary" />
            <span className="font-display text-xl text-muted-foreground">LOADING MOVIES...</span>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-20 gap-3 text-destructive">
            <AlertCircle size={24} />
            <span className="font-display text-lg">{error}</span>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && (
          <>
            {movies.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground font-display text-xl">
                NO MOVIES FOUND
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
            <div ref={sentinelRef} className="h-10 mt-4" />
            {isLoadingMore && (
              <div className="flex justify-center py-6">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
