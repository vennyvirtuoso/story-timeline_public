import React, { useState, useRef, useEffect } from 'react';

const TRAIL_MEMORIES = [
  { label: 'Goa Sunset',      date: 'Nov 25', bg: 'linear-gradient(135deg, #f9d8c5 0%, #f4a28c 100%)', emoji: '🌅' },
  { label: 'Monsoon Chai',    date: 'Aug 25', bg: 'linear-gradient(135deg, #d8efe6 0%, #99ccb8 100%)', emoji: '☕' },
  { label: 'First Roadtrip',  date: 'Mar 25', bg: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', emoji: '🚗' },
  { label: 'Midnight Stars',  date: 'Jan 25', bg: 'linear-gradient(135deg, #e0e7ff 0%, #c4b5fd 100%)', emoji: '✨' },
  { label: 'Hillside Walk',   date: 'Oct 24', bg: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)', emoji: '🌿' },
  { label: 'Anniversary',     date: 'Jun 24', bg: 'linear-gradient(135deg, #ffe4e6 0%, #fda4af 100%)', emoji: '💌' },
];

/**
 * Inspired by North Motion (motion-trail-hero.md):
 * - Desktop fine pointer: spawns sequential rotated Polaroid snapshots along cursor path (>140px / 130ms).
 * - Mobile / touch: displays a smooth curved Polaroid ribbon arc below the hero.
 */
export const DesktopPolaroidTrail = ({ containerRef }) => {
  const [spawns, setSpawns] = useState([]);
  const lastPosRef = useRef({ x: -999, y: -999, time: 0 });
  const seqRef = useRef(0);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const onPointerMove = (e) => {
      // Skip spawning directly over interactive form/card controls so typing/clicking stays crisp
      if (e.target.closest('form, button, a, input, [data-no-trail]')) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 150 || now - lastPosRef.current.time < 160) return;

      lastPosRef.current = { x, y, time: now };
      const item = TRAIL_MEMORIES[seqRef.current % TRAIL_MEMORIES.length];
      seqRef.current += 1;

      const rot = `${((Math.random() - 0.5) * 26).toFixed(1)}deg`;
      const id = `${now}-${seqRef.current}`;

      setSpawns((prev) => [...prev.slice(-6), { id, x, y, rot, ...item }]);
      setTimeout(() => {
        setSpawns((prev) => prev.filter((s) => s.id !== id));
      }, 1400);
    };

    el.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => el.removeEventListener('pointermove', onPointerMove);
  }, [containerRef]);

  if (!spawns.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[4]" aria-hidden="true">
      {spawns.map((s) => (
        <div
          key={s.id}
          className="motion-trail-polaroid bg-white p-2 pb-3.5 rounded-sm shadow-theme-lg border border-black/5 w-32"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            '--trail-rot': s.rot,
          }}
        >
          <div
            className="h-20 rounded-[2px] flex items-center justify-center text-2xl"
            style={{ background: s.bg }}
          >
            {s.emoji}
          </div>
          <p className="font-cursive text-xl text-accent text-center leading-none mt-1.5 font-bold truncate">
            {s.label}
          </p>
          <p className="text-[7px] font-sub uppercase tracking-[0.2em] text-stone-400 text-center mt-0.5">
            {s.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export const MobilePolaroidArc = React.memo(() => {
  const doubled = [...TRAIL_MEMORIES, ...TRAIL_MEMORIES];
  return (
    <div className="sm:hidden relative z-10 w-full overflow-hidden py-4 my-1" aria-hidden="true">
      <div className="mobile-arc-track">
        {doubled.map((item, idx) => {
          const arcOffset = Math.sin((idx / 3) * Math.PI) * 10;
          const arcRot = ((idx % 2 === 0 ? -1 : 1) * (3 + (idx % 3) * 2));
          return (
            <div
              key={idx}
              className="w-28 shrink-0 bg-white p-1.5 pb-3 rounded-sm shadow-theme-md border border-black/5"
              style={{ transform: `translateY(${arcOffset}px) rotate(${arcRot}deg)` }}
            >
              <div
                className="h-16 rounded-[2px] flex items-center justify-center text-xl"
                style={{ background: item.bg }}
              >
                {item.emoji}
              </div>
              <p className="font-cursive text-lg text-accent text-center leading-none mt-1.5 font-bold truncate">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
MobilePolaroidArc.displayName = 'MobilePolaroidArc';
