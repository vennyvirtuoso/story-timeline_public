import React from 'react';
import { Camera } from 'lucide-react';

const GalleryTab = ({ images }) => {
  if (!images.length) return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300"><Camera size={32}/></div>
      <p className="text-gray-400 text-sm">Add photos to memories to see them here</p>
    </div>
  );
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
      {images.map(img => (
        <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group relative bg-white border border-gray-100">
          <img src={img.url} alt={img.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
            <p className="text-white font-semibold text-xs">{img.title}</p>
            <p className="text-white/70 text-[10px]">{new Date(img.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryTab;
