import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { jDramaShows } from '../data/j-drama';
import ShowCard from '../components/ShowCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GENRES = ['All', 'Romance', 'Drama', 'Comedy', 'Thriller', 'Fantasy', 'Historical', 'Action', 'Mystery', 'Slice of Life', 'Horror'];

export default function JDrama() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = useMemo(() => {
    return jDramaShows.filter(s => {
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === 'All' || s.genre === genre;
      return matchSearch && matchGenre;
    });
  }, [search, genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-aqua/20 to-lavender/10 p-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🗾</span>
          <h1 className="text-4xl font-display text-aqua">J-Drama ✦</h1>
        </div>
        <p className="text-muted-foreground font-bold">{jDramaShows.length} Japanese drama series with watch links</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search J-dramas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-full border-aqua/40 focus:border-aqua"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-44 rounded-full border-aqua/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 font-bold">
        Showing {filtered.length} of {jDramaShows.length} series
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🗾</div>
          <p className="text-muted-foreground font-bold">No J-dramas found. Try a different search!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((show, i) => (
            <ShowCard key={i} {...show} accentColor="bg-aqua" />
          ))}
        </div>
      )}
    </div>
  );
}
