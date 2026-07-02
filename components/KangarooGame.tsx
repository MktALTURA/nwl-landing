'use client';

import { useEffect, useRef } from 'react';

/**
 * NWL Australian School — "Outback Run" easter egg.
 * An 8-bit, Chrome-dino-style runner: the gold kangaroo hops over spinifex,
 * outback rocks and flying boomerangs across the dawn, under the Southern
 * Cross. Space / ↑ / tap to jump, ESC to leave. Speed ramps up over time.
 * Triggered from the Our Spirit kangaroo (5 quick taps).
 */

/* ---------- pixel sprites (22×16 · G gold, D deep gold, . empty) ---------- */
/* Leap pose downsampled from the official brand kangaroo art (26x14). */
const ROO_LEAP = [
  '..........................',
  '.............GGGGG....G...',
  '...........GGGGGGGG...GG..',
  '.GG.......GGGGGGGGGGGGGGG.',
  '..GGGG.GGGGGGGGGGGGGGG....',
  '....GGGGGGGGGGGGGGGGG.....',
  '.............GGGGG.G......',
  '.............GGG..........',
  '............GGG...........',
  '...........GG.............',
  '..........GG..............',
  '.........GG...............',
  '........GG................',
  '..........................',
];
/* Same pose with the hind leg gathered under the body (ground-contact frame). */
const ROO_GATHER = [
  '..........................',
  '.............GGGGG....G...',
  '...........GGGGGGGG...GG..',
  '.GG.......GGGGGGGGGGGGGGG.',
  '..GGGG.GGGGGGGGGGGGGGG....',
  '....GGGGGGGGGGGGGGGGG.....',
  '...........GGGGGG.G.......',
  '..........GGGGGGG.........',
  '..........GG..GGG.........',
  '..........G....GG.........',
  '..........................',
  '..........................',
  '..........................',
  '..........................',
];
const ROO_RUN_A = ROO_LEAP;
const ROO_RUN_B = ROO_GATHER;
const ROO_JUMP = ROO_LEAP;
const ROO_W = 26;
const ROO_H = 14;

const SPINIFEX = [
  '....G....G....',
  '.G..G...G..G..',
  '..G.GG..G.G...',
  '...GGG.GG.G...',
  '.G..GGGGG..G..',
  '..GG.GGG.GG...',
  '....GGGGG.....',
  '.....GGG......',
];
const ROCK = [
  '......RRRR......',
  '....RRRRRRRR....',
  '...RRRRRRRRRR...',
  '..RRRRRRRRRRRR..',
  '.RRRRRRRRRRRRRR.',
  'RRRRRRRRRRRRRRRR',
];
const BOOMERANG_A = [
  'GG......',
  '.GG.....',
  '..GG....',
  '...GG...',
  '...GGGG.',
  '......GG',
];
const BOOMERANG_B = [
  '......GG',
  '...GGGG.',
  '...GG...',
  '..GG....',
  '.GG.....',
  'GG......',
];

const COLORS: Record<string, string> = {
  G: '#E3990F',
  R: '#B5532A',
};

type Obstacle = {
  kind: 'spinifex' | 'rock' | 'boomerang';
  x: number;
  y: number;
  w: number;
  h: number;
};

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  x: number,
  y: number,
  colorOverride?: string
) {
  for (let r = 0; r < sprite.length; r++) {
    for (let c = 0; c < sprite[r].length; c++) {
      const ch = sprite[r][c];
      if (ch === '.') continue;
      ctx.fillStyle = colorOverride || COLORS[ch] || '#E3990F';
      ctx.fillRect(Math.round(x + c), Math.round(y + r), 1, 1);
    }
  }
}

/* Southern Cross positions (Australian-flag geometry, scaled down) */
const CROSS_STARS = [
  { x: 316, y: 12, r: 1.5 },
  { x: 316, y: 44, r: 1.5 },
  { x: 300, y: 26, r: 1.5 },
  { x: 332, y: 23, r: 1.5 },
  { x: 322, y: 31, r: 1 },
];

export default function KangarooGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 360;
    const H = 150;
    const GROUND = 132;
    canvas.width = W;
    canvas.height = H;
    ctx.imageSmoothingEnabled = false;

    /* --- tiny 8-bit square-wave blips --- */
    let audio: AudioContext | null = null;
    const beep = (freq: number, dur = 0.07, vol = 0.03) => {
      try {
        audio = audio || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(vol, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
        osc.connect(gain).connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + dur);
      } catch {
        /* audio unavailable — stay silent */
      }
    };

    /* --- state --- */
    let raf = 0;
    let state: 'ready' | 'run' | 'over' = 'ready';
    let frames = 0;
    let speed = 2.4;
    let score = 0;
    let best = 0;
    try { best = parseInt(localStorage.getItem('nwl-outback-run-best') || '0', 10) || 0; } catch { /* private mode */ }

    let rooY = GROUND - ROO_H;
    let vy = 0;
    let jumping = false;
    let nextSpawn = 70;
    let obstacles: Obstacle[] = [];
    let uluruX = W + 40;
    let deadFlash = 0;

    const reset = () => {
      frames = 0;
      speed = 2.4;
      score = 0;
      rooY = GROUND - ROO_H;
      vy = 0;
      jumping = false;
      obstacles = [];
      nextSpawn = 70;
      uluruX = W + 40;
    };

    const jump = () => {
      if (state === 'ready') { state = 'run'; beep(660, 0.08); return; }
      if (state === 'over') { reset(); state = 'run'; beep(660, 0.08); return; }
      if (!jumping) {
        jumping = true;
        vy = -4.35;
        beep(880, 0.06);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        jump();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onExitRef.current();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      // early release = shorter hop (variable jump height)
      if ((e.code === 'Space' || e.code === 'ArrowUp') && jumping && vy < -1.6) vy = -1.6;
    };
    const onPointer = (e: PointerEvent) => { e.preventDefault(); jump(); };

    window.addEventListener('keydown', onKey, { capture: true });
    window.addEventListener('keyup', onKeyUp, { capture: true });
    canvas.addEventListener('pointerdown', onPointer);

    const spawn = () => {
      const canBoomerang = score > 250;
      const roll = Math.random();
      if (canBoomerang && roll < 0.28) {
        obstacles.push({ kind: 'boomerang', x: W + 8, y: GROUND - 30, w: 8, h: 6 });
      } else if (roll < 0.62) {
        obstacles.push({ kind: 'spinifex', x: W + 8, y: GROUND - 8, w: 14, h: 8 });
      } else {
        obstacles.push({ kind: 'rock', x: W + 8, y: GROUND - 6, w: 16, h: 6 });
      }
      const gapBase = Math.max(46, 110 - speed * 9);
      nextSpawn = gapBase + Math.random() * 55;
    };

    const die = () => {
      state = 'over';
      deadFlash = 8;
      beep(160, 0.25, 0.05);
      if (score > best) {
        best = score;
        try { localStorage.setItem('nwl-outback-run-best', String(best)); } catch { /* ignore */ }
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);

      /* --- update --- */
      if (state === 'run') {
        frames++;
        score = Math.floor(frames / 5);
        speed = Math.min(7.2, 2.4 + frames * 0.0011);

        if (jumping) {
          vy += 0.22;
          rooY += vy;
          if (rooY >= GROUND - ROO_H) { rooY = GROUND - ROO_H; jumping = false; vy = 0; }
        }

        nextSpawn -= speed;
        if (nextSpawn <= 0) spawn();

        uluruX -= speed * 0.18;
        if (uluruX < -80) uluruX = W + 120 + Math.random() * 200;

        for (const o of obstacles) o.x -= speed;
        obstacles = obstacles.filter((o) => o.x > -24);

        // collision (forgiving insets)
        const px = 34 + 6;
        const pw = ROO_W - 12;
        const py = rooY + 2;
        const ph = ROO_H - 5;
        for (const o of obstacles) {
          if (px < o.x + o.w - 2 && px + pw > o.x + 2 && py < o.y + o.h - 1 && py + ph > o.y + 1) {
            die();
            break;
          }
        }
      }

      /* --- draw --- */
      // dawn sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#071638');
      sky.addColorStop(0.72, '#0B224E');
      sky.addColorStop(0.9, '#2b3a63');
      sky.addColorStop(1, '#081B40');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Southern Cross (twinkle)
      for (let i = 0; i < CROSS_STARS.length; i++) {
        const s = CROSS_STARS[i];
        const tw = 0.55 + 0.45 * Math.abs(Math.sin(frames * 0.03 + i * 1.7));
        ctx.fillStyle = `rgba(244,238,226,${tw.toFixed(2)})`;
        ctx.fillRect(s.x, s.y, s.r * 2, s.r * 2);
      }

      // distant Uluru silhouette (parallax)
      ctx.fillStyle = 'rgba(181,83,42,0.5)';
      ctx.beginPath();
      ctx.moveTo(uluruX, GROUND);
      ctx.lineTo(uluruX + 12, GROUND - 14);
      ctx.lineTo(uluruX + 52, GROUND - 14);
      ctx.lineTo(uluruX + 64, GROUND);
      ctx.closePath();
      ctx.fill();

      // ground
      ctx.fillStyle = '#C8870E';
      ctx.fillRect(0, GROUND, W, 1);
      ctx.fillStyle = 'rgba(200,135,14,0.35)';
      for (let i = 0; i < 14; i++) {
        const gx = (i * 47 - ((frames * speed) % 47)) % (W + 20);
        ctx.fillRect(gx, GROUND + 4 + ((i * 13) % 9), 3, 1);
      }

      // obstacles
      for (const o of obstacles) {
        if (o.kind === 'spinifex') drawSprite(ctx, SPINIFEX, o.x, o.y, '#93A860');
        else if (o.kind === 'rock') drawSprite(ctx, ROCK, o.x, o.y);
        else drawSprite(ctx, frames % 14 < 7 ? BOOMERANG_A : BOOMERANG_B, o.x, o.y);
      }

      // kangaroo
      // idle (ready/over) holds the leap pose — the same silhouette as the
      // logo the mascot just landed from; the run cycle alternates while moving
      const sprite =
        jumping || state !== 'run' ? ROO_JUMP : frames % 12 < 6 ? ROO_RUN_A : ROO_RUN_B;
      if (deadFlash > 0) deadFlash--;
      drawSprite(ctx, sprite, 34, rooY, deadFlash % 4 >= 2 ? '#F4EEE2' : undefined);

      // HUD
      ctx.fillStyle = 'rgba(244,238,226,0.85)';
      ctx.font = '8px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`HI ${String(best).padStart(5, '0')}  ${String(score).padStart(5, '0')}`, W - 6, 12);

      ctx.textAlign = 'center';
      if (state === 'ready') {
        if (Math.floor(frames / 1) % 2 === 0) {
          ctx.fillStyle = 'rgba(244,238,226,0.9)';
          ctx.fillText("G'DAY · PRESS SPACE TO HOP", W / 2, 58);
          ctx.fillStyle = 'rgba(244,238,226,0.5)';
          ctx.fillText('ESC TO GO BACK', W / 2, 70);
        }
        frames++;
      } else if (state === 'over') {
        ctx.fillStyle = '#E3990F';
        ctx.fillText('GAME OVER, MATE', W / 2, 54);
        ctx.fillStyle = 'rgba(244,238,226,0.75)';
        ctx.fillText('SPACE · HOP AGAIN   ESC · BACK', W / 2, 68);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey, { capture: true } as EventListenerOptions);
      window.removeEventListener('keyup', onKeyUp, { capture: true } as EventListenerOptions);
      canvas.removeEventListener('pointerdown', onPointer);
      if (audio) audio.close().catch(() => undefined);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[900px] mx-auto select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl border border-gold/25 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
        style={{ imageRendering: 'pixelated', aspectRatio: '360 / 150' }}
        aria-label="Outback Run — NWL kangaroo mini-game. Press space to jump, escape to exit."
      />
      <button
        onClick={() => onExitRef.current()}
        className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 hover:text-paper transition-colors"
      >
        ESC ✕
      </button>
      <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
        Outback Run · NWL
      </div>
    </div>
  );
}
