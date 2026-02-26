import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { gisAccessToken, setGisAccessToken, getEnv, loadGIS, requestDriveToken, uploadFileToDrive } from '../gis';

export function useDrive(user, folderId, setFolderId, setDriveSetupNeeded) {
  const [isUploading, setIsUploading]         = useState(false);
  const [driveAccessToken, setDriveAccessToken] = useState(null);

  const ensureDriveToken = async () => {
    if (gisAccessToken) return gisAccessToken;
    const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');
    await loadGIS();
    const t = await requestDriveToken(clientId);
    setDriveAccessToken(t);
    return t;
  };

  const handleDriveSetupComplete = async (newFolderId, accessToken) => {
    try {
      await setDoc(doc(db, 'users', user.uid), { folderId: newFolderId, updatedAt: serverTimestamp() }, { merge: true });
      setFolderId(newFolderId);
      setDriveAccessToken(accessToken);
      setGisAccessToken(accessToken);
      setDriveSetupNeeded(false);
    } catch (e) {
      alert('Failed to save Drive setup: ' + e.message + '\nPlease try again.');
    }
  };

  const handleUpload = async (e, mediaType, setNewEvent, fileRef, videoRef) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!folderId) { alert('Connect Google Drive first to upload files.'); return; }
    setIsUploading(true);
    try {
      const token  = await ensureDriveToken();
      const fileId = await uploadFileToDrive(file, folderId, token);
      if (mediaType === 'image') {
        setNewEvent(p => ({ ...p, imageUrls: [...p.imageUrls, `https://lh3.googleusercontent.com/d/${fileId}=w1000?authuser=0`] }));
      } else {
        setNewEvent(p => ({ ...p, videoUrls: [...p.videoUrls, `https://drive.google.com/file/d/${fileId}/preview`] }));
      }
    } catch (e) { alert('Upload failed: ' + e.message); }
    finally {
      setIsUploading(false);
      if (fileRef?.current)  fileRef.current.value  = '';
      if (videoRef?.current) videoRef.current.value = '';
    }
  };

  return { isUploading, driveAccessToken, handleDriveSetupComplete, handleUpload };
}