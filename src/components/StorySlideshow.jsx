import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Heart, Calendar } from 'lucide-react';

const SLIDE_DURATION_MS = 6000;

const StorySlideshow = ({ isOpen, onClose, memories, title }) => {
  // Play chronologically (oldest → newest) so the story unfolds from chapter one
  const slides = useMemo(() => {
    if (!Array.isArray(memories) || memories.length === 0) return [];
    return [...memories].reverse();
  }, [memories]);

  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef(null);

  const safeIdx = slides.length > 0 ? Math.min(idx, slides.length - 1) : 0;

  const goNext = useCallback(() => {
    if (slides.length <= 1) return;
    setIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    if (slides.length <= 1) return;
    setIdx((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance timer when playing
  useEffect(() => {
    if (!isOpen || !isPlaying || slides.length <= 1) return;
    const timer = setInterval(goNext, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, slides.length, goNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || slides.length === 0) return null;

  const current = slides[safeIdx];
  const images = Array.isArray(current.imageUrls)
    ? current.imageUrls
    : current.imageUrl
    ? [current.imageUrl]
    : [];
  const heroPhoto = images[0] || null;

  const formattedDate = current.date
    ? new Date(`${current.date}T00:00:00`).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 45) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-[#0e0b10]/95 backdrop-blur-xl flex flex-col justify-between text-white animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${title || 'Our Story'} cinema slideshow`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top chapter progress bars + controls */}
      <div className="relative z-20 px-4 sm:px-8 pt-4 pb-2 space-y-3">
        {/* Clickable chapter progress segments */}
        <div className="flex gap-1.5 max-w-4xl mx-auto">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Jump to memory ${i + 1}: ${s.title}`}
              className="flex-1 h-1 rounded-full overflow-hidden bg-white/20 cursor-pointer"
            >
              <span
                className={`block h-full rounded-full transition-all duration-300 ${
                  i < safeIdx
                    ? 'w-full bg-amber-300'
                    : i === safeIdx
                    ? 'w-full bg-rose-400'
                    : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <Heart size={14} className="text-rose-400 fill-rose-400 shrink-0" />
            <span className="font-heading text-base sm:text-lg font-medium truncate text-amber-100">
              {title || 'Our Story'}
            </span>
            <span className="text-[11px] font-sub uppercase tracking-[0.18em] text-white/50 shrink-0">
              {safeIdx + 1} / {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* WCAG 2.2.2 Pause/Play control — label toggles without aria-pressed */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sub font-bold uppercase tracking-wider text-white transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause size={13} /> Pause
                </>
              ) : (
                <>
                  <Play size={13} /> Play
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close slideshow"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Cinema Stage */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-14 py-4 overflow-hidden">
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous memory"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next memory"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <div
          key={current.id}
          className="w-full max-w-3xl flex flex-col items-center text-center animate-modal-enter"
        >
          {heroPhoto ? (
            <div className="relative w-full max-h-[56dvh] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/40 mb-5 flex items-center justify-center">
              <img
                src={heroPhoto}
                alt={current.title}
                referrerPolicy="no-referrer"
                className={`max-h-[56dvh] w-auto max-w-full object-contain ${isPlaying ? 'anim-cinema-zoom' : ''}`}
              />
            </div>
          ) : (
            <div className="w-full max-w-xl rounded-3xl bg-white/[0.06] border border-white/15 p-8 sm:p-10 mb-5 shadow-2xl">
              <Heart size={28} className="text-rose-400 fill-rose-400/30 mx-auto mb-4" />
              {current.description && (
                <p className="font-heading italic text-xl sm:text-2xl text-amber-50/95 leading-relaxed whitespace-pre-line">
                  &ldquo;{current.description}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* Date, Handwritten Title & Story Caption */}
          <div className="max-w-2xl space-y-2 px-2">
            {formattedDate && (
              <p className="inline-flex items-center gap-1.5 text-[11px] font-sub font-bold uppercase tracking-[0.2em] text-amber-300/85">
                <Calendar size={12} /> {formattedDate}
              </p>
            )}
            <h2 className="font-cursive text-4xl sm:text-5xl text-amber-100 leading-tight font-bold">
              {current.title}
            </h2>
            {heroPhoto && current.description && (
              <p className="text-xs sm:text-sm text-white/75 font-sans leading-relaxed line-clamp-3 max-w-xl mx-auto">
                {current.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subtle footer hint */}
      <div className="relative z-20 text-center pb-5 px-4 text-[10px] font-sub uppercase tracking-[0.2em] text-white/40">
        Swipe or use ← → keys · Space to {isPlaying ? 'pause' : 'play'}
      </div>
    </div>
  );
};

export default StorySlideshow;
