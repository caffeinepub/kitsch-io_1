import { useState, useMemo } from 'react';
import { Search, Music as MusicIcon } from 'lucide-react';
import TrackCard from '../components/TrackCard';

interface Track {
  title: string;
  artist: string;
  genre: string;
  audioUrl: string;
  sourceUrl?: string;
}

const TRACKS: Track[] = [
  {
    title: 'Maple Leaf Rag',
    artist: 'Scott Joplin',
    genre: 'Ragtime',
    audioUrl: 'https://archive.org/download/MapleLeafRag/MapleLeafRag.mp3',
    sourceUrl: 'https://archive.org/details/MapleLeafRag',
  },
  {
    title: 'St. Louis Blues',
    artist: 'W.C. Handy',
    genre: 'Blues',
    audioUrl: 'https://archive.org/download/StLouisBlues_201407/StLouisBlues.mp3',
    sourceUrl: 'https://archive.org/details/StLouisBlues_201407',
  },
  {
    title: 'Rhapsody in Blue',
    artist: 'George Gershwin',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/RhapsodyInBlue/RhapsodyInBlue.mp3',
    sourceUrl: 'https://archive.org/details/RhapsodyInBlue',
  },
  {
    title: 'Take Five',
    artist: 'Dave Brubeck Quartet',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/TakeFive_201407/TakeFive.mp3',
    sourceUrl: 'https://archive.org/details/TakeFive_201407',
  },
  {
    title: 'Moonlight Sonata',
    artist: 'Ludwig van Beethoven',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/MoonlightSonata_201407/MoonlightSonata.mp3',
    sourceUrl: 'https://archive.org/details/MoonlightSonata_201407',
  },
  {
    title: 'La Vie en Rose',
    artist: 'Édith Piaf',
    genre: 'Chanson',
    audioUrl: 'https://archive.org/download/LaVieEnRose_201407/LaVieEnRose.mp3',
    sourceUrl: 'https://archive.org/details/LaVieEnRose_201407',
  },
  {
    title: 'Summertime',
    artist: 'George Gershwin',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/Summertime_201407/Summertime.mp3',
    sourceUrl: 'https://archive.org/details/Summertime_201407',
  },
  {
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/ClairDeLune_201407/ClairDeLune.mp3',
    sourceUrl: 'https://archive.org/details/ClairDeLune_201407',
  },
  {
    title: 'When the Saints Go Marching In',
    artist: 'Louis Armstrong',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/WhenTheSaintsGoMarchingIn/WhenTheSaintsGoMarchingIn.mp3',
    sourceUrl: 'https://archive.org/details/WhenTheSaintsGoMarchingIn',
  },
  {
    title: 'Für Elise',
    artist: 'Ludwig van Beethoven',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/FurElise_201407/FurElise.mp3',
    sourceUrl: 'https://archive.org/details/FurElise_201407',
  },
  {
    title: 'Blue Danube Waltz',
    artist: 'Johann Strauss II',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/BlueDanubeWaltz/BlueDanubeWaltz.mp3',
    sourceUrl: 'https://archive.org/details/BlueDanubeWaltz',
  },
  {
    title: 'Entertainer',
    artist: 'Scott Joplin',
    genre: 'Ragtime',
    audioUrl: 'https://archive.org/download/TheEntertainer_201407/TheEntertainer.mp3',
    sourceUrl: 'https://archive.org/details/TheEntertainer_201407',
  },
  {
    title: 'Caravan',
    artist: 'Duke Ellington',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/Caravan_201407/Caravan.mp3',
    sourceUrl: 'https://archive.org/details/Caravan_201407',
  },
  {
    title: 'Bolero',
    artist: 'Maurice Ravel',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/Bolero_201407/Bolero.mp3',
    sourceUrl: 'https://archive.org/details/Bolero_201407',
  },
  {
    title: 'Minuet in G',
    artist: 'Johann Sebastian Bach',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/MinuetInG/MinuetInG.mp3',
    sourceUrl: 'https://archive.org/details/MinuetInG',
  },
  {
    title: 'Autumn Leaves',
    artist: 'Miles Davis',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/AutumnLeaves_201407/AutumnLeaves.mp3',
    sourceUrl: 'https://archive.org/details/AutumnLeaves_201407',
  },
  {
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/Gymnopedie/Gymnopedie.mp3',
    sourceUrl: 'https://archive.org/details/Gymnopedie',
  },
  {
    title: 'Misty',
    artist: 'Erroll Garner',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/Misty_201407/Misty.mp3',
    sourceUrl: 'https://archive.org/details/Misty_201407',
  },
  {
    title: 'Toccata and Fugue in D Minor',
    artist: 'Johann Sebastian Bach',
    genre: 'Classical',
    audioUrl: 'https://archive.org/download/ToccataAndFugue/ToccataAndFugue.mp3',
    sourceUrl: 'https://archive.org/details/ToccataAndFugue',
  },
  {
    title: 'Round Midnight',
    artist: 'Thelonious Monk',
    genre: 'Jazz',
    audioUrl: 'https://archive.org/download/RoundMidnight_201407/RoundMidnight.mp3',
    sourceUrl: 'https://archive.org/details/RoundMidnight_201407',
  },
];

const ALL_GENRES = ['All', ...Array.from(new Set(TRACKS.map(t => t.genre))).sort()];

export default function Music() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = useMemo(() => {
    return TRACKS.filter(track => {
      const q = search.toLowerCase();
      const matchesSearch =
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q);
      const matchesGenre = genre === 'All' || track.genre === genre;
      return matchesSearch && matchesGenre;
    });
  }, [search, genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="relative overflow-hidden border border-silver/20 h-32 mb-6">
          <img
            src="/assets/generated/music-header-deco.dim_800x200.png"
            alt=""
            className="w-full h-full object-cover opacity-50"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex items-center px-6">
            <div className="flex items-center gap-4">
              <MusicIcon size={40} className="text-silver" />
              <div>
                <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white">
                  Music
                </h1>
                <p className="text-silver/60 text-sm tracking-wide">Stream public domain tracks inline</p>
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
              placeholder="Search by title or artist..."
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
        </div>
      </div>

      {/* Results count */}
      <p className="text-silver/40 text-xs uppercase tracking-widest mb-4">
        {filtered.length} track{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(track => (
            <TrackCard key={track.title} {...track} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-silver/40">
          <MusicIcon size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-bold uppercase tracking-widest">No tracks found</p>
          <p className="text-sm mt-1">Try a different search or genre</p>
        </div>
      )}
    </div>
  );
}
