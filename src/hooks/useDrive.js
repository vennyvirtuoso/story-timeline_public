import { useState } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { gisAccessToken, setGisAccessToken, getEnv, loadGIS, requestDriveToken, uploadFileToDrive, getBackendUrl } from '../gis';

export function useDrive(user, folderId, setFolderId, setDriveSetupNeeded, timelineId) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [driveAccessToken, setDriveAccessToken] = useState(null);

  const ensureDriveToken = async () => {
    if (driveAccessToken) { setGisAccessToken(driveAccessToken); return driveAccessToken; }
    if (gisAccessToken)   { setDriveAccessToken(gisAccessToken); return gisAccessToken; }
    const cached = sessionStorage.getItem('gisToken');
    if (cached) { setDriveAccessToken(cached); setGisAccessToken(cached); return cached; }
    if (folderId && user?.uid) {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists() && snap.data().driveToken) {
          return '__use_backend_token__';
        }
      } catch {}
    }
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
    // ✅ Support multiple files
    const files = Array.from(e.target.files || []);
    if (!files.length || !folderId) return;

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
        // ✅ Upload all files in parallel
        const results = await Promise.all(files.map(async (file) => {
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
            const isExpired = data.error?.includes('token') ||
                              data.error?.includes('expired') ||
                              data.error?.includes('reconnect') ||
                              data.error?.includes('invalid_grant');
            if (isExpired && !isCollabRole) {
              sessionStorage.removeItem('gisToken');
              setDriveAccessToken(null);
              setGisAccessToken(null);
              setDriveSetupNeeded(true);
              throw new Error('Drive token expired. Please reconnect Google Drive in Settings.');
            }
            throw new Error(data.error);
          }

          const fileId = data.fileId;
          return data.fileUrl || (
            mediaType === 'image'
              ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
              : `https://drive.google.com/file/d/${fileId}/preview`
          );
        }));

        // ✅ Add all uploaded URLs at once
        setNewEvent(prev => ({
          ...prev,
          ...(mediaType === 'image'
            ? { imageUrls: [...(prev.imageUrls || []), ...results] }
            : { videoUrls: [...(prev.videoUrls || []), ...results] }),
        }));
        return;
      }

      // Fallback: direct GIS upload
      if (gisToken) {
        const fileIds = await Promise.all(files.map(f => uploadFileToDrive(f, folderId, gisToken)));
        const urls = fileIds.map(id =>
          mediaType === 'image'
            ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000`
            : `https://drive.google.com/file/d/${id}/preview`
        );
        setNewEvent(p => ({
          ...p,
          ...(mediaType === 'image'
            ? { imageUrls: [...p.imageUrls, ...urls] }
            : { videoUrls: [...p.videoUrls, ...urls] }),
        }));
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