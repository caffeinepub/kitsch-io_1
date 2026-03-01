import React, { useState, useEffect, useCallback } from 'react';

const EMOJIS = ['🎵', '🎸', '🎹', '🎺', '🎻', '🥁', '🎷', '🎤'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const initGame = useCallback(() => {
    const pairs = [...EMOJIS, ...EMOJIS];
    const shuffled = shuffle(pairs);
    setCards(shuffled.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })));
    setFlipped([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const handleFlip = (id: number) => {
    if (locked) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;
    if (flipped.length === 2) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, id];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = newFlipped;
      if (newCards[a].emoji === newCards[b].emoji) {
        const matched = newCards.map(c =>
          c.id === a || c.id === b ? { ...c, matched: true } : c
        );
        setCards(matched);
        setFlipped([]);
        setLocked(false);
        if (matched.every(c => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === a || c.id === b ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-8">
        <span className="font-display text-xl text-primary">MOVES: {moves}</span>
        {won && <span className="font-display text-xl text-green-400">YOU WIN! 🎉</span>}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`w-16 h-16 text-3xl border-2 flex items-center justify-center transition-all duration-200 ${
              card.flipped || card.matched
                ? 'border-primary bg-primary/20'
                : 'border-muted bg-muted hover:border-primary'
            } ${card.matched ? 'opacity-50' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
      <button
        onClick={initGame}
        className="px-6 py-2 bg-primary text-primary-foreground font-display text-lg hover:opacity-80 transition-opacity"
      >
        NEW GAME
      </button>
    </div>
  );
}
