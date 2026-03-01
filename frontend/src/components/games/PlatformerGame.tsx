import React, { useEffect, useRef, useState, useCallback } from 'react';

const W = 480;
const H = 320;
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const SPEED = 3;

interface Platform { x: number; y: number; w: number; h: number }
interface Star { x: number; y: number; collected: boolean }

const PLATFORMS: Platform[] = [
  { x: 0, y: H - 20, w: W, h: 20 },
  { x: 60, y: 240, w: 100, h: 12 },
  { x: 220, y: 200, w: 100, h: 12 },
  { x: 360, y: 160, w: 100, h: 12 },
  { x: 100, y: 130, w: 80, h: 12 },
  { x: 280, y: 90, w: 80, h: 12 },
];

const STARS_INIT: Star[] = [
  { x: 90, y: 215, collected: false },
  { x: 260, y: 175, collected: false },
  { x: 400, y: 135, collected: false },
  { x: 130, y: 105, collected: false },
  { x: 310, y: 65, collected: false },
];

export default function PlatformerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    player: { x: 30, y: H - 60, vx: 0, vy: 0, onGround: false },
    stars: STARS_INIT.map(s => ({ ...s })),
    score: 0,
    running: false,
    won: false,
    keys: { left: false, right: false, up: false },
  });
  const [displayScore, setDisplayScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'won'>('idle');
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    // Platforms
    ctx.fillStyle = '#555555';
    PLATFORMS.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

    // Stars
    s.stars.forEach(star => {
      if (star.collected) return;
      ctx.fillStyle = '#ffdd00';
      ctx.beginPath();
      ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Player
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(s.player.x - 12, s.player.y - 24, 24, 24);
    // Eyes
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(s.player.x - 6, s.player.y - 20, 4, 4);
    ctx.fillRect(s.player.x + 2, s.player.y - 20, 4, 4);
  }, []);

  const loop = useCallback(() => {
    const s = stateRef.current;
    if (!s.running) return;

    const p = s.player;
    if (s.keys.left) p.vx = -SPEED;
    else if (s.keys.right) p.vx = SPEED;
    else p.vx *= 0.8;

    if (s.keys.up && p.onGround) {
      p.vy = JUMP_FORCE;
      p.onGround = false;
    }

    p.vy += GRAVITY;
    p.x += p.vx;
    p.y += p.vy;
    p.onGround = false;

    // Clamp x
    p.x = Math.max(12, Math.min(W - 12, p.x));

    // Platform collisions
    for (const plat of PLATFORMS) {
      if (
        p.x + 12 > plat.x && p.x - 12 < plat.x + plat.w &&
        p.y > plat.y && p.y - p.vy <= plat.y + plat.h &&
        p.vy > 0
      ) {
        p.y = plat.y;
        p.vy = 0;
        p.onGround = true;
      }
    }

    // Fall off bottom
    if (p.y > H + 50) {
      p.x = 30; p.y = H - 60; p.vx = 0; p.vy = 0;
    }

    // Collect stars
    s.stars.forEach(star => {
      if (star.collected) return;
      if (Math.abs(p.x - star.x) < 20 && Math.abs(p.y - star.y) < 20) {
        star.collected = true;
        s.score += 100;
        setDisplayScore(s.score);
      }
    });

    // Win
    if (s.stars.every(st => st.collected)) {
      s.running = false;
      s.won = true;
      setStatus('won');
    }

    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.player = { x: 30, y: H - 60, vx: 0, vy: 0, onGround: false };
    s.stars = STARS_INIT.map(st => ({ ...st }));
    s.score = 0;
    s.running = true;
    s.won = false;
    setDisplayScore(0);
    setStatus('playing');
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a') { s.keys.left = true; e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'd') { s.keys.right = true; e.preventDefault(); }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') { s.keys.up = true; e.preventDefault(); }
    };
    const up = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a') s.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') s.keys.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') s.keys.up = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        <span className="font-display text-xl text-primary">STARS: {displayScore / 100}/5</span>
        <span className="font-display text-xl text-accent">SCORE: {displayScore}</span>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="border-2 border-primary" />
      {status !== 'playing' && (
        <div className="text-center">
          {status === 'won' && <p className="text-green-400 font-display text-xl mb-2">YOU WIN! 🌟</p>}
          <button
            onClick={startGame}
            className="px-6 py-2 bg-primary text-primary-foreground font-display text-lg hover:opacity-80 transition-opacity"
          >
            {status === 'idle' ? 'START GAME' : 'PLAY AGAIN'}
          </button>
          <p className="text-muted-foreground text-sm mt-2">Arrow keys / WASD to move, Up/Space to jump</p>
        </div>
      )}
    </div>
  );
}
