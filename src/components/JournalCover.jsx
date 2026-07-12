import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const JournalCover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div 
      className={`book-container ${isFading ? 'hidden-cover' : ''}`} 
      style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
    >
      {/* Background ambient lighting/decoration */}
      <div className="absolute inset-0 bg-radial-desk pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/10 via-transparent to-transparent pointer-events-none" />

      {/* The 3D Book Wrapper */}
      <div className={`book ${isOpen ? 'open' : ''}`}>
        
        {/* Physical Stack of Pages Underneath (Gives book 3D depth) */}
        <div className="book-page-stack-left" />
        <div className="book-page-stack-right" />

        {/* 1. Interior Pages (Revealed when front cover swings open) */}
        <div className="book-pages">
          
          {/* Left Page: Welcome/Intro message */}
          <div className="book-page book-page-left flex flex-col items-center justify-center p-6 sm:p-10 text-yellow-950 select-none text-center">
            <div className="space-y-4 max-w-[280px] z-10">
              <span className="font-accent text-4xl sm:text-5xl text-rose-600 block leading-none">
                Chapter One
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-amber-900 tracking-wide mt-2">
                Our Safe Space
              </h3>
              <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-700/30 to-transparent w-24 mx-auto my-2" />
              <p className="font-serif italic text-xs sm:text-sm text-yellow-900/70 leading-relaxed">
                "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
              </p>
              <div className="pt-2 text-[10px] tracking-widest text-amber-800/50 uppercase font-sans">
                Est. Safarnama
              </div>
            </div>
          </div>

          {/* Right Page: Loader state */}
          <div className="book-page book-page-right flex flex-col items-center justify-center p-6 sm:p-10 text-yellow-950 select-none text-center">
            <div className="space-y-4 max-w-[280px] z-10">
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="absolute inset-0 bg-rose-200/50 rounded-full animate-ping opacity-75" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart size={24} fill="white" color="white" className="animate-pulse" />
                </div>
              </div>
              
              <h3 className="font-heading font-semibold text-lg sm:text-xl text-amber-900">
                Opening our story...
              </h3>
              <p className="font-serif italic text-xs text-yellow-900/60">
                Gathering all our beautiful moments
              </p>
            </div>
          </div>

        </div>

        {/* 2. Front Book Cover (Sits on right half, hinges on the center spine) */}
        <div className="book-cover-front flex flex-col items-center justify-center text-white select-none">
          {/* Gold Filigree Borders & Corners inside CSS */}
          <div className="absolute inset-4 border border-amber-300/20 rounded-lg pointer-events-none" />
          
          {/* Cover Titles */}
          <div className="text-center space-y-4 max-w-[240px] sm:max-w-xs px-4 z-10 relative">
            <div className="space-y-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-amber-400/80 font-bold">
                A Love Timeline
              </span>
              <h2 className="font-heading font-bold text-4.5xl sm:text-5.5xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 tracking-wide leading-none">
                Safarnama
              </h2>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <div className="h-px bg-gradient-to-r from-transparent to-amber-400/40 w-12" />
              <Heart size={10} fill="#facc15" color="#facc15" />
              <div className="h-px bg-gradient-to-l from-transparent to-amber-400/40 w-12" />
            </div>

            <p className="font-cursive text-xl sm:text-2xl text-amber-300 font-semibold leading-tight">
              Our Memory Journal
            </p>

            <button
              onClick={() => {
                setIsOpen(true);
                // Start fading out the container overlay after 1.5s when cover swing is mostly completed
                setTimeout(() => setIsFading(true), 1500);
                // Unmount component from DOM after fade finishes (2.5s total)
                setTimeout(() => setIsDismissed(true), 2500);
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-yellow-950 font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-300 border border-amber-300/30 cursor-pointer"
            >
              Open Journal <Heart size={12} fill="currentColor" className="animate-pulse" />
            </button>
          </div>
        </div>

        {/* 3. Golden Metal Latch (On the opening edge of the front cover) */}
        <div className={`book-latch ${isOpen ? 'unlocked' : ''}`} />

        {/* 4. Center Spine Seam / Binding Rings (Stays in the center fold) */}
        <div className="book-center-spine" />
        <div className="book-spine-rings">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="spine-ring" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default JournalCover;
