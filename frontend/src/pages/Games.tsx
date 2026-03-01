import React, { useState } from 'react';
import { browserGames, BrowserGame } from '../data/browserGames';
import GameModal from '../components/GameModal';
import SnakeGame from '../components/games/SnakeGame';
import BreakoutGame from '../components/games/BreakoutGame';
import TicTacToeGame from '../components/games/TicTacToeGame';
import MemoryMatchGame from '../components/games/MemoryMatchGame';
import PlatformerGame from '../components/games/PlatformerGame';
import WordleGame from '../components/games/WordleGame';

const GAME_COMPONENTS: Record<string, React.ComponentType> = {
  snake: SnakeGame,
  breakout: BreakoutGame,
  tictactoe: TicTacToeGame,
  memory: MemoryMatchGame,
  platformer: PlatformerGame,
  wordle: WordleGame,
};

const CATEGORIES = ['All', 'Arcade', 'Puzzle', 'Strategy', 'Action', 'Classic'];

export default function Games() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState<BrowserGame | null>(null);

  const filtered = browserGames.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || g.category === category;
    return matchSearch && matchCat;
  });

  const openGame = (game: BrowserGame) => setSelectedGame(game);
  const closeGame = () => setSelectedGame(null);

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-primary mb-8">
        <img
          src="/assets/generated/games-header-deco.dim_800x200.png"
          alt=""
          className="w-full h-40 object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-display text-5xl text-primary tracking-widest drop-shadow-lg">GAMES</h1>
          <p className="text-muted-foreground text-sm mt-1 tracking-wider">PLAY BROWSER GAMES — NO DOWNLOAD NEEDED</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-2 border-primary px-4 py-2 font-display text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 border font-display text-xs transition-colors ${
                  category === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-muted text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-display text-xl">
            NO GAMES FOUND
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(game => (
              <div
                key={game.id}
                className="border-2 border-primary bg-background/80 hover:bg-primary/5 transition-colors group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{game.emoji}</span>
                    <span className="text-xs border border-muted px-2 py-0.5 text-muted-foreground uppercase font-display">
                      {game.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-primary mb-2">{game.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{game.description}</p>
                  <button
                    onClick={() => openGame(game)}
                    className="w-full py-2 bg-primary text-primary-foreground font-display text-sm hover:opacity-80 transition-opacity"
                  >
                    ▶ PLAY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Modal */}
      <GameModal
        game={selectedGame}
        GameComponent={selectedGame ? GAME_COMPONENTS[selectedGame.id] || null : null}
        onClose={closeGame}
      />
    </div>
  );
}
