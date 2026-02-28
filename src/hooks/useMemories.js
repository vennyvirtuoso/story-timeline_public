import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * useMemories(activeTimelineId, role)
 * role: 'owner' | 'collaborator' | 'viewer'
 *
 * Reads from: timelines/{activeTimelineId}/memories
 * Config from: users/{ownerId}/config/main
 *   — ownerId is always = activeTimelineId (timelineId = userId by design)
 */
export function useMemories(activeTimelineId, role, onNoConfig) {
  const [memories,  setMemories]  = useState([]);
  const [config,    setConfig]    = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Config lives at users/{ownerId}/config/main
  // Since timelineId = userId, ownerId = activeTimelineId
  useEffect(() => {
    if (!activeTimelineId) return;
    const unsub = onSnapshot(
      doc(db, 'users', activeTimelineId, 'config', 'main'),
      snap => {
        if (snap.exists()) setConfig(snap.data());
        else if (onNoConfig) onNoConfig();
      },
      err => console.error('useMemories config snapshot error:', err.code)
    );
    return () => unsub();
  }, [activeTimelineId]);

  // ✅ Memories from new path: timelines/{activeTimelineId}/memories
  useEffect(() => {
    if (!activeTimelineId) { setIsLoading(false); return; }
    const q = query(
      collection(db, 'timelines', activeTimelineId, 'memories'),
      orderBy('date', 'desc')
    );
    const unsub = onSnapshot(
      q,
      snap => {
        setMemories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setIsLoading(false);
      },
      err => {
        console.error('useMemories memories snapshot error:', err.code);
        setIsLoading(false);
      }
    );
    return () => unsub();
  }, [activeTimelineId]);

  return { memories, config, setConfig, isLoading };
}