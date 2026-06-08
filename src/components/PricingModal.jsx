import React, { useState } from 'react';
import { Loader2, Check, Zap, Crown } from 'lucide-react';
import { Modal } from './ui';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8069';

const FEATURES_FREE = ['2 memories', '2 collaborators', 'All themes', 'Google Drive upload'];
const FEATURES_PRO = ['Unlimited memories', 'Unlimited collaborators', 'All themes', 'Google Drive upload', 'Priority support'];

const PricingModal = ({ isOpen, onClose, user, theme, onSuccess }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  const t = theme || {};
  const btnPrimary = t.btnPrimary || 'from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-200';
  const accentText = t.accentText || 'text-rose-500';
  const accentBg = t.accentBg || 'bg-rose-100';
  const accentBorder = t.accentBorder || 'border-rose-200';
  const badge = t.badge || 'bg-rose-100 text-rose-500';

  const handleSubscribe = async (plan) => {
    if (!user) return;
    setLoading(plan); setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          email: user.email || '',
          name: user.displayName || '',
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
  }; return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Pro ✨" theme={theme}>
      <div className="space-y-4">
        {error && <p className="text-red-500 text-xs bg-red-50 p-2.5 rounded-xl border border-red-100">{error}</p>}

        {/* Free tier */}
        <div className="border border-border-theme rounded-2xl p-4.5 bg-white shadow-theme-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-sub font-bold text-dark/50 text-[10px] uppercase tracking-widest mb-1">Free</p>
              <p className="text-2.5xl font-heading font-semibold text-primary leading-none">₹0</p>
            </div>
            <span className="text-[9px] font-sub font-bold uppercase tracking-wider bg-cream border border-border-theme text-dark/50 px-2.5 py-1 rounded-full">Current Plan</span>
          </div>
          <ul className="space-y-1.5">
            {FEATURES_FREE.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-dark/70 font-sans">
                <Check size={12} className="text-accent shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro tier */}
        <div className="border-2 border-primary rounded-2xl p-5 relative bg-white shadow-theme-md">
          <div className="absolute -top-3 left-4 bg-primary text-cream px-2.5 py-0.5 rounded-full text-[9px] font-sub font-bold uppercase tracking-widest flex items-center gap-1 shadow-theme-sm">
            <Crown size={10} fill="currentColor" /> PRO
          </div>

          <div className="flex items-stretch gap-2.5 mb-4 mt-2">
            {/* Monthly */}
            <div className="flex-1 text-center bg-cream/40 rounded-xl p-4 border border-border-theme flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-sub font-bold text-dark/40 uppercase tracking-widest mb-1.5">Monthly</p>
                <p className="text-2.5xl font-heading font-bold text-primary leading-none">₹199</p>
                <p className="text-[9px] font-sub uppercase tracking-wider text-dark/40 mt-1 mb-3.5">per month</p>
              </div>
              <button onClick={() => handleSubscribe('monthly')} disabled={!!loading}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary hover:bg-primary-hover text-cream rounded-xl text-[10px] font-sub font-bold uppercase tracking-wider shadow-theme-sm transition-all duration-150 active:scale-95 disabled:opacity-50">
                {loading === 'monthly' ? <><Loader2 size={12} className="animate-spin" />Redirecting...</> : <><Zap size={12} />Subscribe</>}
              </button>
            </div>

            {/* Yearly */}
            <div className="flex-1 text-center bg-cream border border-accent/40 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-sub font-bold text-dark/40 uppercase tracking-widest mb-1.5">Yearly</p>
                <p className="text-2.5xl font-heading font-bold text-accent leading-none">₹1499</p>
                <p className="text-[9px] font-sub uppercase tracking-widest text-green-700 font-bold mt-1 mb-3.5">Save 37%</p>
              </div>
              <button onClick={() => handleSubscribe('yearly')} disabled={!!loading}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary hover:bg-primary-hover text-cream rounded-xl text-[10px] font-sub font-bold uppercase tracking-wider shadow-theme-sm transition-all duration-150 active:scale-95 disabled:opacity-50">
                {loading === 'yearly' ? <><Loader2 size={12} className="animate-spin" />Redirecting...</> : <><Zap size={12} />Subscribe</>}
              </button>
            </div>
          </div>

          <ul className="space-y-1.5 mb-4">
            {FEATURES_PRO.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-dark/70 font-sans">
                <Check size={12} className="text-primary shrink-0" />{f}
              </li>
            ))}
          </ul>

          <p className="text-center text-[10px] font-sub font-bold uppercase tracking-wider text-dark/40 mt-3 pt-3 border-t border-border-theme/60">
            Payments governed by our{' '}
            <Link to="/refund" className="underline hover:text-rose-safarnama transition-colors">Refund Policy</Link>
          </p>
        </div>
        <p className="text-[9px] font-sub font-bold uppercase tracking-widest text-dark/30 text-center">Secured by Dodo Payments · Cancel anytime</p>
      </div>
    </Modal>
  );
};

export default PricingModal;