import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

const GalleryTab = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(null);

  const close = useCallback(() => setActiveIdx(null), []);
  const prev = useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, close, prev, next]);

  if (!images.length) return (
    <div className="text-center py-24 px-6">
      <div className="w-16 h-16 bg-primary/10 border border-border-theme rounded-full flex items-center justify-center mx-auto mb-4 text-primary/60">
        <Camera size={28} />
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary mb-1">Your gallery awaits</h3>
      <p className="text-dark/50 text-sm font-sans">Photos added to your memories will appear here automatically.</p>
    </div>
  );

  const activeImg = activeIdx !== null ? images[activeIdx] : null;

  return (
    <>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3.5 space-y-3.5">
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="break-inside-avoid w-full text-left rounded-2xl overflow-hidden shadow-theme-sm hover:shadow-theme-md transition-all duration-300 group relative bg-white border border-border-theme block focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x300/ffe4e6/be123c?text=Error';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
              <div className="flex justify-end">
                <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                  <Expand size={12} />
                </span>
              </div>
              <div>
                <p className="text-white font-heading font-semibold text-sm leading-tight truncate">{img.title}</p>
                {img.date && (
                  <p className="text-white/75 text-[10px] font-sub uppercase tracking-wider mt-0.5">
                    {new Date(`${img.date}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Full-Screen Editorial Photo Lightbox */}
      {activeImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeImg.title || 'Photo preview'}
        >
          {/* Top bar */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white/80 z-20">
            <span className="text-xs font-sub font-bold uppercase tracking-[0.2em]">
              {activeIdx + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close photo preview"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Photo + Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[82vh] flex flex-col items-center animate-modal-enter"
          >
            <img
              src={activeImg.url}
              alt={activeImg.title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="font-heading text-xl sm:text-2xl text-white font-medium">{activeImg.title}</p>
              {activeImg.date && (
                <p className="text-[11px] font-sub uppercase tracking-[0.18em] text-white/60 mt-1">
                  {new Date(`${activeImg.date}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryTab;
