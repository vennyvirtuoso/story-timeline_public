import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Calendar, Image as ImageIcon, Plus, Trash2, Edit2, Camera, MapPin, Star, Settings, Clock, X, LinkIcon, Loader2, Video, PlayCircle, Upload, LogOut, Share2, Copy, Check, Key } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, addDoc, updateDoc, onSnapshot, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';

// --- Firebase Configuration ---
const getEnv = (key) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) return import.meta.env[key];
  } catch (e) { return ''; }
  return '';
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || 'fallback',
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || 'fallback',
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || 'fallback',
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || 'fallback',
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || 'fallback',
  appId: getEnv('VITE_FIREBASE_APP_ID') || 'fallback',
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID') || 'fallback'
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// GIS module-level vars (in-memory only, never persisted)
let gisTokenClient = null;
let gisAccessToken = null;

const getBackendUrl = () => getEnv('VITE_BACKEND_URL') || 'http://localhost:8069';

// --- Link Converters ---
const convertGoogleDriveLink = (url) => {
  if (!url) return '';
  if (url.includes('google.com')) {
    const m = url.match(/\/d\/([-_\w]+)/) || url.match(/id=([-_\w]+)/);
    if (m?.[1]) return `https://lh3.googleusercontent.com/d/${m[1]}=w1000?authuser=0`;
  }
  return url;
};

const convertVideoLink = (url) => {
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
const loadGIS = () => new Promise((resolve) => {
  if (window.google?.accounts?.oauth2) { resolve(); return; }
  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.onload = resolve;
  document.head.appendChild(s);
});

const requestDriveToken = (clientId) => new Promise((resolve, reject) => {
  gisTokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (res) => {
      if (res.error) { reject(new Error(res.error)); return; }
      gisAccessToken = res.access_token;
      resolve(res.access_token);
    }
  });
  gisTokenClient.requestAccessToken({ prompt: 'consent' });
});

const uploadFileToDrive = async (file, folderId, accessToken) => {
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
  // Make file publicly readable
  await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'anyone', role: 'reader' })
  });
  return data.id;
};

// --- Styles ---
const styles = `
  @keyframes float {
    0% { transform: translateY(0) scale(0.5); opacity: 0; }
    20% { opacity: 0.4; }
    50% { transform: translateY(-100px) scale(1.1); opacity: 0.7; }
    100% { transform: translateY(-200px) scale(0.8); opacity: 0; }
  }
  .floating-heart { position: fixed; bottom: -10vh; animation: float linear infinite; pointer-events: none; z-index: 0; }
  @keyframes fadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
  .animate-fadeIn { animation: fadeIn 0.25s ease; }
  @keyframes bounceSlow { 0%,100% { transform:translateY(-4px); } 50% { transform:translateY(0); } }
  .animate-bounce-slow { animation: bounceSlow 2s infinite; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 99px; }
`;

// --- Reusable UI ---
const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  const mk = (id) => ({ id, left: Math.random()*100, size: Math.random()*28+12, duration: Math.random()*6+6, delay: Math.random()*5, color: Math.random()>0.5?'text-rose-300':'text-pink-300' });
  useEffect(() => {
    setHearts(Array.from({length:12}).map((_,i)=>mk(i)));
    const t = setInterval(() => setHearts(p=>[...p.slice(-38), mk(Date.now())]), 700);
    return ()=>clearInterval(t);
  }, []);
  return (
    <>
      <style>{styles}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        {hearts.map(h=>(
          <div key={h.id} className={`floating-heart ${h.color}`}
            style={{left:`${h.left}%`,fontSize:`${h.size}px`,animationDuration:`${h.duration}s`,animationDelay:`-${h.delay}s`,opacity:0.35}}>
            <Heart fill="currentColor"/>
          </div>
        ))}
      </div>
    </>
  );
};

const Btn = ({ children, onClick, variant='primary', className='', type='button', disabled=false }) => {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-xl transition-all duration-150 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const v = {
    primary: "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-md shadow-rose-200 px-4 py-2.5",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm px-4 py-2.5",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5",
    ghost: "text-gray-600 hover:bg-white/60 hover:text-rose-600 px-3 py-2",
    icon: "p-2 rounded-full hover:bg-white/80 text-gray-500",
    google: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow px-4 py-2.5",
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${v[variant]} ${className}`}>{children}</button>;
};

const Field = ({ label, value, onChange, placeholder, type='text', required=false, icon:Icon }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}{required&&<span className="text-rose-400 ml-0.5">*</span>}</label>
    <div className="relative">
      {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Icon size={15}/></div>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required}
        className={`w-full py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 text-sm text-gray-700 placeholder-gray-400 bg-white transition-all ${Icon?'pl-9 pr-3':'px-3'}`}/>
    </div>
  </div>
);

const TA = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 text-sm text-gray-700 placeholder-gray-400 bg-white resize-none transition-all"/>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-3xl sm:rounded-t-3xl shrink-0">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-white rounded-full transition-colors"><X size={18}/></button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

// --- Image & Video ---
const ImageSlider = ({ images, title }) => {
  if (!images?.length) return null;
  if (images.length === 1) return (
    <div className="mt-3 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
      <img src={images[0]} alt={title} className="w-full h-auto max-h-[500px] object-contain" loading="lazy" referrerPolicy="no-referrer"
        onError={e=>{e.target.onerror=null;e.target.src='https://placehold.co/600x400/ffe4e6/be123c?text=Image+Error';}}/>
    </div>
  );
  return (
    <div className="mt-3 flex overflow-x-auto snap-x snap-mandatory gap-2 pb-1">
      {images.map((url,i)=>(
        <div key={i} className="snap-center shrink-0 h-56 w-auto min-w-[180px] relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
          <img src={url} alt={`${title} ${i+1}`} className="h-full w-auto max-w-[80vw] object-contain" loading="lazy" referrerPolicy="no-referrer"
            onError={e=>{e.target.onerror=null;e.target.src='https://placehold.co/400x300/ffe4e6/be123c?text=Error';}}/>
          <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">{i+1}/{images.length}</span>
        </div>
      ))}
    </div>
  );
};

const VideoGallery = ({ videos }) => {
  if (!videos?.length) return null;
  return (
    <div className="mt-3 space-y-3">
      {videos.map((url,i)=>(
        <div key={i} className="rounded-xl overflow-hidden bg-black aspect-video">
          <iframe src={url} className="w-full h-full" allowFullScreen title={`Video ${i+1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
        </div>
      ))}
    </div>
  );
};

const EventCard = ({ event, onDelete, onEdit }) => {
  const icons = { milestone:<Star className="text-amber-400" size={16} fill="currentColor"/>, trip:<MapPin className="text-emerald-500" size={16}/>, date:<Heart className="text-rose-500" size={16} fill="currentColor"/>, general:<Calendar className="text-blue-400" size={16}/> };
  const d = new Date(event.date+(event.time?`T${event.time}`:''));
  const images = Array.isArray(event.imageUrls)?event.imageUrls:(event.imageUrl?[event.imageUrl]:[]);
  const videos = Array.isArray(event.videoUrls)?event.videoUrls:[];
  return (
    <div className="relative pl-6 md:pl-0 md:grid md:grid-cols-12 md:gap-8 group mb-10 last:mb-0">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 to-pink-100 md:left-1/2 md:-translate-x-px"/>
      <div className="absolute left-[-5px] top-5 w-3 h-3 rounded-full bg-rose-400 border-2 border-white shadow md:left-1/2 md:-translate-x-1/2 z-10"/>
      <div className="md:col-span-5 md:text-right md:pr-8 mb-1 md:mb-0 md:pt-3 order-1">
        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 inline-block">
          {d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
        </span>
        {event.time&&<p className="text-[10px] text-gray-400 mt-0.5 flex items-center md:justify-end gap-1"><Clock size={9}/>{d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</p>}
      </div>
      <div className="hidden md:block md:col-span-2 order-2"/>
      <div className="md:col-span-5 md:pl-8 order-3">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/60 hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-rose-50">{icons[event.type]||icons.general}</div>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-tight">{event.title}</h4>
            </div>
            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-all ml-2 shrink-0">
              <button onClick={()=>onEdit(event)} className="text-gray-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full"><Edit2 size={13}/></button>
              <button onClick={()=>onDelete(event.id)} className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full"><Trash2 size={13}/></button>
            </div>
          </div>
          {event.description&&<p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{event.description}</p>}
          <ImageSlider images={images} title={event.title}/>
          <VideoGallery videos={videos}/>
        </div>
      </div>
    </div>
  );
};

// --- Login Screen ---
const LoginScreen = ({ onGoogleLogin, onShareTokenLogin, isLoading }) => {
  const [token, setToken] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    setErr('');
    const r = await onShareTokenLogin(token.trim().toUpperCase());
    if (!r.success) setErr(r.error || 'Invalid code');
  };
  // Check URL for token param
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get('token');
    if (t) { setToken(t.toUpperCase()); setShowInput(true); }
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center p-5 relative overflow-hidden">
      <FloatingHearts/>
      <div className="relative z-10 w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200">
            <Heart fill="white" size={30}/>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-1">Love Story</h1>
          <p className="text-gray-400 text-sm">Your memories, forever</p>
        </div>
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6 space-y-3">
          <Btn variant="google" onClick={onGoogleLogin} disabled={isLoading} className="w-full py-3 text-sm">
            {isLoading ? <Loader2 className="animate-spin" size={18}/> : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Sign in with Google
          </Btn>
          <div className="flex items-center gap-2"><div className="flex-1 border-t border-gray-200"/><span className="text-[11px] text-gray-400 font-medium">OR</span><div className="flex-1 border-t border-gray-200"/></div>
          {!showInput ? (
            <button onClick={()=>setShowInput(true)} className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-rose-200 rounded-xl text-rose-400 hover:bg-rose-50 text-sm transition-colors">
              <Key size={14}/> I have a share code
            </button>
          ) : (
            <form onSubmit={submit} className="space-y-2">
              <input value={token} onChange={e=>setToken(e.target.value)} placeholder="e.g. ABC123" maxLength={8}
                className="w-full px-4 py-3 border border-rose-200 rounded-xl text-center text-xl font-black tracking-widest uppercase focus:ring-2 focus:ring-rose-200 outline-none bg-white text-rose-500 placeholder-rose-200"/>
              {err && <p className="text-red-500 text-xs text-center">{err}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={()=>{setShowInput(false);setErr('');}} className="flex-1 py-2 border border-gray-200 rounded-xl text-gray-400 text-sm hover:bg-gray-50">Back</button>
                <button type="submit" disabled={isLoading} className="flex-1 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-1">
                  {isLoading&&<Loader2 size={14} className="animate-spin"/>} Enter
                </button>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 px-4">Sign in to create your story or enter a share code from your partner</p>
      </div>
    </div>
  );
};

// --- Share Modal ---
const ShareModal = ({ isOpen, onClose, shareToken, onGenerateToken }) => {
  const [copied, setCopied] = useState('');
  const [generating, setGenerating] = useState(false);
  const copy = (text, key) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(()=>setCopied(''),2000); };
  const generate = async () => { setGenerating(true); await onGenerateToken(); setGenerating(false); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Story 💕">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Give your partner this code — they can view and add memories without signing in.</p>
        {shareToken ? (
          <>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 text-center border border-rose-100">
              <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-widest font-semibold">Share Code</p>
              <p className="text-5xl font-black tracking-[0.3em] text-rose-500 my-3">{shareToken}</p>
              <Btn variant="secondary" onClick={()=>copy(shareToken,'code')} className="mx-auto text-sm">
                {copied==='code'?<><Check size={14} className="text-green-500"/>Copied!</>:<><Copy size={14}/>Copy Code</>}
              </Btn>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[11px] text-gray-400 mb-1.5 font-semibold">Share Link</p>
              <div className="flex gap-2 items-center">
                <code className="text-[11px] text-gray-600 flex-1 truncate bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                  {window.location.origin}?token={shareToken}
                </code>
                <button onClick={()=>copy(`${window.location.origin}?token=${shareToken}`,'link')}
                  className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0">
                  {copied==='link'?<Check size={13} className="text-green-500"/>:<Copy size={13}/>}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-amber-600 text-center bg-amber-50 rounded-lg p-2">⚠️ Anyone with this code can add memories to your page</p>
            <Btn variant="danger" onClick={generate} disabled={generating} className="w-full text-sm">
              {generating?<><Loader2 size={14} className="animate-spin"/>Regenerating...</>:'Regenerate Code'}
            </Btn>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 size={24} className="text-rose-400"/>
            </div>
            <p className="text-gray-400 text-sm mb-4">No share code yet</p>
            <Btn onClick={generate} disabled={generating} className="mx-auto">
              {generating?<><Loader2 size={14} className="animate-spin"/>Generating...</>:<><Share2 size={14}/>Generate Code</>}
            </Btn>
          </div>
        )}
      </div>
    </Modal>
  );
};

// --- Drive Setup Screen ---
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
      // Create folder client-side
      const fr = await fetch('https://www.googleapis.com/drive/v3/files', {
        method:'POST', headers:{'Authorization':`Bearer ${accessToken}`,'Content-Type':'application/json'},
        body: JSON.stringify({name:'Love Story 💕', mimeType:'application/vnd.google-apps.folder'})
      });
      if (!fr.ok) { const e=await fr.json(); throw new Error(e?.error?.message||'Folder creation failed'); }
      const { id: folderId } = await fr.json();
      // Make folder public
      await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}/permissions`, {
        method:'POST', headers:{'Authorization':`Bearer ${accessToken}`,'Content-Type':'application/json'},
        body: JSON.stringify({type:'anyone', role:'reader'})
      });
      // Save folderId to backend/Firestore
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

// ===================== MAIN APP =====================
export default function App() {
  const [user, setUser] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [isSharedAccess, setIsSharedAccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const [driveSetupNeeded, setDriveSetupNeeded] = useState(false);
  const [folderId, setFolderId] = useState(null);
  const [driveAccessToken, setDriveAccessToken] = useState(null);

  const [shareToken, setShareToken] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('timeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tempImageLink, setTempImageLink] = useState('');
  const [tempVideoLink, setTempVideoLink] = useState('');
  const fileRef = useRef(null);
  const videoRef = useRef(null);

  const [memories, setMemories] = useState([]);
  const [config, setConfig] = useState({ partner1:'', partner2:'', startDate:'' });
  const [isLoading, setIsLoading] = useState(true);
  const emptyEvent = () => ({ title:'', date:new Date().toISOString().split('T')[0], time:'', description:'', type:'general', imageUrls:[], videoUrls:[] });
  const [newEvent, setNewEvent] = useState(emptyEvent());

  // Timer
  useEffect(() => { const t=setInterval(()=>setCurrentTime(new Date()),1000); return()=>clearInterval(t); }, []);

  // Check URL token on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get('token');
    if (t) handleShareTokenLogin(t.toUpperCase());
  }, []);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u && !isSharedAccess) { setUser(u); await loadUserData(u.uid); }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [isSharedAccess]);

  const loadUserData = async (uid) => {
    setIsLoading(true);
    try {
      const ref = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const d = snap.data();
        const savedFolderId = d.folderId || null;
        setFolderId(savedFolderId);
        setShareToken(d.shareToken || null);
        setOwnerId(uid);
        // Only show drive setup if they have never connected Drive
        setDriveSetupNeeded(!savedFolderId);
        // Note: gisAccessToken is always null on page reload (in-memory only)
        // User will be prompted to re-authorise Drive when they try to upload
        // This is expected — GIS tokens are not persisted for security reasons
      } else {
        // Brand new user — create their document
        await setDoc(ref, {
          createdAt: serverTimestamp(),
          email: auth.currentUser?.email || '',
          uid: uid
        });
        setOwnerId(uid);
        setDriveSetupNeeded(true);
      }
    } catch(e) {
      console.error('loadUserData error:', e);
      // Even if load fails, set ownerId so the app can render
      setOwnerId(uid);
    }
    setIsLoading(false);
  };

  // Realtime listeners
  useEffect(() => {
    if (!ownerId) return;
    setIsLoading(true);
    const u1 = onSnapshot(collection(db,'users',ownerId,'config'), snap => {
      const d = snap.docs.find(d=>d.id==='main')?.data();
      if (d) setConfig(d); else if (!isSharedAccess) setIsConfigModalOpen(true);
      setIsLoading(false);
    }, e=>{ console.error(e); setIsLoading(false); });
    const u2 = onSnapshot(collection(db,'users',ownerId,'memories'), snap => {
      const list = snap.docs.map(d=>({ id:d.id,...d.data(), imageUrls:d.data().imageUrls||(d.data().imageUrl?[d.data().imageUrl]:[]), videoUrls:d.data().videoUrls||[] }));
      list.sort((a,b)=>new Date(b.date+(b.time?`T${b.time}`:''))-new Date(a.date+(a.time?`T${a.time}`:'')));
      setMemories(list);
    }, e=>console.error(e));
    return()=>{ u1(); u2(); };
  }, [ownerId]);

  // Auth handlers
  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    try {
      const r = await signInWithPopup(auth, googleProvider);
      setUser(r.user);
      await loadUserData(r.user.uid);
    } catch(e) { alert('Login failed: '+e.message); }
    finally { setLoginLoading(false); }
  };

  const handleShareTokenLogin = async (token) => {
    setLoginLoading(true);
    try {
      const snap = await getDoc(doc(db,'shareTokens',token));
      if (!snap.exists()) { setLoginLoading(false); return {success:false,error:'Invalid or expired share code'}; }
      const { userId } = snap.data();
      setOwnerId(userId);
      setIsSharedAccess(true);
      setShareToken(token);
      const ud = await getDoc(doc(db,'users',userId));
      if (ud.exists()) setFolderId(ud.data().folderId||null);
      setLoginLoading(false);
      return {success:true};
    } catch(e) { setLoginLoading(false); return {success:false,error:e.message}; }
  };

  const handleSignOut = async () => {
    if (isSharedAccess) {
      setIsSharedAccess(false); setOwnerId(null); setUser(null);
      setShareToken(null); setMemories([]);
      window.history.replaceState({},'',window.location.pathname);
      return;
    }
    await signOut(auth);
    setUser(null); setOwnerId(null); setFolderId(null); setShareToken(null); setMemories([]);
  };

  // Drive setup
  const handleDriveSetupComplete = async (newFolderId, accessToken) => {
    try {
      // Persist first — if this fails we don't want to show the main app
      await setDoc(doc(db,'users',user.uid), { folderId: newFolderId, updatedAt: serverTimestamp() }, { merge: true });
      setFolderId(newFolderId);
      setDriveAccessToken(accessToken);
      gisAccessToken = accessToken;
      setDriveSetupNeeded(false);
    } catch(e) {
      alert('Failed to save Drive setup: ' + e.message + '\nPlease try again.');
    }
  };

  // Share token — FIX: use setDoc with merge:true instead of updateDoc
  const generateShareToken = async () => {
    if (!user) return;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const token = Array.from({length:6},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
    try {
      // Delete old token from shareTokens collection
      if (shareToken) {
        try { await deleteDoc(doc(db,'shareTokens',shareToken)); } catch(_) {}
      }
      // Write new token lookup doc
      await setDoc(doc(db,'shareTokens',token), {
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      // Save token reference on user doc — setDoc merge:true works even if fields missing
      await setDoc(doc(db,'users',user.uid), { shareToken: token }, { merge: true });
      setShareToken(token);
    } catch(e) {
      console.error('generateShareToken error:', e);
      alert('Failed to generate share code: ' + e.message + '\n\nMake sure Firestore rules allow writes to shareTokens collection.');
    }
  };

  // GIS token
  const ensureDriveToken = async () => {
    if (gisAccessToken) return gisAccessToken;
    const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');
    await loadGIS();
    const t = await requestDriveToken(clientId);
    setDriveAccessToken(t);
    return t;
  };

  // Event handlers
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!ownerId) return;
    try {
      // Save config to its own subcollection doc (safe, doesn't affect user root doc)
      await setDoc(doc(db,'users',ownerId,'config','main'), {
        ...config,
        updatedAt: serverTimestamp()
      });
      setIsConfigModalOpen(false);
    } catch(e) { alert('Error saving settings: '+e.message); }
  };

  const openAdd = () => { setNewEvent(emptyEvent()); setTempImageLink(''); setTempVideoLink(''); setEditingId(null); setIsAddModalOpen(true); };
  const openEdit = (ev) => { setNewEvent({title:ev.title,date:ev.date,time:ev.time||'',description:ev.description,type:ev.type,imageUrls:ev.imageUrls||[],videoUrls:ev.videoUrls||[]}); setTempImageLink(''); setTempVideoLink(''); setEditingId(ev.id); setIsAddModalOpen(true); };

  const addImageLink = () => { if (!tempImageLink) return; setNewEvent(p=>({...p,imageUrls:[...p.imageUrls,convertGoogleDriveLink(tempImageLink)]})); setTempImageLink(''); };
  const removeImage = (i) => setNewEvent(p=>({...p,imageUrls:p.imageUrls.filter((_,x)=>x!==i)}));
  const addVideoLink = () => { if (!tempVideoLink) return; setNewEvent(p=>({...p,videoUrls:[...p.videoUrls,convertVideoLink(tempVideoLink)]})); setTempVideoLink(''); };
  const removeVideo = (i) => setNewEvent(p=>({...p,videoUrls:p.videoUrls.filter((_,x)=>x!==i)}));

  const handleUpload = async (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!folderId) { alert('Connect Google Drive first to upload files.'); return; }
    setIsUploading(true);
    try {
      const token = await ensureDriveToken();
      const fileId = await uploadFileToDrive(file, folderId, token);
      if (mediaType==='image') {
        setNewEvent(p=>({...p,imageUrls:[...p.imageUrls,`https://lh3.googleusercontent.com/d/${fileId}=w1000?authuser=0`]}));
      } else {
        setNewEvent(p=>({...p,videoUrls:[...p.videoUrls,`https://drive.google.com/file/d/${fileId}/preview`]}));
      }
    } catch(e) { alert('Upload failed: '+e.message); }
    finally {
      setIsUploading(false);
      if (fileRef.current) fileRef.current.value='';
      if (videoRef.current) videoRef.current.value='';
    }
  };

  // FIX: use addDoc for new memories instead of setDoc(doc(collection(...)))
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!ownerId) return;
    setIsSaving(true);
    try {
      const data = { ...newEvent, imageUrl: newEvent.imageUrls[0]||'', updatedAt: serverTimestamp() };
      if (editingId) {
        await updateDoc(doc(db,'users',ownerId,'memories',editingId), data);
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db,'users',ownerId,'memories'), data); // FIX: addDoc auto-generates ID
      }
      setIsAddModalOpen(false);
      setNewEvent(emptyEvent());
    } catch(e) { alert('Error saving memory: '+e.message); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this memory?')) return;
    try { await deleteDoc(doc(db,'users',ownerId,'memories',id)); } catch(e) { console.error(e); }
  };

  // Duration
  const duration = useMemo(() => {
    if (!config.startDate) return {years:0,months:0,days:0,hours:0,minutes:0,seconds:0};
    const s=new Date(config.startDate), n=currentTime;
    if (n<s) return {years:0,months:0,days:0,hours:0,minutes:0,seconds:0};
    let [yr,mo,dy,hr,mi,se] = [n.getFullYear()-s.getFullYear(),n.getMonth()-s.getMonth(),n.getDate()-s.getDate(),n.getHours()-s.getHours(),n.getMinutes()-s.getMinutes(),n.getSeconds()-s.getSeconds()];
    if(se<0){se+=60;mi--;} if(mi<0){mi+=60;hr--;} if(hr<0){hr+=24;dy--;} if(dy<0){dy+=new Date(n.getFullYear(),n.getMonth(),0).getDate();mo--;} if(mo<0){mo+=12;yr--;}
    return {years:yr,months:mo,days:dy,hours:hr,minutes:mi,seconds:se};
  }, [config.startDate, currentTime]);

  const galleryImages = useMemo(()=>memories.flatMap(m=>(m.imageUrls||[]).map(url=>({id:m.id+url,url,title:m.title,date:m.date}))), [memories]);

  // --- Render ---
  if (authLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading...</p>
    </div>
  );

  if (!user && !isSharedAccess) return <LoginScreen onGoogleLogin={handleGoogleLogin} onShareTokenLogin={handleShareTokenLogin} isLoading={loginLoading}/>;

  if (user && !isSharedAccess && driveSetupNeeded) return <DriveSetupScreen user={user} onSetupComplete={handleDriveSetupComplete} onSkip={()=>setDriveSetupNeeded(false)}/>;

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading your story...</p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-pink-50 text-gray-800 font-sans relative overflow-x-hidden">
      <FloatingHearts/>

      {/* Shared banner */}
      {isSharedAccess && (
        <div className="relative z-40 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-center py-2 px-4 text-xs flex items-center justify-center gap-2">
          <Heart size={12} fill="white"/> Viewing a shared love story
          <button onClick={handleSignOut} className="underline text-white/80 ml-2">Leave</button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-rose-100/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-3">

          {/* Top row: title + controls */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <Heart fill="currentColor" className="text-rose-400 shrink-0 animate-bounce-slow" size={20}/>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 leading-tight truncate">
                  {config.partner1||'Partner 1'} & {config.partner2||'Partner 2'}
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                  Since {config.startDate ? new Date(config.startDate).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}) : '—'}
                </p>
              </div>
            </div>
            {!isSharedAccess && (
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button onClick={()=>setIsShareModalOpen(true)} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-rose-500 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm transition-colors">
                  <Share2 size={11}/><span className="hidden sm:inline">Share</span>
                </button>
                <button onClick={()=>setIsConfigModalOpen(true)} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm transition-colors">
                  <Settings size={11}/><span className="hidden sm:inline">Settings</span>
                </button>
                <button onClick={handleSignOut} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-red-500 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm transition-colors">
                  <LogOut size={11}/><span className="hidden sm:inline">Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Duration counters */}
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-3">
            {[['Yrs',duration.years],['Mo',duration.months],['Days',duration.days],['Hrs',duration.hours],['Min',duration.minutes],['Sec',duration.seconds]].map(([label,val],i)=>(
              <div key={i} className="bg-white/70 rounded-xl p-1.5 sm:p-2 text-center border border-rose-100 shadow-sm">
                <div className="text-base sm:text-xl font-black text-rose-500 leading-none">{val}</div>
                <div className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button onClick={()=>setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab==='timeline'?'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-sm':'text-gray-500 hover:bg-white/70 hover:text-rose-500'}`}>
              <Clock size={13}/><span>Timeline</span>
            </button>
            <button onClick={()=>setActiveTab('gallery')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab==='gallery'?'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-sm':'text-gray-500 hover:bg-white/70 hover:text-rose-500'}`}>
              <ImageIcon size={13}/><span>Gallery</span>{galleryImages.length>0&&<span className="bg-white/30 text-[10px] px-1.5 rounded-full">{galleryImages.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-8 pb-28 relative z-10">
        {activeTab==='timeline' && (
          memories.length===0 ? (
            <div className="text-center py-20 px-6 bg-white/60 rounded-3xl border-2 border-dashed border-rose-200 max-w-sm mx-auto mt-4">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-400"><Heart size={32}/></div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Your story starts here</h3>
              <p className="text-gray-400 text-sm mb-6">Add your first memory together</p>
              <Btn onClick={openAdd}>Add First Memory</Btn>
            </div>
          ) : (
            <div>
              {memories.map(ev=><EventCard key={ev.id} event={ev} onDelete={handleDelete} onEdit={openEdit}/>)}
              <div className="flex justify-center mt-12">
                <span className="bg-rose-100 text-rose-500 px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Heart size={12} fill="currentColor"/> To be continued...
                </span>
              </div>
            </div>
          )
        )}

        {activeTab==='gallery' && (
          galleryImages.length===0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300"><Camera size={32}/></div>
              <p className="text-gray-400 text-sm">Add photos to memories to see them here</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
              {galleryImages.map((img,i)=>(
                <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group relative bg-white border border-gray-100">
                  <img src={img.url} alt={img.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <p className="text-white font-semibold text-xs">{img.title}</p>
                    <p className="text-white/70 text-[10px]">{new Date(img.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>

      {/* FAB */}
      <button onClick={openAdd}
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-rose-300/50 transition-transform hover:scale-110 active:scale-95 z-40">
        <Plus size={24} strokeWidth={2.5}/>
      </button>

      {/* Add/Edit Modal */}
      <Modal isOpen={isAddModalOpen} onClose={()=>setIsAddModalOpen(false)} title={editingId?'Edit Memory':'New Memory 💕'}>
        <form onSubmit={handleSaveEvent}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" type="date" value={newEvent.date} onChange={v=>setNewEvent({...newEvent,date:v})} required icon={Calendar}/>
            <Field label="Time" type="time" value={newEvent.time} onChange={v=>setNewEvent({...newEvent,time:v})} icon={Clock}/>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Type</label>
            <select value={newEvent.type} onChange={e=>setNewEvent({...newEvent,type:e.target.value})}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400">
              <option value="general">General Memory</option>
              <option value="milestone">Milestone 🌟</option>
              <option value="date">Date Night ❤️</option>
              <option value="trip">Trip ✈️</option>
            </select>
          </div>
          <Field label="Title" placeholder="e.g., Our First Coffee" value={newEvent.title} onChange={v=>setNewEvent({...newEvent,title:v})} required/>
          <TA label="Story" placeholder="What happened? How did you feel?" value={newEvent.description} onChange={v=>setNewEvent({...newEvent,description:v})}/>

          {/* Photos */}
          <div className="mb-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Photos</span>
              {isUploading && <Loader2 size={13} className="animate-spin text-rose-400"/>}
            </div>
            {folderId ? (
              <label className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border border-rose-200 rounded-xl cursor-pointer hover:bg-rose-50 transition-colors text-xs text-rose-500 font-semibold mb-2">
                <Upload size={13}/> Upload to Drive
                <input type="file" className="hidden" accept="image/*" ref={fileRef} onChange={e=>handleUpload(e,'image')} disabled={isUploading}/>
              </label>
            ) : (
              <p className="text-[11px] text-amber-500 bg-amber-50 p-2 rounded-lg mb-2">⚡ Connect Drive to upload directly</p>
            )}
            <div className="flex gap-2 items-center text-[10px] text-gray-400 uppercase tracking-widest mb-2">
              <div className="flex-1 border-t border-gray-200"/>OR PASTE<div className="flex-1 border-t border-gray-200"/>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input value={tempImageLink} onChange={e=>setTempImageLink(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addImageLink())}
                  placeholder="Drive or Imgur link" className="w-full pl-8 pr-2 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 bg-white outline-none focus:ring-2 focus:ring-rose-200"/>
              </div>
              <button type="button" onClick={addImageLink} className="bg-rose-100 text-rose-500 px-3 rounded-xl text-xs font-semibold hover:bg-rose-200">Add</button>
            </div>
            <div className="mt-2 space-y-1.5 max-h-28 overflow-y-auto">
              {newEvent.imageUrls.map((url,i)=>(
                <div key={i} className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0"><img src={url} alt="" className="w-full h-full object-cover"/></div>
                  <p className="text-[10px] text-gray-400 truncate flex-1">{url}</p>
                  <button type="button" onClick={()=>removeImage(i)} className="text-gray-300 hover:text-red-400 shrink-0"><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Videos</span>
            </div>
            {folderId && (
              <label className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border border-rose-200 rounded-xl cursor-pointer hover:bg-rose-50 transition-colors text-xs text-rose-500 font-semibold mb-2">
                <Upload size={13}/> Upload to Drive
                <input type="file" className="hidden" accept="video/*" ref={videoRef} onChange={e=>handleUpload(e,'video')} disabled={isUploading}/>
              </label>
            )}
            <div className="flex gap-2 items-center text-[10px] text-gray-400 uppercase tracking-widest mb-2">
              <div className="flex-1 border-t border-gray-200"/>OR PASTE<div className="flex-1 border-t border-gray-200"/>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Video size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input value={tempVideoLink} onChange={e=>setTempVideoLink(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addVideoLink())}
                  placeholder="YouTube or Drive link" className="w-full pl-8 pr-2 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 bg-white outline-none focus:ring-2 focus:ring-rose-200"/>
              </div>
              <button type="button" onClick={addVideoLink} className="bg-rose-100 text-rose-500 px-3 rounded-xl text-xs font-semibold hover:bg-rose-200">Add</button>
            </div>
            <div className="mt-2 space-y-1.5 max-h-28 overflow-y-auto">
              {newEvent.videoUrls.map((url,i)=>(
                <div key={i} className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0"><PlayCircle size={14} className="text-gray-300"/></div>
                  <p className="text-[10px] text-gray-400 truncate flex-1">{url}</p>
                  <button type="button" onClick={()=>removeVideo(i)} className="text-gray-300 hover:text-red-400 shrink-0"><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Btn variant="secondary" onClick={()=>setIsAddModalOpen(false)} className="flex-1">Cancel</Btn>
            <Btn type="submit" disabled={isSaving||isUploading} className="flex-1">
              {isSaving?<><Loader2 size={15} className="animate-spin"/>Saving...</>:editingId?'Update':'Save Memory'}
            </Btn>
          </div>
        </form>
      </Modal>

      {/* Settings Modal */}
      {!isSharedAccess && (
        <Modal isOpen={isConfigModalOpen} onClose={()=>setIsConfigModalOpen(false)} title="Relationship Settings">
          <form onSubmit={handleSaveConfig}>
            <Field label="Partner 1 Name" value={config.partner1} onChange={v=>setConfig({...config,partner1:v})} placeholder="e.g., Romeo"/>
            <Field label="Partner 2 Name" value={config.partner2} onChange={v=>setConfig({...config,partner2:v})} placeholder="e.g., Juliet"/>
            <Field label="Start Date" type="date" value={config.startDate} onChange={v=>setConfig({...config,startDate:v})} required icon={Calendar}/>
            {!folderId && (
              <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
                ⚡ <button type="button" onClick={()=>{setIsConfigModalOpen(false);setDriveSetupNeeded(true);}} className="underline font-semibold">Connect Google Drive</button> to enable direct uploads
              </div>
            )}
            <div className="mt-5"><Btn type="submit" className="w-full">Save Changes</Btn></div>
          </form>
        </Modal>
      )}

      {/* Share Modal */}
      {!isSharedAccess && (
        <ShareModal isOpen={isShareModalOpen} onClose={()=>setIsShareModalOpen(false)} shareToken={shareToken} onGenerateToken={generateShareToken}/>
      )}
    </div>
  );
}
