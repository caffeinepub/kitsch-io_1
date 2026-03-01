import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, Music2, Heart, ListMusic, RefreshCw, Loader2, AlertCircle, ChevronDown, Radio } from 'lucide-react';
import { useMusicSearch } from '../hooks/useMusicSearch';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import SongCard from '../components/SongCard';

export default function Music() {
  const {
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
    availableGenres,
    refetch,
    usingFallback,
  } = useMusicSearch();

  const { playQueue } = useMusicPlayer();

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadMore();
    }
  }, [isLoadingMore, hasMore, loadMore]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleLoadMore]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playQueue(songs as any[], 0);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-silver/30 bg-black/60 backdrop-blur-sm">
        <img
          src="/assets/generated/music-header-deco.dim_800x200.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Music2 className="w-8 h-8 text-silver" />
            <h1 className="font-display text-4xl text-silver tracking-widest uppercase">
              Music
            </h1>
          </div>
          <p className="text-silver/60 text-sm font-body">
            Royalty-free music — stream anything, legally.
          </p>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="bg-black/80 border-b border-silver/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 py-2">
            <Link
              to="/music"
              className="px-4 py-2 text-sm font-body font-medium text-silver bg-silver/10 border border-silver/30 hover:bg-silver/20 transition-colors"
            >
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
              className="px-4 py-2 text-sm font-body font-medium text-silver/60 hover:text-silver hover:bg-silver/10 border border-transparent transition-colors flex items-center gap-1"
            >
              <ListMusic className="w-3.5 h-3.5" />
              Playlists
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, artist, or genre..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-black/60 border border-silver/30 text-silver placeholder-silver/40 font-body text-sm focus:outline-none focus:border-silver/70 transition-colors"
            />
          </div>

          {/* Genre filter */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-black/60 border border-silver/30 text-silver font-body text-sm focus:outline-none focus:border-silver/70 transition-colors cursor-pointer min-w-[140px]"
            >
              <option value="">All Genres</option>
              {availableGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/50 pointer-events-none" />
          </div>

          {/* Play All button */}
          {songs.length > 0 && (
            <button
              onClick={handlePlayAll}
              className="px-4 py-2.5 bg-silver text-black font-body text-sm font-medium hover:bg-silver/80 transition-colors whitespace-nowrap"
            >
              ▶ Play All
            </button>
          )}

          {/* Refresh button */}
          <button
            onClick={refetch}
            disabled={isLoading}
            className="px-3 py-2.5 border border-silver/30 text-silver/60 hover:text-silver hover:border-silver/60 transition-colors disabled:opacity-40"
            title="Refresh tracks"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Fallback notice */}
        {usingFallback && !isLoading && songs.length > 0 && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-silver/5 border border-silver/20 text-silver/50 text-xs font-body">
            <Radio className="w-3.5 h-3.5 shrink-0" />
            <span>Showing curated public-domain tracks. Live music library may be temporarily unavailable.</span>
            <button
              onClick={refetch}
              className="ml-auto text-silver/70 hover:text-silver underline underline-offset-2 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-silver/60 animate-spin" />
            <p className="text-silver/50 font-body text-sm">Loading tracks…</p>
          </div>
        )}

        {/* Error state — only shown when truly no tracks available */}
        {!isLoading && error && songs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <AlertCircle className="w-8 h-8 text-silver/40" />
            <p className="text-silver/60 font-body text-sm text-center max-w-sm">{error}</p>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-4 py-2 border border-silver/30 text-silver/70 hover:text-silver hover:border-silver/60 font-body text-sm transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {/* Track grid */}
        {!isLoading && songs.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {songs.map((song, index) => (
                <SongCard key={song.id} song={song as any} index={index} />
              ))}
            </div>

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="h-4 mt-4" />

            {/* Load more indicator */}
            {isLoadingMore && (
              <div className="flex justify-center py-6">
                <Loader2 className="w-6 h-6 text-silver/60 animate-spin" />
              </div>
            )}

            {/* End of results */}
            {!hasMore && !isLoadingMore && songs.length > 0 && (
              <div className="flex items-center justify-center py-6 gap-3">
                <div className="h-px flex-1 bg-silver/10" />
                <p className="text-silver/30 font-body text-xs uppercase tracking-widest">
                  {songs.length} track{songs.length !== 1 ? 's' : ''} loaded
                </p>
                <div className="h-px flex-1 bg-silver/10" />
              </div>
            )}

            {/* Load more button (fallback for intersection observer) */}
            {hasMore && !isLoadingMore && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMore}
                  className="flex items-center gap-2 px-6 py-2.5 border border-silver/30 text-silver/70 hover:text-silver hover:border-silver/60 font-body text-sm transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
