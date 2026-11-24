import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, Plus, X } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const DreamJar = ({ config, setConfig, ownerId, canEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newDream, setNewDream] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const dreams = config?.wishes || [];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleAddDream = async (e) => {
    e.preventDefault();
    const txt = newDream.trim();
    if (!txt) return;

    setIsAnimating(true);
    const updatedDreams = [...dreams, txt];
    const newConfig = { ...config, wishes: updatedDreams, updatedAt: serverTimestamp() };

    if (ownerId) {
      try {
        await setDoc(doc(db, 'users', ownerId, 'config', 'main'), newConfig);
        setConfig(newConfig);
      } catch (err) {
        console.error('Error saving dream:', err);
      }
    }

    setNewDream('');
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleDeleteDream = async (idx) => {
    const updatedDreams = dreams.filter((_, i) => i !== idx);
    const newConfig = { ...config, wishes: updatedDreams, updatedAt: serverTimestamp() };
    if (ownerId) {
      try {
        await setDoc(doc(db, 'users', ownerId, 'config', 'main'), newConfig);
        setConfig(newConfig);
      } catch (err) {
        console.error('Error deleting dream:', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-12 relative z-10 select-none">
      {/* Jar click trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-cursor="Open"
        className="group cursor-pointer flex flex-col items-center gap-1.5 relative transition-transform duration-300 hover:scale-105 bg-transparent border-0 p-2 rounded-3xl"
      >
        {/* Warm glow behind Jar */}
        <div className="absolute inset-0 bg-amber-300/20 blur-2xl rounded-full group-hover:bg-amber-300/35 transition-colors duration-300" aria-hidden="true" />

        {/* SVG Glass Jar */}
        <svg viewBox="0 0 100 130" width="90" height="110" className="relative drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)]" aria-hidden="true">
          {/* Jar cap */}
          <path d="M35 15 L65 15 L65 24 L35 24 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <line x1="38" y1="19" x2="62" y2="19" stroke="#fcd34d" strokeWidth="1.5" />
          {/* Jar neck */}
          <path d="M40 24 L60 24 L62 34 L38 34 Z" fill="rgba(255, 255, 255, 0.25)" stroke="var(--border-color)" strokeWidth="1.2" />
          {/* Jar body */}
          <path
            d="M38 34 C25 45 22 55 22 80 C22 110 32 120 50 120 C68 120 78 110 78 80 C78 55 75 45 62 34 Z"
            fill="rgba(255, 255, 255, 0.22)"
            stroke="var(--border-color)"
            strokeWidth="2"
          />
          {/* Glass glare highlight */}
          <path d="M29 60 C29 50 33 42 42 38" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          {/* Heart label hanging on jar */}
          <path d="M42 45 L58 45 L62 55 L50 65 L38 55 Z" fill="#fffbeb" stroke="var(--border-color)" strokeWidth="1" />
          {/* Native SVG heart properly centered on the tag */}
          <path
            d="M50 58.2 L49.1 57.4 C46.4 55 44.7 53.5 44.7 51.6 C44.7 50.1 45.9 49 47.4 49 C48.3 49 49.2 49.4 50 50.2 C50.8 49.4 51.7 49 52.6 49 C54.1 49 55.3 50.1 55.3 51.6 C55.3 53.5 53.6 55 50.9 57.4 Z"
            fill="#e11d48"
          />

          {/* Filled wishes inside the jar */}
          {dreams.slice(0, 5).map((_, i) => {
            const rot = [-25, 15, -5, 30, -15][i];
            const px = [38, 52, 45, 60, 32][i];
            const py = [105, 102, 92, 95, 96][i];
            return (
              <g key={i} transform={`translate(${px}, ${py}) rotate(${rot})`}>
                <rect x="-8" y="-4" width="16" height="8" rx="1.5" fill="#fffbeb" stroke="#b45309" strokeWidth="0.6" opacity="0.95" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#e11d48" strokeWidth="0.6" opacity="0.7" />
              </g>
            );
          })}
        </svg>

        <span className="font-accent text-accent tracking-wide text-3xl font-bold -mt-1 block">Our Dream Jar</span>
        <span className="text-[10px] font-sub font-bold uppercase tracking-[0.16em] text-dark/50 flex items-center gap-1">
          <Sparkles size={10} className="text-amber-500" />
          {dreams.length > 0 ? `${dreams.length} ${dreams.length === 1 ? 'dream' : 'dreams'} inside` : 'Tap to add dreams'}
        </span>
      </button>

      {/* Jar Pop-up List Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fadeIn"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dream-jar-title"
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-md" />

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-sm bg-cream rounded-[28px] border border-border-theme shadow-theme-lg p-6 flex flex-col max-h-[78vh] animate-modal-enter"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-border-theme">
              <h3 id="dream-jar-title" className="font-heading font-semibold text-primary text-xl flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" /> Our Dream Jar
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Dream Jar"
                className="text-dark/45 hover:text-dark p-1.5 rounded-full hover:bg-cream-dark transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Wishes Scrollable List */}
            <div className="flex-1 overflow-y-auto my-4 py-1 pr-1 scrollbar-thin">
              {dreams.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Gift size={26} className="text-dark/25 mx-auto" />
                  <p className="text-xs font-sub font-bold uppercase tracking-wider text-dark/50">The Jar is Empty</p>
                  <p className="text-xs font-sans text-dark/60 max-w-[220px] mx-auto">
                    Write down your future dreams, trips, and bucket list wishes together!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {dreams.map((dr, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between bg-surface border border-border-theme p-3.5 rounded-2xl relative overflow-hidden shadow-theme-sm"
                    >
                      <div className="absolute left-3 top-0 bottom-0 w-px border-l border-rose-400/35" aria-hidden="true" />
                      <div className="pl-3.5 flex-1 font-heading text-base italic text-dark/85 whitespace-pre-wrap leading-relaxed pr-2">
                        {dr}
                      </div>
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => handleDeleteDream(idx)}
                          className="text-dark/35 hover:text-red-500 p-1 rounded-full transition-colors shrink-0"
                          aria-label="Remove dream"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Dream Form */}
            {canEdit && (
              <form onSubmit={handleAddDream} className="flex gap-2 pt-3.5 border-t border-border-theme">
                <input
                  value={newDream}
                  onChange={(e) => setNewDream(e.target.value)}
                  placeholder="Share a future dream..."
                  className="flex-1 px-4 py-2.5 border border-border-theme rounded-xl outline-none text-sm text-dark placeholder-dark/35 bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
                  maxLength={120}
                />
                <button
                  type="submit"
                  disabled={!newDream.trim() || isAnimating}
                  aria-label="Add dream"
                  className="bg-primary hover:bg-primary-hover text-cream px-4 rounded-xl text-xs font-sub font-bold uppercase tracking-wider shadow-theme-sm transition-all duration-150 active:scale-95 disabled:opacity-50 flex items-center justify-center shrink-0"
                >
                  <Plus size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamJar;
