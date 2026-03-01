import { useMemo } from 'react';
import { ArrowLeft, Play, Disc } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import SongCard from '../components/SongCard';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { getSongsByAlbum } from '../data/generatedMusic';
import type { Song } from '../types/music';

export default function AlbumDetail() {
  const { artistName, albumName } = useParams({ from: '/music/album/$artistName/$albumName' });
  const decodedArtist = decodeURIComponent(artistName);
  const decodedAlbum = decodeURIComponent(albumName);
  const { playQueue } = useMusicPlayer();

  const songs = useMemo<Song[]>(() => {
    return getSongsByAlbum(decodedArtist, decodedAlbum, 30);
  }, [decodedArtist, decodedAlbum]);

  const year = songs[0]?.year;

  const handlePlayAll = () => {
    if (songs.length === 0) return;
    playQueue(songs as any[], 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-32">
      <Link
        to="/music/artist/$artistName"
        params={{ artistName: encodeURIComponent(decodedArtist) }}
        className="inline-flex items-center gap-2 text-silver/60 hover:text-silver text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to {decodedArtist}
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-silver/10 border border-silver/20 flex items-center justify-center">
            <Disc size={28} className="text-silver/50" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white">
              {decodedAlbum}
            </h1>
            <p className="text-silver/60 text-sm">
              {decodedArtist} · {year ?? ''} · {songs.length} track{songs.length !== 1 ? 's' : ''}
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
          <Disc size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-bold uppercase tracking-widest">No tracks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {songs.map((song, i) => (
            <SongCard key={song.id} song={song as any} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
