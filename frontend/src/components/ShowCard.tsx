interface ShowCardProps {
  title: string;
  episodes: number | string;
  genre: string;
  description: string;
  watchUrl: string;
  accentColor?: string;
}

export default function ShowCard({ title, episodes, genre, description, watchUrl, accentColor = 'bg-hotpink' }: ShowCardProps) {
  return (
    <div className="glossy-card rounded-2xl p-4 flex flex-col gap-3 hover:shadow-kitsch-lg hover:-translate-y-1 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-2 group-hover:text-hotpink transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{episodes} episodes</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lavender/20 text-lavender-dark whitespace-nowrap shrink-0">
          {genre}
        </span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{description}</p>
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto text-center text-xs font-bold py-2 px-4 rounded-full ${accentColor} text-white hover:opacity-90 transition-all hover:shadow-glow hover:scale-105`}
      >
        ▶ Watch Now
      </a>
    </div>
  );
}
