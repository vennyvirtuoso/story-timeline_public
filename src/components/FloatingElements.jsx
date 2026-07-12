import React, { useState, useEffect } from 'react';

const floatStyles = `
  @keyframes float {
    0%   { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
    20%  { opacity: 0.6; }
    100% { transform: translateY(-220px) scale(0.9) rotate(35deg); opacity: 0; }
  }
  @keyframes floatSway {
    0%   { transform: translateY(0) translateX(0) scale(0.6); opacity: 0; }
    25%  { opacity: 0.5; transform: translateY(-60px) translateX(15px) scale(1); }
    75%  { transform: translateY(-160px) translateX(-15px) scale(0.85); }
    100% { transform: translateY(-240px) translateX(5px) scale(0.5); opacity: 0; }
  }
  @keyframes floatLeaf {
    0%   { transform: translateY(0) rotate(0deg) scale(0.7); opacity: 0; }
    20%  { opacity: 0.6; }
    50%  { transform: translateY(-110px) rotate(80deg) scale(1.05); }
    100% { transform: translateY(-220px) rotate(160deg) scale(0.6); opacity: 0; }
  }
  @keyframes floatSpark {
    0%   { transform: translateY(0) scale(0.3); opacity: 0; }
    15%  { opacity: 0.95; transform: scale(1.3); }
    50%  { transform: translateY(-100px) scale(0.9); opacity: 0.5; }
    100% { transform: translateY(-200px) scale(0.2); opacity: 0; }
  }
  @keyframes floatStar {
    0%   { transform: translateY(0) rotate(0deg) scale(0.4); opacity: 0; }
    20%  { opacity: 0.8; }
    60%  { transform: translateY(-130px) rotate(180deg) scale(1.15); }
    100% { transform: translateY(-230px) rotate(360deg) scale(0.3); opacity: 0; }
  }
  .ft-el { position: fixed; bottom: -10vh; pointer-events: none; z-index: 0; animation-fill-mode: forwards; }
`;

const FloatingElements = ({ theme }) => {
  const f = theme?.float;
  const [items, setItems] = useState([]);

  const mk = (id) => ({
    id,
    left: Math.random() * 95,
    size: Math.random() * 22 + 12,
    duration: Math.random() * 8 + 7,
    delay: Math.random() * 4,
    colorIdx: Math.random() > 0.5 ? 0 : 1,
  });

  useEffect(() => {
    if (!f?.show) return;
    setItems(Array.from({ length: 8 }).map((_, i) => mk(i)));
    const t = setInterval(() => setItems(p => [...p.slice(-25), mk(Date.now())]), 1000);
    return () => clearInterval(t);
  }, [theme?.id]);

  if (!f?.show) return null;

  const getParticleSVG = (themeId) => {
    switch (themeId) {
      case 'love':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'ocean':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.08" />
            <circle cx="9" cy="9" r="2.2" fill="white" fillOpacity="0.75" stroke="none" />
          </svg>
        );
      case 'forest':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17,8C14.5,8 10,10 8,13C6,16 6,19 6,19C6,19 9,19 12,17C15,15 17,10.5 17,8Z" />
            <path d="M2,22C2,22 5,16 8,14C11,12 15.5,10 18,10C20.5,10 22,8 22,8C22,8 20,9.5 17.5,9.5C15,9.5 10.5,11.5 7.5,13.5C4.5,15.5 2,22 2,22Z" opacity="0.7" />
          </svg>
        );
      case 'sunset':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="12" cy="12" r="9.5" opacity="0.18" />
          </svg>
        );
      case 'galaxy':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2L15.2 8.8L22 12L15.2 15.2L12 22L8.8 15.2L2 12L8.8 8.8L12 2Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{floatStyles}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        {items.map(item => (
          <div key={item.id} className={`ft-el ${f.colors[item.colorIdx]}`}
            style={{
              left: `${item.left}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              animationName: f.animation,
              animationDuration: `${item.duration}s`,
              animationDelay: `-${item.delay}s`,
              animationTimingFunction: 'ease-in-out',
              opacity: 0.35,
            }}>
            {getParticleSVG(theme?.id)}
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingElements;
