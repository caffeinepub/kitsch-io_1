interface MovieCardProps {
  title: string;
  year: number;
  genre: string;
  synopsis: string;
  url: string;
}

export default function MovieCard({ title, year, genre, synopsis, url }: MovieCardProps) {
  return (
    <div className="group border border-silver/20 bg-black/50 backdrop-blur-sm hover:border-silver transition-all duration-200 flex flex-col">
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-black text-white text-base uppercase tracking-wide leading-tight">
            {title}
          </h3>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider border border-silver/40 text-silver/70 px-2 py-0.5">
            {year}
          </span>
        </div>
        <span className="self-start text-[10px] font-bold uppercase tracking-wider bg-silver/10 text-silver/70 px-2 py-0.5 border border-silver/20">
          {genre}
        </span>
        <p className="text-silver/60 text-xs leading-relaxed flex-1 line-clamp-3">{synopsis}</p>
      </div>
      <div className="border-t border-silver/10 px-4 py-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-xs font-bold uppercase tracking-widest text-black bg-silver hover:bg-white transition-colors py-2"
        >
          ▶ Watch Now
        </a>
      </div>
    </div>
  );
}
