import React, { useRef, useEffect, useState } from 'react';
import {
  Heart, Calendar, MapPin, Star, Clock, Edit2, Trash2,
  ChevronLeft, ChevronRight, Users, RotateCw
} from 'lucide-react';

// ─── ImageSlider ──────────────────────────────────────────────────────────────
export const ImageSlider = ({ images, title }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    el.addEventListener('scroll', updateArrows, { passive: true });

    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [images]);

  const scroll = (dir, e) => {
    e?.stopPropagation();
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  if (!images?.length) return null;

  // Single image: let it breathe at its natural ratio
  if (images.length === 1) {
    return (
      <div className="mt-2.5 flex justify-center rounded-xl overflow-hidden bg-stone-100/80 border border-stone-200/70 max-w-full relative">
        <img
          src={images[0]}
          alt={title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="block max-h-80 max-w-full w-auto h-auto object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/ffe4e6/be123c?text=Image+Error';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none z-10" />
      </div>
    );
  }

  // Multiple images: smooth horizontal strip without hijacking vertical page scroll
  return (
    <div className="mt-2.5 relative group">
      {canScrollLeft && (
        <button
          type="button"
          onClick={(e) => scroll(-1, e)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 shadow-md rounded-full p-1.5 hover:bg-white hover:scale-105 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Previous photo"
        >
          <ChevronLeft size={16} className="text-stone-700" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={(e) => scroll(1, e)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 shadow-md rounded-full p-1.5 hover:bg-white hover:scale-105 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Next photo"
        >
          <ChevronRight size={16} className="text-stone-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2.5 pb-1.5 overflow-x-auto items-end hide-scrollbar snap-x snap-mandatory"
      >
        {images.map((url, i) => (
          <div
            key={i}
            className="shrink-0 snap-start relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70"
            style={{
              height: '14rem',
              width: 'auto',
              maxWidth: '24rem',
              minWidth: '6rem',
            }}
          >
            <img
              src={url}
              alt={`${title} ${i + 1}`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-auto block"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x300/ffe4e6/be123c?text=Error';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none z-10" />
            <span className="absolute bottom-2 right-2 bg-black/65 backdrop-blur-sm text-white text-[10px] font-sub font-semibold px-2 py-0.5 rounded-full select-none">
              {i + 1}/{images.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── VideoGallery ─────────────────────────────────────────────────────────────
export const VideoGallery = ({ videos }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    el.addEventListener('scroll', updateArrows, { passive: true });
    return () => { el.removeEventListener('scroll', updateArrows); ro.disconnect(); };
  }, [videos]);

  const scroll = (dir, e) => {
    e?.stopPropagation();
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  if (!videos?.length) return null;

  return (
    <div className="mt-3 relative group">
      {canScrollLeft && (
        <button
          type="button"
          onClick={(e) => scroll(-1, e)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 shadow-md rounded-full p-1.5 hover:bg-white transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Scroll videos left"
        >
          <ChevronLeft size={16} className="text-stone-700" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={(e) => scroll(1, e)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 shadow-md rounded-full p-1.5 hover:bg-white transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Scroll videos right"
        >
          <ChevronRight size={16} className="text-stone-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2.5 pb-1.5 overflow-x-auto hide-scrollbar"
      >
        {videos.map((url, i) => (
          <div
            key={i}
            className="shrink-0 rounded-xl overflow-hidden bg-black shadow-sm"
            style={{
              width: 'min(320px, 80vw)',
              aspectRatio: '16 / 9',
              position: 'relative',
            }}
          >
            <iframe
              src={url}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              loading="lazy"
              title={`Memory video ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Scrapbook Decorations ────────────────────────────────────────────────────
const WashiTape = ({ styleName }) => {
  const styles = {
    'rose-floral': 'from-rose-200/70 via-pink-100/70 to-rose-200/70 border-l border-r border-rose-300/35 border-dashed',
    'gold-stars': 'from-amber-200/70 via-yellow-50/70 to-amber-200/70 border-l border-r border-amber-300/35 border-dashed',
    'mint-checker': 'from-emerald-200/70 via-teal-100/70 to-emerald-200/70 border-l border-r border-teal-300/35 border-dashed',
    'lavender-lace': 'from-purple-200/70 via-fuchsia-100/70 to-purple-200/70 border-l border-r border-purple-300/35 border-dashed',
    'sky-clouds': 'from-sky-200/70 via-blue-100/70 to-sky-200/70 border-l border-r border-sky-300/35 border-dashed',
  };
  const tapeStyle = styles[styleName] || styles['rose-floral'];
  return (
    <div
      aria-hidden="true"
      className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] -rotate-[1.5deg] z-20 pointer-events-none select-none bg-gradient-to-r ${tapeStyle}`}
    />
  );
};

const Paperclip = ({ color }) => {
  const clipStyles = {
    silver: {
      outer: 'border-gray-400/70 shadow-[1px_2px_3px_rgba(0,0,0,0.1)]',
      inner: 'border-gray-400/75',
    },
    'rose-gold': {
      outer: 'border-rose-400/75 shadow-[1px_2px_3px_rgba(244,63,94,0.15)]',
      inner: 'border-rose-300/80',
    },
    gold: {
      outer: 'border-amber-400/80 shadow-[1px_2px_3px_rgba(182,129,60,0.15)]',
      inner: 'border-amber-300/85',
    },
    mint: {
      outer: 'border-emerald-400/80 shadow-[1px_2px_3px_rgba(16,185,129,0.1)]',
      inner: 'border-emerald-300/85',
    },
    pink: {
      outer: 'border-pink-400/80 shadow-[1px_2px_3px_rgba(236,72,153,0.15)]',
      inner: 'border-pink-300/85',
    },
  };
  const style = clipStyles[color] || clipStyles.silver;
  return (
    <div
      aria-hidden="true"
      className={`absolute -top-2.5 left-6 w-[18px] h-10 border-[1.5px] rounded-full pointer-events-none select-none z-20 ${style.outer}`}
      style={{ transform: 'rotate(-6deg)' }}
    >
      <div className={`absolute top-1.5 left-[1.5px] right-[1.5px] bottom-1.5 border rounded-full ${style.inner}`} />
    </div>
  );
};

const MemoryStamp = ({ type }) => {
  if (!type || type === 'none') return null;
  const stampConfig = {
    love: {
      text: 'FOREVER & ALWAYS',
      emoji: '❤️',
      className: 'border-rose-400/45 text-rose-500/60 bg-rose-50/25 rotate-[10deg]',
    },
    adventure: {
      text: 'ADVENTURE AWAITS',
      emoji: '✈️',
      className: 'border-teal-400/45 text-teal-600/60 bg-teal-50/25 -rotate-[8deg]',
    },
    forever: {
      text: 'TOGETHER FOREVER',
      emoji: '♾️',
      className: 'border-amber-400/45 text-amber-600/60 bg-amber-50/25 rotate-[4deg]',
    },
    sweetest: {
      text: 'SWEETEST MEMORY',
      emoji: '💘',
      className: 'border-pink-400/45 text-pink-600/60 bg-pink-50/25 -rotate-[12deg]',
    },
  };
  const config = stampConfig[type];
  if (!config) return null;
  return (
    <div
      aria-hidden="true"
      className={`absolute bottom-3.5 right-3.5 border-2 border-dashed rounded-full px-2.5 py-1 flex flex-col items-center justify-center font-heading text-[7.5px] font-extrabold uppercase tracking-widest pointer-events-none select-none z-10 ${config.className}`}
    >
      <span className="text-[10px] mb-0.5 leading-none">{config.emoji}</span>
      <span>{config.text}</span>
    </div>
  );
};

const WavyUnderline = () => (
  <svg aria-hidden="true" className="w-20 h-1 text-accent/40 mt-1" viewBox="0 0 100 6" fill="none" preserveAspectRatio="none">
    <path d="M0,3 Q25,0 50,3 T100,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const PushPin = ({ washiStyle, paperclipColor, index }) => {
  const pinColorMap = {
    'rose-floral': 'from-rose-400 to-rose-700 border-rose-300',
    'gold-stars': 'from-amber-400 to-amber-700 border-amber-300',
    'mint-checker': 'from-emerald-400 to-emerald-700 border-emerald-300',
    'lavender-lace': 'from-purple-400 to-purple-700 border-purple-300',
    'sky-clouds': 'from-sky-400 to-sky-700 border-sky-300',
    'rose-gold': 'from-pink-300 to-pink-600 border-pink-200',
    gold: 'from-yellow-400 to-yellow-700 border-yellow-300',
    mint: 'from-teal-400 to-teal-700 border-teal-300',
    pink: 'from-pink-400 to-pink-700 border-pink-300',
  };

  const pinColor = pinColorMap[washiStyle] || pinColorMap[paperclipColor] || (
    index % 5 === 0 ? 'from-rose-500 to-rose-800 border-rose-400' :
    index % 5 === 1 ? 'from-sky-500 to-sky-800 border-sky-400' :
    index % 5 === 2 ? 'from-amber-500 to-amber-800 border-amber-400' :
    index % 5 === 3 ? 'from-emerald-500 to-emerald-800 border-emerald-400' :
    'from-purple-500 to-purple-800 border-purple-400'
  );

  return (
    <div aria-hidden="true" className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none flex flex-col items-center">
      <div className="absolute top-[8px] left-[6px] w-[8px] h-[8px] bg-black/30 rounded-full blur-[2px] rotate-[15deg] translate-x-[4px] translate-y-[8px]" />
      <div className="w-[1.5px] h-[12px] bg-gray-400 shadow-sm rotate-[15deg] translate-y-[4px]" />
      <div className={`w-[14px] h-[14px] rounded-full bg-gradient-to-br ${pinColor} border shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} />
      <div className="w-[8px] h-[4px] rounded-full bg-white/45 -mt-[12px]" />
    </div>
  );
};

export const EventCard = React.memo(({ event, onDelete, onEdit, theme, index = 0, layoutMode = 'journal', isHighlighted = false }) => {
  const t = theme || {};
  const [isFlipped, setIsFlipped] = useState(false);
  const polaroidRef = useRef(null);

  const handlePolaroidMove = (e) => {
    const el = polaroidRef.current;
    if (!el) return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(hover: hover) and (pointer: fine)').matches)
    ) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tiltY = ((px - 0.5) * 7).toFixed(2);
    const tiltX = ((0.5 - py) * 7).toFixed(2);
    el.style.setProperty('--tilt-x', `${tiltX}deg`);
    el.style.setProperty('--tilt-y', `${tiltY}deg`);
    el.style.setProperty('--sheen-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--sheen-y', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--sheen-opacity', '1');
  };

  const handlePolaroidLeave = () => {
    const el = polaroidRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--sheen-opacity', '0');
  };

  const typeConfig = {
    milestone:       { icon: <Star className="text-amber-500" size={13} fill="currentColor" />,  label: 'Milestone',     color: 'text-amber-700 bg-amber-50 border border-amber-200/60' },
    trip:            { icon: <MapPin className="text-emerald-600" size={13} />,                  label: 'Trip',          color: 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' },
    date:            { icon: <Heart className="text-rose-500" size={13} fill="currentColor" />,  label: 'Date Night',    color: 'text-rose-600 bg-rose-50 border border-rose-200/60' },
    general:         { icon: <Calendar className="text-blue-500" size={13} />,                   label: 'Memory',        color: 'text-blue-700 bg-blue-50 border border-blue-200/60' },
    first:           { icon: <Star className="text-purple-500" size={13} />,                     label: 'First Time',    color: 'text-purple-700 bg-purple-50 border border-purple-200/60' },
    anniversary:     { icon: <Heart className="text-pink-500" size={13} fill="currentColor" />,  label: 'Anniversary',   color: 'text-pink-700 bg-pink-50 border border-pink-200/60' },
    proposal:        { icon: <Heart className="text-rose-600" size={13} fill="currentColor" />,  label: 'Proposal',      color: 'text-rose-700 bg-rose-50 border border-rose-200/60' },
    celebration:     { icon: <Star className="text-yellow-500" size={13} fill="currentColor" />, label: 'Celebration',   color: 'text-yellow-700 bg-yellow-50 border border-yellow-200/60' },
    'little-moment': { icon: <Heart className="text-pink-400" size={13} />,                      label: 'Little Moment', color: 'text-pink-600 bg-pink-50 border border-pink-200/60' },
    surprise:        { icon: <Star className="text-orange-500" size={13} />,                     label: 'Surprise',      color: 'text-orange-700 bg-orange-50 border border-orange-200/60' },
    challenge:       { icon: <Users className="text-indigo-500" size={13} />,                    label: 'Together',      color: 'text-indigo-700 bg-indigo-50 border border-indigo-200/60' },
    'memory-lane':   { icon: <Clock className="text-stone-500" size={13} />,                     label: 'Throwback',     color: 'text-stone-600 bg-stone-100 border border-stone-200/60' },
    birthday:        { icon: <Star className="text-yellow-500" size={13} fill="currentColor" />, label: 'Birthday',      color: 'text-yellow-700 bg-yellow-50 border border-yellow-200/60' },
    festival:        { icon: <Star className="text-orange-500" size={13} fill="currentColor" />, label: 'Festival',      color: 'text-orange-700 bg-orange-50 border border-orange-200/60' },
    reunion:         { icon: <Users className="text-teal-600" size={13} />,                      label: 'Reunion',       color: 'text-teal-700 bg-teal-50 border border-teal-200/60' },
    achievement:     { icon: <Star className="text-amber-500" size={13} fill="currentColor" />,  label: 'Achievement',   color: 'text-amber-700 bg-amber-50 border border-amber-200/60' },
    home:            { icon: <MapPin className="text-green-600" size={13} />,                    label: 'Home',          color: 'text-green-700 bg-green-50 border border-green-200/60' },
    tradition:       { icon: <Heart className="text-emerald-600" size={13} />,                   label: 'Tradition',     color: 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' },
    'new-beginning': { icon: <Star className="text-sky-500" size={13} />,                        label: 'New Beginning', color: 'text-sky-700 bg-sky-50 border border-sky-200/60' },
    hangout:         { icon: <Users className="text-violet-500" size={13} />,                    label: 'Hangout',       color: 'text-violet-700 bg-violet-50 border border-violet-200/60' },
    'late-night':    { icon: <Clock className="text-indigo-500" size={13} />,                    label: 'Late Night',    color: 'text-indigo-700 bg-indigo-50 border border-indigo-200/60' },
    event:           { icon: <Star className="text-rose-500" size={13} />,                       label: 'Event',         color: 'text-rose-700 bg-rose-50 border border-rose-200/60' },
    throwback:       { icon: <Clock className="text-stone-500" size={13} />,                     label: 'Throwback',     color: 'text-stone-600 bg-stone-100 border border-stone-200/60' },
    random:          { icon: <Star className="text-pink-500" size={13} />,                       label: 'Random',        color: 'text-pink-700 bg-pink-50 border border-pink-200/60' },
    farewell:        { icon: <Heart className="text-stone-500" size={13} />,                     label: 'Farewell',      color: 'text-stone-600 bg-stone-100 border border-stone-200/60' },
    reflection:      { icon: <Calendar className="text-blue-500" size={13} />,                   label: 'Reflection',    color: 'text-blue-700 bg-blue-50 border border-blue-200/60' },
    growth:          { icon: <MapPin className="text-green-600" size={13} />,                    label: 'Growth',        color: 'text-green-700 bg-green-50 border border-green-200/60' },
    dream:           { icon: <Star className="text-purple-500" size={13} />,                     label: 'Dream',         color: 'text-purple-700 bg-purple-50 border border-purple-200/60' },
    'self-care':     { icon: <Heart className="text-teal-500" size={13} />,                      label: 'Self Care',     color: 'text-teal-700 bg-teal-50 border border-teal-200/60' },
    gratitude:       { icon: <Heart className="text-rose-400" size={13} />,                      label: 'Gratitude',     color: 'text-rose-600 bg-rose-50 border border-rose-200/60' },
  };

  const tc = typeConfig[event.type] || typeConfig.general;
  const d = event.time
    ? new Date(`${event.date}T${event.time}`)
    : new Date(`${event.date}T00:00:00`);

  const displayTime = (() => {
    if (event.time) {
      return new Date(`${event.date}T${event.time}`)
        .toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    if (event.createdAt) {
      const ca = event.createdAt.toDate ? event.createdAt.toDate() : new Date(event.createdAt);
      return ca.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return null;
  })();

  const images = Array.isArray(event.imageUrls) ? event.imageUrls : (event.imageUrl ? [event.imageUrl] : []);
  const videos = Array.isArray(event.videoUrls) ? event.videoUrls : [];
  const hasImages = images.length > 0;
  const isDarkPaper = Boolean(t.isDark);

  const rotDeg = index % 3 === 0 ? '-1.2deg' : index % 3 === 1 ? '1deg' : '-0.6deg';
  const enterDelay = `${Math.min(index * 0.07, 0.42)}s`;

  if (hasImages) {
    /* 3D Flip Card for photo memories */
    return (
      <article
        id={`memory-${event.id}`}
        className={`card-perspective relative w-full mb-12 last:mb-0 animate-card-enter ${layoutMode === 'wall' ? 'mb-0 pl-0' : 'pl-9 md:pl-12'}`}
        style={{ animationDelay: enterDelay }}
      >
        {layoutMode !== 'wall' && (
          <div className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/15 via-primary/45 to-accent/15 z-0" aria-hidden="true" />
        )}

        {layoutMode !== 'wall' && (
          <div className="absolute left-[6px] md:left-[14px] top-6 w-3.5 h-3.5 flex items-center justify-center z-10 select-none" aria-hidden="true">
            <div className={`absolute w-7 h-7 rounded-full ${t.dot || 'bg-rose-safarnama'} opacity-25 animate-pulse-ring`} />
            <div className={`w-2.5 h-2.5 rounded-full ${t.dot || 'bg-rose-safarnama'} border-2 border-cream shadow-theme-sm`} />
          </div>
        )}

        <div
          className={`card-flipper ${isFlipped ? 'flipped' : ''}`}
          onClick={(e) => {
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('iframe')) return;
            setIsFlipped((prev) => !prev);
          }}
        >
          {/* Front Side: Polaroid Archival Frame */}
          <div className="card-front">
            <div
              ref={polaroidRef}
              onMouseMove={handlePolaroidMove}
              onMouseLeave={handlePolaroidLeave}
              data-cursor="Flip"
              className={`polaroid-card polaroid-tilt group p-4 sm:p-5 pb-7 sm:pb-8 rounded-sm relative w-full cursor-pointer select-none overflow-visible ${isHighlighted ? 'memory-surprise-halo' : ''}`}
              style={{ '--base-rot': rotDeg }}
            >
              <div className="polaroid-sheen rounded-sm" aria-hidden="true" />
              {layoutMode === 'wall' && <PushPin washiStyle={event.washiStyle} paperclipColor={event.paperclipColor} index={index} />}
              <WashiTape styleName={event.washiStyle} />

              <div className="flex items-center justify-between mb-3 gap-2 relative z-10">
                <span className={`inline-flex items-center gap-1 text-[9px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tc.color}`}>
                  {tc.icon} {tc.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-stone-200 bg-stone-50 text-amber-800">
                    {d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  {(onEdit || onDelete) && (
                    <div className="flex gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); onEdit(event); }}
                          aria-label={`Edit ${event.title}`}
                          className="text-stone-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                          aria-label={`Delete ${event.title}`}
                          className="text-stone-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <ImageSlider images={images} title={event.title} />
              <VideoGallery videos={videos} />

              <div className="mt-4 text-center flex flex-col items-center">
                <h3 className="font-accent text-[#a97132] block leading-none font-bold select-none text-[2.4rem] sm:text-[2.7rem]">
                  {event.title}
                </h3>
                <WavyUnderline />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-[0.16em] text-stone-400 hover:text-stone-700 px-3 py-1 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <RotateCw size={11} /> Flip to read story
                </button>
              </div>
              <MemoryStamp type={event.stampType} />
            </div>
          </div>

          {/* Back Side: Detailed Handwriting Sheet */}
          <div className="card-back">
            <div
              className={`${isDarkPaper ? 'dark-ticket-wrapper' : 'ticket-wrapper'} h-full`}
              style={{ transform: `rotate(${rotDeg})` }}
            >
              <div
                className={`${isDarkPaper ? 'dark-ticket-card-ripped' : 'ticket-card-ripped'} p-5 sm:p-6 rounded-2xl relative w-full h-full min-h-[260px] flex flex-col justify-between cursor-pointer`}
              >
                {layoutMode === 'wall' && <PushPin washiStyle={event.washiStyle} paperclipColor={event.paperclipColor} index={index} />}
                <Paperclip color={event.paperclipColor} />

                <div className="pl-7">
                  <div className="flex items-center justify-between mb-3.5 gap-2 relative z-10 -ml-7">
                    <span className={`text-[10px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.dateBadge || 'text-accent bg-cream border-border-theme'}`}>
                      {d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    {(onEdit || onDelete) && (
                      <div className="flex gap-0.5 shrink-0">
                        {onEdit && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onEdit(event); }}
                            aria-label={`Edit ${event.title}`}
                            className="opacity-60 hover:opacity-100 hover:text-blue-500 p-1.5 rounded-full transition-colors"
                          >
                            <Edit2 size={13} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                            aria-label={`Delete ${event.title}`}
                            className="opacity-60 hover:opacity-100 hover:text-red-500 p-1.5 rounded-full transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="notebook-ruled mt-2">
                    <h4 className="font-heading font-semibold text-primary text-lg sm:text-xl leading-tight mb-2 flex flex-col items-start">
                      {event.title}
                      <WavyUnderline />
                    </h4>
                    {event.description ? (
                      <p className={`text-sm leading-relaxed whitespace-pre-line font-sans ${isDarkPaper ? 'text-purple-100/85' : 'text-stone-700'}`}>
                        {event.description}
                      </p>
                    ) : (
                      <p className={`text-xs italic font-sans ${isDarkPaper ? 'text-purple-200/45' : 'text-stone-400'}`}>
                        No story written for this memory yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4 pl-7">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                    className={`inline-flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full transition-colors ${
                      isDarkPaper
                        ? 'text-purple-200/65 hover:text-white hover:bg-white/10'
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <RotateCw size={11} /> Flip to photo
                  </button>
                </div>
                <MemoryStamp type={event.stampType} />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  /* Flat Card layout for text-only memories */
  return (
    <article
      id={`memory-${event.id}`}
      className={`relative group mb-12 last:mb-0 animate-card-enter ${layoutMode === 'wall' ? 'mb-0 pl-0' : 'pl-9 md:pl-12'}`}
      style={{ animationDelay: enterDelay }}
    >
      {layoutMode !== 'wall' && (
        <div className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/15 via-primary/45 to-accent/15 z-0" aria-hidden="true" />
      )}

      {layoutMode !== 'wall' && (
        <div className="absolute left-[6px] md:left-[14px] top-6 w-3.5 h-3.5 flex items-center justify-center z-10 select-none" aria-hidden="true">
          <div className={`absolute w-7 h-7 rounded-full ${t.dot || 'bg-rose-safarnama'} opacity-25 animate-pulse-ring`} />
          <div className={`w-2.5 h-2.5 rounded-full ${t.dot || 'bg-rose-safarnama'} border-2 border-cream shadow-theme-sm`} />
        </div>
      )}

      <div
        className={`${isDarkPaper ? 'dark-ticket-wrapper' : 'ticket-wrapper'} ${isHighlighted ? 'memory-surprise-halo' : ''}`}
        style={{ transform: `rotate(${rotDeg})` }}
      >
        <div
          className={`${isDarkPaper ? 'dark-ticket-card-ripped' : 'ticket-card-ripped'} p-5 sm:p-6 rounded-2xl relative w-full`}
        >
          {layoutMode === 'wall' && <PushPin washiStyle={event.washiStyle} paperclipColor={event.paperclipColor} index={index} />}
          <Paperclip color={event.paperclipColor} />

          <div className="flex items-center justify-between mb-3.5 gap-2 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[9px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tc.color}`}>
                {tc.icon} {tc.label}
              </span>
              <span className={`text-[10px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.dateBadge || 'text-accent bg-cream border-border-theme'}`}>
                {d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              {displayTime && (
                <span className={`text-[10px] font-sub font-medium uppercase tracking-wider flex items-center gap-1 ${isDarkPaper ? 'text-purple-200/55' : 'text-stone-400'}`}>
                  <Clock size={10} />
                  {displayTime}
                </span>
              )}
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(event)}
                    aria-label={`Edit ${event.title}`}
                    className="opacity-60 hover:opacity-100 hover:text-blue-500 p-1.5 rounded-full transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(event.id)}
                    aria-label={`Delete ${event.title}`}
                    className="opacity-60 hover:opacity-100 hover:text-red-500 p-1.5 rounded-full transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="pl-7">
            <h3 className="font-heading font-semibold text-primary text-lg sm:text-xl leading-tight mb-2 flex flex-col items-start">
              {event.title}
              <WavyUnderline />
            </h3>
            {event.description && (
              <p className={`text-sm leading-relaxed whitespace-pre-line font-sans mb-1 ${isDarkPaper ? 'text-purple-100/85' : 'text-stone-700'}`}>
                {event.description}
              </p>
            )}
            <VideoGallery videos={videos} />
          </div>
          <MemoryStamp type={event.stampType} />
        </div>
      </div>
    </article>
  );
});

EventCard.displayName = 'EventCard';
