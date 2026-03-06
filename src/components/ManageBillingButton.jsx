import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8069';

// ✅ Accept customerId directly — stored in Firestore after first payment
const ManageBillingButton = ({ user, customerId, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleManage = () => {
    if (!user?.email) return;
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ email: user.email });
    if (customerId) params.set('customerId', customerId);
    window.location.href = `${BACKEND_URL}/billing/portal?${params.toString()}`;
  };

  return (
    <div>
      <button
        onClick={handleManage}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-rose-500 transition-colors disabled:opacity-50 ${className}`}
      >
        {loading ? <Loader2 size={12} className="animate-spin"/> : <CreditCard size={12}/>}
        Manage subscription
      </button>
      {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
    </div>
  );
};

export default ManageBillingButton;