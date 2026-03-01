import { ComponentType } from 'react';

export interface BrowserGame {
  id: string;
  title: string;
  category: 'Arcade' | 'Puzzle' | 'Strategy' | 'Action' | 'Classic';
  description: string;
  emoji: string;
}

export const browserGames: BrowserGame[] = [
  {
    id: 'snake',
    title: 'Snake',
    category: 'Arcade',
    description: 'Classic snake game! Eat food, grow longer, avoid walls and yourself.',
    emoji: '🐍',
  },
  {
    id: 'breakout',
    title: 'Breakout',
    category: 'Arcade',
    description: 'Break all the bricks with your paddle and ball. Classic arcade action!',
    emoji: '🧱',
  },
  {
    id: 'tictactoe',
    title: 'Tic-Tac-Toe',
    category: 'Classic',
    description: 'The timeless two-player game. Get three in a row to win!',
    emoji: '⭕',
  },
  {
    id: 'memory',
    title: 'Memory Match',
    category: 'Puzzle',
    description: 'Flip cards to find matching pairs. Test your memory!',
    emoji: '🃏',
  },
  {
    id: 'platformer',
    title: 'Platformer',
    category: 'Action',
    description: 'Jump and run through platforms, collect stars, reach the goal!',
    emoji: '🏃',
  },
  {
    id: 'wordle',
    title: 'Word Guess',
    category: 'Puzzle',
    description: 'Guess the 5-letter word in 6 tries. Letters change color to guide you!',
    emoji: '📝',
  },
];
