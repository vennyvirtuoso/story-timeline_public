import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Btn } from './ui';
import { getEnv, getBackendUrl, loadGIS, requestDriveToken } from '../gis';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

const DriveSetupScreen = ({ user, onSetupComplete, onSkip }) => {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const handleConnect = async () => {
    setBusy(true);
    setErr('');
    try {
      if (Capacitor.isNativePlatform()) {
        const res  = await fetch(`${getBackendUrl()}/api/drive/auth-url?userId=${user.uid}&platform=android`);
        const data = await res.json();
        if (!data.authUrl) throw new Error('Failed to get auth URL');
        await Browser.open({ url: data.authUrl });
        // The app will open the system browser/chrome custom tab.
        // We do not run the popup listener or message loop here because the deep link listener
        // in App.jsx will handle the redirect callback safarnama://drive-connected?folderId=xxx
        return;
      }

      // ✅ Open popup FIRST synchronously (before any await) — required on mobile browsers
      const popup = window.open('about:blank', 'driveAuth', 'width=500,height=600');

      const res  = await fetch(`${getBackendUrl()}/api/drive/auth-url?userId=${user.uid}`);
      const data = await res.json();
      if (!data.authUrl) throw new Error('Failed to get auth URL');

      // ✅ Now navigate the already-open popup to the real URL
      if (popup && !popup.closed) {
        popup.location.href = data.authUrl;
      } else {
        // Fallback: if popup was blocked anyway, redirect current tab
        window.location.href = data.authUrl;
        return;
      }

      const handler = async (e) => {
        if (e.data?.type !== 'DRIVE_CONNECTED') return;
        window.removeEventListener('message', handler);
        popup?.close();
        const folderId = e.data.folderId;
        if (folderId) {
          await onSetupComplete(folderId, null);
        }
        setBusy(false);
      };
      window.addEventListener('message', handler);

      // ✅ Timeout fallback — if popup closed without message (mobile Safari)
      const pollTimer = setInterval(() => {
        if (popup?.closed) {
          clearInterval(pollTimer);
          window.removeEventListener('message', handler);
          // Re-check Firestore for folderId in case postMessage was missed
          import('../firebase/config').then(({ db }) => {
            import('firebase/firestore').then(({ doc, getDoc }) => {
              getDoc(doc(db, 'users', user.uid)).then(snap => {
                if (snap.exists() && snap.data().folderId) {
                  onSetupComplete(snap.data().folderId, null);
                }
                setBusy(false);
              });
            });
          });
        }
      }, 500);

    } catch (err) {
      setErr('Failed to connect Drive: ' + err.message);
      setBusy(false);
    }
  };

  const handleSkip = async () => {
    // ✅ Mark as skipped in Firestore so loadUserData never re-triggers setup
    try {
      const { db } = await import('../firebase/config');
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'users', user.uid), { driveSetupSkipped: true }, { merge: true });
    } catch {}
    onSkip();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-5">
      <div className="bg-white rounded-3xl border border-border-theme shadow-theme-md p-6 sm:p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-cream border border-border-theme rounded-full flex items-center justify-center mx-auto mb-5 text-primary">
          <svg className="w-7 h-7" viewBox="0 0 87.3 78" fill="currentColor">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"/>
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"/>
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"/>
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"/>
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-semibold text-primary mb-2">Connect Google Drive</h2>
        <p className="text-dark/60 text-sm mb-5 leading-relaxed font-sans">
          We'll create a <strong className="text-primary font-semibold">My Timeline 📖</strong> folder in your Drive for photos and videos.
        </p>
        <ul className="text-left space-y-2 mb-6 text-sm text-dark/70 bg-cream/40 border border-border-theme/40 rounded-2xl p-4 font-sans">
          <li className="flex items-center gap-2">✓ Secure authentication using Google OAuth</li>
          <li className="flex items-center gap-2">✓ Files saved directly to your personal Drive</li>
          <li className="flex items-center gap-2">✓ Shared users can view & upload too</li>
        </ul>
        {err && <p className="text-red-500 text-xs mb-4 bg-red-50 p-2.5 rounded-xl border border-red-100">{err}</p>}
        <Btn onClick={handleConnect} disabled={busy} className="w-full py-3 mb-4">
          {busy ? <><Loader2 size={16} className="animate-spin"/>Connecting...</> : 'Connect Google Drive'}
        </Btn>
        <button onClick={handleSkip} className="text-xs font-sub font-bold uppercase tracking-wider text-dark/40 hover:text-primary transition-colors">Skip</button>
      </div>
    </div>
  );
};

export default DriveSetupScreen;