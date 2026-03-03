import { useState } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { gisAccessToken, setGisAccessToken, getEnv, loadGIS, requestDriveToken, uploadFileToDrive, getBackendUrl } from '../gis';

export function useDrive(user, folderId, setFolderId, setDriveSetupNeeded, timelineId) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [driveAccessToken, setDriveAccessToken] = useState(null);

  const ensureDriveToken = async () => {
    // 1. Cached state token
    if (driveAccessToken) { setGisAccessToken(driveAccessToken); return driveAccessToken; }
    // 2. Module-level GIS token
    if (gisAccessToken)   { setDriveAccessToken(gisAccessToken); return gisAccessToken; }
    // 3. sessionStorage (survives re-renders)
    const cached = sessionStorage.getItem('gisToken');
    if (cached) { setDriveAccessToken(cached); setGisAccessToken(cached); return cached; }
    // 4. If owner has folderId, backend uses stored driveToken — return a sentinel so upload proceeds
    //    without triggering popup. Backend will use owner's stored credentials.
    if (folderId && user?.uid) {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists() && snap.data().driveToken) {
          // ✅ Owner has stored token — backend will use it, no GIS popup needed
          return '__use_backend_token__';
        }
      } catch {}
    }
    // 5. Last resort — request new token (shows popup)
    const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');
    await loadGIS();
    const t = await requestDriveToken(clientId);
    setDriveAccessToken(t);
    setGisAccessToken(t);
    sessionStorage.setItem('gisToken', t);
    return t;
  };

  const resetDriveToken = () => {
    setDriveAccessToken(null);
    sessionStorage.removeItem('gisToken');
  };

  const handleDriveSetupComplete = async (newFolderId, accessToken) => {
    try {
      if (accessToken) {
        // ✅ Legacy GIS flow — save token to Firestore
        const tokenData = typeof accessToken === 'object' ? accessToken : { token: accessToken };
        await setDoc(doc(db, 'users', user.uid), {
          folderId:   newFolderId,
          driveToken: JSON.stringify(tokenData),
          updatedAt:  serverTimestamp(),
        }, { merge: true });
        const rawToken = tokenData.token || accessToken;
        setDriveAccessToken(rawToken);
        setGisAccessToken(rawToken);
        sessionStorage.setItem('gisToken', rawToken);
      } else {
        // ✅ New OAuth flow — backend already saved folderId + driveToken
        // Just update folderId in Firestore in case backend missed it
        await setDoc(doc(db, 'users', user.uid), {
          folderId:  newFolderId,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
      setFolderId(newFolderId);
      setDriveSetupNeeded(false);
    } catch (e) {
      alert('Failed to save Drive setup: ' + e.message);
    }
  };

  const handleUpload = async (e, mediaType, setNewEvent, fileRef, videoRef, isCollabRole) => {
    const file = e.target.files?.[0];
    if (!file || !folderId) return;
    const setUploading = mediaType === 'image' ? setIsUploadingImage : setIsUploadingVideo;
    setUploading(true);
    try {
      const { auth } = await import('../firebase/config');
      const idToken  = auth.currentUser ? await auth.currentUser.getIdToken() : null;

      let gisToken = null;
      if (!isCollabRole) {
        gisToken = await ensureDriveToken();
        if (gisToken === '__use_backend_token__') gisToken = null;
      }

      if (idToken && timelineId) {
        const formData = new FormData();
        formData.append('file',       file);
        formData.append('timelineId', timelineId);
        if (gisToken) formData.append('accessToken', gisToken);

        const res  = await fetch(`${getBackendUrl()}/api/upload`, {
          method:  'POST',
          headers: { 'Authorization': `Bearer ${idToken}` },
          body:    formData,
        });
        const data = await res.json();
        if (!data.success) {
          // ✅ If token expired, clear all cached tokens and retry with fresh GIS token
          if (data.error?.includes('token expired') || data.error?.includes('reconnect Google Drive')) {
            sessionStorage.removeItem('gisToken');
            setDriveAccessToken(null);
            setGisAccessToken(null);
            if (!isCollabRole) setDriveSetupNeeded(true);
          }
          throw new Error(data.error);
        }

        const fileId  = data.fileId;
        // ✅ Use fileUrl from backend if provided, otherwise build it
        const fileUrl = data.fileUrl || (
          mediaType === 'image'
          ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
          : `https://drive.google.com/file/d/${fileId}/preview`
        );

        setNewEvent(prev => ({
          ...prev,
          ...(mediaType === 'image'
            ? { imageUrls: [...(prev.imageUrls || []), fileUrl] }
            : { videoUrls: [...(prev.videoUrls || []), fileUrl] }),
        }));
        return;
      }

      // Fallback: direct GIS upload (only if we have a real token)
      if (gisToken) {
        const fileId = await uploadFileToDrive(file, folderId, gisToken);
        if (mediaType === 'image') {
          setNewEvent(p => ({ ...p, imageUrls: [...p.imageUrls, `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`] }));
        } else {
          setNewEvent(p => ({ ...p, videoUrls: [...p.videoUrls, `https://drive.google.com/file/d/${fileId}/preview`] }));
        }
      }
    } catch (e) {
      alert('Upload failed: ' + e.message);
    } finally {
      setUploading(false);
      if (fileRef?.current)  fileRef.current.value  = '';
      if (videoRef?.current) videoRef.current.value = '';
    }
  };

  return { isUploadingImage, isUploadingVideo, driveAccessToken, resetDriveToken, handleDriveSetupComplete, handleUpload };
}