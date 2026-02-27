import React, { useState, useEffect } from 'react';

const floatStyles = `
  @keyframes float {
    0%   { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
    20%  { opacity: 0.5; }
    100% { transform: translateY(-200px) scale(0.9) rotate(10deg); opacity: 0; }
  }
  @keyframes floatSway {
    0%   { transform: translateY(0) translateX(0) scale(0.6); opacity: 0; }
    25%  { opacity: 0.5; transform: translateY(-50px) translateX(12px) scale(1); }
    75%  { transform: translateY(-150px) translateX(-10px) scale(0.8); }
    100% { transform: translateY(-220px) translateX(5px) scale(0.5); opacity: 0; }
  }
  @keyframes floatLeaf {
    0%   { transform: translateY(0) rotate(0deg) scale(0.7); opacity: 0; }
    20%  { opacity: 0.6; }
    50%  { transform: translateY(-100px) rotate(45deg) scale(1); }
    100% { transform: translateY(-200px) rotate(90deg) scale(0.6); opacity: 0; }
  }
  @keyframes floatSpark {
    0%   { transform: translateY(0) scale(0.3); opacity: 0; }
    15%  { opacity: 0.9; transform: scale(1.2); }
    50%  { transform: translateY(-90px) scale(0.8); opacity: 0.5; }
    100% { transform: translateY(-180px) scale(0.2); opacity: 0; }
  }
  @keyframes floatStar {
    0%   { transform: translateY(0) rotate(0deg) scale(0.4); opacity: 0; }
    20%  { opacity: 0.7; }
    60%  { transform: translateY(-120px) rotate(180deg) scale(1.1); }
    100% { transform: translateY(-210px) rotate(360deg) scale(0.3); opacity: 0; }
  }
  .ft-el { position: fixed; bottom: -10vh; pointer-events: none; z-index: 0; animation-fill-mode: forwards; }
`;

const FloatingElements = ({ theme }) => {
  const f = theme?.float;
  const [items, setItems] = useState([]);

  const mk = (id) => ({
    id,
    left: Math.random() * 95,
    size: Math.random() * 22 + 10,
    duration: Math.random() * 7 + 6,
    delay: Math.random() * 4,
    colorIdx: Math.random() > 0.5 ? 0 : 1,
  });

  useEffect(() => {
    if (!f?.show) return;
    setItems(Array.from({ length: 10 }).map((_, i) => mk(i)));
    const t = setInterval(() => setItems(p => [...p.slice(-35), mk(Date.now())]), 800);
    return () => clearInterval(t);
  }, [theme?.id]);

  if (!f?.show) return null;

  return (
    <>
      <style>{floatStyles}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        {items.map(item => (
          <div key={item.id} className={`ft-el ${f.colors[item.colorIdx]}`}
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              animationName: f.animation,
              animationDuration: `${item.duration}s`,
              animationDelay: `-${item.delay}s`,
              animationTimingFunction: 'ease-in-out',
              opacity: 0.4,
            }}>
            {f.emoji}
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingElements;
