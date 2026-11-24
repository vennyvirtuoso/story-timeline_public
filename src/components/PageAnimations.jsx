import React from 'react';

/**
 * Low-memory, pure CSS + inline SVG animations tailored to each Safarnama page.
 * Zero JavaScript animation loops, zero canvas buffers, GPU-composited transform/opacity,
 * and automatically static when prefers-reduced-motion is enabled.
 */

// 1. Intro / Login Page — Paper Airplane gliding along a journey trail
export const PaperPlaneTrailAnim = React.memo(() => (
  <div className="pointer-events-none select-none inline-flex items-center gap-2" aria-hidden="true">
    <svg width="88" height="32" viewBox="0 0 88 32" fill="none" className="overflow-visible">
      <path
        d="M4 24 C 22 26, 36 10, 56 14"
        stroke="var(--accent-color)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
        className="opacity-55"
      />
      <g className="anim-plane-glide">
        <path
          d="M58 13 L79 5 L69 22 L64 16 L58 13 Z"
          fill="var(--primary-color)"
          fillOpacity="0.9"
        />
        <path
          d="M64 16 L79 5 L67 18 L64 16 Z"
          fill="var(--accent-color)"
        />
      </g>
      <circle cx="14" cy="12" r="1.8" fill="var(--rose-color)" className="animate-shimmer-slow" />
      <circle cx="44" cy="6" r="1.4" fill="var(--accent-color)" className="animate-shimmer-slow" style={{ animationDelay: '0.9s' }} />
    </svg>
  </div>
));
PaperPlaneTrailAnim.displayName = 'PaperPlaneTrailAnim';

// 2. About Page — Living Story Timeline Ribbon with pulsing milestone nodes
export const StoryTimelineAnim = React.memo(() => (
  <div className="my-6 flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
    <svg width="260" height="44" viewBox="0 0 260 44" fill="none" className="max-w-full">
      <path
        d="M20 22 C 70 6, 110 38, 160 22 C 195 10, 220 28, 240 22"
        stroke="var(--border-color)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 22 C 70 6, 110 38, 160 22 C 195 10, 220 28, 240 22"
        stroke="var(--accent-color)"
        strokeWidth="2"
        strokeLinecap="round"
        className="anim-ink-draw"
      />
      {[
        { cx: 20,  cy: 22, color: 'var(--primary-color)', delay: '0s' },
        { cx: 90,  cy: 22, color: 'var(--rose-color)',    delay: '0.6s' },
        { cx: 160, cy: 22, color: 'var(--accent-color)',  delay: '1.2s' },
        { cx: 240, cy: 22, color: 'var(--primary-color)', delay: '1.8s' },
      ].map((pt, i) => (
        <g key={i}>
          <circle
            cx={pt.cx}
            cy={pt.cy}
            r="8"
            fill={pt.color}
            className="anim-seal-breathe"
            style={{ transformOrigin: `${pt.cx}px ${pt.cy}px`, animationDelay: pt.delay }}
          />
          <circle cx={pt.cx} cy={pt.cy} r="4" fill={pt.color} stroke="#fffdf9" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  </div>
));
StoryTimelineAnim.displayName = 'StoryTimelineAnim';

// 3. Pricing Page — Heirloom Crown & Golden Sparkles Constellation
export const HeirloomCrownAnim = React.memo(() => (
  <div className="inline-flex items-center justify-center mb-3 select-none pointer-events-none" aria-hidden="true">
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none">
      <g className="animate-float-gentle">
        <path
          d="M16 36 L20 18 L30 26 L36 14 L42 26 L52 18 L56 36 Z"
          fill="var(--accent-color)"
          fillOpacity="0.18"
          stroke="var(--accent-color)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <line x1="18" y1="41" x2="54" y2="41" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="12" r="2.2" fill="var(--rose-color)" />
      </g>
      <path d="M10 14 L12 10 L14 14 L18 16 L14 18 L12 22 L10 18 L6 16 Z" fill="var(--accent-color)" className="animate-shimmer-slow" />
      <path d="M58 10 L59.5 7 L61 10 L64 11.5 L61 13 L59.5 16 L58 13 L55 11.5 Z" fill="var(--primary-color)" className="animate-shimmer-slow" style={{ animationDelay: '1.1s' }} />
    </svg>
  </div>
));
HeirloomCrownAnim.displayName = 'HeirloomCrownAnim';

// 4. Privacy Page — Breathing Wax-Seal Privacy Shield
export const VaultSealAnim = React.memo(() => (
  <div className="inline-flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle
        cx="28"
        cy="28"
        r="24"
        stroke="var(--primary-color)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        className="anim-seal-breathe"
        style={{ transformOrigin: '28px 28px' }}
      />
      <path
        d="M28 10 L42 16 V27 C42 36 36 42 28 46 C20 42 14 36 14 27 V16 L28 10 Z"
        fill="var(--primary-color)"
        fillOpacity="0.1"
        stroke="var(--primary-color)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <rect x="23" y="26" width="10" height="8" rx="2" fill="var(--accent-color)" fillOpacity="0.25" stroke="var(--accent-color)" strokeWidth="1.5" />
      <path d="M25 26 V23.5 A3 3 0 0 1 31 23.5 V26" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
));
VaultSealAnim.displayName = 'VaultSealAnim';

// 5. Terms Page — Vintage Fountain Quill Writing an Ink Flourish
export const QuillInkAnim = React.memo(() => (
  <div className="inline-flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
    <svg width="84" height="44" viewBox="0 0 84 44" fill="none">
      <path
        d="M10 34 Q 28 24, 42 33 T 74 30"
        stroke="var(--accent-color)"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="anim-ink-draw"
      />
      <g className="anim-quill-write">
        <path
          d="M28 28 L44 10 C47 7, 52 8, 50 13 L35 28 L28 31 Z"
          fill="var(--primary-color)"
          fillOpacity="0.15"
          stroke="var(--primary-color)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <line x1="31" y1="28" x2="45" y2="14" stroke="var(--primary-color)" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
));
QuillInkAnim.displayName = 'QuillInkAnim';

// 6. Refund Page — Calm Trust & Renewal Halo
export const TrustLoopAnim = React.memo(() => (
  <div className="inline-flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <g className="anim-trust-spin" style={{ transformOrigin: '26px 26px' }}>
        <path
          d="M26 7 A19 19 0 0 1 44 20"
          stroke="var(--primary-color)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M26 45 A19 19 0 0 1 8 32"
          stroke="var(--accent-color)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="44" cy="20" r="2.2" fill="var(--primary-color)" />
        <circle cx="8" cy="32" r="2.2" fill="var(--accent-color)" />
      </g>
      <path
        d="M20 26.5 L24 30.5 L33 21.5"
        stroke="var(--primary-color)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
));
TrustLoopAnim.displayName = 'TrustLoopAnim';

// 7. Google API Disclosure & Drive Setup — Private Encrypted Journal <-> Drive Bridge
export const DriveSyncAnim = React.memo(() => (
  <div className="inline-flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
    <svg width="136" height="44" viewBox="0 0 136 44" fill="none">
      {/* Journal node */}
      <rect x="6" y="10" width="24" height="24" rx="7" fill="var(--primary-color)" fillOpacity="0.12" stroke="var(--primary-color)" strokeWidth="1.5" />
      <path d="M13 17 H23 M13 22 H21 M13 27 H19" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Dashed bridge */}
      <line x1="34" y1="22" x2="102" y2="22" stroke="var(--border-color)" strokeWidth="1.6" strokeDasharray="4 4" />

      {/* Gliding encrypted packet dots */}
      <circle cx="34" cy="22" r="3.2" fill="var(--accent-color)" className="anim-sync-packet" />
      <circle cx="34" cy="22" r="2.4" fill="var(--rose-color)" className="anim-sync-packet" style={{ animationDelay: '1.3s' }} />

      {/* Drive Cloud node */}
      <rect x="106" y="10" width="24" height="24" rx="7" fill="var(--accent-color)" fillOpacity="0.14" stroke="var(--accent-color)" strokeWidth="1.5" />
      <path d="M113 26 H123 A3 3 0 0 0 123.5 20.2 A4.5 4.5 0 0 0 115 19.5 A3.2 3.2 0 0 0 113 26 Z" stroke="var(--accent-color)" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  </div>
));
DriveSyncAnim.displayName = 'DriveSyncAnim';

// 8. 404 Not Found Page — Drifting Lost Journal Page & Swaying Compass
export const LostCompassAnim = React.memo(() => (
  <div className="inline-flex items-center justify-center mb-3 select-none pointer-events-none" aria-hidden="true">
    <svg width="78" height="64" viewBox="0 0 78 64" fill="none">
      <g className="anim-page-drift">
        <rect x="14" y="10" width="32" height="40" rx="4" fill="#fffdf9" stroke="var(--border-color)" strokeWidth="1.5" />
        <line x1="21" y1="20" x2="39" y2="20" stroke="var(--accent-color)" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="21" y1="27" x2="35" y2="27" stroke="var(--accent-color)" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="21" y1="34" x2="37" y2="34" stroke="var(--accent-color)" strokeOpacity="0.25" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      {/* Mini Compass */}
      <circle cx="54" cy="40" r="14" fill="var(--bg-color)" stroke="var(--primary-color)" strokeWidth="1.6" />
      <g className="anim-compass-sway" style={{ transformOrigin: '54px 40px' }}>
        <polygon points="54,30 57,40 54,42 51,40" fill="var(--rose-color)" />
        <polygon points="54,50 57,40 54,38 51,40" fill="var(--primary-color)" fillOpacity="0.5" />
      </g>
      <circle cx="54" cy="40" r="1.8" fill="#fffdf9" stroke="var(--primary-color)" strokeWidth="1" />
    </svg>
  </div>
));
LostCompassAnim.displayName = 'LostCompassAnim';

// 9. Memory Wall — Zero-Canvas Pure CSS Warm Sunlight Dust Motes (replaces Canvas rAF loop!)
const MOTE_SPOTS = [
  { top: '14%', left: '12%', size: 8,  delay: '0s',   dur: '6.5s' },
  { top: '28%', left: '78%', size: 10, delay: '1.4s', dur: '8s' },
  { top: '46%', left: '34%', size: 7,  delay: '2.8s', dur: '7.2s' },
  { top: '62%', left: '84%', size: 9,  delay: '0.8s', dur: '7.8s' },
  { top: '74%', left: '20%', size: 11, delay: '3.2s', dur: '8.5s' },
  { top: '20%', left: '54%', size: 6,  delay: '2.1s', dur: '6.8s' },
  { top: '82%', left: '58%', size: 8,  delay: '1.1s', dur: '7.5s' },
];

export const WarmDustMotes = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 rounded-3xl" aria-hidden="true">
    {MOTE_SPOTS.map((m, i) => (
      <span
        key={i}
        className="absolute rounded-full anim-dust-mote"
        style={{
          top: m.top,
          left: m.left,
          width: `${m.size}px`,
          height: `${m.size}px`,
          background: 'radial-gradient(circle, rgba(254,240,138,0.85) 0%, rgba(251,191,36,0.25) 55%, transparent 100%)',
          animationDelay: m.delay,
          animationDuration: m.dur,
        }}
      />
    ))}
  </div>
));
WarmDustMotes.displayName = 'WarmDustMotes';
