import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Plus, X } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const DreamJar = ({ config, setConfig, ownerId, canEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newDream, setNewDream] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const dreams = config?.wishes || [];

  const handleAddDream = async (e) => {
    e.preventDefault();
    const txt = newDream.trim();
    if (!txt) return;

    setIsAnimating(true);
    const updatedDreams = [...dreams, txt];
    const newConfig = { ...config, wishes: updatedDreams, updatedAt: serverTimestamp() };
    
    // Save to firestore config
    if (ownerId) {
      try {
        await setDoc(doc(db, 'users', ownerId, 'config', 'main'), newConfig);
        setConfig(newConfig);
      } catch (err) {
        console.error('Error saving dream:', err);
      }
    }
    
    setNewDream('');
    setTimeout(() => setIsAnimating(false), 1200);
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
      <div 
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer flex flex-col items-center gap-2 relative transition-all duration-300 hover:scale-[1.05]"
      >
        {/* Glow behind Jar */}
        <div className="absolute inset-0 bg-amber-200/20 blur-xl rounded-full group-hover:bg-amber-300/30 transition-all duration-300" />
        
        {/* SVG Glass Jar */}
        <svg viewBox="0 0 100 130" width="90" height="110" className="relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          {/* Jar cap */}
          <path d="M35 15 L65 15 L65 24 L35 24 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <line x1="38" y1="19" x2="62" y2="19" stroke="#fcd34d" strokeWidth="1.5" />
          {/* Jar neck */}
          <path d="M40 24 L60 24 L62 34 L38 34 Z" fill="rgba(255, 255, 255, 0.2)" stroke="var(--border-color)" strokeWidth="1" />
          {/* Jar body */}
          <path d="M38 34 C25 45 22 55 22 80 C22 110 32 120 50 120 C68 120 78 110 78 80 C78 55 75 45 62 34 Z" 
            fill="rgba(255, 255, 255, 0.15)" 
            stroke="var(--border-color)" 
            strokeWidth="2" 
            backdropFilter="blur(3px)" 
          />
          {/* Glass glare highlight */}
          <path d="M28 60 C28 50 32 42 42 38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          {/* Heart label hanging on jar */}
          <path d="M42 45 L58 45 L62 55 L50 65 L38 55 Z" fill="#fffbeb" stroke="var(--border-color)" strokeWidth="1" />
          <Heart size={8} fill="#f43f5e" className="text-rose-safarnama absolute top-[48px] left-[46px]" />
          
          {/* Filled wishes inside the jar */}
          {dreams.slice(0, 5).map((dr, i) => {
            const rot = [-25, 15, -5, 30, -15][i];
            const px = [38, 52, 45, 60, 32][i];
            const py = [105, 102, 92, 95, 96][i];
            return (
              <g key={i} transform={`translate(${px}, ${py}) rotate(${rot})`}>
                {/* Folded paper slip */}
                <rect x="-8" y="-4" width="16" height="8" rx="1" fill="#fffbeb" stroke="#b45309" strokeWidth="0.5" opacity="0.9" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#f43f5e" strokeWidth="0.5" opacity="0.7" />
              </g>
            );
          })}
        </svg>

        <span className="font-accent text-accent tracking-wide text-2xl font-bold -mt-1 block">Our Dream Jar</span>
        <p className="text-[9px] font-sub font-bold uppercase tracking-wider text-dark/40 -mt-1 flex items-center gap-1">
          <Sparkles size={8} /> Tap to see dreams
        </p>
      </div>

      {/* Jar Pop-up list Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[4px] transition-all duration-300" />
          
          <div 
            onClick={e => e.stopPropagation()}
            className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-lg rounded-3xl border border-white/60 shadow-theme-lg p-6 flex flex-col max-h-[75vh]"
            style={{ animation: 'fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-theme/60">
              <h3 className="font-heading font-semibold text-primary text-lg flex items-center gap-1.5 font-heading">
                <Sparkles size={16} className="text-amber-500 animate-pulse" /> Our Dream Jar
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-dark/40 hover:text-dark/70 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Wishes Scrollable List */}
            <div className="flex-1 overflow-y-auto my-4 py-2 pr-1 scrollbar-thin">
              {dreams.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Gift size={24} className="text-dark/20 mx-auto" />
                  <p className="text-xs font-sub font-bold uppercase tracking-wider text-dark/40">The Jar is Empty</p>
                  <p className="text-[10px] font-sans text-dark/60 max-w-[200px] mx-auto font-sans">Write down your future dreams, trips, and bucket list wishes together!</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {dreams.map((dr, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start justify-between bg-cream/30 border border-border-theme/40 p-3 rounded-2xl animate-fadeIn relative overflow-hidden"
                    >
                      {/* Left vertical paper margin guideline */}
                      <div className="absolute left-3 top-0 bottom-0 w-[1px] border-l border-rose-300/40" />
                      
                      <div className="pl-3.5 flex-1 font-serif text-sm italic text-dark/80 whitespace-pre-wrap leading-relaxed pr-2 font-serif">
                        {dr}
                      </div>
                      
                      {canEdit && (
                        <button 
                          onClick={() => handleDeleteDream(idx)}
                          className="text-dark/30 hover:text-red-500 p-1 rounded-full transition-colors shrink-0"
                          aria-label="Remove dream"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Dream Form */}
            {canEdit && (
              <form onSubmit={handleAddDream} className="flex gap-2 pt-3 border-t border-border-theme/60">
                <input 
                  value={newDream}
                  onChange={e => setNewDream(e.target.value)}
                  placeholder="Share a dream..."
                  className="flex-1 px-4 py-2.5 border border-border-theme rounded-xl outline-none text-xs text-dark placeholder-dark/30 bg-cream/10 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                  maxLength={120}
                />
                <button 
                  type="submit"
                  disabled={!newDream.trim() || isAnimating}
                  className="bg-primary hover:bg-primary-hover text-cream px-3.5 rounded-xl text-xs font-sub font-bold uppercase tracking-wider shadow-theme-sm transition-all duration-150 active:scale-95 disabled:opacity-50 flex items-center justify-center shrink-0"
                >
                  <Plus size={14} />
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
