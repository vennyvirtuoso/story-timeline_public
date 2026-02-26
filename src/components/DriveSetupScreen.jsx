import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Btn } from './ui';
import { getEnv, getBackendUrl, loadGIS, requestDriveToken } from '../gis';

const DriveSetupScreen = ({ user, onSetupComplete, onSkip }) => {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const connect = async () => {
    setBusy(true); setErr('');
    try {
      const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');
      if (!clientId) throw new Error('VITE_GOOGLE_CLIENT_ID not set');
      await loadGIS();
      const accessToken = await requestDriveToken(clientId);
      const fr = await fetch('https://www.googleapis.com/drive/v3/files', {
        method:'POST', headers:{'Authorization':`Bearer ${accessToken}`,'Content-Type':'application/json'},
        body: JSON.stringify({name:'Love Story 💕', mimeType:'application/vnd.google-apps.folder'})
      });
      if (!fr.ok) { const e=await fr.json(); throw new Error(e?.error?.message||'Folder creation failed'); }
      const { id: folderId } = await fr.json();
      await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}/permissions`, {
        method:'POST', headers:{'Authorization':`Bearer ${accessToken}`,'Content-Type':'application/json'},
        body: JSON.stringify({type:'anyone', role:'reader'})
      });
      const sr = await fetch(`${getBackendUrl()}/api/setup-drive`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({userId: user.uid, folderId})
      });
      const sd = await sr.json();
      if (!sd.success) throw new Error(sd.error||'Save failed');
      onSetupComplete(folderId, accessToken);
    } catch(e) {
      console.error(e);
      if (e.message?.includes('popup')) setErr('Popup closed. Please try again.');
      else setErr(e.message||'Setup failed');
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 p-5">
      <div className="bg-white rounded-3xl shadow-xl p-7 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7" viewBox="0 0 87.3 78" fill="white">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"/>
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"/>
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"/>
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"/>
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Connect Google Drive</h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">We'll create a <strong className="text-gray-600">Love Story 💕</strong> folder in your Drive for photos and videos.</p>
        <ul className="text-left space-y-1.5 mb-5 text-sm text-gray-500 bg-gray-50 rounded-xl p-3.5">
          <li className="flex items-center gap-2">✅ Google's own secure auth popup</li>
          <li className="flex items-center gap-2">✅ Files saved to your personal Drive</li>
          <li className="flex items-center gap-2">✅ Shared users can view & upload too</li>
        </ul>
        {err && <p className="text-red-500 text-xs mb-3 bg-red-50 p-2.5 rounded-xl">{err}</p>}
        <Btn onClick={connect} disabled={busy} className="w-full py-3 mb-3">
          {busy?<><Loader2 size={16} className="animate-spin"/>Connecting...</>:'Connect Google Drive'}
        </Btn>
        <button onClick={onSkip} className="text-xs text-gray-400 hover:text-gray-500 transition-colors">Skip — paste links manually</button>
      </div>
    </div>
  );
};

export default DriveSetupScreen;