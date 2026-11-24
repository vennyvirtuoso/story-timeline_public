import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

const SESSION_KEY = 'safarnama_cover_opened';

const JournalCover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  const timersRef = useRef([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // ignore storage errors in restricted contexts
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsDismissed(true);
      return;
    }

    setIsOpen(true);
    const t1 = setTimeout(() => setIsFading(true), 1250);
    const t2 = setTimeout(() => setIsDismissed(true), 1950);
    timersRef.current.push(t1, t2);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`book-container ${isFading ? 'hidden-cover' : ''}`}
      style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
      role="dialog"
      aria-modal="true"
      aria-label="Safarnama Journal Cover"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/20 via-transparent to-transparent pointer-events-none" />

      {/* The 3D Book Wrapper */}
      <div className={`book ${isOpen ? 'open' : ''}`}>
        {/* Physical Stack of Pages Underneath */}
        <div className="book-page-stack-left" />
        <div className="book-page-stack-right" />

        {/* 1. Interior Pages */}
        <div className="book-pages">
          {/* Left Page */}
          <div className="book-page book-page-left flex flex-col items-center justify-center p-6 sm:p-10 text-yellow-950 select-none text-center">
            <div className="space-y-4 max-w-[260px] z-10">
              <span className="font-accent text-4xl sm:text-5xl text-rose-600 block leading-none">
                Chapter One
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-amber-900 tracking-wide mt-2">
                Our Safe Space
              </h3>
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-700/35 to-transparent w-24 mx-auto my-2" />
              <p className="font-heading italic text-sm sm:text-base text-yellow-900/75 leading-relaxed">
                &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
              </p>
              <div className="pt-2 text-[10px] tracking-[0.22em] text-amber-800/55 uppercase font-sub font-bold">
                Est. Safarnama
              </div>
            </div>
          </div>

          {/* Right Page */}
          <div className="book-page book-page-right flex flex-col items-center justify-center p-6 sm:p-10 text-yellow-950 select-none text-center">
            <div className="space-y-4 max-w-[260px] z-10">
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="absolute inset-0 bg-rose-200/50 rounded-full animate-ping opacity-75" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-rose-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart size={24} fill="white" color="white" className="animate-pulse" />
                </div>
              </div>

              <h3 className="font-heading font-semibold text-lg sm:text-xl text-amber-900">
                Opening our story...
              </h3>
              <p className="font-heading italic text-sm text-yellow-900/65">
                Gathering all our beautiful moments
              </p>
            </div>
          </div>
        </div>

        {/* 2. Front Book Cover */}
        <div
          onClick={handleOpen}
          className="book-cover-front flex flex-col items-center justify-center text-white select-none cursor-pointer"
        >
          <div className="absolute inset-4 border border-amber-300/20 rounded-lg pointer-events-none" />

          <div className="text-center space-y-4 max-w-[250px] sm:max-w-xs px-4 z-10 relative">
            <div className="space-y-1.5">
              <span className="font-sub text-[10px] uppercase tracking-[0.28em] text-amber-300/80 font-bold block">
                A Love Timeline
              </span>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 tracking-wide leading-none">
                Safarnama
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <div className="h-px bg-gradient-to-r from-transparent to-amber-400/45 w-12" />
              <Heart size={10} fill="#fcd34d" color="#fcd34d" />
              <div className="h-px bg-gradient-to-l from-transparent to-amber-400/45 w-12" />
            </div>

            <p className="font-cursive text-2xl sm:text-3xl text-amber-200 font-bold leading-tight">
              Our Memory Journal
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-yellow-950 font-sub font-bold text-xs uppercase tracking-[0.16em] rounded-full shadow-[0_6px_24px_rgba(245,158,11,0.38)] transition-all duration-200 border border-amber-200/50 cursor-pointer"
            >
              Open Journal <Heart size={12} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* 3. Golden Metal Latch */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Unlock and open journal"
          className={`book-latch ${isOpen ? 'unlocked' : ''}`}
        />

        {/* 4. Center Spine Seam & Rings */}
        <div className="book-center-spine" />
        <div className="book-spine-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="spine-ring" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalCover;
