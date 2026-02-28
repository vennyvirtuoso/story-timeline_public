import React, { useRef, useEffect, useState } from 'react';
import { Heart, Calendar, MapPin, Star, Clock, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

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
    updateArrows();
    el.addEventListener('scroll', updateArrows);
    // ✅ non-passive wheel listener for desktop scroll
    const onWheel = (e) => { e.preventDefault(); el.scrollLeft += e.deltaY; };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => { el.removeEventListener('scroll', updateArrows); el.removeEventListener('wheel', onWheel); };
  }, [images]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  if (!images?.length) return null;
  if (images.length === 1) return (
    <div className="mt-3 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
      <img src={images[0]} alt={title} className="w-full h-auto max-h-[500px] object-contain" loading="lazy" referrerPolicy="no-referrer"
        onError={e=>{e.target.onerror=null;e.target.src='https://placehold.co/600x400/ffe4e6/be123c?text=Image+Error';}}/>
    </div>
  );

  return (
    <div className="mt-3 relative">
      {/* ✅ Left arrow */}
      {canScrollLeft && (
        <button onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow rounded-full p-1 hover:bg-white transition-all -ml-3">
          <ChevronLeft size={16} className="text-gray-600"/>
        </button>
      )}
      {/* ✅ Right arrow */}
      {canScrollRight && (
        <button onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow rounded-full p-1 hover:bg-white transition-all -mr-3">
          <ChevronRight size={16} className="text-gray-600"/>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-2 pb-2 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {images.map((url, i) => (
          <div key={i} className="shrink-0 h-56 w-48 relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            <img src={url} alt={`${title} ${i+1}`} className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer"
              onError={e=>{e.target.onerror=null;e.target.src='https://placehold.co/400x300/ffe4e6/be123c?text=Error';}}/>
            <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">{i+1}/{images.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VideoGallery = ({ videos }) => {
  if (!videos?.length) return null;
  return (
    <div className="mt-3 space-y-3">
      {videos.map((url,i)=>(
        <div key={i} className="rounded-xl overflow-hidden bg-black aspect-video">
          <iframe src={url} className="w-full h-full" allowFullScreen title={`Video ${i+1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
        </div>
      ))}
    </div>
  );
};

export const EventCard = ({ event, onDelete, onEdit, theme }) => {
  const t = theme || {};
  const icons = {
    milestone: <Star className="text-amber-400" size={16} fill="currentColor"/>,
    trip:      <MapPin className="text-emerald-500" size={16}/>,
    date:      <Heart className="text-rose-500" size={16} fill="currentColor"/>,
    general:   <Calendar className="text-blue-400" size={16}/>
  };
  const d      = new Date(event.date+(event.time?`T${event.time}`:''));
  const images = Array.isArray(event.imageUrls)?event.imageUrls:(event.imageUrl?[event.imageUrl]:[]);
  const videos = Array.isArray(event.videoUrls)?event.videoUrls:[];

  return (
    <div className="relative pl-10 md:pl-14 group mb-8 last:mb-0">
      {/* ✅ Vertical line — left-aligned, full height */}
      <div className={`absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b ${t.timeline||'from-rose-200 to-pink-100'}`}/>
      {/* ✅ Dot on the line */}
      <div className={`absolute left-[7px] md:left-[15px] top-5 w-3 h-3 rounded-full ${t.dot||'bg-rose-400'} border-2 border-white shadow z-10`}/>

      {/* ✅ Card — full width, no wasted left half */}
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/60 hover:shadow-md transition-all">
        {/* Date + edit/delete row */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`p-1.5 rounded-full ${t.eventBg||'bg-rose-50'}`}>{icons[event.type]||icons.general}</div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${t.dateBadge||'text-rose-500 bg-rose-50 border-rose-100'}`}>
              {d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
            </span>
            {event.time && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Clock size={9}/>{d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}
              </span>
            )}
          </div>
          {(onEdit || onDelete) && (
            <div className="flex gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shrink-0">
              {onEdit   && <button onClick={()=>onEdit(event)}      className="text-gray-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full"><Edit2  size={13}/></button>}
              {onDelete && <button onClick={()=>onDelete(event.id)} className="text-gray-400 hover:text-red-500  p-1.5 hover:bg-red-50  rounded-full"><Trash2 size={13}/></button>}
            </div>
          )}
        </div>

        <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-tight mb-1">{event.title}</h4>
        {event.description && <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{event.description}</p>}
        <ImageSlider images={images} title={event.title}/>
        <VideoGallery videos={videos}/>
      </div>
    </div>
  );
};