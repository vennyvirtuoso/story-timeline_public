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
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center p-5 relative overflow-hidden">
      <WelcomeModal />
      <FloatingElements theme={defaultTheme} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center justify-center flex-grow">
        
        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200 ring-4 ring-white/50">
            <BookOpen fill="white" size={28} className="text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 
              drop-shadow-[0_2px_10px_rgba(255,105,135,0.35)]
              mb-2">
            Safarnama
          </h1>
          <p className="text-gray-400 text-sm italic font-medium">Your memories, your story</p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-7 space-y-4 w-full">
          
          {!showInput ? (
            <>
              {/* Owner Action: Google Login */}
              <button
                type="button"
                onClick={onGoogleLogin}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm rounded-2xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
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
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-bold">Visiting?</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* The Viewer Pass Button */}
              <button
                type="button"
                onClick={() => setShowInput(true)}
                className="w-full flex items-center justify-between py-4 px-5 
                           bg-amber-50/40 border-2 border-dashed border-amber-200 rounded-2xl 
                           text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Ticket size={20} className="text-amber-500 group-hover:rotate-12 transition-transform" />
                  <div className="text-left">
                    <p className="text-sm font-bold">View a Timeline</p>
                    <p className="text-[10px] text-amber-600/70 font-medium">Enter your access pass</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            /* The "Viewer" Form */
            <form onSubmit={submit} className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-1">
                <h3 className="text-amber-600 font-bold text-sm flex items-center justify-center gap-2">
                  <Sparkles size={14} className="text-amber-400" /> Unlock Private Gallery
                </h3>
                <p className="text-gray-400 text-[11px]">You've been invited to view a story.</p>
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
                  className="w-full px-4 py-4 border-2 border-amber-100 rounded-2xl 
                             text-center text-2xl font-black tracking-[0.4em] uppercase 
                             focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none 
                             bg-white text-amber-700 placeholder-amber-100 transition-all shadow-inner"
                />
              </div>

              {err && (
                <p className="text-red-500 text-xs text-center font-medium">{err}</p>
              )}

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isLoading || !token}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 
                             text-white rounded-xl text-sm font-bold shadow-lg 
                             shadow-amber-100 hover:shadow-amber-200 active:scale-95 
                             transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
                  className="flex items-center justify-center gap-1 py-2 text-gray-400 text-xs hover:text-amber-600 transition-colors"
                >
                  <ArrowLeft size={12} /> Sign in as owner
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Supporting Text */}
        <p className="text-center text-[11px] text-gray-400 mt-6 px-6 leading-relaxed">
          Safarnama is a private space for your most cherished memories. 
          <br />Secure. Private. Forever.
        </p>

        {/* Legal links */}
        <p className="text-center text-[10px] text-gray-300 mt-4">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="hover:text-rose-400 underline decoration-rose-200">
            Terms
          </Link>{' '}
          &{' '}
          <Link to="/privacy" className="hover:text-rose-400 underline decoration-rose-200">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;