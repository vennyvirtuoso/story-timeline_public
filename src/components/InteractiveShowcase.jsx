import React, { useState } from 'react';
import {
  RotateCw, Heart, Sparkles, Users, Shield,
  BookOpen, ArrowUpRight, Pin, Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DEMO_THEMES = [
  { id: 'love',       name: 'Classic',  dot: '#244f43', accent: '#a97132', bg: '#fffdf9', text: '#1c1917', pill: 'bg-rose-50 text-rose-600' },
  { id: 'ocean',      name: 'Ocean',    dot: '#0f766e', accent: '#0369a1', bg: '#f4fcff', text: '#0f172a', pill: 'bg-sky-50 text-sky-700' },
  { id: 'forest',     name: 'Forest',   dot: '#166534', accent: '#854d0e', bg: '#f6fcf7', text: '#14281d', pill: 'bg-emerald-50 text-emerald-700' },
  { id: 'sunset',     name: 'Sunset',   dot: '#b45309', accent: '#c2410c', bg: '#fffaf2', text: '#2d1607', pill: 'bg-amber-50 text-amber-700' },
  { id: 'galaxy',     name: 'Galaxy',   dot: '#7c3aed', accent: '#f0abfc', bg: '#17122c', text: '#f4f1ff', pill: 'bg-purple-500/20 text-purple-200', dark: true },
  { id: 'monochrome', name: 'Minimal',  dot: '#18181b', accent: '#52525b', bg: '#ffffff', text: '#09090b', pill: 'bg-zinc-100 text-zinc-700' },
];

const BENTO_FEATURES = [
  {
    icon: Pin,
    title: 'Journal & Memory Wall',
    desc: 'Switch effortlessly between lined heirloom journal pages and a warm sunlit corkboard pinned with polaroids.',
    accent: 'text-amber-700 bg-amber-50 border-amber-200/60',
  },
  {
    icon: Sparkles,
    title: 'Shared Dream Jar',
    desc: 'Drop folded wish notes for future trips, midnight drives, and bucket-list milestones right inside your story.',
    accent: 'text-rose-600 bg-rose-50 border-rose-200/60',
  },
  {
    icon: Users,
    title: 'Co-Author With Loved Ones',
    desc: 'Invite your partner, friends, or family with a private link so everyone can add photos and notes together.',
    accent: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
  },
  {
    icon: Cloud,
    title: 'Stored In Your Google Drive',
    desc: 'Your photos and videos live safely inside your own Google Drive folder — private, ad-free, and yours forever.',
    accent: 'text-sky-700 bg-sky-50 border-sky-200/60',
  },
];

const InteractiveShowcase = ({ onStartClick }) => {
  const [flipped, setFlipped] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const activeTheme = DEMO_THEMES[themeIdx];

  return (
    <section
      id="explore-safarnama"
      aria-label="Explore Safarnama interactive preview"
      className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20 space-y-16"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-[0.22em] text-accent">
          <Sparkles size={12} /> Try It Right Here
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary leading-tight">
          Designed to feel like a real keepsake
        </h2>
        <p className="text-sm text-dark/60 font-sans leading-relaxed">
          Tap the polaroid to flip it over, or switch themes below to feel how your timeline transforms.
        </p>
      </div>

      {/* Interactive Playground: Live 3D Flip Card + Theme Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive 3D Flip Polaroid */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="card-perspective w-full max-w-sm">
            <div
              className={`card-flipper ${flipped ? 'flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label="Interactive sample memory card. Press to flip between photo and handwritten note."
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
              }}
            >
              {/* Front: Polaroid */}
              <div className="card-front">
                <div
                  className="polaroid-card p-4 pb-6 rounded-sm relative cursor-pointer select-none"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  {/* Washi tape */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-gradient-to-r from-rose-200/75 via-pink-100/75 to-rose-200/75 border-x border-dashed border-rose-300/40 -rotate-1"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[9px] font-sub font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${activeTheme.pill}`}>
                      ✈️ Trip Memory
                    </span>
                    <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-stone-400">
                      Nov 14, 2025
                    </span>
                  </div>

                  {/* Illustrated scenic dusk card */}
                  <div
                    className="h-48 rounded-xl flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500"
                    style={{
                      background: activeTheme.dark
                        ? 'linear-gradient(135deg, #2e1d54 0%, #1c1238 60%, #4c1d95 100%)'
                        : `linear-gradient(135deg, ${activeTheme.dot}22 0%, ${activeTheme.accent}28 55%, #fde2d2 100%)`,
                    }}
                  >
                    <svg viewBox="0 0 220 120" className="w-44 h-24 opacity-85" aria-hidden="true">
                      <circle cx="155" cy="34" r="18" fill={activeTheme.accent} fillOpacity="0.45" />
                      <path d="M10 105 L68 48 L112 88 L152 54 L210 105 Z" fill={activeTheme.dot} fillOpacity="0.4" />
                      <path d="M40 105 L100 62 L160 105 Z" fill={activeTheme.dot} fillOpacity="0.65" />
                    </svg>
                    <Heart
                      size={18}
                      className="text-rose-safarnama fill-rose-safarnama/80 absolute top-3.5 right-3.5 animate-pulse"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <p className="font-cursive text-4xl leading-none font-bold" style={{ color: activeTheme.accent }}>
                      First Rain in Udaipur
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-[0.16em] text-stone-400">
                      <RotateCw size={11} /> Tap to flip &amp; read note
                    </span>
                  </div>
                </div>
              </div>

              {/* Back: Handwritten Letter */}
              <div className="card-back">
                <div
                  className="p-6 rounded-2xl border h-full min-h-[340px] flex flex-col justify-between cursor-pointer shadow-theme-lg transition-colors duration-500"
                  style={{
                    backgroundColor: activeTheme.bg,
                    color: activeTheme.text,
                    borderColor: `${activeTheme.dot}35`,
                    transform: 'rotate(-1deg)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-sub font-bold uppercase tracking-widest opacity-60">
                        Nov 14, 2025 · 7:42 PM
                      </span>
                      <Heart size={14} className="text-rose-safarnama fill-rose-safarnama" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold mb-3" style={{ color: activeTheme.dark ? '#c4b5fd' : activeTheme.dot }}>
                      First Rain in Udaipur
                    </h3>
                    <p className="text-sm leading-relaxed opacity-80 font-sans">
                      We ran under the old stone archway with two cups of cutting chai while Lake Pichola turned gold in the rain. Still my favorite evening of the whole year.
                    </p>
                  </div>
                  <div className="text-center pt-4 border-t border-current/10">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-[0.16em] opacity-60">
                      <RotateCw size={11} /> Tap to flip back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Theme Mood Switcher */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-surface/90 backdrop-blur-xl border border-border-theme rounded-[28px] p-6 sm:p-8 shadow-theme-md space-y-5">
            <div>
              <span className="text-[10px] font-sub font-bold uppercase tracking-[0.18em] text-accent">
                6 Handcrafted Moods
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mt-1">
                Match the mood of your story
              </h3>
              <p className="text-xs sm:text-sm text-dark/60 mt-1.5 leading-relaxed">
                Switch themes anytime — from warm cream &amp; antique gold to serene ocean mist or midnight galaxy velvet.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {DEMO_THEMES.map((t, idx) => {
                const isSelected = idx === themeIdx;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeIdx(idx)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-left transition-all duration-200 active:scale-[0.97] ${
                      isSelected
                        ? 'border-primary bg-white shadow-theme-sm ring-2 ring-primary/15'
                        : 'border-border-theme bg-cream/50 hover:bg-white/80'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-inner"
                      style={{ background: `linear-gradient(135deg, ${t.dot}, ${t.accent})` }}
                    />
                    <span className="text-[11px] font-sub font-bold text-dark/80 truncate">
                      {t.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/15 text-primary text-[11px] font-sub font-bold uppercase tracking-wider transition-colors"
              >
                <RotateCw size={12} /> {flipped ? 'Show Polaroid Front' : 'Flip Sample Card'}
              </button>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-[11px] font-sub font-bold uppercase tracking-wider text-dark/60 hover:text-primary transition-colors"
              >
                Read our story <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {BENTO_FEATURES.map((item) => (
          <div
            key={item.title}
            className="spring-card bg-white/80 backdrop-blur-md border border-border-theme rounded-3xl p-5 sm:p-6 shadow-theme-sm flex flex-col justify-between"
          >
            <div>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center mb-4 ${item.accent}`}>
                <item.icon size={18} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-dark/65 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Warm Closing Invitation Banner */}
      <div className="bg-primary text-cream rounded-[30px] p-7 sm:p-10 shadow-theme-lg relative overflow-hidden text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 rounded-full bg-amber-300/15 blur-3xl"
        />
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <span className="font-cursive text-3xl sm:text-4xl text-amber-200 block leading-none">
            Ready for Chapter One?
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl font-semibold leading-tight">
            Create your private Safarnama in seconds
          </h3>
          <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
            Start completely free with all 6 themes and Google Drive storage. Upgrade anytime when your story grows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-cream text-primary hover:bg-white rounded-2xl text-xs font-sub font-bold uppercase tracking-[0.14em] shadow-theme-md transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <BookOpen size={14} /> Start Free With Google
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-cream border border-white/20 rounded-2xl text-xs font-sub font-bold uppercase tracking-[0.14em] transition-all"
            >
              View Pricing <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="text-[10px] font-sub uppercase tracking-[0.16em] text-cream/55 pt-1 inline-flex items-center gap-1.5">
            <Shield size={11} /> No credit card required · Private by default
          </p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
