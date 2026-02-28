import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { Gamepad2, Film, Music, Home, Palette, Star } from 'lucide-react';
import { usePersonalization } from '../hooks/usePersonalization';
import PersonalizationPanel from './PersonalizationPanel';

export default function Layout() {
  const location = useLocation();
  const personalization = usePersonalization();
  const [showPersonalization, setShowPersonalization] = useState(false);

  const bgUrl = personalization.getBackgroundUrl(personalization.settings.selectedTexture);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/games', label: 'Games', icon: Gamepad2 },
    { to: '/movies', label: 'Movies', icon: Film },
    { to: '/music', label: 'Music', icon: Music },
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Layer — sits behind everything */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          backgroundColor: bgUrl ? undefined : 'black',
          zIndex: -2,
        }}
      />

      {/* Dark overlay for readability — sits above background but below content */}
      <div
        className="fixed inset-0 bg-black"
        style={{
          opacity: bgUrl ? personalization.settings.overlayOpacity : 1,
          zIndex: -1,
        }}
      />

      {/* Header */}
      <header className="relative border-b border-silver/30 bg-black/60 backdrop-blur-sm" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/logo.dim_200x200.png"
              alt="KitschHub Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-2xl font-black tracking-widest text-silver group-hover:text-white transition-colors uppercase">
              KitschHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-none border text-sm font-bold uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-silver text-black border-silver'
                      : 'bg-transparent text-silver border-silver/40 hover:border-silver hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setShowPersonalization(true)}
            className="flex items-center gap-2 px-3 py-2 border border-silver/40 text-silver hover:border-silver hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
            title="Customize Background"
          >
            <Palette size={16} />
            <span className="hidden sm:inline">Style</span>
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all ${
                  isActive
                    ? 'bg-silver text-black border-silver'
                    : 'bg-transparent text-silver border-silver/40 hover:border-silver'
                }`}
              >
                <Icon size={12} />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative flex-1" style={{ zIndex: 10 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-silver/20 bg-black/70 backdrop-blur-sm py-6 mt-auto" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-silver/60 text-xs">
          <div className="flex items-center gap-2">
            <Star size={12} className="text-silver/40" />
            <span className="font-bold uppercase tracking-widest">KitschHub</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-red-400">♥</span>
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'kitschweb-app')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver/80 hover:text-white underline transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Personalization Panel */}
      {showPersonalization && (
        <PersonalizationPanel
          onClose={() => setShowPersonalization(false)}
          personalization={personalization}
        />
      )}
    </div>
  );
}
