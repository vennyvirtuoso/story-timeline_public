import React, { useState } from 'react';
import { Loader2, Check, Zap, Crown } from 'lucide-react';
import { Modal } from './ui';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8069';

const FEATURES_FREE = ['2 timelines', '2 collaborators', 'All themes', 'Google Drive upload'];
const FEATURES_PRO  = ['Unlimited timelines', 'Unlimited collaborators', 'All themes', 'Google Drive upload', 'Priority support'];

const loadRazorpay = () => new Promise((resolve, reject) => {
  if (window.Razorpay) return resolve();
  const s   = document.createElement('script');
  s.src     = 'https://checkout.razorpay.com/v1/checkout.js';
  s.onload  = resolve;
  s.onerror = reject;
  document.head.appendChild(s);
});

const PricingModal = ({ isOpen, onClose, user, theme, onSuccess }) => {
  const [loading, setLoading] = useState(null); // 'monthly' | 'yearly' | null
  const [error, setError]     = useState('');

  const t            = theme || {};
  const btnPrimary   = t.btnPrimary   || 'from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-200';
  const accentText   = t.accentText   || 'text-rose-500';
  const accentBg     = t.accentBg     || 'bg-rose-100';
  const accentBorder = t.accentBorder || 'border-rose-200';
  const badge        = t.badge        || 'bg-rose-100 text-rose-500';

  const handleSubscribe = async (planType) => {
    if (!user) return;
    setLoading(planType);
    setError('');
    try {
      // 1. Create order on backend
      const res = await fetch(`${BACKEND_URL}/api/razorpay/create-order`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:    user.uid,
          planType,
          userEmail: user.email        || '',
          userName:  user.displayName  || '',
        }),
      });
      const order = await res.json();
      if (!order.success) throw new Error(order.error);

      // 2. Load Razorpay script
      await loadRazorpay();

      // 3. Open Razorpay Standard Checkout
      const rzp = new window.Razorpay({
        key:         order.keyId,
        amount:      order.amount,
        currency:    'INR',
        name:        'My Timeline',
        description: order.planLabel,
        order_id:    order.orderId,
        prefill: {
          name:  order.userName,
          email: order.userEmail,
        },
        notes: {
          userId:   user.uid,
          planType: planType,
        },
        theme: { color: '#f43f5e' },

        // ✅ Show UPI first, then cards, then netbanking, then wallets
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI',
                instruments: [
                  { method: 'upi', flows: ['qr'] },           // QR code
                  { method: 'upi', flows: ['intent'],
                    apps: ['google_pay', 'phonepe', 'paytm'] }, // GPay, PhonePe, Paytm
                  { method: 'upi', flows: ['collect'] },        // Enter UPI ID
                ],
              },
              cards: {
                name: 'Cards',
                instruments: [
                  { method: 'card' },
                ],
              },
              netbanking: {
                name: 'Net Banking',
                instruments: [
                  { method: 'netbanking' },
                ],
              },
              other: {
                name: 'Other Methods',
                instruments: [
                  { method: 'wallet' },
                  { method: 'emi' },
                ],
              },
            },
            sequence: ['block.upi', 'block.cards', 'block.netbanking', 'block.other'],
            preferences: {
              show_default_blocks: false, // hide default layout, use ours above
            },
          },
        },

        modal: { ondismiss: () => setLoading(null) },
        handler: async (response) => {
          try {
            // 5. Verify signature on backend + upgrade plan in Firestore
            const vRes = await fetch(`${BACKEND_URL}/api/razorpay/verify-payment`, {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_signature:  response.razorpay_signature,
                userId:              user.uid,
              }),
            });
            const vData = await vRes.json();
            if (!vData.success) throw new Error(vData.error);
            onSuccess?.(vData);
            onClose();
          } catch (e) {
            setError('Payment verification failed: ' + e.message);
            setLoading(null);
          }
        },
      });
      rzp.open();
    } catch (e) {
      setError(e.message);
      setLoading(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Pro ✨" theme={theme}>
      <div className="space-y-4">
        {error && (
          <p className="text-red-500 text-xs bg-red-50 p-2.5 rounded-xl border border-red-100">{error}</p>
        )}

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
              <p className={`text-2xl font-black ${accentText}`}>₹99</p>
              <p className="text-[10px] text-gray-400 mb-3">per month</p>
              <button
                onClick={() => handleSubscribe('monthly')}
                disabled={!!loading}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r ${btnPrimary} text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50`}>
                {loading === 'monthly'
                  ? <><Loader2 size={12} className="animate-spin"/>Opening...</>
                  : <><Zap size={12}/>Subscribe</>}
              </button>
            </div>

            {/* Yearly */}
            <div className={`flex-1 text-center ${accentBg} rounded-xl p-3 border ${accentBorder}`}>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Yearly</p>
              <p className={`text-2xl font-black ${accentText}`}>₹799</p>  {/* ← match backend 79900 paise */}
              <p className="text-[10px] text-green-500 font-bold mb-3">Save 33%</p>  {/* ← updated savings */}
              <button
                onClick={() => handleSubscribe('yearly')}
                disabled={!!loading}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r ${btnPrimary} text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50`}>
                {loading === 'yearly'
                  ? <><Loader2 size={12} className="animate-spin"/>Opening...</>
                  : <><Zap size={12}/>Subscribe</>}
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
        </div>

        <p className="text-[10px] text-gray-400 text-center">
          Secured by Razorpay · One-time payment · No auto-renewal
        </p>
      </div>
    </Modal>
  );
};

export default PricingModal;
