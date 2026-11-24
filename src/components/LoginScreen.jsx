import React, { useState, useEffect } from 'react';
import {
  BookOpen, Loader2, Ticket, Sparkles, ArrowLeft,
  ChevronRight, Heart, Shield, Users, Camera, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingElements from './FloatingElements';
import WelcomeModal from './WelcomeModal';
import { getTheme } from '../utils/themes';

const LoginScreen = ({ onGoogleLogin, onShareTokenLogin, isLoading }) => {
  const [token, setToken] = useState(() => {
    const t = new URLSearchParams(window.location.search).get('token');
    return t ? t.toUpperCase() : '';
  });
  const [showInput, setShowInput] = useState(() => {
    return Boolean(new URLSearchParams(window.location.search).get('token'));
  });
  const [err, setErr] = useState('');
  const defaultTheme = getTheme('love');

  const submit = async (e) => {
    e.preventDefault();
    const code = token.trim().toUpperCase();
    if (!code) return;

    setErr('');
    const r = await onShareTokenLogin(code);

    if (!r?.success) {
      setErr(r?.error || 'Invalid access token');
    }
  };

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('token')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div
      className="min-h-dvh w-full relative overflow-x-hidden flex flex-col justify-between editorial-grain"
      style={{ background: 'var(--bg-gradient)' }}
    >
      <WelcomeModal />
      <FloatingElements theme={defaultTheme} />

      {/* Soft ambient sunlit orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-rose-300/20 blur-3xl animate-ambient-blob" />
        <div className="absolute -bottom-36 -right-24 w-[460px] h-[460px] rounded-full bg-amber-300/20 blur-3xl animate-ambient-blob" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full bg-emerald-800/10 blur-3xl animate-ambient-blob" style={{ animationDelay: '-13s' }} />
      </div>

      {/* Top minimal editorial navbar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-2 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-primary text-cream flex items-center justify-center shadow-theme-sm ring-2 ring-white/70 group-hover:scale-105 transition-transform">
            <BookOpen size={16} strokeWidth={2.2} />
          </div>
          <span className="font-heading text-2xl font-semibold text-primary tracking-tight">
            Safarnama
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6 text-[11px] font-sub font-bold uppercase tracking-[0.14em] text-dark/60">
          <Link to="/about" className="hover:text-primary transition-colors">Story</Link>
          <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </nav>
      </header>

      {/* Main Split Editorial Showcase + Sign-In Card */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Luxury Editorial Pitch & Visual Heirloom Preview */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-border-theme shadow-theme-sm text-[10px] font-sub font-bold uppercase tracking-[0.18em] text-accent">
              <Sparkles size={12} className="text-rose-safarnama" />
              Private Digital Heirloom Journal
            </div>

            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.75rem] font-medium text-primary leading-[1.06] tracking-tight">
                Turn your favorite moments into a{' '}
                <span className="italic text-accent font-normal">living story.</span>
              </h1>
              <p className="font-cursive text-3xl sm:text-4xl text-rose-safarnama/90 leading-none">
                Crafted to be kept, gifted, and relived forever
              </p>
              <p className="text-sm sm:text-base text-dark/65 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans pt-1">
                A calm, private sanctuary for couples, families, and friends. Preserve photos, handwritten notes, videos, and shared dreams in a tactile journal stored safely in your own Google Drive.
              </p>
            </div>

            {/* Tactile Polaroid & Story Preview Vignette (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center justify-center lg:justify-start gap-5 pt-3">
              {/* Tilted Polaroid Preview Card */}
              <div className="relative w-56 bg-white p-3 pb-5 rounded-sm shadow-theme-lg border border-black/5 -rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Washi tape */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-rose-200/80 via-pink-100/80 to-rose-200/80 border-x border-dashed border-rose-300/40 rotate-1" />
                <div className="h-28 rounded-sm bg-gradient-to-br from-[#f6e3d3] via-[#f2d0c2] to-[#e4bfa9] flex flex-col items-center justify-center relative overflow-hidden">
                  <Heart size={26} className="text-rose-safarnama/80 fill-rose-safarnama/20 mb-1" />
                  <span className="text-[9px] font-sub font-bold uppercase tracking-[0.2em] text-primary/70">First Sunset</span>
                </div>
                <p className="font-cursive text-2xl text-accent text-center mt-2 leading-none">
                  Goa, November &apos;25
                </p>
                <p className="text-[9px] font-sub uppercase tracking-widest text-dark/40 text-center mt-1">
                  Tap to flip &amp; read note
                </p>
              </div>

              {/* Companion Story Meta Card */}
              <div className="w-60 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-border-theme shadow-theme-md rotate-1 hover:rotate-0 transition-transform duration-500 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-sub font-bold uppercase tracking-[0.18em] text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Together Since
                  </span>
                  <Heart size={13} className="text-rose-safarnama fill-rose-safarnama" />
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {[['02', 'Yrs'], ['08', 'Mo'], ['14', 'Days']].map(([n, l]) => (
                    <div key={l} className="bg-cream/90 rounded-lg py-1.5 border border-border-theme">
                      <div className="font-heading text-lg font-semibold text-primary leading-none tabular-nums">{n}</div>
                      <div className="text-[8px] font-sub font-bold uppercase tracking-widest text-dark/45 mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-dark/65 pt-0.5">
                  <Users size={13} className="text-accent shrink-0" />
                  <span>Co-authored with your favorite people</span>
                </div>
              </div>
            </div>

            {/* Trust & Value Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 pt-2 text-[11px] font-sub font-medium text-dark/60">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={13} className="text-primary" /> Private by default
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Camera size={13} className="text-accent" /> Your own Google Drive
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield size={13} className="text-rose-safarnama" /> Zero ads or algorithms
              </span>
            </div>
          </div>

          {/* Right Column: Frosted Glass Auth & Viewer Pass Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[400px] bg-white/85 backdrop-blur-xl rounded-[28px] shadow-theme-lg border border-white/80 ring-1 ring-border-theme p-7 sm:p-8 relative overflow-hidden">
              {/* Subtle top gold-emerald accent ribbon */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-rose-safarnama" />

              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-primary rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 shadow-theme-md ring-4 ring-cream">
                  <BookOpen size={24} className="text-cream -rotate-3" />
                </div>
                <h2 className="font-heading text-3xl font-semibold text-primary leading-tight">
                  {showInput ? 'Open an Invitation' : 'Begin Your Story'}
                </h2>
                <p className="text-xs text-dark/55 font-sans mt-1">
                  {showInput
                    ? 'Enter your 8-character pass to view a shared timeline.'
                    : 'Sign in to create or continue your private timeline.'}
                </p>
              </div>

              {!showInput ? (
                <div className="space-y-4">
                  {/* Owner Action: Google Login */}
                  <button
                    type="button"
                    onClick={onGoogleLogin}
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-5 bg-primary text-cream hover:bg-primary-hover shadow-theme-md rounded-2xl text-xs font-sub font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </span>
                    )}
                    Continue with Google
                  </button>

                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-border-theme" />
                    <span className="text-[10px] font-sub uppercase tracking-[0.2em] text-dark/40 font-bold">
                      Have a pass?
                    </span>
                    <div className="flex-1 h-px bg-border-theme" />
                  </div>

                  {/* Viewer Pass Button */}
                  <button
                    type="button"
                    onClick={() => setShowInput(true)}
                    className="w-full flex items-center justify-between py-3.5 px-4 bg-cream/90 border border-dashed border-accent/50 rounded-2xl text-accent hover:bg-cream-dark/80 hover:border-accent transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Ticket size={18} className="text-accent group-hover:rotate-12 transition-transform" />
                      </div>
                      <div className="text-left font-sub">
                        <p className="text-xs font-bold uppercase tracking-wider text-dark/85">View a Timeline</p>
                        <p className="text-[10px] text-accent font-medium mt-0.5">No sign-in required</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-accent/70 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4 animate-modal-enter">
                  <div>
                    <label htmlFor="viewer-access-token" className="sr-only">
                      Access Token
                    </label>
                    <input
                      id="viewer-access-token"
                      autoFocus
                      value={token}
                      onChange={(e) =>
                        setToken(
                          e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
                        )
                      }
                      placeholder="ACCESS CODE"
                      maxLength={8}
                      className="w-full px-4 py-4 border border-border-theme rounded-2xl text-center text-xl font-semibold tracking-[0.28em] uppercase focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-cream/70 text-dark placeholder-dark/25 transition-all font-sans"
                    />
                  </div>

                  {err && (
                    <p role="alert" className="text-red-600 text-xs text-center font-medium bg-red-50 border border-red-100 rounded-xl py-2 px-3">
                      {err}
                    </p>
                  )}

                  <div className="flex flex-col gap-2.5">
                    <button
                      type="submit"
                      disabled={isLoading || !token}
                      className="w-full py-3.5 bg-primary text-cream rounded-2xl text-xs font-sub font-bold uppercase tracking-[0.14em] hover:bg-primary-hover shadow-theme-sm transition-all duration-150 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        'Open Timeline'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowInput(false);
                        setErr('');
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 text-dark/50 text-[11px] font-sub font-semibold uppercase tracking-wider hover:text-primary transition-colors"
                    >
                      <ArrowLeft size={12} /> Back to Google sign-in
                    </button>
                  </div>
                </form>
              )}

              <p className="text-center text-[10px] font-sans text-dark/45 mt-6 leading-relaxed">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-dark/70 hover:text-primary underline decoration-border-theme">
                  Terms
                </Link>{' '}
                &amp;{' '}
                <Link to="/privacy" className="text-dark/70 hover:text-primary underline decoration-border-theme">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Clean minimal footer */}
      <footer className="relative z-10 w-full text-center py-4 px-5 text-[10px] font-sub uppercase tracking-[0.16em] text-dark/45 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        <span>© 2026 Safarnama</span>
        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
        <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
        <Link to="/google-api" className="hover:text-primary transition-colors">Google API</Link>
      </footer>
    </div>
  );
};

export default LoginScreen;
