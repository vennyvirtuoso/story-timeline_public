import React, { useState, useEffect } from 'react';
import { BookOpen, Loader2, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingElements from './FloatingElements';
import { getTheme } from '../utils/themes';

const LoginScreen = ({ onGoogleLogin, onShareTokenLogin, isLoading }) => {
  const [token, setToken] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [err, setErr] = useState('');
  const defaultTheme = getTheme('love');

  const submit = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    setErr('');
    const r = await onShareTokenLogin(token.trim().toUpperCase());
    if (!r.success) setErr(r.error || 'Invalid code');
  };

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get('token');
    if (t) {
      setToken(t.toUpperCase());
      setShowInput(true);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center p-5 relative overflow-hidden">

      <FloatingElements theme={defaultTheme} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center justify-center flex-grow">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200">
            <BookOpen fill="white" size={28} className="text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 
              drop-shadow-[0_2px_10px_rgba(255,105,135,0.35)]
              mb-2">
            Safarnama
          </h1>

          <p className="text-gray-400 text-sm">Your memories, your story</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6 space-y-3 w-full">

          <button
            onClick={onGoogleLogin}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Sign in with Google
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-[11px] text-gray-400 font-medium">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-rose-200 rounded-xl text-rose-400 hover:bg-rose-50 text-sm transition-colors"
            >
              <Key size={14} /> I have a share code
            </button>
          ) : (
            <form onSubmit={submit} className="space-y-2">
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="e.g. ABC123"
                maxLength={8}
                className="w-full px-4 py-3 border border-rose-200 rounded-xl text-center text-xl font-black tracking-widest uppercase focus:ring-2 focus:ring-rose-200 outline-none bg-white text-rose-500 placeholder-rose-200"
              />

              {err && <p className="text-red-500 text-xs text-center">{err}</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setShowInput(false); setErr(''); }}
                  className="flex-1 py-2 border border-gray-200 rounded-xl text-gray-400 text-sm hover:bg-gray-50"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  {isLoading && <Loader2 size={14} className="animate-spin" />} Enter
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 px-4">
          Sign in to create your timeline or enter a share code
        </p>

        <p className="text-center text-[11px] text-gray-300 mt-2 px-4">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="hover:text-rose-400 underline">Terms</Link>
          {' & '}
          <Link to="/privacy" className="hover:text-rose-400 underline">Privacy Policy</Link>
        </p>

      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4 text-xs text-gray-400 w-full max-w-xs justify-center flex-wrap">
        <Link to="/about" className="hover:text-rose-400">About</Link>
        <Link to="/pricing" className="hover:text-rose-400">Pricing</Link>
      </div>

    </div>
  );
};

export default LoginScreen;