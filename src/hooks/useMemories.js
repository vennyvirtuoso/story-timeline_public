import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

// ✅ ownerId is passed explicitly — config always lives under users/{ownerId}
export function useMemories(timelineId, role, onNoConfig, ownerId) {
  const [memories,  setMemories]  = useState([]);
  const [config,    setConfig]    = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Config from owner's doc — use ownerId if provided, fallback to timelineId
  const configOwnerId = ownerId || timelineId;

  useEffect(() => {
    if (!configOwnerId) return;
    const configRef = doc(db, 'users', configOwnerId, 'config', 'main');
    const unsub = onSnapshot(configRef, snap => {
      if (snap.exists()) {
        setConfig(snap.data());
      } else {
        setConfig({});
        if (role === 'owner') onNoConfig?.();
      }
    });
    return () => unsub();
  }, [configOwnerId, role]);

  useEffect(() => {
    if (!timelineId) return;
    setIsLoading(true);
    const q     = query(collection(db, 'timelines', timelineId, 'memories'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      // ✅ Sort: primary = date desc, secondary = time desc (user-selected time if set, else createdAt)
      docs.sort((a, b) => {
        // Primary: date descending
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;

        // Secondary: resolve effective datetime for each
        const getEffective = (m) => {
          if (m.time) return new Date(`${m.date}T${m.time}`).getTime();
          // fallback to createdAt timestamp
          const ca = m.createdAt;
          if (!ca) return 0;
          return (ca.toDate ? ca.toDate() : new Date(ca)).getTime();
        };

        return getEffective(b) - getEffective(a); // desc
      });

      setMemories(docs);
      setIsLoading(false);
    }, () => setIsLoading(false));
    return () => unsub();
  }, [timelineId]);

  return { memories, config, setConfig, isLoading };
}