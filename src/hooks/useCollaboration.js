import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { getBackendUrl } from '../gis';

export function useCollaboration(user, timelineId) {
  const [collabToken,       setCollabToken]       = useState(null);
  const [collabShareUrl,    setCollabShareUrl]    = useState(null);
  const [collabLinkCopied,  setCollabLinkCopied]  = useState(false);
  const [collabPopoverOpen, setCollabPopoverOpen] = useState(false);
  const [collabGenerating,  setCollabGenerating]  = useState(false);

  const reset = () => {
    setCollabToken(null);
    setCollabShareUrl(null);
    setCollabPopoverOpen(false);
    setCollabLinkCopied(false);
  };

  const loadFromFirestore = async (uid) => {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists() && snap.data().collabToken) {
      setCollabToken(snap.data().collabToken);
    }
  };

  const handleCollaborateClick = async (onLimitReached) => {
    if (!user || !timelineId || collabGenerating) return;
    if (!collabToken) {
      setCollabGenerating(true);
      try {
        const idToken = await auth.currentUser?.getIdToken(true);
        if (!idToken) { alert('Please sign in again.'); return; }
        const res  = await fetch(`${getBackendUrl()}/api/create-collaboration-token`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
          body:    JSON.stringify({ timelineId }),
        });
        const data = await res.json();
        if (!data.success) {
          if (data.limitReached) { onLimitReached?.(); return; }
          throw new Error(data.error);
        }
        setCollabToken(data.token);
        await setDoc(doc(db, 'users', user.uid), { collabToken: data.token }, { merge: true });
        setCollabShareUrl(`${window.location.origin}/?collab=${data.token}`);
      } catch (err) { alert('Failed: ' + err.message); return; }
      finally { setCollabGenerating(false); }
    } else {
      setCollabShareUrl(`${window.location.origin}/?collab=${collabToken}`);
    }
    setCollabPopoverOpen(prev => !prev);
  };

  const copyCollabLink = () => {
    if (!collabShareUrl) return;
    navigator.clipboard.writeText(collabShareUrl).catch(() => {});
    setCollabLinkCopied(true);
    setTimeout(() => setCollabLinkCopied(false), 2000);
  };

  return {
    collabToken, setCollabToken,
    collabShareUrl, setCollabShareUrl,
    collabLinkCopied,
    collabPopoverOpen, setCollabPopoverOpen,
    collabGenerating,
    reset, loadFromFirestore,
    handleCollaborateClick, copyCollabLink,
  };
}
