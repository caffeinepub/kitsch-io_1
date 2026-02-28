import { Link } from '@tanstack/react-router';
import { Gamepad2, Film, Music, ChevronRight } from 'lucide-react';

const SECTIONS = [
  {
    to: '/games',
    label: 'Games',
    icon: Gamepad2,
    description: 'Play browser games — puzzles, arcade, strategy & more',
    accent: 'from-white/10 to-white/5',
    emoji: '🎮',
  },
  {
    to: '/movies',
    label: 'Movies',
    icon: Film,
    description: 'Watch classic & cult films — public domain cinema vault',
    accent: 'from-white/10 to-white/5',
    emoji: '🎬',
  },
  {
    to: '/music',
    label: 'Music',
    icon: Music,
    description: 'Listen to tracks across every genre — play inline',
    accent: 'from-white/10 to-white/5',
    emoji: '🎵',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-block mb-4">
            <span className="text-silver/60 text-xs font-bold uppercase tracking-[0.4em] border border-silver/30 px-4 py-1.5">
              ✦ Your Personal Entertainment Hub ✦
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 leading-none">
            Kitsch
            <span className="text-silver">Hub</span>
          </h1>
          <p className="text-silver/70 text-lg max-w-xl mx-auto font-light tracking-wide">
            Games · Movies · Music — all in one place, styled your way.
          </p>
        </div>
      </section>

      {/* Angel Aesthetics Widget */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="relative overflow-hidden border border-silver/20 h-48 md:h-64">
          <img
            src="/assets/angel _ aesthetics.jpeg"
            alt="Angel"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Main Section Cards */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECTIONS.map(({ to, label, icon: Icon, description, emoji }) => (
            <Link
              key={to}
              to={to}
              className="group relative block border border-silver/30 bg-black/50 backdrop-blur-sm hover:border-silver hover:bg-black/70 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-silver to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 flex flex-col items-center text-center gap-4">
                <div className="text-5xl">{emoji}</div>
                <div className="w-16 h-16 border-2 border-silver/40 group-hover:border-silver flex items-center justify-center transition-all">
                  <Icon size={28} className="text-silver" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-black uppercase tracking-widest text-white mb-2">
                    {label}
                  </h2>
                  <p className="text-silver/60 text-sm leading-relaxed">{description}</p>
                </div>
                <div className="flex items-center gap-1 text-silver/50 group-hover:text-silver text-xs font-bold uppercase tracking-widest transition-colors mt-2">
                  Enter <ChevronRight size={14} />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-silver to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      {/* Tip */}
      <section className="max-w-7xl mx-auto px-4 pb-12 text-center">
        <p className="text-silver/40 text-xs uppercase tracking-widest">
          ✦ Click <span className="text-silver/70 font-bold">Style</span> in the header to change your background texture ✦
        </p>
      </section>
    </div>
  );
}
