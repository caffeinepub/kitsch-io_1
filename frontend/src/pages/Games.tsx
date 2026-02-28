import { useState, useMemo } from 'react';
import { Search, Gamepad2 } from 'lucide-react';
import GameCard from '../components/GameCard';

interface Game {
  title: string;
  category: string;
  description: string;
  url: string;
}

const GAMES: Game[] = [
  {
    title: '2048',
    category: 'Puzzle',
    description: 'Slide numbered tiles to combine them and reach the 2048 tile.',
    url: 'https://play2048.co/',
  },
  {
    title: 'Wordle',
    category: 'Word',
    description: 'Guess the hidden 5-letter word in 6 tries. A new puzzle every day.',
    url: 'https://www.nytimes.com/games/wordle/index.html',
  },
  {
    title: 'Chess.com',
    category: 'Strategy',
    description: 'Play chess online against players worldwide or against the computer.',
    url: 'https://www.chess.com/play/online',
  },
  {
    title: 'Tetris',
    category: 'Arcade',
    description: 'The classic block-stacking game. Clear lines before they reach the top.',
    url: 'https://tetris.com/play-tetris',
  },
  {
    title: 'Pac-Man',
    category: 'Arcade',
    description: 'Navigate the maze, eat dots, and avoid the ghosts in this timeless classic.',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
  },
  {
    title: 'Sudoku',
    category: 'Puzzle',
    description: 'Fill the 9×9 grid so every row, column, and box contains 1–9.',
    url: 'https://sudoku.com/',
  },
  {
    title: 'Minesweeper',
    category: 'Puzzle',
    description: 'Uncover all safe squares without detonating a mine.',
    url: 'https://minesweeper.online/',
  },
  {
    title: 'Solitaire',
    category: 'Card',
    description: 'Classic Klondike solitaire — sort all cards into foundation piles.',
    url: 'https://www.solitr.com/',
  },
  {
    title: 'Snake',
    category: 'Arcade',
    description: 'Guide the snake to eat food and grow without hitting walls or yourself.',
    url: 'https://playsnake.org/',
  },
  {
    title: 'Crossword',
    category: 'Word',
    description: 'Fill in the crossword grid using the given clues.',
    url: 'https://www.nytimes.com/crosswords',
  },
  {
    title: 'Mahjong',
    category: 'Puzzle',
    description: 'Match and remove pairs of tiles to clear the board.',
    url: 'https://www.mahjong.org/',
  },
  {
    title: 'Checkers',
    category: 'Strategy',
    description: 'Classic draughts — jump over opponent pieces to capture them all.',
    url: 'https://www.247checkers.com/',
  },
  {
    title: 'Bubble Shooter',
    category: 'Arcade',
    description: 'Aim and shoot colored bubbles to match and pop groups of three or more.',
    url: 'https://www.bubbleshooter.net/',
  },
  {
    title: 'Jigsaw Puzzle',
    category: 'Puzzle',
    description: 'Assemble beautiful jigsaw puzzles of varying difficulty.',
    url: 'https://www.jigsawplanet.com/',
  },
  {
    title: 'Typing Speed Test',
    category: 'Skill',
    description: 'Test and improve your typing speed and accuracy.',
    url: 'https://www.typingtest.com/',
  },
  {
    title: 'Backgammon',
    category: 'Strategy',
    description: 'Roll dice and move your pieces around the board to bear them off first.',
    url: 'https://www.247backgammon.com/',
  },
  {
    title: 'Freecell',
    category: 'Card',
    description: 'A solitaire variant where almost every deal is solvable with skill.',
    url: 'https://freecell.org/',
  },
  {
    title: 'Spades',
    category: 'Card',
    description: 'Classic trick-taking card game — bid and win the right number of tricks.',
    url: 'https://www.247spades.com/',
  },
  {
    title: 'Dominoes',
    category: 'Strategy',
    description: 'Match and place domino tiles to score points.',
    url: 'https://www.247dominoes.com/',
  },
  {
    title: 'Hangman',
    category: 'Word',
    description: 'Guess the hidden word one letter at a time before the man is hanged.',
    url: 'https://hangmanwordgame.com/',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(GAMES.map(g => g.category))).sort()];

export default function Games() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || game.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="relative overflow-hidden border border-silver/20 h-32 mb-6">
          <img
            src="/assets/generated/games-header-deco.dim_800x200.png"
            alt=""
            className="w-full h-full object-cover opacity-50"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex items-center px-6">
            <div className="flex items-center gap-4">
              <Gamepad2 size={40} className="text-silver" />
              <div>
                <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white">
                  Games
                </h1>
                <p className="text-silver/60 text-sm tracking-wide">Browser games — no download needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/50" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/60 border border-silver/30 text-white placeholder-silver/40 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-black/60 border border-silver/30 text-silver px-4 py-2.5 text-sm focus:outline-none focus:border-silver transition-colors cursor-pointer"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-black">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-silver/40 text-xs uppercase tracking-widest mb-4">
        {filtered.length} game{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(game => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-silver/40">
          <Gamepad2 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-bold uppercase tracking-widest">No games found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}
