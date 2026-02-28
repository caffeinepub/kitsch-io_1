import { Music } from 'lucide-react';

const tracks = [
  "🎵 Clair de Lune - Debussy",
  "🎶 Gymnopédie No.1 - Satie",
  "🎵 Für Elise - Beethoven",
  "🎶 Canon in D - Pachelbel",
  "🎵 The Four Seasons - Vivaldi",
  "🎶 Moonlight Sonata - Beethoven",
];

export default function MusicTickerWidget() {
  return (
    <div className="glossy-card rounded-2xl p-3 min-w-[120px] shadow-kitsch overflow-hidden">
      <div className="flex items-center gap-1 mb-1.5">
        <Music size={10} className="text-lime-dark shrink-0" />
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Now Playing</span>
      </div>
      <div className="overflow-hidden">
        <div className="animate-ticker whitespace-nowrap text-xs font-bold text-foreground">
          {tracks.join('  •  ')}
        </div>
      </div>
    </div>
  );
}
