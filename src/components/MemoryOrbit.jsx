import React, { useState, useRef, useEffect } from 'react';
import { X, Heart, Calendar, Edit2, Trash2, Play, Pause } from 'lucide-react';

/**
 * Inspired by Orbita Studio (orbita-gallery-studio.md):
 * Interactive grab-and-drag 3D spatial orbit of memories.
 * Clicking any orbiting card smoothly brings it into center-stage spotlight.
 */
const MemoryOrbit = ({ memories, theme, onEdit, onDelete }) => {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [featured, setFeatured] = useState(null);

  const dragRef = useRef({ active: false, startX: 0, startAngle: 0, moved: false });
  const items = memories.slice(0, 14); // keep spatial ring crisp & uncluttered

  // Gentle auto-orbit when idle (respects reduced motion & pauses while featured/dragging)
  useEffect(() => {
    if (!isAutoSpin || isDragging || featured || items.length <= 1) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rafId;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!document.hidden) {
        setAngle((a) => (a + dt * 10) % 360);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoSpin, isDragging, featured, items.length]);

  useEffect(() => {
    if (!featured) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setFeatured(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [featured]);

  const onPointerDown = (e) => {
    if (e.target.closest('button[data-orbit-control]')) return;
    dragRef.current = { active: true, startX: e.clientX, startAngle: angle, moved: false };
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 5) dragRef.current.moved = true;
    setAngle(dragRef.current.startAngle + dx * 0.35);
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
    setIsDragging(false);
  };

  const radius = items.length <= 4 ? 210 : items.length <= 8 ? 270 : 320;

  return (
    <div
      className={`relative max-w-5xl mx-auto w-full min-h-[72vh] my-2 rounded-3xl border border-border-theme shadow-theme-lg overflow-hidden flex flex-col justify-between select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        background: theme?.isDark
          ? 'radial-gradient(ellipse at center, #231942 0%, #110c21 75%)'
          : 'radial-gradient(ellipse at center, #fffdf9 0%, #efe1cc 85%)',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      data-cursor="Drag"
    >
      {/* Top Orbit Bar */}
      <div className="relative z-20 flex items-center justify-between px-5 sm:px-7 pt-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dark/45 block">
            Spatial Stage · {items.length} Memories
          </span>
          <p className="font-heading text-lg font-semibold text-primary">
            Drag to orbit · Tap any memory to inspect
          </p>
        </div>

        <button
          type="button"
          data-orbit-control="true"
          onClick={() => setIsAutoSpin((s) => !s)}
          aria-label={isAutoSpin ? 'Pause orbit rotation' : 'Play orbit rotation'}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 border border-border-theme text-[10px] font-sub font-bold uppercase tracking-wider text-primary hover:bg-surface shadow-theme-sm transition-colors"
        >
          {isAutoSpin ? (
            <>
              <Pause size={11} /> Pause
            </>
          ) : (
            <>
              <Play size={11} /> Orbit
            </>
          )}
        </button>
      </div>

      {/* 3D Orbiting Stage */}
      <div
        className="relative flex-1 flex items-center justify-center min-h-[420px]"
        style={{ perspective: '1250px' }}
      >
        <div
          className="relative w-0 h-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(-6deg) rotateY(${angle}deg)`,
          }}
        >
          {items.map((ev, idx) => {
            const theta = (idx / items.length) * 360;
            const img = Array.isArray(ev.imageUrls) && ev.imageUrls[0] ? ev.imageUrls[0] : null;
            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => {
                  if (!dragRef.current.moved) setFeatured(ev);
                }}
                data-cursor="Open"
                className="absolute -left-[88px] -top-[116px] w-[176px] h-[232px] rounded-2xl bg-white p-2 pb-7 shadow-theme-lg border border-black/10 text-left hover:ring-2 hover:ring-accent transition-shadow cursor-pointer overflow-hidden"
                style={{
                  transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'visible',
                }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={ev.title}
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl block"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-cream p-3 flex flex-col justify-center items-center text-center border border-border-theme">
                    <Heart size={18} className="text-rose-safarnama fill-rose-safarnama/25 mb-2" />
                    <p className="font-heading text-sm font-semibold text-primary line-clamp-3">
                      {ev.title}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-1.5 inset-x-2.5 flex items-center justify-between">
                  <span className="font-heading text-[11px] font-semibold text-stone-800 truncate pr-1">
                    {ev.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-20 text-center pb-4 text-[10px] font-mono uppercase tracking-[0.22em] text-dark/45">
        Orbita Memory Stage
      </div>

      {/* Center-Stage Featured Spotlight Overlay */}
      {featured && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setFeatured(null)}
          role="dialog"
          aria-modal="true"
          aria-label={featured.title}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-cream rounded-[28px] border border-border-theme shadow-theme-lg overflow-hidden animate-modal-enter"
          >
            {Array.isArray(featured.imageUrls) && featured.imageUrls[0] && (
              <div className="max-h-64 overflow-hidden bg-black/5">
                <img
                  src={featured.imageUrls[0]}
                  alt={featured.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover block"
                />
              </div>
            )}

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-wider text-accent">
                  <Calendar size={12} />
                  {featured.date
                    ? new Date(`${featured.date}T00:00:00`).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </span>
                <div className="flex items-center gap-1">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => {
                        const target = featured;
                        setFeatured(null);
                        onEdit(target);
                      }}
                      aria-label={`Edit ${featured.title}`}
                      className="p-1.5 rounded-full text-dark/50 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = featured.id;
                        setFeatured(null);
                        onDelete(id);
                      }}
                      aria-label={`Delete ${featured.title}`}
                      className="p-1.5 rounded-full text-dark/50 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFeatured(null)}
                    aria-label="Close memory spotlight"
                    className="p-1.5 rounded-full text-dark/50 hover:text-dark hover:bg-cream-dark transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-cursive text-4xl text-accent font-bold leading-tight">
                {featured.title}
              </h3>

              {featured.description && (
                <p className="text-sm text-dark/75 leading-relaxed whitespace-pre-line max-h-44 overflow-y-auto scrollbar-thin">
                  {featured.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryOrbit;
