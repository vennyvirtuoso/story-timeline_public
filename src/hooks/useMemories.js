import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useMemories(ownerId, isSharedAccess, onNoConfig) {
  const [memories, setMemories] = useState([]);
  const [config, setConfig]     = useState({ partner1: '', partner2: '', startDate: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ownerId) return;
    setIsLoading(true);
    const u1 = onSnapshot(collection(db, 'users', ownerId, 'config'), snap => {
      const d = snap.docs.find(d => d.id === 'main')?.data();
      if (d) setConfig(d); else if (!isSharedAccess) onNoConfig?.();
      setIsLoading(false);
    }, e => { console.error(e); setIsLoading(false); });

    const u2 = onSnapshot(collection(db, 'users', ownerId, 'memories'), snap => {
      const list = snap.docs.map(d => ({
        id: d.id, ...d.data(),
        imageUrls: d.data().imageUrls || (d.data().imageUrl ? [d.data().imageUrl] : []),
        videoUrls: d.data().videoUrls || []
      }));
      list.sort((a, b) =>
        new Date(b.date + (b.time ? `T${b.time}` : '')) -
        new Date(a.date + (a.time ? `T${a.time}` : ''))
      );
      setMemories(list);
    }, e => console.error(e));

    return () => { u1(); u2(); };
  }, [ownerId]);

  return { memories, setMemories, config, setConfig, isLoading };
}