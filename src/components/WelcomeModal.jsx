import React, { useEffect, useState } from 'react';
import { Heart, X, Sparkles } from 'lucide-react';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      return !localStorage.getItem('safarnama_welcome_seen');
    } catch {
      return false;
    }
  });

  const handleClose = () => {
    localStorage.setItem('safarnama_welcome_seen', '1');
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md bg-[#fffdf9] rounded-[28px] border border-white/80 shadow-theme-lg overflow-hidden animate-modal-enter"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-rose-safarnama" />

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close welcome dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-dark/40 hover:text-dark hover:bg-cream-dark/60 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="px-7 pt-7 pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-theme-md ring-4 ring-cream">
              <Heart size={22} fill="white" className="text-white" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <p
              id="welcome-modal-title"
              className="font-cursive text-4xl text-accent font-bold leading-tight"
            >
              Some gifts are forgotten.<br />
              Some gifts become memories.
            </p>

            <p className="text-sm text-dark/75 leading-relaxed font-sans">
              <span className="font-heading font-semibold text-primary text-lg">Safarnama</span>{' '}
              turns the moments you&apos;ve lived together into a tactile heirloom timeline — something you can gift to someone who truly matters.
            </p>

            <p className="text-xs text-dark/55 leading-relaxed font-sans">
              Trips, laughs, inside jokes, and quiet little moments — all preserved in one calm, private place.
            </p>

            <div className="bg-cream/80 border border-border-theme rounded-2xl p-4 text-left space-y-1">
              <p className="text-xs font-sub font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles size={12} className="text-accent" /> Shared &amp; Co-Authored
              </p>
              <p className="text-xs text-dark/65 leading-relaxed font-sans">
                With a single link, your favorite people can open the journal and add their own memories too.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="mt-6 w-full py-3.5 bg-primary text-cream rounded-2xl text-xs font-sub font-bold uppercase tracking-[0.14em] hover:bg-primary-hover shadow-theme-md transition-all active:scale-[0.98]"
          >
            Start Your Story ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
