import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { getBackendUrl } from '../gis';

export function useViewerToken(user, timelineId, refreshLimits) {
  const [viewerToken, setViewerToken] = useState(null);

  const loadFromFirestore = async (uid) => {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists() && snap.data().viewerToken) {
      setViewerToken(snap.data().viewerToken);
    }
  };

  const generateToken = async () => {
    if (!user || !timelineId) return;
    try {
      const idToken = await auth.currentUser?.getIdToken(true);
      if (!idToken) { alert('Please sign in again.'); return; }
      if (viewerToken) { await refreshLimits?.(); return; }
      const res  = await fetch(`${getBackendUrl()}/api/create-viewer-token`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
        body:    JSON.stringify({ timelineId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setViewerToken(data.token);
      await setDoc(doc(db, 'users', user.uid), { viewerToken: data.token }, { merge: true });
      await refreshLimits?.();
    } catch (err) { alert('Failed to generate share code: ' + err.message); }
  };

  return { viewerToken, setViewerToken, loadFromFirestore, generateToken };
}
