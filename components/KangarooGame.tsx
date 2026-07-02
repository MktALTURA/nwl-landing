'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * NWL Australian School — "Outback Run" easter egg.
 * An 8-bit, Chrome-dino-style runner: the gold kangaroo hops over spinifex,
 * outback rocks and flying boomerangs across the outback. Space / ↑ / tap to
 * jump, ESC to leave. Starts gentle and ramps up to full pace around the
 * 500-point mark; every 1000 points the outback flips between night and day
 * (sun up, stars out). School-wide top-20 leaderboard via /api/game-scores.
 */

/* ---------- pixel sprites ---------- */
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

type Obstacle = {
  kind: 'spinifex' | 'rock' | 'boomerang';
  x: number;
  y: number;
  w: number;
  h: number;
};

type RGB = [number, number, number];
const mix = (a: RGB, b: RGB, t: number): string => {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

/* night → day palette */
const SKY_NIGHT: RGB[] = [[7, 22, 56], [11, 34, 78], [43, 58, 99], [8, 27, 64]];
const SKY_DAY: RGB[] = [[104, 163, 205], [148, 195, 224], [244, 228, 190], [216, 176, 108]];
const ROO_NIGHT: RGB = [227, 153, 15];
const ROO_DAY: RGB = [154, 96, 8];
const TEXT_NIGHT: RGB = [244, 238, 226];
const TEXT_DAY: RGB = [11, 34, 78];

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  x: number,
  y: number,
  color: string
) {
  for (let r = 0; r < sprite.length; r++) {
    for (let c = 0; c < sprite[r].length; c++) {
      if (sprite[r][c] === '.') continue;
      ctx.fillStyle = color;
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

interface ScoreEntry {
  name: string;
  score: number;
}

export default function KangarooGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  /* --- React UI layer --- */
  const [ui, setUi] = useState<'ready' | 'run' | 'over'>('ready');
  const [finalScore, setFinalScore] = useState(0);
  const [showBoard, setShowBoard] = useState(false);
  const [board, setBoard] = useState<ScoreEntry[] | null>(null);
  const [boardOffline, setBoardOffline] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedAs, setSavedAs] = useState<string | null>(null);
  const panelOpenRef = useRef(false);
  panelOpenRef.current = showBoard;
  const gameApiRef = useRef<{ restart: () => void } | null>(null);

  useEffect(() => {
    try {
      setPlayerName(localStorage.getItem('nwl-outback-run-name') || '');
    } catch { /* ignore */ }
  }, []);

  const localBoard = (): ScoreEntry[] => {
    try {
      return JSON.parse(localStorage.getItem('nwl-outback-run-board') || '[]');
    } catch {
      return [];
    }
  };

  const loadBoard = useCallback(async () => {
    setShowBoard(true);
    setBoard(null);
    try {
      const res = await fetch('/api/game-scores');
      const data = await res.json();
      setBoard(Array.isArray(data.top) ? data.top : []);
      setBoardOffline(!!data.offline);
    } catch {
      setBoard(localBoard());
      setBoardOffline(true);
    }
  }, []);

  const saveScore = useCallback(async () => {
    const name = playerName.replace(/\s+/g, ' ').trim().slice(0, 18);
    if (name.length < 2 || finalScore < 1 || saving) return;
    setSaving(true);
    try {
      localStorage.setItem('nwl-outback-run-name', name);
    } catch { /* ignore */ }
    try {
      const res = await fetch('/api/game-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score: finalScore }),
      });
      if (!res.ok) throw new Error('bad');
      const data = await res.json();
      setBoard(Array.isArray(data.top) ? data.top : []);
      setBoardOffline(false);
    } catch {
      // offline fallback — keep a device-local board so the egg still works
      const merged = localBoard().filter((e) => e.name !== name || e.score >= finalScore);
      if (!merged.some((e) => e.name === name && e.score >= finalScore)) {
        merged.push({ name, score: finalScore });
      }
      merged.sort((a, b) => b.score - a.score);
      const top = merged.slice(0, 20);
      try {
        localStorage.setItem('nwl-outback-run-board', JSON.stringify(top));
      } catch { /* ignore */ }
      setBoard(top);
      setBoardOffline(true);
    }
    setSavedAs(name);
    setSaving(false);
    setShowBoard(true);
  }, [playerName, finalScore, saving]);

  /* --- the game itself --- */
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

    /* tiny 8-bit square-wave blips */
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
      } catch { /* audio unavailable */ }
    };

    let raf = 0;
    let state: 'ready' | 'run' | 'over' = 'ready';
    let frames = 0;
    let speed = 1.9;
    let score = 0;
    let best = 0;
    try { best = parseInt(localStorage.getItem('nwl-outback-run-best') || '0', 10) || 0; } catch { /* ignore */ }

    let rooY = GROUND - ROO_H;
    let vy = 0;
    let jumping = false;
    let nextSpawn = 130;
    let obstacles: Obstacle[] = [];
    let uluruX = W + 40;
    let deadFlash = 0;
    let dayT = 0; // 0 = night, 1 = day (eased)

    const reset = () => {
      frames = 0;
      speed = 1.9;
      score = 0;
      rooY = GROUND - ROO_H;
      vy = 0;
      jumping = false;
      obstacles = [];
      nextSpawn = 130;
      uluruX = W + 40;
    };

    const jump = () => {
      if (panelOpenRef.current) return; // leaderboard open — don't play behind it
      if (state === 'ready') {
        state = 'run';
        setUi('run');
        beep(660, 0.08);
        return;
      }
      if (state === 'over') {
        reset();
        state = 'run';
        setUi('run');
        setSavedAs(null);
        beep(660, 0.08);
        return;
      }
      if (!jumping) {
        jumping = true;
        vy = -4.35;
        beep(880, 0.06);
      }
    };
    gameApiRef.current = { restart: jump };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        jump();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        if (panelOpenRef.current) return; // panel has its own close button
        onExitRef.current();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && jumping && vy < -1.6) vy = -1.6;
    };
    const onPointer = (e: PointerEvent) => { e.preventDefault(); jump(); };

    window.addEventListener('keydown', onKey, { capture: true });
    window.addEventListener('keyup', onKeyUp, { capture: true });
    canvas.addEventListener('pointerdown', onPointer);

    /* difficulty: gentle start, full pace around the 500-point mark */
    const progress = () => Math.min(1, score / 520);

    const spawn = () => {
      const prog = progress();
      const canBoomerang = score > 420;
      const roll = Math.random();
      if (canBoomerang && roll < 0.25) {
        obstacles.push({ kind: 'boomerang', x: W + 8, y: GROUND - 30, w: 8, h: 6 });
      } else if (roll < 0.62) {
        obstacles.push({ kind: 'spinifex', x: W + 8, y: GROUND - 8, w: 14, h: 8 });
      } else {
        obstacles.push({ kind: 'rock', x: W + 8, y: GROUND - 6, w: 16, h: 6 });
      }
      // wide, forgiving gaps early → tight gaps at full pace
      const gapBase = 150 - 95 * prog;
      nextSpawn = gapBase + Math.random() * (110 - 55 * prog);
    };

    const die = () => {
      state = 'over';
      deadFlash = 8;
      beep(160, 0.25, 0.05);
      if (score > best) {
        best = score;
        try { localStorage.setItem('nwl-outback-run-best', String(best)); } catch { /* ignore */ }
      }
      setFinalScore(score);
      setUi('over');
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);

      /* --- update --- */
      if (state === 'run') {
        frames++;
        score = Math.floor(frames / 5);
        const prog = progress();
        speed = Math.min(7.6, 1.9 + 4.4 * prog + Math.max(0, score - 520) * 0.0009);

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

      /* day/night: flips every 1000 points, eased crossfade */
      const targetDay = Math.floor(score / 1000) % 2;
      dayT += (targetDay - dayT) * 0.025;
      if (Math.abs(targetDay - dayT) < 0.002) dayT = targetDay;

      /* --- draw --- */
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, mix(SKY_NIGHT[0], SKY_DAY[0], dayT));
      sky.addColorStop(0.72, mix(SKY_NIGHT[1], SKY_DAY[1], dayT));
      sky.addColorStop(0.9, mix(SKY_NIGHT[2], SKY_DAY[2], dayT));
      sky.addColorStop(1, mix(SKY_NIGHT[3], SKY_DAY[3], dayT));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // sun (daytime)
      if (dayT > 0.02) {
        ctx.globalAlpha = dayT;
        ctx.fillStyle = '#F2B01E';
        ctx.beginPath();
        ctx.arc(54, 28, 9, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + frames * 0.002;
          ctx.fillRect(54 + Math.cos(a) * 13 - 1, 28 + Math.sin(a) * 13 - 1, 2, 2);
        }
        ctx.globalAlpha = 1;
      }

      // Southern Cross (night)
      if (dayT < 0.98) {
        for (let i = 0; i < CROSS_STARS.length; i++) {
          const s = CROSS_STARS[i];
          const tw = (0.55 + 0.45 * Math.abs(Math.sin(frames * 0.03 + i * 1.7))) * (1 - dayT);
          ctx.fillStyle = `rgba(244,238,226,${tw.toFixed(2)})`;
          ctx.fillRect(s.x, s.y, s.r * 2, s.r * 2);
        }
      }

      // distant Uluru silhouette (parallax)
      ctx.fillStyle = `rgba(181,83,42,${(0.5 + 0.3 * dayT).toFixed(2)})`;
      ctx.beginPath();
      ctx.moveTo(uluruX, GROUND);
      ctx.lineTo(uluruX + 12, GROUND - 14);
      ctx.lineTo(uluruX + 52, GROUND - 14);
      ctx.lineTo(uluruX + 64, GROUND);
      ctx.closePath();
      ctx.fill();

      // ground
      ctx.fillStyle = mix([200, 135, 14], [140, 92, 10], dayT);
      ctx.fillRect(0, GROUND, W, 1);
      ctx.fillStyle = dayT > 0.5 ? 'rgba(120,80,10,0.35)' : 'rgba(200,135,14,0.35)';
      for (let i = 0; i < 14; i++) {
        const gx = (i * 47 - ((frames * speed) % 47)) % (W + 20);
        ctx.fillRect(gx, GROUND + 4 + ((i * 13) % 9), 3, 1);
      }

      // obstacles
      const rooColor = mix(ROO_NIGHT, ROO_DAY, dayT);
      for (const o of obstacles) {
        if (o.kind === 'spinifex') drawSprite(ctx, SPINIFEX, o.x, o.y, mix([147, 168, 96], [90, 120, 52], dayT));
        else if (o.kind === 'rock') drawSprite(ctx, ROCK, o.x, o.y, '#B5532A');
        else drawSprite(ctx, frames % 14 < 7 ? BOOMERANG_A : BOOMERANG_B, o.x, o.y, rooColor);
      }

      // kangaroo — idle (ready/over) holds the leap pose, matching the logo
      const sprite =
        jumping || state !== 'run' ? ROO_LEAP : frames % 12 < 6 ? ROO_LEAP : ROO_GATHER;
      if (deadFlash > 0) deadFlash--;
      drawSprite(ctx, sprite, 34, rooY, deadFlash % 4 >= 2 ? '#F4EEE2' : rooColor);

      // HUD
      const textColor = mix(TEXT_NIGHT, TEXT_DAY, dayT);
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.9;
      ctx.font = '8px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`HI ${String(best).padStart(5, '0')}  ${String(score).padStart(5, '0')}`, W - 6, 12);
      ctx.globalAlpha = 1;

      ctx.textAlign = 'center';
      if (state === 'ready') {
        if (Math.floor(frames / 30) % 2 === 0) {
          ctx.fillStyle = textColor;
          ctx.fillText("G'DAY · PRESS SPACE TO HOP", W / 2, 58);
          ctx.globalAlpha = 0.55;
          ctx.fillText('ESC TO GO BACK', W / 2, 70);
          ctx.globalAlpha = 1;
        }
        frames++;
      } else if (state === 'over') {
        ctx.fillStyle = '#E3990F';
        ctx.fillText('GAME OVER, MATE', W / 2, 50);
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

  const btn =
    'font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-colors';

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

      {/* pre-game actions */}
      {ui === 'ready' && !showBoard && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button
            onClick={loadBoard}
            className={`${btn} border-gold/40 text-gold hover:bg-gold/15`}
          >
            🏆 Leaderboard
          </button>
        </div>
      )}

      {/* game-over: save your score */}
      {ui === 'over' && !showBoard && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#071638]/90 border border-gold/30 rounded-2xl px-5 py-4 w-[min(320px,86%)] text-center backdrop-blur-sm">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-2">
              Score {String(finalScore).padStart(5, '0')}
            </div>
            {savedAs ? (
              <div className="font-mono text-[10px] text-paper/70 mb-3">Saved as {savedAs} ✓</div>
            ) : (
              <div className="flex gap-2 mb-3">
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveScore(); }}
                  maxLength={18}
                  placeholder="YOUR NAME"
                  className="flex-1 min-w-0 bg-white/10 border border-paper/25 rounded-lg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper placeholder:text-paper/35 focus:outline-none focus:border-gold/60"
                />
                <button
                  onClick={saveScore}
                  disabled={saving || playerName.trim().length < 2}
                  className={`${btn} border-gold bg-gold text-[#1C0F00] hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {saving ? '…' : 'Save'}
                </button>
              </div>
            )}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => gameApiRef.current?.restart()}
                className={`${btn} border-paper/30 text-paper hover:bg-paper/10`}
              >
                Hop again
              </button>
              <button onClick={loadBoard} className={`${btn} border-gold/40 text-gold hover:bg-gold/15`}>
                🏆 Top 20
              </button>
            </div>
          </div>
        </div>
      )}

      {/* leaderboard panel */}
      {showBoard && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#071638]/95 border border-gold/30 rounded-2xl p-4 w-[min(340px,90%)] max-h-[92%] flex flex-col backdrop-blur-sm">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold text-center mb-1">
              🏆 Outback Run · Top 20
            </div>
            <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-paper/45 text-center mb-3">
              {boardOffline ? 'local scores · reconnect to compete' : 'school-wide — prizes for the record!'}
            </div>
            <div className="overflow-y-auto flex-1 pr-1">
              {board === null ? (
                <div className="font-mono text-[10px] text-paper/50 text-center py-6">Loading…</div>
              ) : board.length === 0 ? (
                <div className="font-mono text-[10px] text-paper/50 text-center py-6">
                  No hops yet — be the first!
                </div>
              ) : (
                <table className="w-full font-mono text-[10.5px] text-paper/85">
                  <tbody>
                    {board.map((e, i) => (
                      <tr key={`${e.name}-${i}`} className={savedAs === e.name ? 'text-gold' : ''}>
                        <td className="py-[3px] pr-2 text-paper/45 w-7">{i + 1}.</td>
                        <td className="py-[3px] pr-2 truncate max-w-[160px] uppercase">{e.name}</td>
                        <td className="py-[3px] text-right tabular-nums">{e.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button
              onClick={() => setShowBoard(false)}
              className={`${btn} border-paper/30 text-paper hover:bg-paper/10 mt-3 self-center`}
            >
              Back
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
        Outback Run · NWL
      </div>
    </div>
  );
}
