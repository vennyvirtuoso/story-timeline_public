// GIS module-level vars (in-memory only, never persisted)
export let gisTokenClient = null;
export let gisAccessToken = null;

export const getEnv = (key) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) return import.meta.env[key];
  } catch (e) { return ''; }
  return '';
};

export const getBackendUrl = () => getEnv('VITE_BACKEND_URL') || 'http://localhost:8069';

// --- Link Converters ---
export const convertGoogleDriveLink = (url) => {
  if (!url) return '';
  if (url.includes('google.com')) {
    const m = url.match(/\/d\/([-_\w]+)/) || url.match(/id=([-_\w]+)/);
    if (m?.[1]) return `https://lh3.googleusercontent.com/d/${m[1]}=w1000?authuser=0`;
  }
  return url;
};

export const convertVideoLink = (url) => {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const m = url.match(/\/d\/([-_\w]+)/) || url.match(/id=([-_\w]+)/);
    if (m?.[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;
  }
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let id = null;
    if (url.includes('v=')) id = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1].split('?')[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

// --- GIS helpers ---
export const loadGIS = () => new Promise((resolve) => {
  if (window.google?.accounts?.oauth2) { resolve(); return; }
  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.onload = resolve;
  document.head.appendChild(s);
});

export const requestDriveToken = (clientId) => new Promise((resolve, reject) => {
  gisTokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (res) => {
      if (res.error) { reject(new Error(res.error)); return; }
      gisAccessToken = res.access_token;
      resolve(res.access_token);
    }
  });
  // ✅ Use '' so Google reuses existing session silently after first consent
  gisTokenClient.requestAccessToken({ prompt: '' });
});

export const setGisAccessToken = (token) => { gisAccessToken = token; };

export const uploadFileToDrive = async (file, folderId, accessToken) => {
  const metadata = { name: file.name, parents: [folderId] };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);
  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` }, body: form }
  );
  if (!res.ok) { const e = await res.json(); throw new Error(e?.error?.message || 'Upload failed'); }
  const data = await res.json();
  await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'anyone', role: 'reader' })
  });
  return data.id;
};