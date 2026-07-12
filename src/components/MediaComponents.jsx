import React, { useRef, useEffect, useState } from 'react';
import { Heart, Calendar, MapPin, Star, Clock, Edit2, Trash2, ChevronLeft, ChevronRight, Users } from 'lucide-react';


// ─── ImageSlider ──────────────────────────────────────────────────────────────
export const ImageSlider = ({ images, title }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Re-evaluate arrows after images load/render
    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    el.addEventListener("scroll", updateArrows);

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", updateArrows);
      el.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
  }, [images]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by ~80% of visible width for a natural page-flip feel
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (!images?.length) return null;

  // ── Single image: let it breathe at its natural ratio ──
  if (images.length === 1) {
    return (
      <div className="mt-3 inline-flex rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 max-w-full relative">
        <img
          src={images[0]}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block max-h-72 max-w-full w-auto h-auto object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/ffe4e6/be123c?text=Image+Error";
          }}
        />
        {/* Glossy sheen overlay reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-10" />
      </div>
    );
  }

  // ── Multiple images: uniform height, width derived from intrinsic ratio ──
  return (
    <div className="mt-3 relative group">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 hover:bg-white hover:shadow-lg transition-all -ml-3 opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} className="text-gray-600" />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 hover:bg-white hover:shadow-lg transition-all -mr-3 opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} className="text-gray-600" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 pb-2 overflow-x-auto items-end"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {images.map((url, i) => (
          <div
            key={i}
            className="shrink-0 relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
            style={{
              /*
               * All thumbnails share the same height.
               * width:auto lets the browser size each card to the image's
               * intrinsic aspect ratio, so a portrait shot stays portrait
               * and a wide landscape stays wide.
               *
               * We cap width so a single image never dominates the strip.
               */
              height: "14rem",       /* 224 px – tweak to taste */
              width: "auto",
              maxWidth: "24rem",     /* 384 px */
              minWidth: "6rem",      /* 96 px  */
            }}
          >
            <img
              src={url}
              alt={`${title} ${i + 1}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-auto block"   /* width:auto preserves ratio */
              style={{ display: "block" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x300/ffe4e6/be123c?text=Error";
              }}
            />
            {/* Glossy sheen overlay reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-10" />
            <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full select-none">
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
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    el.addEventListener("scroll", updateArrows);
    return () => { el.removeEventListener("scroll", updateArrows); ro.disconnect(); };
  }, [videos]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (!videos?.length) return null;

  return (
    <div className="mt-3 relative group">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 hover:bg-white hover:shadow-lg transition-all -ml-3 opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} className="text-gray-600" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 hover:bg-white hover:shadow-lg transition-all -mr-3 opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} className="text-gray-600" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 pb-2 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {videos.map((url, i) => (
          /*
           * 16:9 aspect-ratio wrapper that is responsive.
           * The iframe fills 100% of the wrapper, so the video
           * always stays in the correct ratio regardless of screen width.
           *
           * Adjust the `width` value to control how many videos are
           * visible at once (e.g. "min(320px, 80vw)" for mobile-friendly).
           */
          <div
            key={i}
            className="shrink-0 rounded-xl overflow-hidden bg-black"
            style={{
              width: "min(320px, 80vw)",
              aspectRatio: "16 / 9",   /* preserves ratio on resize */
              position: "relative",
            }}
          >
            <iframe
              src={url}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={`Video ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


// ─── Scrapbook Decorations ────────────────────────────────────────────────────
const WashiTape = ({ styleName, index }) => {
  const styles = {
    'rose-floral': 'from-rose-200/60 via-pink-100/60 to-rose-200/60 border-l border-r border-rose-300/25 border-dashed backdrop-blur-[0.5px]',
    'gold-stars': 'from-amber-200/60 via-yellow-50/60 to-amber-200/60 border-l border-r border-amber-300/25 border-dashed backdrop-blur-[0.5px]',
    'mint-checker': 'from-emerald-200/60 via-teal-100/60 to-emerald-200/60 border-l border-r border-teal-300/25 border-dashed backdrop-blur-[0.5px]',
    'lavender-lace': 'from-purple-200/60 via-fuchsia-100/60 to-purple-200/60 border-l border-r border-purple-300/25 border-dashed backdrop-blur-[0.5px]',
    'sky-clouds': 'from-sky-200/60 via-blue-100/60 to-sky-200/60 border-l border-r border-sky-300/25 border-dashed backdrop-blur-[0.5px]',
  };
  const tapeStyle = styles[styleName] || styles['rose-floral'];
  return (
    <div className={`absolute top-[-9px] left-[50%] -translate-x-1/2 w-24 h-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] rotate-[-1.5deg] z-20 pointer-events-none select-none bg-gradient-to-r ${tapeStyle}`} />
  );
};

const Paperclip = ({ color }) => {
  const clipStyles = {
    silver: {
      outer: 'border-gray-400/60 shadow-[1px_2px_3px_rgba(0,0,0,0.1)]',
      inner: 'border-gray-400/70',
    },
    'rose-gold': {
      outer: 'border-rose-400/70 shadow-[1px_2px_3px_rgba(244,63,94,0.15)]',
      inner: 'border-rose-300/80',
    },
    gold: {
      outer: 'border-amber-400/70 shadow-[1px_2px_3px_rgba(182,129,60,0.15)]',
      inner: 'border-amber-300/80',
    },
    mint: {
      outer: 'border-emerald-400/75 shadow-[1px_2px_3px_rgba(16,185,129,0.1)]',
      inner: 'border-emerald-300/80',
    },
    pink: {
      outer: 'border-pink-400/75 shadow-[1px_2px_3px_rgba(236,72,153,0.15)]',
      inner: 'border-pink-300/80',
    },
  };
  const style = clipStyles[color] || clipStyles.silver;
  return (
    <div className={`absolute top-[-10px] left-6 w-4.5 h-10 border-[1.5px] rounded-full pointer-events-none select-none z-20 ${style.outer}`} style={{ transform: 'rotate(-6deg)' }}>
      <div className={`absolute top-1.5 left-[1.5px] right-[1.5px] bottom-1.5 border rounded-full ${style.inner}`} />
    </div>
  );
};

const MemoryStamp = ({ type }) => {
  if (!type || type === 'none') return null;
  const stampConfig = {
    'love': {
      text: 'FOREVER & ALWAYS',
      emoji: '❤️',
      className: 'border-rose-400/40 text-rose-500/50 bg-rose-50/20 rotate-[12deg] hover:rotate-[6deg]',
    },
    'adventure': {
      text: 'ADVENTURE AWAITS',
      emoji: '✈️',
      className: 'border-teal-400/40 text-teal-600/50 bg-teal-50/20 rotate-[-8deg] hover:rotate-[-4deg]',
    },
    'forever': {
      text: 'TOGETHER FOREVER',
      emoji: '♾️',
      className: 'border-amber-400/40 text-amber-600/50 bg-amber-50/20 rotate-[4deg] hover:rotate-[0deg]',
    },
    'sweetest': {
      text: 'SWEETEST MEMORY',
      emoji: '💘',
      className: 'border-pink-400/40 text-pink-600/50 bg-pink-50/20 rotate-[-15deg] hover:rotate-[-8deg]',
    },
  };
  const config = stampConfig[type];
  if (!config) return null;
  return (
    <div className={`absolute bottom-3.5 right-3.5 border-2 border-dashed rounded-full px-2.5 py-1 flex flex-col items-center justify-center font-serif text-[7.5px] font-extrabold uppercase tracking-widest pointer-events-none select-none z-10 transition-transform duration-300 ${config.className}`}>
      <span className="text-[10px] mb-0.5 leading-none">{config.emoji}</span>
      <span>{config.text}</span>
    </div>
  );
};

const WavyUnderline = () => (
  <svg className="w-20 h-1 text-accent/35 mt-1" viewBox="0 0 100 6" fill="none" preserveAspectRatio="none">
    <path d="M0,3 Q25,0 50,3 T100,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const PushPin = ({ washiStyle, paperclipColor, index }) => {
  const pinColorMap = {
    'pink-rose': 'from-rose-400 to-rose-700 border-rose-300',
    'gold-stars': 'from-amber-400 to-amber-700 border-amber-300',
    'mint-checker': 'from-emerald-400 to-emerald-700 border-emerald-300',
    'lavender-lace': 'from-purple-400 to-purple-700 border-purple-300',
    'sky-clouds': 'from-sky-400 to-sky-700 border-sky-300',
    'rose-gold': 'from-pink-300 to-pink-600 border-pink-200',
    'brass-gold': 'from-yellow-400 to-yellow-700 border-yellow-300',
    'mint-teal': 'from-teal-400 to-teal-700 border-teal-300',
    'cute-pink': 'from-pink-400 to-pink-700 border-pink-300',
  };

  const pinColor = pinColorMap[washiStyle] || pinColorMap[paperclipColor] || (
    index % 5 === 0 ? 'from-rose-500 to-rose-800 border-rose-400' :
    index % 5 === 1 ? 'from-sky-500 to-sky-800 border-sky-400' :
    index % 5 === 2 ? 'from-amber-500 to-amber-800 border-amber-400' :
    index % 5 === 3 ? 'from-emerald-500 to-emerald-800 border-emerald-400' :
    'from-purple-500 to-purple-800 border-purple-400'
  );

  return (
    <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none flex flex-col items-center">
      {/* Shadow of the pin body */}
      <div className="absolute top-[8px] left-[6px] w-[8px] h-[8px] bg-black/30 rounded-full blur-[2px] transform rotate-[15deg] translate-x-[4px] translate-y-[8px]" />
      {/* Metallic pin point needle shadow */}
      <div className="absolute top-[14px] left-[4px] w-[2px] h-[10px] bg-black/40 blur-[1px] transform rotate-[25deg] origin-top translate-x-[6px] translate-y-[4px]" />

      {/* Metallic Pin point needle */}
      <div className="w-[1.5px] h-[12px] bg-gray-400 shadow-sm transform rotate-[15deg] translate-y-[4px]" />
      {/* Pin head translucent plastic body */}
      <div className={`w-[14px] h-[14px] rounded-full bg-gradient-to-br ${pinColor} border shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} />
      {/* Pin head cap */}
      <div className="w-[8px] h-[4px] rounded-full bg-white/40 -mt-[12px]" />
    </div>
  );
};

export const EventCard = ({ event, onDelete, onEdit, theme, index = 0, layoutMode = 'journal' }) => {
  const t = theme || {};
  const [isFlipped, setIsFlipped] = useState(false);

  const typeConfig = {
    milestone:       { icon: <Star className="text-amber-400" size={14} fill="currentColor"/>,  label: 'Milestone',     color: 'text-amber-500 bg-amber-50' },
    trip:            { icon: <MapPin className="text-emerald-500" size={14}/>,                  label: 'Trip',          color: 'text-emerald-600 bg-emerald-50' },
    date:            { icon: <Heart className="text-rose-500" size={14} fill="currentColor"/>,  label: 'Date Night',    color: 'text-rose-500 bg-rose-50' },
    general:         { icon: <Calendar className="text-blue-400" size={14}/>,                   label: 'Memory',        color: 'text-blue-500 bg-blue-50' },
    first:           { icon: <Star className="text-purple-400" size={14}/>,                     label: 'First Time',    color: 'text-purple-500 bg-purple-50' },
    anniversary:     { icon: <Heart className="text-pink-500" size={14} fill="currentColor"/>,  label: 'Anniversary',   color: 'text-pink-500 bg-pink-50' },
    proposal:        { icon: <Heart className="text-rose-600" size={14} fill="currentColor"/>,  label: 'Proposal',      color: 'text-rose-600 bg-rose-50' },
    celebration:     { icon: <Star className="text-yellow-500" size={14} fill="currentColor"/>, label: 'Celebration',   color: 'text-yellow-600 bg-yellow-50' },
    'little-moment': { icon: <Heart className="text-pink-300" size={14}/>,                      label: 'Little Moment', color: 'text-pink-400 bg-pink-50' },
    surprise:        { icon: <Star className="text-orange-400" size={14}/>,                     label: 'Surprise',      color: 'text-orange-500 bg-orange-50' },
    challenge:       { icon: <Users className="text-indigo-500" size={14}/>,                    label: 'Together',      color: 'text-indigo-500 bg-indigo-50' },
    'memory-lane':   { icon: <Clock className="text-gray-400" size={14}/>,                      label: 'Throwback',     color: 'text-gray-500 bg-gray-100' },
    birthday:        { icon: <Star className="text-yellow-400" size={14} fill="currentColor"/>, label: 'Birthday',      color: 'text-yellow-600 bg-yellow-50' },
    festival:        { icon: <Star className="text-orange-500" size={14} fill="currentColor"/>, label: 'Festival',      color: 'text-orange-500 bg-orange-50' },
    reunion:         { icon: <Users className="text-teal-500" size={14}/>,                      label: 'Reunion',       color: 'text-teal-600 bg-teal-50' },
    achievement:     { icon: <Star className="text-amber-500" size={14} fill="currentColor"/>,  label: 'Achievement',   color: 'text-amber-600 bg-amber-50' },
    home:            { icon: <MapPin className="text-green-500" size={14}/>,                    label: 'Home',          color: 'text-green-600 bg-green-50' },
    tradition:       { icon: <Heart className="text-emerald-500" size={14}/>,                   label: 'Tradition',     color: 'text-emerald-600 bg-emerald-50' },
    'new-beginning': { icon: <Star className="text-sky-400" size={14}/>,                        label: 'New Beginning', color: 'text-sky-500 bg-sky-50' },
    hangout:         { icon: <Users className="text-violet-500" size={14}/>,                    label: 'Hangout',       color: 'text-violet-500 bg-violet-50' },
    'late-night':    { icon: <Clock className="text-indigo-400" size={14}/>,                    label: 'Late Night',    color: 'text-indigo-500 bg-indigo-50' },
    event:           { icon: <Star className="text-rose-400" size={14}/>,                       label: 'Event',         color: 'text-rose-500 bg-rose-50' },
    throwback:       { icon: <Clock className="text-gray-400" size={14}/>,                      label: 'Throwback',     color: 'text-gray-500 bg-gray-100' },
    random:          { icon: <Star className="text-pink-400" size={14}/>,                       label: 'Random',        color: 'text-pink-500 bg-pink-50' },
    farewell:        { icon: <Heart className="text-gray-400" size={14}/>,                      label: 'Farewell',      color: 'text-gray-500 bg-gray-100' },
    reflection:      { icon: <Calendar className="text-blue-400" size={14}/>,                   label: 'Reflection',    color: 'text-blue-500 bg-blue-50' },
    growth:          { icon: <MapPin className="text-green-400" size={14}/>,                    label: 'Growth',        color: 'text-green-500 bg-green-50' },
    dream:           { icon: <Star className="text-purple-300" size={14}/>,                     label: 'Dream',         color: 'text-purple-400 bg-purple-50' },
    'self-care':     { icon: <Heart className="text-teal-400" size={14}/>,                      label: 'Self Care',     color: 'text-teal-500 bg-teal-50' },
    gratitude:       { icon: <Heart className="text-rose-300" size={14}/>,                      label: 'Gratitude',     color: 'text-rose-400 bg-rose-50' },
  };

  const tc  = typeConfig[event.type] || typeConfig.general;
  const d = event.time
    ? new Date(`${event.date}T${event.time}`)
    : new Date(`${event.date}T00:00:00`);

  // ✅ Resolve display time
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

  const images = Array.isArray(event.imageUrls)?event.imageUrls:(event.imageUrl?[event.imageUrl]:[]);
  const videos = Array.isArray(event.videoUrls)?event.videoUrls:[];
  const hasImages = images.length > 0;
  const isDarkPaper = t.id === 'ocean' || t.id === 'galaxy';

  // Tactile scrapbook random rotation degree
  const rotDeg = (index % 3 === 0) ? '-1.5deg' : (index % 3 === 1) ? '1.2deg' : '-0.8deg';

  if (hasImages) {
    /* 3D Flip Card for photo memories */
    return (
      <div 
        className={`card-perspective relative w-full mb-12 last:mb-0 animate-card-enter ${layoutMode === 'wall' ? 'mb-0 pl-0' : 'pl-9 md:pl-12'}`}
        style={{ animationDelay: `${index * 0.12}s` }}
      >
        {/* Magical glowing timeline line */}
        {layoutMode !== 'wall' && (
          <div className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/10 via-primary/50 to-accent/10 z-0" />
        )}
        
        {/* Pulsing timeline dot ring */}
        {layoutMode !== 'wall' && (
          <div className="absolute left-[6px] md:left-[14px] top-5.5 w-3.5 h-3.5 flex items-center justify-center z-10 select-none">
            <div className={`absolute w-7 h-7 rounded-full ${t.dot || 'bg-rose-safarnama'} opacity-25 animate-pulse-ring`} />
            <div className={`w-2.5 h-2.5 rounded-full ${t.dot || 'bg-rose-safarnama'} border-2 border-cream shadow-theme-sm`} />
          </div>
        )}

        <div 
          className={`card-flipper ${isFlipped ? 'flipped' : ''}`}
          onClick={(e) => {
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('iframe')) return;
            setIsFlipped(!isFlipped);
          }}
        >
          {/* Front Side: Polaroid Frame */}
          <div className="card-front">
            <div 
              className="polaroid-card p-4 sm:p-5 pb-8 sm:pb-10 rounded-sm relative w-full text-dark cursor-pointer select-none"
              style={{ transform: `rotate(${rotDeg})` }}
            >
              {layoutMode === 'wall' && <PushPin washiStyle={event.washiStyle} paperclipColor={event.paperclipColor} index={index} />}
              <WashiTape styleName={event.washiStyle} index={index} />
              
              <div className="flex items-center justify-between mb-3.5 gap-2 relative z-10">
                <span className={`inline-flex items-center gap-1 text-[9px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tc.color}`}>
                  {tc.icon} {tc.label}
                </span>
                <span className={`text-[10px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.dateBadge||'text-accent bg-cream border-border-theme'}`}>
                  {d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
                </span>
              </div>

              <ImageSlider images={images} title={event.title}/>
              <VideoGallery videos={videos}/>

              <div className="mt-4 text-center flex flex-col items-center">
                <span className="font-accent text-accent block leading-none font-bold select-none" style={{ fontSize: '2.6rem' }}>
                  {event.title}
                </span>
                <WavyUnderline />
                <p className="text-[9px] font-sub font-bold uppercase tracking-widest text-dark/30 mt-3.5 flex items-center justify-center gap-1">
                  Tap card to read story 📖
                </p>
              </div>
              <MemoryStamp type={event.stampType} />
            </div>
          </div>

          {/* Back Side: Detailed Handwriting Sheet */}
          <div className="card-back">
            <div 
              className={`${isDarkPaper ? 'dark-ticket-wrapper' : 'ticket-wrapper'}`}
              style={{ transform: `rotate(${rotDeg})` }}
            >
              <div 
                className={`${isDarkPaper ? 'dark-ticket-card-ripped' : 'ticket-card-ripped'} p-5 sm:p-6 rounded-2xl relative w-full text-dark cursor-pointer min-h-[240px] flex flex-col justify-between`}
              >
                {layoutMode === 'wall' && <PushPin washiStyle={event.washiStyle} paperclipColor={event.paperclipColor} index={index} />}
                <Paperclip color={event.paperclipColor} />

                <div className="pl-6.5">
                  <div className="flex items-center justify-between mb-3.5 gap-2 relative z-10 -ml-6.5">
                    <span className={`text-[10px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.dateBadge||'text-accent bg-cream border-border-theme'}`}>
                      {d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
                    </span>
                    {(onEdit || onDelete) && (
                      <div className="flex gap-0.5 opacity-100 transition-all shrink-0">
                        {onEdit   && <button onClick={()=>onEdit(event)}      className="text-dark/40 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full transition-colors"><Edit2  size={13}/></button>}
                        {onDelete && <button onClick={()=>onDelete(event.id)} className="text-dark/40 hover:text-red-500  p-1.5 hover:bg-red-50  rounded-full transition-colors"><Trash2 size={13}/></button>}
                      </div>
                    )}
                  </div>

                  <div className="notebook-ruled mt-2">
                    <h4 className="font-heading font-semibold text-primary text-base sm:text-lg leading-tight mb-2 flex flex-col items-start">
                      {event.title}
                      <WavyUnderline />
                    </h4>
                    {event.description ? (
                      <p className="text-dark/80 text-sm leading-relaxed whitespace-pre-line font-sans">
                        {event.description}
                      </p>
                    ) : (
                      <p className="text-dark/40 text-xs italic font-sans">No description added to this memory.</p>
                    )}
                  </div>
                </div>

                <p className="text-center text-[9px] font-sub font-bold uppercase tracking-widest text-dark/30 mt-3 select-none pl-6.5">
                  Tap card to view photo 🖼️
                </p>
                <MemoryStamp type={event.stampType} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* Flat Card layout for text-only memories (no flipping needed) */
  return (
    <div 
      className={`relative group mb-12 last:mb-0 animate-card-enter ${layoutMode === 'wall' ? 'mb-0 pl-0' : 'pl-9 md:pl-12'}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Magical glowing timeline line */}
      {layoutMode !== 'wall' && (
        <div className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/10 via-primary/50 to-accent/10 z-0" />
      )}
      
      {/* Pulsing timeline dot ring */}
      {layoutMode !== 'wall' && (
        <div className="absolute left-[6px] md:left-[14px] top-5.5 w-3.5 h-3.5 flex items-center justify-center z-10 select-none">
          <div className={`absolute w-7 h-7 rounded-full ${t.dot || 'bg-rose-safarnama'} opacity-25 animate-pulse-ring`} />
          <div className={`w-2.5 h-2.5 rounded-full ${t.dot || 'bg-rose-safarnama'} border-2 border-cream shadow-theme-sm`} />
        </div>
      )}

      <div 
        className={`${isDarkPaper ? 'dark-ticket-wrapper' : 'ticket-wrapper'}`}
        style={{ transform: `rotate(${rotDeg})` }}
      >
        <div 
          className={`${isDarkPaper ? 'dark-ticket-card-ripped' : 'ticket-card-ripped'} p-5 sm:p-6 rounded-2xl relative w-full text-dark`}
        >
          {layoutMode === 'wall' && <PushPin washiStyle={event.washiStyle} paperclipColor={event.paperclipColor} index={index} />}
          <Paperclip color={event.paperclipColor} />

          <div className="flex items-center justify-between mb-3.5 gap-2 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[9px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tc.color}`}>
                {tc.icon} {tc.label}
              </span>
              <span className={`text-[10px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.dateBadge||'text-accent bg-cream border-border-theme'}`}>
                {d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
              </span>
              {displayTime && (
                <span className="text-[9px] font-sub font-medium uppercase tracking-wider text-dark/40 flex items-center gap-1">
                  <Clock size={9}/>
                  {displayTime}
                </span>
              )}
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shrink-0">
                {onEdit   && <button onClick={()=>onEdit(event)}      className="text-dark/40 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full transition-colors"><Edit2  size={13}/></button>}
                {onDelete && <button onClick={()=>onDelete(event.id)} className="text-dark/40 hover:text-red-500  p-1.5 hover:bg-red-50  rounded-full transition-colors"><Trash2 size={13}/></button>}
              </div>
            )}
          </div>

          <div className="pl-6.5">
            <h4 className="font-heading font-semibold text-primary text-base sm:text-lg leading-tight mb-2 flex flex-col items-start">
              {event.title}
              <WavyUnderline />
            </h4>
            {event.description && <p className="text-dark/75 text-sm leading-relaxed whitespace-pre-line font-sans mb-1">{event.description}</p>}
            <VideoGallery videos={videos}/>
          </div>
          <MemoryStamp type={event.stampType} />
        </div>
      </div>
    </div>
  );
};