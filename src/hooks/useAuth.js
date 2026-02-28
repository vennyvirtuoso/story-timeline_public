import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import { getBackendUrl } from '../gis';

export function useAuth() {
  const [user,             setUser]             = useState(null);
  const [ownerId,          setOwnerId]          = useState(null);
  const [timelineId,       setTimelineId]       = useState(null);
  const [role,             setRole]             = useState('owner');
  const [isSharedAccess,   setIsSharedAccess]   = useState(false);
  const [isCollaborator,   setIsCollaborator]   = useState(false);
  const [authLoading,      setAuthLoading]      = useState(true);
  const [loginLoading,     setLoginLoading]     = useState(false);
  const [folderId,         setFolderId]         = useState(null);
  const [driveSetupNeeded, setDriveSetupNeeded] = useState(false);

  const loadUserData = async (uid) => {
    try {
      const userRef  = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { createdAt: serverTimestamp(), email: auth.currentUser?.email || '', uid });
      }
      const ud = userSnap.exists() ? userSnap.data() : {};
      setFolderId(ud.folderId || null);
      setDriveSetupNeeded(!ud.folderId);

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
      setTimelineId(data.timelineId);
      setOwnerId(data.ownerId);
      setRole('viewer');
      setIsSharedAccess(true);
      setIsCollaborator(false);
      const ud = await getDoc(doc(db, 'users', data.ownerId));
      if (ud.exists()) setFolderId(ud.data().folderId || null);
      setLoginLoading(false);
      return { success: true };
    } catch (e) { setLoginLoading(false); return { success: false, error: e.message }; }
  };

  const handleCollabTokenLogin = async (token) => {
    setLoginLoading(true);
    try {
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken();
        const res     = await fetch(`${getBackendUrl()}/api/join-collaboration`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
          body:    JSON.stringify({ token }),
        });
        const data = await res.json();
        if (!data.success) { setLoginLoading(false); return { success: false, error: data.error }; }
        setTimelineId(data.timelineId);
        setOwnerId(data.ownerId);
        setIsSharedAccess(true); setIsCollaborator(true); setRole('collaborator');
        const ud = await getDoc(doc(db, 'users', data.ownerId));
        if (ud.exists()) setFolderId(ud.data().folderId || null);
        setLoginLoading(false);
        return { success: true };
      }
      // Fallback: unauthenticated direct Firestore read
      const snap = await getDoc(doc(db, 'collaborationTokens', token));
      if (!snap.exists()) { setLoginLoading(false); return { success: false, error: 'Invalid or expired code' }; }
      const { timelineId: tid, ownerId: oid } = snap.data();
      setTimelineId(tid); setOwnerId(oid);
      setIsSharedAccess(true); setIsCollaborator(true); setRole('collaborator');
      const ud = await getDoc(doc(db, 'users', oid));
      if (ud.exists()) setFolderId(ud.data().folderId || null);
      setLoginLoading(false);
      return { success: true };
    } catch (e) { setLoginLoading(false); return { success: false, error: e.message }; }
  };

  const handleShareTokenLogin = async (token) => {
    const r = await handleViewToken(token);
    if (r.success) return r;
    return handleCollabTokenLogin(token);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u && !isSharedAccess) { setUser(u); await loadUserData(u.uid); }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [isSharedAccess]);

  useEffect(() => {
    const params      = new URLSearchParams(window.location.search);
    const viewToken   = params.get('view');
    const collabToken = params.get('collab');
    if (viewToken) handleViewToken(viewToken);
    // ✅ For collab tokens: only process if already logged in.
    // If not logged in, store the token and process after login.
    if (collabToken) {
      if (auth.currentUser) {
        handleCollabTokenLogin(collabToken);
      } else {
        // Store in sessionStorage — process after Google login
        sessionStorage.setItem('pendingCollabToken', collabToken);
      }
    }
  }, []);

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    try {
      const r = await signInWithPopup(auth, googleProvider);
      setUser(r.user);
      await loadUserData(r.user.uid);

      // ✅ After login, check for pending collab token
      const pending = sessionStorage.getItem('pendingCollabToken');
      if (pending) {
        sessionStorage.removeItem('pendingCollabToken');
        await handleCollabTokenLogin(pending);
      }
    } catch (e) { alert('Login failed: ' + e.message); }
    finally { setLoginLoading(false); }
  };

  const handleSignOut = async () => {
    if (isSharedAccess) {
      setIsSharedAccess(false); setIsCollaborator(false);
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
    setTimelineId, setOwnerId, setRole, setIsSharedAccess, setIsCollaborator,
  };
}