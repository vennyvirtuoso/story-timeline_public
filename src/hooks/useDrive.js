import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { gisAccessToken, setGisAccessToken, getEnv, loadGIS, requestDriveToken, uploadFileToDrive, getBackendUrl } from '../gis';

export function useDrive(user, folderId, setFolderId, setDriveSetupNeeded, timelineId) {
  const [isUploading, setIsUploading]           = useState(false);
  const [driveAccessToken, setDriveAccessToken] = useState(null);

  const ensureDriveToken = async () => {
    if (gisAccessToken) return gisAccessToken;
    const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');
    await loadGIS();
    const t = await requestDriveToken(clientId);
    setDriveAccessToken(t);
    setGisAccessToken(t);
    return t;
  };

  const handleDriveSetupComplete = async (newFolderId, accessToken) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        folderId:   newFolderId,
        driveToken: JSON.stringify({ token: accessToken }),
        updatedAt:  serverTimestamp(),
      }, { merge: true });
      setFolderId(newFolderId);
      setDriveAccessToken(accessToken);
      setGisAccessToken(accessToken);
      setDriveSetupNeeded(false);
    } catch (e) {
      alert('Failed to save Drive setup: ' + e.message);
    }
  };

  const handleUpload = async (e, mediaType, setNewEvent, fileRef, videoRef) => {
    const file = e.target.files?.[0];
    if (!file || !folderId) return;
    setIsUploading(true);
    try {
      // ✅ Always get a fresh GIS token first — works for both owner and collaborator
      const gisToken = await ensureDriveToken();

      const { auth } = await import('../firebase/config');
      const idToken  = auth.currentUser ? await auth.currentUser.getIdToken() : null;

      if (idToken && timelineId && gisToken) {
        // ✅ Send gisToken so backend uses it directly instead of stored driveToken
        const formData = new FormData();
        formData.append('file',        file);
        formData.append('timelineId',  timelineId);
        formData.append('accessToken', gisToken);

        const res  = await fetch(`${getBackendUrl()}/api/upload`, {
          method:  'POST',
          headers: { 'Authorization': `Bearer ${idToken}` },
          body:    formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        const fileId = data.fileId;
        const url = mediaType === 'image'
          ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
          : `https://drive.google.com/file/d/${fileId}/preview`;

        setNewEvent(prev => ({
          ...prev,
          ...(mediaType === 'image'
            ? { imageUrls: [...(prev.imageUrls || []), url] }
            : { videoUrls: [...(prev.videoUrls || []), url] }),
        }));
        return;
      }

      // Fallback: direct GIS upload
      const fileId = await uploadFileToDrive(file, folderId, gisToken);
      if (mediaType === 'image') {
        setNewEvent(p => ({ ...p, imageUrls: [...p.imageUrls, `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`] }));
      } else {
        setNewEvent(p => ({ ...p, videoUrls: [...p.videoUrls, `https://drive.google.com/file/d/${fileId}/preview`] }));
      }
    } catch (e) {
      alert('Upload failed: ' + e.message);
    } finally {
      setIsUploading(false);
      if (fileRef?.current)  fileRef.current.value  = '';
      if (videoRef?.current) videoRef.current.value = '';
    }
  };

  return { isUploading, driveAccessToken, handleDriveSetupComplete, handleUpload };
}