import React, { useState } from 'react';
import { Loader2, Check, Zap, Crown } from 'lucide-react';
import { Modal } from './ui';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8069';

const FEATURES_FREE = ['2 memories', '2 collaborators', 'All themes', 'Google Drive upload'];
const FEATURES_PRO  = ['Unlimited memories', 'Unlimited collaborators', 'All themes', 'Google Drive upload', 'Priority support'];

const PricingModal = ({ isOpen, onClose, user, theme, onSuccess }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError]     = useState('');

  const t            = theme || {};
  const btnPrimary   = t.btnPrimary   || 'from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-200';
  const accentText   = t.accentText   || 'text-rose-500';
  const accentBg     = t.accentBg     || 'bg-rose-100';
  const accentBorder = t.accentBorder || 'border-rose-200';
  const badge        = t.badge        || 'bg-rose-100 text-rose-500';

  const handleSubscribe = async (plan) => {
    if (!user) return;
    setLoading(plan); setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/checkout`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          email:  user.email  || '',
          name:   user.displayName || '',
          userId: user.uid,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      // ✅ Redirect to Dodo hosted checkout
      window.location.href = data.checkout_url;
    } catch (e) {
      setError(e.message);
      setLoading(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Pro ✨" theme={theme}>
      <div className="space-y-4">
        {error && <p className="text-red-500 text-xs bg-red-50 p-2.5 rounded-xl border border-red-100">{error}</p>}

        {/* Free tier */}
        <div className="border border-gray-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-gray-700 text-sm">Free</p>
              <p className="text-2xl font-black text-gray-800">₹0</p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-semibold">Current Plan</span>
          </div>
          <ul className="space-y-1.5">
            {FEATURES_FREE.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                <Check size={12} className="text-gray-400 shrink-0"/>{f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro tier */}
        <div className={`border-2 ${accentBorder} rounded-2xl p-4 relative`}>
          <div className={`absolute -top-3 left-4 ${badge} px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1`}>
            <Crown size={10}/> PRO
          </div>
          <div className="flex items-start gap-2 mb-4 mt-1">
            {/* Monthly */}
            <div className="flex-1 text-center bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Monthly</p>
              <p className={`text-2xl font-black ${accentText}`}>₹199</p>
              <p className="text-[10px] text-gray-400 mb-3">per month</p>
              <button onClick={() => handleSubscribe('monthly')} disabled={!!loading}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r ${btnPrimary} text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50`}>
                {loading === 'monthly' ? <><Loader2 size={12} className="animate-spin"/>Redirecting...</> : <><Zap size={12}/>Subscribe</>}
              </button>
            </div>
            {/* Yearly */}
            <div className={`flex-1 text-center ${accentBg} rounded-xl p-3 border ${accentBorder}`}>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Yearly</p>
              <p className={`text-2xl font-black ${accentText}`}>₹1499</p>
              <p className="text-[10px] text-green-500 font-bold mb-3">Save 37%</p>
              <button onClick={() => handleSubscribe('yearly')} disabled={!!loading}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r ${btnPrimary} text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50`}>
                {loading === 'yearly' ? <><Loader2 size={12} className="animate-spin"/>Redirecting...</> : <><Zap size={12}/>Subscribe</>}
              </button>
            </div>
          </div>
          <ul className="space-y-1.5">
            {FEATURES_PRO.map(f => (
              <li key={f} className={`flex items-center gap-2 text-xs ${accentText} font-medium`}>
                <Check size={12} className="shrink-0"/>{f}
              </li>
            ))}
          </ul>
          <p className="text-center text-[11px] text-gray-400 mt-3">
            Payments governed by our{' '}
            <Link to="/refund" className="underline hover:text-rose-400 transition-colors">Refund Policy</Link>
          </p>
        </div>
        <p className="text-[10px] text-gray-400 text-center">Secured by Dodo Payments · Subscription · Cancel anytime</p>
      </div>
    </Modal>
  );
};

export default PricingModal;