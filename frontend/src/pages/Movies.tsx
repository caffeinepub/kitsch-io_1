import { useState, useMemo } from 'react';
import { Search, Film } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';

const ALL_GENRES = ['All', ...Array.from(new Set(movies.map(m => m.genre))).sort()];
const ALL_DECADES = ['All', ...Array.from(
  new Set(movies.map(m => `${Math.floor(m.year / 10) * 10}s`))
).sort()];

export default function Movies() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [decade, setDecade] = useState('All');

  const filtered = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genre === 'All' || movie.genre === genre;
      const movieDecade = `${Math.floor(movie.year / 10) * 10}s`;
      const matchesDecade = decade === 'All' || movieDecade === decade;
      return matchesSearch && matchesGenre && matchesDecade;
    });
  }, [search, genre, decade]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="relative overflow-hidden border border-silver/20 h-32 mb-6">
          <img
            src="/assets/generated/movies-header-deco.dim_800x200.png"
            alt=""
            className="w-full h-full object-cover opacity-50"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex items-center px-6">
            <div className="flex items-center gap-4">
              <Film size={40} className="text-silver" />
              <div>
                <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white">
                  Movies
                </h1>
                <p className="text-silver/60 text-sm tracking-wide">Classic &amp; public domain cinema</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/50" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/60 border border-silver/30 text-white placeholder-silver/40 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors"
            />
          </div>
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="bg-black/60 border border-silver/30 text-silver px-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors cursor-pointer"
          >
            {ALL_GENRES.map(g => (
              <option key={g} value={g} className="bg-black">{g}</option>
            ))}
          </select>
          <select
            value={decade}
            onChange={e => setDecade(e.target.value)}
            className="bg-black/60 border border-silver/30 text-silver px-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors cursor-pointer"
          >
            {ALL_DECADES.map(d => (
              <option key={d} value={d} className="bg-black">{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-silver/40 text-xs uppercase tracking-widest mb-4">
        {filtered.length} movie{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(movie => (
            <MovieCard
              key={movie.title}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              synopsis={movie.synopsis}
              url={movie.watchUrl}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-silver/40">
          <Film size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-bold uppercase tracking-widest">No movies found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}
