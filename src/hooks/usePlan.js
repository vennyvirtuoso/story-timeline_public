import { useState, useEffect, useCallback, useRef } from 'react';
import { doc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export function usePlan(ownerId, timelineId, isSharedAccess) {
  const [plan,        setPlan]        = useState('free');
  const [planExpiry,  setPlanExpiry]  = useState(null);
  const [planType,    setPlanType]    = useState(null);
  const [limits,      setLimits]      = useState({ memories: { canAdd: true }, collaborators: { canAdd: true } });
  const [planLoading, setPlanLoading] = useState(true);

  // ✅ Always listen to OWNER's plan doc
  useEffect(() => {
    if (!ownerId) { setPlanLoading(false); return; }
    const unsub = onSnapshot(doc(db, 'users', ownerId), snap => {
      if (!snap.exists()) { setPlanLoading(false); return; }
      const d = snap.data();
      const p = d.plan || 'free';
      if (p === 'pro' && d.planExpiry) {
        const exp = d.planExpiry.toDate ? d.planExpiry.toDate() : new Date(d.planExpiry);
        if (exp < new Date()) {
          setPlan('free'); setPlanExpiry(null); setPlanType(null);
          setPlanLoading(false); return;
        }
      }
      setPlan(p); setPlanExpiry(d.planExpiry || null); setPlanType(d.planType || null);
      setPlanLoading(false);
    }, err => { console.error('usePlan snapshot error:', err.code); setPlanLoading(false); });
    return () => unsub();
  }, [ownerId]);

  // ✅ Keep a ref so refreshLimits always reads latest plan without stale closure
  const planRef = useRef(plan);
  useEffect(() => { planRef.current = plan; }, [plan]);

  const refreshLimits = useCallback(async () => {
    if (!ownerId) return;
    try {
      const memSnap    = timelineId ? await getDocs(collection(db, 'timelines', timelineId, 'memories'))      : { size: 0 };
      const collabSnap = timelineId ? await getDocs(collection(db, 'timelines', timelineId, 'collaborators')) : { size: 0 };
      const memoryCount = memSnap.size;
      const collabCount = collabSnap.size;
      const isPro = planRef.current === 'pro';  // ✅ always reads latest plan
      setLimits({
        memories:      { count: memoryCount, limit: isPro ? null : 2, canAdd: isPro || memoryCount < 2 },
        collaborators: { count: collabCount,  limit: isPro ? 20   : 2, canAdd: isPro || collabCount  < 2 },
      });
    } catch (e) { console.error('refreshLimits error:', e); }
  }, [ownerId, timelineId]); // ✅ removed `plan` from deps — uses ref instead

  // ✅ Re-run limits whenever plan changes (e.g. after upgrade)
  useEffect(() => {
    if (ownerId) refreshLimits();
  }, [ownerId, timelineId, plan, refreshLimits]); // ✅ added plan here

  useEffect(() => {
    if (!ownerId) return;
    refreshLimits();
  }, [ownerId, timelineId]); // ✅ re-fetch whenever owner or timeline changes (catches expiry on revisit)

  const isPro = plan === 'pro';
  return { plan, isPro, planExpiry, planType, limits, planLoading, refreshLimits };
}