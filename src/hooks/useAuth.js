import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

export function useAuth() {
  const [user, setUser]                   = useState(null);
  const [ownerId, setOwnerId]             = useState(null);
  const [isSharedAccess, setIsSharedAccess] = useState(false);
  const [authLoading, setAuthLoading]     = useState(true);
  const [loginLoading, setLoginLoading]   = useState(false);
  const [shareToken, setShareToken]       = useState(null);
  const [folderId, setFolderId]           = useState(null);
  const [driveSetupNeeded, setDriveSetupNeeded] = useState(false);

  const loadUserData = async (uid) => {
    try {
      const ref  = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const d = snap.data();
        setFolderId(d.folderId || null);
        setShareToken(d.shareToken || null);
        setOwnerId(uid);
        setDriveSetupNeeded(!d.folderId);
      } else {
        await setDoc(ref, { createdAt: serverTimestamp(), email: auth.currentUser?.email || '', uid });
        setOwnerId(uid);
        setDriveSetupNeeded(true);
      }
    } catch (e) {
      console.error('loadUserData error:', e);
      setOwnerId(uid);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u && !isSharedAccess) { setUser(u); await loadUserData(u.uid); }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [isSharedAccess]);

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    try {
      const r = await signInWithPopup(auth, googleProvider);
      setUser(r.user);
      await loadUserData(r.user.uid);
    } catch (e) { alert('Login failed: ' + e.message); }
    finally { setLoginLoading(false); }
  };

  const handleShareTokenLogin = async (token) => {
    setLoginLoading(true);
    try {
      const snap = await getDoc(doc(db, 'shareTokens', token));
      if (!snap.exists()) { setLoginLoading(false); return { success: false, error: 'Invalid or expired share code' }; }
      const { userId } = snap.data();
      setOwnerId(userId);
      setIsSharedAccess(true);
      setShareToken(token);
      const ud = await getDoc(doc(db, 'users', userId));
      if (ud.exists()) setFolderId(ud.data().folderId || null);
      setLoginLoading(false);
      return { success: true };
    } catch (e) { setLoginLoading(false); return { success: false, error: e.message }; }
  };

  const handleSignOut = async () => {
    if (isSharedAccess) {
      setIsSharedAccess(false); setOwnerId(null); setUser(null);
      setShareToken(null);
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    await signOut(auth);
    setUser(null); setOwnerId(null); setFolderId(null); setShareToken(null);
  };

  return {
    user, ownerId, isSharedAccess, authLoading, loginLoading,
    shareToken, setShareToken,
    folderId, setFolderId,
    driveSetupNeeded, setDriveSetupNeeded,
    handleGoogleLogin, handleShareTokenLogin, handleSignOut, loadUserData
  };
}