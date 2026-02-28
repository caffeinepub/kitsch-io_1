interface TrackCardProps {
  title: string;
  artist: string;
  genre: string;
  audioUrl: string;
  sourceUrl?: string;
}

export default function TrackCard({ title, artist, genre, audioUrl, sourceUrl }: TrackCardProps) {
  return (
    <div className="group border border-silver/20 bg-black/50 backdrop-blur-sm hover:border-silver transition-all duration-200 flex flex-col">
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-black text-white text-base uppercase tracking-wide leading-tight truncate">
              {title}
            </h3>
            <p className="text-silver/60 text-xs mt-0.5">{artist}</p>
          </div>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider border border-silver/40 text-silver/70 px-2 py-0.5">
            {genre}
          </span>
        </div>
        <audio
          controls
          className="w-full mt-2"
          style={{ height: '32px' }}
          preload="none"
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      {sourceUrl && (
        <div className="border-t border-silver/10 px-4 py-3">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-xs font-bold uppercase tracking-widest text-silver/60 hover:text-white transition-colors py-1"
          >
            ↗ Source
          </a>
        </div>
      )}
    </div>
  );
}
