import React, { useMemo } from 'react';

const floatStyles = `
  @keyframes float {
    0%   { transform: translate3d(0, 0, 0) scale(0.55) rotate(0deg); opacity: 0; }
    15%  { opacity: 0.45; }
    85%  { opacity: 0.35; }
    100% { transform: translate3d(0, -105vh, 0) scale(0.95) rotate(30deg); opacity: 0; }
  }
  @keyframes floatSway {
    0%   { transform: translate3d(0, 0, 0) scale(0.6); opacity: 0; }
    20%  { opacity: 0.42; transform: translate3d(18px, -25vh, 0) scale(0.95); }
    65%  { opacity: 0.35; transform: translate3d(-18px, -70vh, 0) scale(0.85); }
    100% { transform: translate3d(8px, -108vh, 0) scale(0.55); opacity: 0; }
  }
  @keyframes floatLeaf {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(0.7); opacity: 0; }
    18%  { opacity: 0.42; }
    50%  { transform: translate3d(14px, -55vh, 0) rotate(85deg) scale(1); }
    100% { transform: translate3d(-10px, -108vh, 0) rotate(170deg) scale(0.6); opacity: 0; }
  }
  @keyframes floatSpark {
    0%   { transform: translate3d(0, 0, 0) scale(0.35); opacity: 0; }
    20%  { opacity: 0.55; transform: translate3d(0, -22vh, 0) scale(1.1); }
    60%  { transform: translate3d(0, -65vh, 0) scale(0.85); opacity: 0.35; }
    100% { transform: translate3d(0, -105vh, 0) scale(0.25); opacity: 0; }
  }
  @keyframes floatStar {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(0.45); opacity: 0; }
    20%  { opacity: 0.55; }
    60%  { transform: translate3d(0, -62vh, 0) rotate(180deg) scale(1.05); }
    100% { transform: translate3d(0, -108vh, 0) rotate(360deg) scale(0.3); opacity: 0; }
  }
  .ft-el {
    position: fixed;
    bottom: -8vh;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .ft-el {
      display: none;
    }
  }
`;

// Deterministic layout avoids hydration/re-render jitter while looking organic
const PARTICLE_SEEDS = [
  { left: 6,  size: 16, duration: 15, delay: 0,  colorIdx: 0 },
  { left: 14, size: 22, duration: 19, delay: 4,  colorIdx: 1 },
  { left: 23, size: 14, duration: 13, delay: 8,  colorIdx: 0 },
  { left: 32, size: 20, duration: 17, delay: 2,  colorIdx: 1 },
  { left: 41, size: 15, duration: 16, delay: 11, colorIdx: 0 },
  { left: 52, size: 24, duration: 21, delay: 6,  colorIdx: 1 },
  { left: 61, size: 16, duration: 14, delay: 13, colorIdx: 0 },
  { left: 70, size: 19, duration: 18, delay: 3,  colorIdx: 1 },
  { left: 79, size: 15, duration: 15, delay: 9,  colorIdx: 0 },
  { left: 88, size: 21, duration: 20, delay: 5,  colorIdx: 1 },
  { left: 94, size: 14, duration: 16, delay: 12, colorIdx: 0 },
];

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

const FloatingElements = React.memo(({ theme }) => {
  const f = theme?.float;
  const particleIcon = useMemo(() => getParticleSVG(theme?.id), [theme?.id]);

  if (!f?.show || !particleIcon) return null;

  return (
    <>
      <style>{floatStyles}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
        {PARTICLE_SEEDS.map((item, idx) => (
          <div
            key={`${theme?.id}-${idx}`}
            className={`ft-el ${f.colors[item.colorIdx]}`}
            style={{
              left: `${item.left}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              animationName: f.animation,
              animationDuration: `${item.duration}s`,
              animationDelay: `-${item.delay}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            {particleIcon}
          </div>
        ))}
      </div>
    </>
  );
});

FloatingElements.displayName = 'FloatingElements';

export default FloatingElements;
