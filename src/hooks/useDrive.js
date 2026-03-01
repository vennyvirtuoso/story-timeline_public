import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { gisAccessToken, setGisAccessToken, getEnv, loadGIS, requestDriveToken, uploadFileToDrive, getBackendUrl } from '../gis';

export function useDrive(user, folderId, setFolderId, setDriveSetupNeeded, timelineId) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [driveAccessToken, setDriveAccessToken] = useState(null);

  const ensureDriveToken = async () => {
    if (driveAccessToken) { setGisAccessToken(driveAccessToken); return driveAccessToken; }
    if (gisAccessToken)   { setDriveAccessToken(gisAccessToken); return gisAccessToken; }
    const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');
    await loadGIS();
    const t = await requestDriveToken(clientId);
    setDriveAccessToken(t);
    setGisAccessToken(t);
    return t;
  };

  const resetDriveToken = () => {
    setDriveAccessToken(null);
  };

  const handleDriveSetupComplete = async (newFolderId, accessToken) => {
    try {
      const tokenData = typeof accessToken === 'object' ? accessToken : { token: accessToken };
      await setDoc(doc(db, 'users', user.uid), {
        folderId:   newFolderId,
        driveToken: JSON.stringify(tokenData),
        updatedAt:  serverTimestamp(),
      }, { merge: true });
      setFolderId(newFolderId);
      const rawToken = tokenData.token || accessToken;
      setDriveAccessToken(rawToken);
      setGisAccessToken(rawToken);
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

      // ✅ Collaborators skip GIS token — backend always uses owner's stored credentials
      // ✅ Owners still get a GIS token for direct upload fallback
      let gisToken = null;
      if (!isCollabRole) {
        gisToken = await ensureDriveToken();
      }

      if (idToken && timelineId) {
        const formData = new FormData();
        formData.append('file',       file);
        formData.append('timelineId', timelineId);
        // Only send accessToken for owners (collaborators use owner's stored token on backend)
        if (gisToken) formData.append('accessToken', gisToken);

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

      // Fallback: direct GIS upload (owner only)
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