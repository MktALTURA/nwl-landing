'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Node palette ─────────────────────────────────────── */
const COLORS = [
  '#d0d689', // primaria accent
  '#d0d689',
  '#d0d689',
  '#E6A944', // mustard
  '#3D3D3D', // charcoal (subtle)
];

/* ── Generate a wave of nodes ─────────────────────────── */
function generateNodes(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 5 + Math.random() * 5,
    x: 5 + Math.random() * 90,
    y: 8 + Math.random() * 84,
    delay: Math.random() * 1.8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

/* ── Generate connections between nearby nodes ─────────── */
function generateConnections(
  nodes: ReturnType<typeof generateNodes>,
  maxDistance: number,
  maxCount: number
) {
  const connections: { from: number; to: number; delay: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance && connections.length < maxCount) {
        connections.push({
          from: i,
          to: j,
          delay: 0.3 + Math.random() * 1.2,
        });
      }
    }
  }
  return connections;
}

type WaveData = {
  key: number;
  nodes: ReturnType<typeof generateNodes>;
  connections: ReturnType<typeof generateConnections>;
};

export default function GridAnimation() {
  const [active, setActive] = useState(false);
  const [waves, setWaves] = useState<WaveData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const waveCounter = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const nodeCount = isMobile ? 14 : 28;
  const maxDist = isMobile ? 30 : 25;
  const maxConn = isMobile ? 20 : 30;

  /* ── Spawn a new wave of nodes + connections ── */
  const spawnWave = useCallback(() => {
    const nodes = generateNodes(nodeCount);
    const connections = generateConnections(nodes, maxDist, maxConn);
    const key = waveCounter.current++;
    setWaves((prev) => [...prev.slice(-2), { key, nodes, connections }]);
  }, [nodeCount, maxDist, maxConn]);

  /* ── Clean up finished waves ── */
  const removeWave = useCallback((key: number) => {
    setWaves((prev) => prev.filter((w) => w.key !== key));
  }, []);

  /* ── Observe parent section to start ── */
  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Loop: spawn waves on interval ── */
  useEffect(() => {
    if (!active) return;

    // First wave immediately
    spawnWave();

    // New wave every 4.5s
    intervalRef.current = setInterval(spawnWave, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, spawnWave]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      <AnimatePresence>
        {waves.map((wave) => (
          <Wave
            key={wave.key}
            waveKey={wave.key}
            nodes={wave.nodes}
            connections={wave.connections}
            onComplete={removeWave}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Single wave of dots + lines ── */
function Wave({
  waveKey,
  nodes,
  connections,
  onComplete,
}: {
  waveKey: number;
  nodes: ReturnType<typeof generateNodes>;
  connections: ReturnType<typeof generateConnections>;
  onComplete: (key: number) => void;
}) {
  const completedRef = useRef(0);
  const totalAnimations = nodes.length + connections.length;

  const handleAnimComplete = () => {
    completedRef.current++;
    if (completedRef.current >= totalAnimations) {
      onComplete(waveKey);
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Connection lines */}
      <svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          return (
            <motion.line
              key={`line-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#d0d689"
              strokeWidth="0.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.45, 0.3, 0],
              }}
              transition={{
                duration: 3.5,
                delay: conn.delay,
                ease: 'easeInOut',
              }}
              onAnimationComplete={handleAnimComplete}
            />
          );
        })}
      </svg>

      {/* Nodes as dots */}
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          className="absolute rounded-full"
          style={{
            width: n.size,
            height: n.size,
            left: `${n.x}%`,
            top: `${n.y}%`,
            background: n.color,
            boxShadow:
              n.color === '#d0d689'
                ? `0 0 ${n.size * 3}px ${n.size * 1.5}px rgba(208,214,137,0.35)`
                : `0 0 ${n.size * 2}px ${n.size}px rgba(230,169,68,0.2)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.75, 0.4, 0.6, 0],
            scale: [0, 1, 0.8, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: n.delay,
            ease: 'easeInOut',
          }}
          onAnimationComplete={handleAnimComplete}
        />
      ))}
    </motion.div>
  );
}
