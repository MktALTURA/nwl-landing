'use client';

import { useEffect, useState } from 'react';

export default function ConstellationAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Blob 1 — large blue, top-left */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          left: '10%',
          top: '-10%',
          borderRadius: '50%',
          background: '#91BAEF',
          opacity: 0.25,
          filter: 'blur(80px)',
          animation: 'auroraDrift1 10s ease-in-out infinite alternate',
        }}
      />

      {/* Blob 2 — medium blue, bottom-right */}
      <div
        style={{
          position: 'absolute',
          width: 450,
          height: 450,
          right: '5%',
          bottom: '-15%',
          borderRadius: '50%',
          background: '#91BAEF',
          opacity: 0.2,
          filter: 'blur(80px)',
          animation: 'auroraDrift2 13s ease-in-out infinite alternate',
        }}
      />

      {/* Blob 3 — wine accent, center-bottom */}
      <div
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          left: '40%',
          bottom: '-5%',
          borderRadius: '50%',
          background: '#8B2332',
          opacity: 0.08,
          filter: 'blur(80px)',
          animation: 'auroraDrift3 11s ease-in-out infinite alternate',
        }}
      />

      {/* Keyframes — injected globally */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes auroraDrift1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 25px) scale(1.08); }
        }
        @keyframes auroraDrift2 {
          0% { transform: translate(0, 0) scale(1.04); }
          100% { transform: translate(-35px, -20px) scale(0.96); }
        }
        @keyframes auroraDrift3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -15px) scale(1.05); }
        }
      `}} />
    </div>
  );
}
