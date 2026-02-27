import React, { useState } from 'react';
import { Loader2, Key, LogOut } from 'lucide-react';
import { Modal } from './ui';

const JoinTimelineModal = ({ isOpen, onJoin, onSkip, isLoading, user, skipLabel }) => {
  const [token, setToken] = useState('');
  const [err, setErr]     = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    setErr('');
    const cleanToken = token.trim().toUpperCase();
    console.log('Joining with token:', cleanToken); // ✅ debug
    const r = await onJoin(cleanToken);
    console.log('Join result:', r); // ✅ debug
    if (!r?.success) {
      setErr(r?.error || 'Invalid code');
    }
  };

  return (
    // Not using Modal component — this is a full-screen gate, not dismissible
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-xs">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-200">
            <Key size={24} className="text-white"/>
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-1">Join a Timeline</h2>
          <p className="text-gray-400 text-sm">
            Hi <span className="font-semibold text-gray-600">{user?.displayName?.split(' ')[0] || 'there'}</span>! Enter an invite code to join someone's timeline, or skip to create your own.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6 space-y-4">
          <form onSubmit={submit} className="space-y-3">
            <input
              value={token}
              onChange={e => setToken(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={8}
              autoFocus
              className="w-full px-4 py-4 border border-rose-200 rounded-2xl text-center text-2xl font-black tracking-[0.3em] uppercase focus:ring-2 focus:ring-rose-300 outline-none bg-white text-rose-500 placeholder-rose-200"
            />
            {err && (
              <p className={`text-xs text-center px-2 py-1.5 rounded-lg ${
                err.includes('already') ? 'text-amber-700 bg-amber-50' :
                err.includes('limit')   ? 'text-orange-700 bg-orange-50' :
                'text-red-500 bg-red-50'
              }`}>{err}</p>
            )}
            <button type="submit" disabled={isLoading || !token.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50">
              {isLoading ? <Loader2 size={16} className="animate-spin"/> : <Key size={16}/>}
              {isLoading ? 'Joining...' : 'Join Timeline'}
            </button>
          </form>

          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-200"/>
            <span className="text-[11px] text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-200"/>
          </div>

          <button onClick={onSkip}
            className="w-full py-2.5 border border-gray-200 rounded-xl text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
            {skipLabel || 'Create my own timeline →'}
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          Signed in as {user?.email}
        </p>
      </div>
    </div>
  );
};

export default JoinTimelineModal;