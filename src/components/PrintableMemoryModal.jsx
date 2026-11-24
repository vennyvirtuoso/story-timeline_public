import React, { useState, useEffect } from 'react';
import { X, Printer, Heart, Calendar, Clock } from 'lucide-react';

const PrintableMemoryModal = ({ memory, onClose, timelineTitle }) => {
  const [printStyle, setPrintStyle] = useState('archival'); // 'archival' | 'minimal'

  useEffect(() => {
    if (!memory) return;
    document.body.classList.add('printing-memory-card');
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('printing-memory-card');
      window.removeEventListener('keydown', onKey);
    };
  }, [memory, onClose]);

  if (!memory) return null;

  const images = Array.isArray(memory.imageUrls)
    ? memory.imageUrls
    : memory.imageUrl
    ? [memory.imageUrl]
    : [];

  const formattedDate = memory.date
    ? new Date(`${memory.date}T00:00:00`).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const formattedTime = memory.time
    ? new Date(`${memory.date}T${memory.time}`).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  const isArchival = printStyle === 'archival';

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="printable-card-heading"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-cream rounded-[28px] border border-border-theme shadow-theme-lg overflow-hidden animate-modal-enter my-auto flex flex-col max-h-[92dvh]"
      >
        {/* Top Modal Controls (hidden automatically during print) */}
        <div className="px-5 sm:px-6 py-4 bg-surface border-b border-border-theme flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <h3 id="printable-card-heading" className="font-heading text-lg font-semibold text-primary leading-tight">
              Printable Keepsake Card
            </h3>
            <p className="text-[11px] text-dark/55 font-sans">
              Save as PDF or print this memory as a framed keepsake
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Style Switcher */}
            <div className="inline-flex p-0.5 rounded-full bg-cream-dark/70 border border-border-theme">
              {[
                ['archival', 'Archival'],
                ['minimal', 'Ink-Saver'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPrintStyle(id)}
                  aria-pressed={printStyle === id}
                  className={`px-3 py-1 rounded-full text-[10px] font-sub font-bold uppercase tracking-wider transition-all ${
                    printStyle === id
                      ? 'bg-primary text-cream shadow-sm'
                      : 'text-dark/60 hover:text-dark'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close print preview"
              className="p-1.5 rounded-full text-dark/45 hover:text-dark hover:bg-cream-dark transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Live Print Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 bg-stone-200/50 flex justify-center">
          <article
            className={`printable-keepsake-sheet w-full max-w-[580px] rounded-2xl p-6 sm:p-9 relative transition-colors duration-300 ${
              isArchival
                ? 'bg-[#fffdf7] text-[#1c1917] border-2 border-[#b6813c]/40 shadow-xl'
                : 'bg-white text-stone-900 border border-stone-300 shadow-lg'
            }`}
          >
            {/* Inner heirloom double border for Archival style */}
            {isArchival && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-xl border border-[#244f43]/15"
              />
            )}

            <div className="relative z-10 space-y-5">
              {/* Top Story Header */}
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-3.5 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Heart size={13} className="text-rose-600 fill-rose-600 shrink-0" />
                  <span className="font-sub text-[10px] font-bold uppercase tracking-[0.2em] text-[#244f43] truncate">
                    {timelineTitle || 'Our Safarnama'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] font-sub font-bold uppercase tracking-wider text-stone-500 shrink-0">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} className="text-[#a97132]" />
                      {formattedDate}
                    </span>
                  )}
                  {formattedTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} />
                      {formattedTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Photo Showcase (1 hero or tidy 2-column grid for up to 4 photos) */}
              {images.length > 0 && (
                <div
                  className={
                    images.length === 1
                      ? 'flex justify-center'
                      : 'grid grid-cols-2 gap-3'
                  }
                >
                  {images.slice(0, 4).map((url, i) => (
                    <div
                      key={i}
                      className={`p-2 bg-white border border-stone-200/90 shadow-sm rounded-md overflow-hidden ${
                        images.length === 1 ? 'max-w-full' : 'aspect-[4/3]'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${memory.title} ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className={
                          images.length === 1
                            ? 'max-h-[300px] w-auto max-w-full object-contain mx-auto block rounded-sm'
                            : 'w-full h-full object-cover block rounded-sm'
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Title & Handwritten Story */}
              <div className="text-center space-y-2 pt-1">
                <h2 className="font-cursive text-4xl sm:text-5xl font-bold text-[#a97132] leading-tight">
                  {memory.title}
                </h2>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#b6813c]/40 to-transparent mx-auto" />
              </div>

              {memory.description && (
                <p className="font-heading text-base sm:text-lg text-stone-700 leading-relaxed whitespace-pre-line text-center px-2">
                  {memory.description}
                </p>
              )}

              {/* Keepsake Footer */}
              <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between text-[9px] font-sub uppercase tracking-[0.22em] text-stone-400">
                <span>Safarnama Keepsake</span>
                <span>Preserved Forever</span>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 py-4 bg-surface border-t border-border-theme flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-border-theme text-xs font-sub font-bold uppercase tracking-wider text-dark/65 hover:bg-cream-dark/50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-cream text-xs font-sub font-bold uppercase tracking-[0.12em] shadow-theme-sm transition-all active:scale-95"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintableMemoryModal;
