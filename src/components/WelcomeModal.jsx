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
        className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'fadeSlideUp 0.4s ease' }}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="px-6 pt-6 pb-7">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200">
              <Heart size={22} fill="white" className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <p className="text-[13px] text-gray-400 italic leading-relaxed">
              Some gifts are forgotten.<br />
              Some gifts become memories.
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500">Safarnama</span> lets you turn the moments you've lived together into a beautiful timeline — something you can gift to someone who truly matters.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed">
              Trips, laughs, inside jokes, and little moments that shaped your story — all in one place.
            </p>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                And the most beautiful part?
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mt-1">
                They can add to it too. With just a link, they can open the timeline and relive every memory. Up to 20 people can collaborate, making it a gift filled with shared moments.
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleClose}
            className="mt-5 w-full py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-2xl text-sm font-semibold shadow-md shadow-rose-200 hover:opacity-90 active:scale-95 transition-all"
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