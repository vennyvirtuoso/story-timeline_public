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
      <div className="mt-3 inline-flex rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 max-w-full">
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ border: 0 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const EventCard = ({ event, onDelete, onEdit, theme }) => {
  const t = theme || {};

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

  // ✅ Resolve display time: user-selected time > createdAt > nothing
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

  return (
    <div className="relative pl-10 md:pl-14 group mb-8 last:mb-0 animate-fadeIn">
      <div className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-px border-l border-dashed border-border-theme opacity-60"/>
      <div className={`absolute left-[7px] md:left-[15px] top-5 w-2.5 h-2.5 rounded-full ${t.dot||'bg-rose-safarnama'} border-2 border-cream shadow-theme-sm z-10`}/>

      <div className="bg-white/95 p-5 rounded-2xl shadow-theme-sm border border-border-theme hover:shadow-theme-md transition-all duration-200">
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* ✅ Type badge with icon + label */}
            <span className={`inline-flex items-center gap-1 text-[9px] font-sub font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tc.color}`}>
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

        <h4 className="font-heading font-semibold text-primary text-base sm:text-lg leading-tight mb-2">{event.title}</h4>
        {event.description && <p className="text-dark/70 text-sm leading-relaxed whitespace-pre-line font-sans mb-1">{event.description}</p>}
        <ImageSlider images={images} title={event.title}/>
        <VideoGallery videos={videos}/>
      </div>
    </div>
  );
};