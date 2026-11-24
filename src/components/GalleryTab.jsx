import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Expand, LayoutGrid, Orbit } from 'lucide-react';

const GalleryTab = ({ images }) => {
  const [viewMode, setViewMode] = useState('drum'); // 'drum' (Fieldwork 3D Arc) | 'grid' (Unrolled Masonry)
  const [drumIdx, setDrumIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(null);
  const dragStartX = useRef(null);

  const safeDrumIdx = images.length > 0 ? ((drumIdx % images.length) + images.length) % images.length : 0;

  const close = useCallback(() => setActiveIdx(null), []);
  const prevLightbox = useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const nextLightbox = useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const stepDrum = useCallback(
    (dir) => {
      if (images.length <= 1) return;
      setDrumIdx((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, close, prevLightbox, nextLightbox]);

  if (!images.length) {
    return (
      <div className="text-center py-24 px-6">
        <div className="w-16 h-16 bg-primary/10 border border-border-theme rounded-full flex items-center justify-center mx-auto mb-4 text-primary/60">
          <Camera size={28} />
        </div>
        <h3 className="font-heading text-xl font-semibold text-primary mb-1">Your gallery awaits</h3>
        <p className="text-dark/50 text-sm font-sans">Photos added to your memories will appear here automatically.</p>
      </div>
    );
  }

  const activeImg = activeIdx !== null ? images[activeIdx] : null;
  const currentDrumImg = images[safeDrumIdx];

  // Pointer drag handlers for Fieldwork 3D Drum
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 36) {
      stepDrum(dx < 0 ? 1 : -1);
    }
  };

  return (
    <div className="relative pb-20">
      {viewMode === 'drum' ? (
        /* ─── Fieldwork-inspired 3D Curved Photo Drum ─── */
        <div
          className="relative w-full py-6 sm:py-10 select-none overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          data-cursor="Drag"
        >
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-dark/45">
              {String(safeDrumIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} · Drag or tap to spin
            </span>
          </div>

          <div
            className="relative h-[320px] sm:h-[380px] flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {images.map((img, idx) => {
              // Shortest signed offset around the ring
              let offset = idx - safeDrumIdx;
              const half = images.length / 2;
              if (offset > half) offset -= images.length;
              if (offset < -half) offset += images.length;

              const absOff = Math.abs(offset);
              if (absOff > 3) return null;

              const isCenter = offset === 0;
              const translateX = offset * 175;
              const translateZ = -absOff * 120;
              const rotateY = offset * -24;
              const opacity = Math.max(0.22, 1 - absOff * 0.28);
              const scale = isCenter ? 1 : Math.max(0.76, 1 - absOff * 0.1);

              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => {
                    if (isCenter) setActiveIdx(idx);
                    else setDrumIdx(idx);
                  }}
                  data-cursor={isCenter ? 'Expand' : 'Focus'}
                  aria-label={isCenter ? `Open ${img.title} in lightbox` : `Focus ${img.title}`}
                  className="absolute w-[220px] sm:w-[270px] h-[270px] sm:h-[320px] rounded-2xl overflow-hidden bg-white p-2 pb-9 shadow-theme-lg border border-black/10 transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex: 20 - Math.round(absOff),
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl block"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/ffe4e6/be123c?text=Error';
                    }}
                  />
                  <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-left">
                    <span className="font-heading text-xs font-semibold text-stone-800 truncate pr-2">
                      {img.title}
                    </span>
                    {isCenter && (
                      <span className="shrink-0 text-[9px] font-sub font-bold uppercase tracking-wider text-accent">
                        View
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ─── Unrolled Editorial Masonry Grid ─── */
        <div className="columns-2 sm:columns-3 md:columns-4 gap-3.5 space-y-3.5 animate-fadeIn">
          {images.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              data-cursor="Expand"
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
      )}

      {/* ─── Fieldwork-inspired Floating Control Dock (Unroll ↔ Arc) ─── */}
      <nav
        aria-label="Gallery controls"
        className="sticky bottom-4 z-30 mt-6 flex items-center justify-center gap-2 pointer-events-none"
      >
        <div className="pointer-events-auto inline-flex items-center gap-2.5 bg-surface/95 backdrop-blur-xl border border-border-theme shadow-theme-lg rounded-full pl-2 pr-2.5 py-1.5">
          {viewMode === 'drum' && currentDrumImg && (
            <>
              <img
                src={currentDrumImg.url}
                alt=""
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-border-theme shrink-0"
              />
              <div className="hidden sm:block text-left max-w-[140px] pr-1">
                <p className="text-[11px] font-heading font-semibold text-primary leading-tight truncate">
                  {currentDrumImg.title}
                </p>
                {currentDrumImg.date && (
                  <p className="text-[9px] font-mono uppercase tracking-wider text-dark/45">
                    {new Date(`${currentDrumImg.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex items-center gap-1 border-r border-border-theme pr-2">
                  <button
                    type="button"
                    onClick={() => stepDrum(-1)}
                    aria-label="Previous photo"
                    className="p-1.5 rounded-full hover:bg-primary/10 text-dark/70 hover:text-primary transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepDrum(1)}
                    aria-label="Next photo"
                    className="p-1.5 rounded-full hover:bg-primary/10 text-dark/70 hover:text-primary transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          )}

          <button
            type="button"
            onClick={() => setViewMode((m) => (m === 'drum' ? 'grid' : 'drum'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-cream text-[10px] font-sub font-bold uppercase tracking-wider transition-all active:scale-95"
          >
            {viewMode === 'drum' ? (
              <>
                <LayoutGrid size={12} /> Unroll Grid
              </>
            ) : (
              <>
                <Orbit size={12} /> 3D Arc
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Full-Screen Editorial Photo Lightbox */}
      {activeImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeImg.title || 'Photo preview'}
        >
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white/80 z-20">
            <span className="text-xs font-mono uppercase tracking-[0.2em]">
              {String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
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

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

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
    </div>
  );
};

export default GalleryTab;
