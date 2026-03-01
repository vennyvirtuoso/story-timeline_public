import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useOwnerFolderId(isCollabRole, ownerId) {
  const [ownerFolderId, setOwnerFolderId] = useState(null);

  useEffect(() => {
    if (!isCollabRole || !ownerId) { setOwnerFolderId(null); return; }
    getDoc(doc(db, 'users', ownerId)).then(snap => {
      if (snap.exists()) setOwnerFolderId(snap.data().folderId || null);
    });
  }, [isCollabRole, ownerId]);

  return ownerFolderId;
}
