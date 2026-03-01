import React, { useEffect, useRef, useState, useCallback } from 'react';

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const W = CELL * COLS;
const H = CELL * ROWS;

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    dir: 'RIGHT' as Dir,
    nextDir: 'RIGHT' as Dir,
    food: { x: 15, y: 10 },
    score: 0,
    running: false,
    gameOver: false,
  });
  const [displayScore, setDisplayScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#ff3333';
    ctx.beginPath();
    ctx.arc(s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    s.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#00ff88' : '#00cc66';
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    if (!s.running) return;

    s.dir = s.nextDir;
    const head = s.snake[0];
    const newHead: Point = {
      x: head.x + (s.dir === 'RIGHT' ? 1 : s.dir === 'LEFT' ? -1 : 0),
      y: head.y + (s.dir === 'DOWN' ? 1 : s.dir === 'UP' ? -1 : 0),
    };

    if (
      newHead.x < 0 || newHead.x >= COLS ||
      newHead.y < 0 || newHead.y >= ROWS ||
      s.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
    ) {
      s.running = false;
      s.gameOver = true;
      setGameOver(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const ate = newHead.x === s.food.x && newHead.y === s.food.y;
    s.snake = [newHead, ...s.snake];
    if (!ate) s.snake.pop();
    else {
      s.food = randomFood(s.snake);
      s.score += 10;
      setDisplayScore(s.score);
    }

    draw();
  }, [draw]);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.snake = [{ x: 10, y: 10 }];
    s.dir = 'RIGHT';
    s.nextDir = 'RIGHT';
    s.food = { x: 15, y: 10 };
    s.score = 0;
    s.running = true;
    s.gameOver = false;
    setDisplayScore(0);
    setGameOver(false);
    setStarted(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, 120);
    draw();
  }, [tick, draw]);

  useEffect(() => {
    draw();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [draw]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s.running) return;
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
      };
      const newDir = map[e.key];
      if (!newDir) return;
      const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
      if (newDir !== opposites[s.dir]) {
        s.nextDir = newDir;
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        <span className="font-display text-2xl text-primary">SCORE: {displayScore}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="border-2 border-primary"
        style={{ imageRendering: 'pixelated' }}
      />
      {(!started || gameOver) && (
        <div className="text-center">
          {gameOver && <p className="text-destructive font-display text-xl mb-2">GAME OVER!</p>}
          <button
            onClick={startGame}
            className="px-6 py-2 bg-primary text-primary-foreground font-display text-lg hover:opacity-80 transition-opacity"
          >
            {gameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>
          <p className="text-muted-foreground text-sm mt-2">Arrow keys or WASD to move</p>
        </div>
      )}
    </div>
  );
}
