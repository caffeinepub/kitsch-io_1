import { useMemo } from 'react';
import { ArrowLeft, Play, Music, Loader2 } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import SongCard from '../components/SongCard';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { getSongsByArtist } from '../data/generatedMusic';
import type { Song } from '../types/music';

export default function ArtistDetail() {
  const { artistName } = useParams({ from: '/music/artist/$artistName' });
  const decodedArtist = decodeURIComponent(artistName);
  const { playQueue } = useMusicPlayer();

  const songs = useMemo<Song[]>(() => {
    return getSongsByArtist(decodedArtist, 100);
  }, [decodedArtist]);

  // Group by album
  const albumGroups = useMemo(() => {
    const map = new Map<string, Song[]>();
    songs.forEach(song => {
      const existing = map.get(song.album) ?? [];
      map.set(song.album, [...existing, song]);
    });
    return Array.from(map.entries());
  }, [songs]);

  const handlePlayAll = () => {
    if (songs.length === 0) return;
    playQueue(songs as any[], 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-32">
      <Link
        to="/music"
        className="inline-flex items-center gap-2 text-silver/60 hover:text-silver text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Music
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-silver/10 border border-silver/20 flex items-center justify-center">
            <Music size={28} className="text-silver/50" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white">
              {decodedArtist}
            </h1>
            <p className="text-silver/60 text-sm">
              {songs.length} song{songs.length !== 1 ? 's' : ''} · {albumGroups.length} album{albumGroups.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {songs.length > 0 && (
          <button
            onClick={handlePlayAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-silver text-black text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors shrink-0"
          >
            <Play size={14} />
            Play All
          </button>
        )}
      </div>

      {songs.length === 0 ? (
        <div className="text-center py-20 text-silver/40">
          <Loader2 size={40} className="mx-auto mb-4 animate-spin" />
          <p className="text-sm uppercase tracking-widest">Searching catalog...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {albumGroups.map(([album, albumSongs]) => (
            <div key={album}>
              <div className="flex items-center gap-3 mb-3">
                <Link
                  to="/music/album/$artistName/$albumName"
                  params={{
                    artistName: encodeURIComponent(decodedArtist),
                    albumName: encodeURIComponent(album),
                  }}
                  className="font-display text-xl uppercase tracking-widest text-silver hover:text-white transition-colors"
                >
                  {album}
                </Link>
                <span className="text-silver/30 text-xs">{albumSongs.length} tracks</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {albumSongs.map((song, i) => (
                  <SongCard key={song.id} song={song as any} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
