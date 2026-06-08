import React, { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';

const WelcomeModal = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // ✅ Show only once — never again after dismissed
    const seen = localStorage.getItem('safarnama_welcome_seen');
    if (!seen) setIsOpen(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem('safarnama_welcome_seen', '1');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
         onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm bg-white rounded-3xl border border-border-theme shadow-theme-lg overflow-hidden"
        style={{ animation: 'fadeSlideUp 0.4s ease' }}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-dark/30 hover:text-dark/60 hover:bg-cream-dark/50 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="px-6 pt-6 pb-7 bg-cream/20">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-theme-sm">
              <Heart size={20} fill="white" className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <p className="font-cursive text-2.5xl text-accent font-bold leading-normal">
              Some gifts are forgotten.<br />
              Some gifts become memories.
            </p>

            <p className="text-sm text-dark/70 leading-relaxed font-sans">
              <span className="font-heading font-semibold text-primary text-base">Safarnama</span> lets you turn the moments you've lived together into a beautiful timeline — something you can gift to someone who truly matters.
            </p>

            <p className="text-xs text-dark/50 leading-relaxed font-sans">
              Trips, laughs, inside jokes, and little moments that shaped your story — all in one place.
            </p>

            <div className="border-t border-border-theme/60 pt-4">
              <p className="text-sm font-heading font-semibold text-primary leading-relaxed">
                And the most beautiful part?
              </p>
              <p className="text-xs text-dark/50 leading-relaxed mt-1 font-sans">
                They can add to it too. With just a link, they can open the timeline and relive every memory. Up to 20 people can collaborate, making it a gift filled with shared moments.
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleClose}
            className="mt-6 w-full py-3 bg-primary text-cream rounded-xl text-xs font-sub font-bold uppercase tracking-wider hover:bg-primary-hover shadow-theme-sm transition-all active:scale-95 duration-150"
          >
            Start your story ✨
          </button>

        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
};

export default WelcomeModal;