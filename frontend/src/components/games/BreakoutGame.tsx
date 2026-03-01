import React, { useEffect, useRef, useState, useCallback } from 'react';

const W = 480;
const H = 400;
const PADDLE_W = 80;
const PADDLE_H = 12;
const BALL_R = 8;
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_W = 52;
const BRICK_H = 18;
const BRICK_PAD = 4;
const BRICK_TOP = 40;

const BRICK_COLORS = ['#ff3333', '#ff8800', '#ffdd00', '#00cc66', '#3399ff'];

interface Brick { x: number; y: number; alive: boolean; color: string }

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    paddle: { x: W / 2 - PADDLE_W / 2, y: H - 30 },
    ball: { x: W / 2, y: H - 60, vx: 3, vy: -4 },
    bricks: [] as Brick[],
    score: 0,
    lives: 3,
    running: false,
    won: false,
    lost: false,
    mouseX: W / 2,
  });
  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);
  const [status, setStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const rafRef = useRef<number>(0);

  function makeBricks(): Brick[] {
    const bricks: Brick[] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        bricks.push({
          x: c * (BRICK_W + BRICK_PAD) + 20,
          y: r * (BRICK_H + BRICK_PAD) + BRICK_TOP,
          alive: true,
          color: BRICK_COLORS[r % BRICK_COLORS.length],
        });
      }
    }
    return bricks;
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    // Bricks
    s.bricks.forEach(b => {
      if (!b.alive) return;
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, BRICK_W, BRICK_H);
      ctx.strokeStyle = '#0a0a0a';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, b.y, BRICK_W, BRICK_H);
    });

    // Paddle
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(s.paddle.x, s.paddle.y, PADDLE_W, PADDLE_H);

    // Ball
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const loop = useCallback(() => {
    const s = stateRef.current;
    if (!s.running) return;

    // Move paddle toward mouse
    const target = s.mouseX - PADDLE_W / 2;
    s.paddle.x = Math.max(0, Math.min(W - PADDLE_W, target));

    // Move ball
    s.ball.x += s.ball.vx;
    s.ball.y += s.ball.vy;

    // Wall bounces
    if (s.ball.x - BALL_R < 0) { s.ball.x = BALL_R; s.ball.vx *= -1; }
    if (s.ball.x + BALL_R > W) { s.ball.x = W - BALL_R; s.ball.vx *= -1; }
    if (s.ball.y - BALL_R < 0) { s.ball.y = BALL_R; s.ball.vy *= -1; }

    // Paddle collision
    if (
      s.ball.y + BALL_R >= s.paddle.y &&
      s.ball.y + BALL_R <= s.paddle.y + PADDLE_H &&
      s.ball.x >= s.paddle.x &&
      s.ball.x <= s.paddle.x + PADDLE_W
    ) {
      s.ball.vy = -Math.abs(s.ball.vy);
      const offset = (s.ball.x - (s.paddle.x + PADDLE_W / 2)) / (PADDLE_W / 2);
      s.ball.vx = offset * 5;
    }

    // Bottom — lose life
    if (s.ball.y - BALL_R > H) {
      s.lives -= 1;
      setDisplayLives(s.lives);
      if (s.lives <= 0) {
        s.running = false;
        s.lost = true;
        setStatus('lost');
        draw();
        return;
      }
      s.ball = { x: W / 2, y: H - 60, vx: 3, vy: -4 };
    }

    // Brick collisions
    for (const b of s.bricks) {
      if (!b.alive) continue;
      if (
        s.ball.x + BALL_R > b.x && s.ball.x - BALL_R < b.x + BRICK_W &&
        s.ball.y + BALL_R > b.y && s.ball.y - BALL_R < b.y + BRICK_H
      ) {
        b.alive = false;
        s.ball.vy *= -1;
        s.score += 10;
        setDisplayScore(s.score);
        break;
      }
    }

    // Win check
    if (s.bricks.every(b => !b.alive)) {
      s.running = false;
      s.won = true;
      setStatus('won');
      draw();
      return;
    }

    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.paddle = { x: W / 2 - PADDLE_W / 2, y: H - 30 };
    s.ball = { x: W / 2, y: H - 60, vx: 3, vy: -4 };
    s.bricks = makeBricks();
    s.score = 0;
    s.lives = 3;
    s.running = true;
    s.won = false;
    s.lost = false;
    setDisplayScore(0);
    setDisplayLives(3);
    setStatus('playing');
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
    };
    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = e.touches[0].clientX - rect.left;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouch);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-8">
        <span className="font-display text-xl text-primary">SCORE: {displayScore}</span>
        <span className="font-display text-xl text-accent">LIVES: {'❤️'.repeat(displayLives)}</span>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="border-2 border-primary" />
      {status !== 'playing' && (
        <div className="text-center">
          {status === 'won' && <p className="text-green-400 font-display text-xl mb-2">YOU WIN! 🎉</p>}
          {status === 'lost' && <p className="text-destructive font-display text-xl mb-2">GAME OVER!</p>}
          <button
            onClick={startGame}
            className="px-6 py-2 bg-primary text-primary-foreground font-display text-lg hover:opacity-80 transition-opacity"
          >
            {status === 'idle' ? 'START GAME' : 'PLAY AGAIN'}
          </button>
          <p className="text-muted-foreground text-sm mt-2">Move mouse to control paddle</p>
        </div>
      )}
    </div>
  );
}
