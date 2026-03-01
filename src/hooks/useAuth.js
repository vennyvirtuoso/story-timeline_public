import { useState, useEffect, useRef } from 'react';
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

  const isSharedAccessRef = useRef(false);
  const setIsSharedAccessBoth = (val) => {
    isSharedAccessRef.current = val;
    setIsSharedAccess(val);
  };

  // ✅ Restore collab session before Firebase auth resolves
  useEffect(() => {
    const saved = sessionStorage.getItem('collabSession');
    if (!saved) return;
    try {
      const { timelineId: tid, ownerId: oid } = JSON.parse(saved);
      if (tid && oid) {
        setOwnerId(oid);
        setTimelineId(tid);
        setRole('collaborator');
        setIsSharedAccessBoth(true);
        setIsCollaborator(true);
        getDoc(doc(db, 'users', oid)).then(snap => {
          if (snap.exists()) setFolderId(snap.data().folderId || null);
        });
      }
    } catch { sessionStorage.removeItem('collabSession'); }
  }, []); // runs once on mount

  const loadUserData = async (uid) => {
    try {
      const userRef  = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { createdAt: serverTimestamp(), email: auth.currentUser?.email || '', uid });
      }
      const ud = userSnap.exists() ? userSnap.data() : {};
      setFolderId(ud.folderId || null);
      // ✅ Only show drive setup if user has never connected — don't re-trigger after plan upgrade
      setDriveSetupNeeded(!ud.folderId && !ud.driveSetupSkipped);

      // ✅ Restore GIS token to sessionStorage if it exists in Firestore
      if (ud.driveToken) {
        sessionStorage.setItem('gisToken', ud.driveToken);
      }

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

        setOwnerId(data.ownerId);
        setTimelineId(data.timelineId);
        setRole('collaborator');
        setIsSharedAccessBoth(true);
        setIsCollaborator(true);

        // ✅ Persist so page refresh keeps the collab session alive
        sessionStorage.setItem('collabSession', JSON.stringify({
          timelineId: data.timelineId,
          ownerId:    data.ownerId,
        }));

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
    // ✅ Distinguish by length — viewer tokens are 6 chars, collab tokens are 16
    if (token.length <= 6) {
      return handleViewToken(token);
    }
    if (token.length >= 16) {
      return handleCollabTokenLogin(token);
    }
    // Fallback: try both
    const r = await handleViewToken(token);
    if (r.success) return r;
    return handleCollabTokenLogin(token);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      // ✅ Skip loadUserData if already in a collab/shared session
      if (u && !isSharedAccessRef.current) {
        setUser(u);
        await loadUserData(u.uid);
      } else if (u && isSharedAccessRef.current) {
        // ✅ Still set user so auth.currentUser works for uploads etc.
        setUser(u);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const params      = new URLSearchParams(window.location.search);
    const viewToken   = params.get('view') || params.get('token');
    const collabToken = params.get('collab');
    if (viewToken) {
      setAuthLoading(true);
      handleViewToken(viewToken).finally(() => setAuthLoading(false));
    }
    if (collabToken) {
      if (auth.currentUser) {
        handleCollabTokenLogin(collabToken);
      } else {
        sessionStorage.setItem('pendingCollabToken', collabToken);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    try {
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
    if (isSharedAccessRef.current) {
      // ✅ Clear collab session on explicit sign out / exit
      sessionStorage.removeItem('collabSession');
      setIsSharedAccessBoth(false); setIsCollaborator(false);
      setRole('owner'); setOwnerId(null); setTimelineId(null); setUser(null);
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    sessionStorage.removeItem('collabSession');
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
