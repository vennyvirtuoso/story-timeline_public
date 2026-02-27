import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8069';

export function usePlan(ownerId, isSharedAccess) {
  const [plan, setPlan]             = useState('free');
  const [planExpiry, setPlanExpiry] = useState(null);
  const [planType, setPlanType]     = useState(null);
  const [limits, setLimits]         = useState({
    memories:      { canAdd: true, count: 0, limit: 2 },
    collaborators: { canAdd: true, count: 0, limit: 2 },
  });
  const [planLoading, setPlanLoading] = useState(true);

  // Real-time plan listener from Firestore
  useEffect(() => {
    if (!ownerId || isSharedAccess) { setPlanLoading(false); return; }
    const unsub = onSnapshot(doc(db, 'users', ownerId), snap => {
      if (snap.exists()) {
        const d = snap.data();
        setPlan(d.plan || 'free');
        setPlanExpiry(d.planExpiry || null);
        setPlanType(d.planType || null);
      }
      setPlanLoading(false);
    });
    return () => unsub();
  }, [ownerId]);

  const refreshLimits = async () => {
    if (!ownerId) return;
    try {
      const res  = await fetch(`${BACKEND_URL}/api/check-limits?userId=${ownerId}`);
      const data = await res.json();
      if (data.success) setLimits(data);
    } catch (e) {
      console.error('limits fetch error', e);
    }
  };

  useEffect(() => {
    if (ownerId && !isSharedAccess) refreshLimits();
  }, [ownerId, plan]);

  const isPro = plan === 'pro';
  return { plan, isPro, planExpiry, planType, limits, planLoading, refreshLimits };
}