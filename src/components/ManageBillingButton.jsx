import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8069';

const ManageBillingButton = ({ user, className = '' }) => {
  const [loading, setLoading] = useState(false);

  const handleManage = async () => {
    if (!user?.email) return;
    setLoading(true);
    // ✅ Redirect to Dodo billing portal — user can cancel/update from there
    window.location.href = `${BACKEND_URL}/billing/portal?email=${encodeURIComponent(user.email)}`;
  };

  return (
    <button
      onClick={handleManage}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-rose-500 transition-colors disabled:opacity-50 ${className}`}
    >
      {loading ? <Loader2 size={12} className="animate-spin"/> : <CreditCard size={12}/>}
      Manage subscription
    </button>
  );
};

export default ManageBillingButton;