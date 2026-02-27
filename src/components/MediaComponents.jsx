import React from 'react';
import { Heart, Calendar, MapPin, Star, Clock, Edit2, Trash2 } from 'lucide-react';


export const ImageSlider = ({ images, title }) => {
  if (!images?.length) return null;
  if (images.length === 1) return (
    <div className="mt-3 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
      <img src={images[0]} alt={title} className="w-full h-auto max-h-[500px] object-contain" loading="lazy" referrerPolicy="no-referrer"
        onError={e=>{e.target.onerror=null;e.target.src='https://placehold.co/600x400/ffe4e6/be123c?text=Image+Error';}}/>
    </div>
  );
  return (
    <div className="mt-3 flex overflow-x-auto snap-x snap-mandatory gap-2 pb-1">
      {images.map((url,i)=>(
        <div key={i} className="snap-center shrink-0 h-56 w-auto min-w-[180px] relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
          <img src={url} alt={`${title} ${i+1}`} className="h-full w-auto max-w-[80vw] object-contain" loading="lazy" referrerPolicy="no-referrer"
            onError={e=>{e.target.onerror=null;e.target.src='https://placehold.co/400x300/ffe4e6/be123c?text=Error';}}/>
          <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">{i+1}/{images.length}</span>
        </div>
      ))}
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
    trip: <MapPin className="text-emerald-500" size={16}/>,
    date: <Heart className="text-rose-500" size={16} fill="currentColor"/>,
    general: <Calendar className="text-blue-400" size={16}/>
  };
  const d = new Date(event.date+(event.time?`T${event.time}`:''));
  const images = Array.isArray(event.imageUrls)?event.imageUrls:(event.imageUrl?[event.imageUrl]:[]);
  const videos = Array.isArray(event.videoUrls)?event.videoUrls:[];
  return (
    <div className="relative pl-6 md:pl-0 md:grid md:grid-cols-12 md:gap-8 group mb-10 last:mb-0">
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${t.timeline||'from-rose-200 to-pink-100'} md:left-1/2 md:-translate-x-px`}/>
      <div className={`absolute left-[-5px] top-5 w-3 h-3 rounded-full ${t.dot||'bg-rose-400'} border-2 border-white shadow md:left-1/2 md:-translate-x-1/2 z-10`}/>
      <div className="md:col-span-5 md:text-right md:pr-8 mb-1 md:mb-0 md:pt-3 order-1">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-block ${t.dateBadge||'text-rose-500 bg-rose-50 border-rose-100'}`}>
          {d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
        </span>
        {event.time&&<p className="text-[10px] text-gray-400 mt-0.5 flex items-center md:justify-end gap-1"><Clock size={9}/>{d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</p>}
      </div>
      <div className="hidden md:block md:col-span-2 order-2"/>
      <div className="md:col-span-5 md:pl-8 order-3">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/60 hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${t.eventBg||'bg-rose-50'}`}>{icons[event.type]||icons.general}</div>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-tight">{event.title}</h4>
            </div>
            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-all ml-2 shrink-0">
              <button onClick={()=>onEdit(event)} className="text-gray-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full"><Edit2 size={13}/></button>
              <button onClick={()=>onDelete(event.id)} className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full"><Trash2 size={13}/></button>
            </div>
          </div>
          {event.description&&<p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{event.description}</p>}
          <ImageSlider images={images} title={event.title}/>
          <VideoGallery videos={videos}/>
        </div>
      </div>
    </div>
  );
};