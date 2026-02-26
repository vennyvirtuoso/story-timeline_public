// GIS module-level vars (in-memory only, never persisted)
export let gisTokenClient = null;
export let gisAccessToken = null;

export const driveTokenStore = { gisAccessToken: null };

export const getBackendUrl = () =>
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) ||
  'http://localhost:8069';

export const loadGIS = () =>
  new Promise((resolve) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.onload = resolve;
    document.head.appendChild(s);
  });

export const requestDriveToken = (clientId) =>
  new Promise((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/drive.file',
      callback: (res) => {
        if (res.error) return reject(res);
        driveTokenStore.gisAccessToken = res.access_token; // ← store here
        resolve(res.access_token);
      },
    });
    client.requestAccessToken({ prompt: 'consent' });
  });
export const uploadFileToDrive = async (file, folderId, accessToken) => {
  const metadata = { name: file.name, parents: [folderId] };
  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form,
    }
  );

  if (!res.ok) throw new Error('Upload failed');

  const data = await res.json();

  // Make file publicly readable
  await fetch(
    `https://www.googleapis.com/drive/v3/files/${data.id}/permissions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'anyone', role: 'reader' }),
    }
  );

  return data.id;
};