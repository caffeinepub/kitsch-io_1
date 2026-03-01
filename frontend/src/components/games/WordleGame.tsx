import React, { useState, useEffect, useCallback } from 'react';

const WORDS = [
  'MUSIC', 'DANCE', 'BEATS', 'SOUND', 'NOTES', 'PIANO', 'DRUMS', 'FLUTE',
  'CHORD', 'TEMPO', 'LYRIC', 'ALBUM', 'TRACK', 'REMIX', 'VOCAL', 'GENRE',
  'SWING', 'BLUES', 'JAZZY', 'FUNKY', 'DISCO', 'INDIE', 'METAL', 'OPERA',
  'STAGE', 'CROWD', 'LIGHT', 'PARTY', 'VIBE', 'CHILL',
].filter(w => w.length === 5);

const MAX_GUESSES = 6;

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface GuessRow {
  letters: string[];
  states: LetterState[];
  submitted: boolean;
}

function checkGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array(5).fill('absent');
  const targetArr = target.split('');
  const guessArr = guess.split('');
  const used = Array(5).fill(false);

  // First pass: correct
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  // Second pass: present
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessArr[i] === targetArr[j]) {
        result[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }
  return result;
}

const STATE_COLORS: Record<LetterState, string> = {
  correct: 'bg-green-600 border-green-600 text-white',
  present: 'bg-yellow-500 border-yellow-500 text-white',
  absent: 'bg-zinc-700 border-zinc-700 text-white',
  empty: 'bg-transparent border-muted text-foreground',
};

export default function WordleGame() {
  const [target, setTarget] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [rows, setRows] = useState<GuessRow[]>(
    Array(MAX_GUESSES).fill(null).map(() => ({ letters: Array(5).fill(''), states: Array(5).fill('empty' as LetterState), submitted: false }))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');

  const submitGuess = useCallback(() => {
    if (currentInput.length !== 5) { setMessage('Word must be 5 letters!'); return; }
    const guess = currentInput.toUpperCase();
    const states = checkGuess(guess, target);
    const newRows = rows.map((row, i) =>
      i === currentRow
        ? { letters: guess.split(''), states, submitted: true }
        : row
    );
    setRows(newRows);
    setMessage('');

    if (guess === target) {
      setWon(true);
      setGameOver(true);
      setMessage('🎉 Correct!');
    } else if (currentRow + 1 >= MAX_GUESSES) {
      setGameOver(true);
      setMessage(`The word was: ${target}`);
    } else {
      setCurrentRow(r => r + 1);
    }
    setCurrentInput('');
  }, [currentInput, currentRow, rows, target]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === 'Enter') { submitGuess(); return; }
      if (e.key === 'Backspace') { setCurrentInput(s => s.slice(0, -1)); return; }
      if (/^[a-zA-Z]$/.test(e.key) && currentInput.length < 5) {
        setCurrentInput(s => s + e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver, submitGuess, currentInput]);

  // Update current row display
  const displayRows = rows.map((row, i) => {
    if (i === currentRow && !row.submitted) {
      const letters = currentInput.split('').concat(Array(5).fill('')).slice(0, 5);
      return { ...row, letters };
    }
    return row;
  });

  const reset = () => {
    setTarget(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setRows(Array(MAX_GUESSES).fill(null).map(() => ({ letters: Array(5).fill(''), states: Array(5).fill('empty' as LetterState), submitted: false })));
    setCurrentRow(0);
    setCurrentInput('');
    setGameOver(false);
    setWon(false);
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display text-xl text-primary">WORD GUESS</p>
      {message && (
        <p className={`font-display text-lg ${won ? 'text-green-400' : 'text-accent'}`}>{message}</p>
      )}
      <div className="flex flex-col gap-2">
        {displayRows.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.letters.map((letter, li) => (
              <div
                key={li}
                className={`w-12 h-12 border-2 flex items-center justify-center font-display text-xl transition-colors ${
                  row.submitted ? STATE_COLORS[row.states[li]] : STATE_COLORS['empty']
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      {!gameOver ? (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value.toUpperCase().slice(0, 5))}
            className="border-2 border-primary bg-transparent text-foreground font-display text-lg px-3 py-1 w-32 text-center uppercase"
            placeholder="GUESS"
            maxLength={5}
            disabled={gameOver}
          />
          <button
            onClick={submitGuess}
            className="px-4 py-1 bg-primary text-primary-foreground font-display hover:opacity-80"
          >
            ENTER
          </button>
        </div>
      ) : (
        <button onClick={reset} className="px-6 py-2 bg-primary text-primary-foreground font-display text-lg hover:opacity-80">
          NEW GAME
        </button>
      )}
      <p className="text-muted-foreground text-xs">Type a 5-letter word and press Enter or click ENTER</p>
    </div>
  );
}
