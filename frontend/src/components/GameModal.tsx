import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BrowserGame } from '../data/browserGames';

interface GameModalProps {
  game: BrowserGame | null;
  GameComponent: React.ComponentType | null;
  onClose: () => void;
}

export default function GameModal({ game, GameComponent, onClose }: GameModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!game || !GameComponent) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-background border-2 border-primary max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-primary bg-primary/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{game.emoji}</span>
            <span className="font-display text-2xl text-primary">{game.title}</span>
            <span className="text-xs border border-muted px-2 py-0.5 text-muted-foreground uppercase">
              {game.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:text-primary transition-colors"
            aria-label="Close game"
          >
            <X size={24} />
          </button>
        </div>
        {/* Game */}
        <div className="p-6 flex justify-center">
          <GameComponent />
        </div>
      </div>
    </div>
  );
}
