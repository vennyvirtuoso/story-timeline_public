import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getBackendUrl } from '../gis';

export function usePlan(ownerId, isSharedAccess) {
  const [plan, setPlan]             = useState('free');
  const [planExpiry, setPlanExpiry] = useState(null);
  const [planType, setPlanType]     = useState(null);
  const [limits, setLimits]         = useState({ timelines: { canAdd: true }, collaborators: { canAdd: true } });
  const [planLoading, setPlanLoading] = useState(true);

  // ✅ Always listen regardless of isSharedAccess — owner's plan drives isPro
  useEffect(() => {
    if (!ownerId) { setPlanLoading(false); return; }
    console.log('🔥 usePlan: setting up onSnapshot for', ownerId);
    const unsub = onSnapshot(doc(db, 'users', ownerId), snap => {
      const data = snap.data();
      console.log('🔥 usePlan snapshot fired:', { plan: data?.plan, planExpiry: data?.planExpiry, exists: snap.exists() });
      if (snap.exists()) {
        const d = data;
        const p = d.plan || 'free';
        if (p === 'pro' && d.planExpiry) {
          // ✅ CRITICAL FIX: always compare as UTC — Firestore Timestamp.toDate() returns local Date
          // which is fine since new Date() is also local — comparison is valid
          const exp = d.planExpiry.toDate ? d.planExpiry.toDate() : new Date(d.planExpiry);
          console.log('🔥 expiry check:', exp.toISOString(), 'expired:', exp < new Date());
          if (exp < new Date()) {
            setPlan('free'); setPlanExpiry(null); setPlanType(null);
            setPlanLoading(false); return;
          }
        }
        setPlan(p);
        setPlanExpiry(d.planExpiry || null);
        setPlanType(d.planType || null);
      }
      setPlanLoading(false);
    });
    return () => unsub();
  }, [ownerId]);

  // ✅ useCallback so reference is stable — prevents infinite re-renders
  const refreshLimits = useCallback(async () => {
    if (!ownerId) return;
    try {
      const url = `${getBackendUrl()}/api/check-limits?userId=${ownerId}`;
      console.log('[usePlan] refreshLimits URL:', url);
      const res  = await fetch(url);
      const data = await res.json();
      console.log('[usePlan] limits:', data);
      if (data.success) setLimits(data);
    } catch (e) { console.error('[usePlan] limits fetch error:', e); }
  }, [ownerId]);

  useEffect(() => {
    if (ownerId) refreshLimits();
  }, [ownerId, refreshLimits]);

  const isPro = plan === 'pro';
  return { plan, isPro, planExpiry, planType, limits, planLoading, refreshLimits };
}