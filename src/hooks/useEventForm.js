import { useState } from 'react';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { convertGoogleDriveLink, convertVideoLink } from '../gis';

const emptyEvent = () => ({
  title: '', date: new Date().toISOString().split('T')[0],
  time: '', description: '', type: 'general', imageUrls: [], videoUrls: []
});

export function useEventForm(ownerId) {
  const [newEvent, setNewEvent]         = useState(emptyEvent());
  const [editingId, setEditingId]       = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving]         = useState(false);
  const [tempImageLink, setTempImageLink] = useState('');
  const [tempVideoLink, setTempVideoLink] = useState('');

  const openAdd  = () => { setNewEvent(emptyEvent()); setTempImageLink(''); setTempVideoLink(''); setEditingId(null); setIsAddModalOpen(true); };
  const openEdit = (ev) => {
    setNewEvent({ title: ev.title, date: ev.date, time: ev.time || '', description: ev.description, type: ev.type, imageUrls: ev.imageUrls || [], videoUrls: ev.videoUrls || [] });
    setTempImageLink(''); setTempVideoLink(''); setEditingId(ev.id); setIsAddModalOpen(true);
  };

  const addImageLink  = () => { if (!tempImageLink) return; setNewEvent(p => ({ ...p, imageUrls: [...p.imageUrls, convertGoogleDriveLink(tempImageLink)] })); setTempImageLink(''); };
  const removeImage   = (i) => setNewEvent(p => ({ ...p, imageUrls: p.imageUrls.filter((_, x) => x !== i) }));
  const addVideoLink  = () => { if (!tempVideoLink) return; setNewEvent(p => ({ ...p, videoUrls: [...p.videoUrls, convertVideoLink(tempVideoLink)] })); setTempVideoLink(''); };
  const removeVideo   = (i) => setNewEvent(p => ({ ...p, videoUrls: p.videoUrls.filter((_, x) => x !== i) }));

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!ownerId) return;
    setIsSaving(true);
    try {
      const data = { ...newEvent, imageUrl: newEvent.imageUrls[0] || '', updatedAt: serverTimestamp() };
      if (editingId) {
        await updateDoc(doc(db, 'users', ownerId, 'memories', editingId), data);
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, 'users', ownerId, 'memories'), data);
      }
      setIsAddModalOpen(false);
      setNewEvent(emptyEvent());
    } catch (e) { alert('Error saving memory: ' + e.message); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this memory?')) return;
    try { await deleteDoc(doc(db, 'users', ownerId, 'memories', id)); } catch (e) { console.error(e); }
  };

  return {
    newEvent, setNewEvent, editingId, isAddModalOpen, setIsAddModalOpen,
    isSaving, tempImageLink, setTempImageLink, tempVideoLink, setTempVideoLink,
    openAdd, openEdit, addImageLink, removeImage, addVideoLink, removeVideo,
    handleSaveEvent, handleDelete
  };
}