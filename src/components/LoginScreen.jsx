import React, { useState, useEffect } from 'react';
import { BookOpen, Loader2, Ticket, Sparkles, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingElements from './FloatingElements';
import WelcomeModal from './WelcomeModal';
import { getTheme } from '../utils/themes';

const LoginScreen = ({ onGoogleLogin, onShareTokenLogin, isLoading }) => {
  const [token, setToken] = useState('');
  const [showInput, setShowInput] = useState(false);
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
    const t = p.get('token');

    if (t) {
      setToken(t.toUpperCase());
      setShowInput(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col items-center p-5 relative overflow-hidden">
      <WelcomeModal />
      <FloatingElements theme={defaultTheme} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[350px] px-4 flex flex-col items-center justify-center flex-grow">
        
        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-theme-md ring-4 ring-white/50">
            <BookOpen fill="white" size={28} className="text-white" />
          </div>

          <h1 className="text-4.5xl sm:text-5xl font-heading font-medium text-primary tracking-normal mb-1">
            Safarnama
          </h1>
          <p className="font-cursive text-2xl text-accent font-bold mt-1">Your memories, your story</p>
        </div>

        <div className="bg-white rounded-3xl shadow-theme-lg border border-border-theme p-7 space-y-5 w-full">
          
          {!showInput ? (
            <>
              {/* Owner Action: Google Login */}
              <button
                type="button"
                onClick={onGoogleLogin}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-border-theme text-dark/80 hover:bg-cream-dark/30 shadow-theme-sm rounded-xl text-xs font-sub font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-border-theme opacity-50" />
                <span className="text-[9px] font-sub uppercase tracking-[0.2em] text-dark/30 font-bold">Visiting?</span>
                <div className="flex-1 h-px bg-border-theme opacity-50" />
              </div>

              {/* The Viewer Pass Button */}
              <button
                type="button"
                onClick={() => setShowInput(true)}
                className="w-full flex items-center justify-between py-4 px-5 
                           bg-cream border border-dashed border-accent/40 rounded-xl 
                           text-accent hover:bg-cream-dark hover:border-accent transition-all duration-150 group"
              >
                <div className="flex items-center gap-3">
                  <Ticket size={20} className="text-accent group-hover:rotate-12 transition-transform" />
                  <div className="text-left font-sub">
                    <p className="text-xs font-bold uppercase tracking-wider">View a Timeline</p>
                    <p className="text-[9px] text-accent/80 font-medium uppercase tracking-wide mt-0.5">Enter access pass</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-accent/60 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            /* The "Viewer" Form */
            <form onSubmit={submit} className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-1 font-sub">
                <h3 className="text-accent font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <Sparkles size={14} className="text-accent" /> Unlock Private Gallery
                </h3>
                <p className="text-dark/50 text-[10px] uppercase tracking-wide">You've been invited to view a story.</p>
              </div>

              <div className="relative">
                <input
                  autoFocus
                  value={token}
                  onChange={(e) =>
                    setToken(
                      e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
                    )
                  }
                  placeholder="TOKEN"
                  maxLength={8}
                  className="w-full px-4 py-4 border border-border-theme rounded-xl 
                             text-center text-xl font-semibold tracking-[0.3em] uppercase 
                             focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none 
                             bg-cream text-dark placeholder-dark/20 transition-all font-sans"
                />
              </div>

              {err && (
                <p className="text-red-500 text-xs text-center font-medium">{err}</p>
              )}

              <div className="flex flex-col gap-2.5">
                <button
                  type="submit"
                  disabled={isLoading || !token}
                  className="w-full py-3.5 bg-primary text-cream rounded-xl text-xs font-sub font-bold uppercase tracking-wider hover:bg-primary-hover shadow-theme-sm transition-all duration-150 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Open Timeline"
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowInput(false);
                    setErr('');
                  }}
                  className="flex items-center justify-center gap-1 py-2 text-dark/40 text-[11px] font-sub uppercase tracking-wider hover:text-primary transition-colors"
                >
                  <ArrowLeft size={12} /> Sign in as owner
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Supporting Text */}
        <p className="text-center text-[10px] font-sub uppercase tracking-wider text-dark/40 mt-6 px-6 leading-relaxed">
          Safarnama is a private space for your most cherished memories. 
          <br />Secure. Private. Forever.
        </p>

        {/* Legal links */}
        <p className="text-center text-[9px] font-sub uppercase tracking-wider text-dark/30 mt-4">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="hover:text-rose-safarnama underline decoration-border-theme">
            Terms
          </Link>{' '}
          &{' '}
          <Link to="/privacy" className="hover:text-rose-safarnama underline decoration-border-theme">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;