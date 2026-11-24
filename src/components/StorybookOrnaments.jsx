import React from 'react';
import { Heart, Home, Compass, Moon, KeyRound, Feather, Sparkles, Flame, Ticket } from 'lucide-react';
import { toRoman } from '../utils/storybooks';

/**
 * Delicate antique-gold storybook corner filigree ornaments for the Journal paper sheet.
 */
export const JournalCornerFiligree = React.memo(() => {
  const cornerPath = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="text-accent/35">
      <path d="M2 24 V7 C2 4.2 4.2 2 7 2 H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 20 V9 C6 7.3 7.3 6 9 6 H20" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" />
      <circle cx="9.5" cy="9.5" r="1.3" fill="currentColor" />
    </svg>
  );

  return (
    <div className="pointer-events-none select-none" aria-hidden="true">
      <div className="absolute top-3.5 left-3.5">{cornerPath}</div>
      <div className="absolute top-3.5 right-3.5 rotate-90">{cornerPath}</div>
      <div className="absolute bottom-3.5 right-3.5 rotate-180">{cornerPath}</div>
      <div className="absolute bottom-3.5 left-3.5 -rotate-90">{cornerPath}</div>
    </div>
  );
});
JournalCornerFiligree.displayName = 'JournalCornerFiligree';

/**
 * Illuminated Fairy-Tale Year Chapter Divider (e.g. "✦ Chapter II · 2025 ✦")
 */
export const ChapterDivider = React.memo(({ year, chapterNumber }) => (
  <div className="relative z-10 flex items-center justify-center gap-3 my-9 first:mt-2 select-none" aria-label={`Chapter ${chapterNumber}, ${year}`}>
    <div className="h-px flex-1 max-w-[110px] bg-gradient-to-r from-transparent via-accent/40 to-accent/60" />
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/90 border border-accent/30 shadow-theme-sm">
      <Sparkles size={11} className="text-accent" aria-hidden="true" />
      <span className="font-heading italic font-semibold text-sm sm:text-base text-primary tracking-wide">
        Chapter {toRoman(chapterNumber)}
      </span>
      <span className="text-accent/50 text-xs" aria-hidden="true">·</span>
      <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-accent">
        {year}
      </span>
    </div>
    <div className="h-px flex-1 max-w-[110px] bg-gradient-to-l from-transparent via-accent/40 to-accent/60" />
  </div>
));
ChapterDivider.displayName = 'ChapterDivider';

/**
 * Tailored Fairy-Tale Margin Relics per memberType (duo, family, group, solo)
 * Desktop margins only so mobile layouts stay crisp and never clip.
 */
export const StorybookMarginRelics = React.memo(({ memberType = 'duo' }) => {
  if (memberType === 'family') {
    return (
      <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-[12%] -right-5 z-20 animate-float-gentle text-amber-600/80 bg-[#fffdf7] border border-amber-200/80 p-2 rounded-full shadow-theme-sm">
          <Home size={16} />
        </div>
        <div className="absolute top-[42%] -left-5 z-20 animate-wiggle text-amber-700/80 bg-[#fffdf7] border border-amber-200/80 p-2 rounded-full shadow-theme-sm">
          <KeyRound size={15} />
        </div>
        <div className="absolute top-[68%] -right-5 z-20 animate-shimmer-slow text-amber-500 bg-[#fffdf7] border border-amber-200/80 p-2 rounded-full shadow-theme-sm">
          <Flame size={15} />
        </div>
      </div>
    );
  }

  if (memberType === 'group') {
    return (
      <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-[12%] -right-5 z-20 animate-float-gentle text-emerald-700/85 bg-[#fffdf7] border border-emerald-200/80 p-2 rounded-full shadow-theme-sm">
          <Compass size={16} />
        </div>
        <div className="absolute top-[42%] -left-5 z-20 animate-wiggle text-amber-600/85 bg-[#fffdf7] border border-amber-200/80 p-2 rounded-full shadow-theme-sm">
          <Ticket size={15} />
        </div>
        <div className="absolute top-[68%] -right-5 z-20 animate-shimmer-slow text-rose-500 bg-[#fffdf7] border border-rose-200/80 p-2 rounded-full shadow-theme-sm">
          <Sparkles size={15} />
        </div>
      </div>
    );
  }

  if (memberType === 'solo') {
    return (
      <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-[12%] -right-5 z-20 animate-float-gentle text-indigo-500/85 bg-[#fffdf7] border border-indigo-200/80 p-2 rounded-full shadow-theme-sm">
          <Moon size={15} />
        </div>
        <div className="absolute top-[42%] -left-5 z-20 animate-wiggle text-amber-700/85 bg-[#fffdf7] border border-amber-200/80 p-2 rounded-full shadow-theme-sm">
          <Feather size={15} />
        </div>
        <div className="absolute top-[68%] -right-5 z-20 animate-shimmer-slow text-emerald-700/80 bg-[#fffdf7] border border-emerald-200/80 p-2 rounded-full shadow-theme-sm">
          <Compass size={15} />
        </div>
      </div>
    );
  }

  // Default: Couples ('duo')
  return (
    <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
      <div className="absolute top-[12%] -right-5 z-20 animate-float-gentle text-rose-500/85 bg-[#fffdf7] border border-rose-200/80 p-2 rounded-full shadow-theme-sm">
        <Heart size={15} fill="currentColor" />
      </div>
      <div className="absolute top-[42%] -left-5 z-20 animate-wiggle text-amber-500/90 bg-[#fffdf7] border border-amber-200/80 p-2 rounded-full shadow-theme-sm">
        <Sparkles size={15} />
      </div>
      <div className="absolute top-[68%] -right-5 z-20 animate-float-gentle text-pink-500/85 bg-[#fffdf7] border border-pink-200/80 p-2 rounded-full shadow-theme-sm" style={{ animationDelay: '1.2s' }}>
        <Feather size={15} />
      </div>
    </div>
  );
});
StorybookMarginRelics.displayName = 'StorybookMarginRelics';

export { JournalCornerFiligree as PageCornerFiligree, StorybookMarginRelics as StorybookRelics };
