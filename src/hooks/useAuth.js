import { useState, useEffect, useRef } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import { getBackendUrl } from '../gis';

// ✅ localStorage helper — survives refresh, works across tabs
const ls = {
  get:    (k)    => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  set:    (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  remove: (k)    => { try { localStorage.removeItem(k); } catch {} },
};

// ✅ Module-level — runs ONCE at import time, before any React render or useEffect
// Survives Strict Mode double-invocation
const _boot = (() => {
  const v = ls.get('viewerSession');
  const c = ls.get('collabSession');
  console.log('[boot] localStorage viewerSession:', v, 'collabSession:', c);
  if (v?.timelineId && v?.ownerId) return { ...v, role: 'viewer', isShared: true, isCollab: false };
  if (c?.timelineId && c?.ownerId) return { ...c, role: 'collaborator', isShared: true, isCollab: true };
  return null;
})();

export function useAuth() {
  // ✅ All state seeded from _boot — correct on FIRST render, no useEffect needed
  const [user,             setUser]             = useState(null);
  const [ownerId,          setOwnerId]          = useState(_boot?.ownerId    ?? null);
  const [timelineId,       setTimelineId]       = useState(_boot?.timelineId ?? null);
  const [role,             setRole]             = useState(_boot?.role       ?? 'owner');
  const [isSharedAccess,   setIsSharedAccess]   = useState(_boot?.isShared   ?? false);
  const [isCollaborator,   setIsCollaborator]   = useState(_boot?.isCollab   ?? false);
  const [authLoading,      setAuthLoading]      = useState(true);
  const [loginLoading,     setLoginLoading]     = useState(false);
  const [folderId,         setFolderId]         = useState(null);
  const [driveSetupNeeded, setDriveSetupNeeded] = useState(false);

  const isSharedAccessRef = useRef(_boot?.isShared ?? false);

  const setIsSharedAccessBoth = (val) => {
    isSharedAccessRef.current = val;
    setIsSharedAccess(val);
  };

  // ✅ Load folderId for restored collab session
  useEffect(() => {
    if (_boot?.isCollab && _boot?.ownerId) {
      getDoc(doc(db, 'users', _boot.ownerId)).then(snap => {
        if (snap.exists()) setFolderId(snap.data().folderId || null);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserData = async (uid) => {
    try {
      const userRef  = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { createdAt: serverTimestamp(), email: auth.currentUser?.email || '', uid });
      }
      const ud = userSnap.exists() ? userSnap.data() : {};
      setFolderId(ud.folderId || null);
      setDriveSetupNeeded(!ud.folderId && !ud.driveSetupSkipped);
      // ✅ REMOVED: sessionStorage.setItem('gisToken', ud.driveToken)
      // That was leaking the JSON token string into GIS flow, causing backend to get wrong token
      const res  = await fetch(`${getBackendUrl()}/api/create-default-timeline`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid }),
      });
      const data = await res.json();
      setTimelineId(data.success ? data.timelineId : uid);
      setOwnerId(uid);
      setRole('owner');
    } catch (e) {
      console.error('loadUserData error:', e);
      setOwnerId(uid); setTimelineId(uid); setRole('owner');
    }
  };

  const handleViewToken = async (token) => {
    setLoginLoading(true);
    try {
      const res  = await fetch(`${getBackendUrl()}/api/resolve-viewer-token?token=${token.toUpperCase()}`);
      const data = await res.json();
      if (!data.success) { setLoginLoading(false); return { success: false, error: data.error }; }
      // ✅ Clear old sessions, save new viewer session to localStorage
      ls.remove('collabSession');
      ls.set('viewerSession', { timelineId: data.timelineId, ownerId: data.ownerId });
      setOwnerId(data.ownerId);
      setTimelineId(data.timelineId);
      setRole('viewer');
      setIsCollaborator(false);
      setIsSharedAccessBoth(true);
      const ud = await getDoc(doc(db, 'users', data.ownerId));
      if (ud.exists()) setFolderId(ud.data().folderId || null);
      setLoginLoading(false);
      return { success: true };
    } catch (e) { setLoginLoading(false); return { success: false, error: e.message }; }
  };

  const handleCollabTokenLogin = async (token) => {
    setLoginLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const idToken = await currentUser.getIdToken(true);
        const res     = await fetch(`${getBackendUrl()}/api/join-collaboration`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
          body:    JSON.stringify({ token }),
        });
        const data = await res.json();
        if (!data.success) { setLoginLoading(false); return { success: false, error: data.error }; }
        ls.remove('viewerSession');
        ls.set('collabSession', { timelineId: data.timelineId, ownerId: data.ownerId });
        setOwnerId(data.ownerId);
        setTimelineId(data.timelineId);
        setRole('collaborator');
        setIsSharedAccessBoth(true);
        setIsCollaborator(true);
        const ud = await getDoc(doc(db, 'users', data.ownerId));
        if (ud.exists()) setFolderId(ud.data().folderId || null);
        setLoginLoading(false);
        return { success: true };
      }
      setLoginLoading(false);
      return { success: false, error: 'Please sign in with Google to collaborate' };
    } catch (e) {
      setLoginLoading(false);
      return { success: false, error: e.message };
    }
  };

  const handleShareTokenLogin = async (token) => {
    if (token.length <= 6)  return handleViewToken(token);
    if (token.length >= 16) return handleCollabTokenLogin(token);
    const r = await handleViewToken(token);
    if (r.success) return r;
    return handleCollabTokenLogin(token);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      // ✅ Check localStorage directly — isSharedAccessRef may be stale after sign-out+re-enter token
      const hasSession = !!(ls.get('viewerSession') || ls.get('collabSession'));
      console.log('[onAuthStateChanged] u:', u?.uid ?? null, 'hasSession:', hasSession, 'viewerSession:', ls.get('viewerSession'));
      if (u && !hasSession) {
        setUser(u);
        await loadUserData(u.uid);
      } else if (u && hasSession) {
        setUser(u);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const params      = new URLSearchParams(window.location.search);
    const viewToken   = params.get('view') || params.get('token');
    const collabToken = params.get('collab');
    // ✅ If session already restored from localStorage, just clean the URL
    if (ls.get('viewerSession') || ls.get('collabSession')) {
      if (viewToken || collabToken) window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    if (viewToken) {
      setAuthLoading(true);
      handleViewToken(viewToken).finally(() => setAuthLoading(false));
    }
    if (collabToken) {
      if (auth.currentUser) handleCollabTokenLogin(collabToken);
      else sessionStorage.setItem('pendingCollabToken', collabToken);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    try {
      // ✅ Clear any viewer/collab session before logging in
      ls.remove('viewerSession');
      ls.remove('collabSession');
      const r = await signInWithPopup(auth, googleProvider);
      setUser(r.user);
      await loadUserData(r.user.uid);
      const pending = sessionStorage.getItem('pendingCollabToken');
      if (pending) {
        sessionStorage.removeItem('pendingCollabToken');
        await handleCollabTokenLogin(pending);
      }
    } catch (e) { alert('Login failed: ' + e.message); }
    finally { setLoginLoading(false); }
  };

  const handleSignOut = async () => {
    ls.remove('collabSession');
    ls.remove('viewerSession');
    if (isSharedAccessRef.current) {
      setIsSharedAccessBoth(false); setIsCollaborator(false);
      setRole('owner'); setOwnerId(null); setTimelineId(null); setUser(null);
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    await signOut(auth);
    setUser(null); setOwnerId(null); setTimelineId(null); setFolderId(null); setRole('owner');
  };

  return {
    user, ownerId, timelineId, role,
    isSharedAccess, isCollaborator,
    authLoading, loginLoading,
    folderId, setFolderId,
    driveSetupNeeded, setDriveSetupNeeded,
    handleGoogleLogin, handleShareTokenLogin, handleSignOut, loadUserData,
    setTimelineId, setOwnerId, setRole,
    setIsSharedAccess: setIsSharedAccessBoth,
    setIsCollaborator,
  };
}
