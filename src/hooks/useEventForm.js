import { useState } from 'react';
import { collection, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db,auth } from '../firebase/config';
import { getBackendUrl } from '../gis';

const blank = () => ({
  title: '', description: '',
  date: new Date().toISOString().split('T')[0],
  time: '',           // ✅ add time field
  imageUrls: [], videoUrls: [],
  emoji: '❤️',
  type: 'general',  // ✅ include type in blank
});

export function useEventForm(timelineId, userId) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId]           = useState(null);
  const [newEvent, setNewEvent]             = useState(blank());
  const [isSaving, setIsSaving]             = useState(false);
  const [tempImageLink, setTempImageLink]   = useState('');
  const [tempVideoLink, setTempVideoLink]   = useState('');

  const openAdd  = () => { setEditingId(null); setNewEvent(blank()); setIsAddModalOpen(true); };
  const openEdit = (ev) => { setEditingId(ev.id); setNewEvent({ ...ev }); setIsAddModalOpen(true); };
  // ✅ Extract Drive file ID from URL
  const extractDriveFileId = (url) => {
    if (!url) return null;
    // thumbnail: https://drive.google.com/thumbnail?id=FILE_ID&sz=...
    const thumbMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (thumbMatch) return thumbMatch[1];
    // preview: https://drive.google.com/file/d/FILE_ID/preview
    const previewMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (previewMatch) return previewMatch[1];
    return null;
  };

  const deleteDriveFile = async (url, timelineId) => {
    const fileId = extractDriveFileId(url);
    if (!fileId || !timelineId) return;
    try {
      const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : null;
      if (!idToken) return;
      await fetch(`${getBackendUrl()}/api/delete-drive-file`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
        body:    JSON.stringify({ fileId, timelineId }),
      });
    } catch (e) {
      console.warn('Drive file delete failed (non-blocking):', e.message);
    }
  };
  const addImageLink = () => {
    if (tempImageLink.trim()) { setNewEvent(p => ({ ...p, imageUrls: [...p.imageUrls, tempImageLink.trim()] })); setTempImageLink(''); }
  };
  const removeImage = (url) => {
    deleteDriveFile(url, timelineId); // ✅ non-blocking
    setNewEvent(prev => ({ ...prev, imageUrls: prev.imageUrls.filter(u => u !== url) }));
  };

  const normalizeVideoUrl = (url) => {
    // YouTube: convert watch/short URLs to embed
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

    // Google Drive: convert /view or /edit to /preview
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;

    return url; // return as-is if unrecognized
  };

  const addVideoLink = () => {
    if (tempVideoLink.trim()) {
      const normalized = normalizeVideoUrl(tempVideoLink.trim());
      setNewEvent(p => ({ ...p, videoUrls: [...p.videoUrls, normalized] }));
      setTempVideoLink('');
    }
  };
  const removeVideo = (url) => {
    deleteDriveFile(url, timelineId); // ✅ non-blocking
    setNewEvent(prev => ({ ...prev, videoUrls: prev.videoUrls.filter(u => u !== url) }));
  };

  const handleSaveEvent = async (e) => {
    e?.preventDefault();
    if (!timelineId || !newEvent.title?.trim() || !newEvent.date) return;
    setIsSaving(true);
    try {
      const ref = editingId
        ? doc(db, 'timelines', timelineId, 'memories', editingId)
        : doc(collection(db, 'timelines', timelineId, 'memories'));
      await setDoc(ref, {
        title:       newEvent.title.trim(),
        description: newEvent.description || '',
        date:        newEvent.date,
        time:        newEvent.time || '',   // ✅ save time
        imageUrls:   newEvent.imageUrls || [],
        videoUrls:   newEvent.videoUrls || [],
        emoji:       newEvent.emoji || '❤️',
        type:        newEvent.type || 'general',  // ✅ persist type
        createdBy:   userId || null,
        ...(editingId ? {} : { createdAt: serverTimestamp() }),
        updatedAt:   serverTimestamp(),
      }, { merge: true });
      setIsAddModalOpen(false);
      setNewEvent(blank());
      setEditingId(null);
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!timelineId || !window.confirm('Delete this memory?')) return;
    await deleteDoc(doc(db, 'timelines', timelineId, 'memories', id));
  };

  return {
    isAddModalOpen, setIsAddModalOpen, editingId,
    newEvent, setNewEvent, isSaving,
    tempImageLink, setTempImageLink,
    tempVideoLink, setTempVideoLink,
    openAdd, openEdit, addImageLink, removeImage,
    addVideoLink, removeVideo, handleSaveEvent, handleDelete,
  };
}