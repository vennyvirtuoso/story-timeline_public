import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Plus } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/config';
import styles from './utils/styles';
import { useAuth }          from './hooks/useAuth';
import { useMemories }      from './hooks/useMemories';
import { useDrive }         from './hooks/useDrive';
import { useEventForm }     from './hooks/useEventForm';
import { usePlan }          from './hooks/usePlan';
import { useDuration }      from './hooks/useDuration';
import { useCollaboration } from './hooks/useCollaboration';
import { useViewerToken }   from './hooks/useViewerToken';
import { useOwnerFolderId } from './hooks/useOwnerFolderId';
import AppHeader            from './components/AppHeader';
import MemoryModal          from './components/MemoryModal';
import ManageBillingButton from './components/ManageBillingButton';
import SettingsModal        from './components/SettingsModal';
import LoginScreen          from './components/LoginScreen';
import HeaderLogo             from './components/HeaderLogo';
import ShareModal           from './components/ShareModal';
import DriveSetupScreen     from './components/DriveSetupScreen';
import FloatingElements     from './components/FloatingElements';
import PricingModal         from './components/PricingModal';
import CollaborateButton    from './components/CollaborateButton';
import FreePlanBanner       from './components/FreePlanBanner';
import { CollabBanner, ViewerBanner } from './components/CollabBanner';
import MemoryLimitBar       from './components/MemoryLimitBar';
import EmptyTimeline        from './components/EmptyTimeline';
import GalleryTab           from './components/GalleryTab';
import { EventCard }        from './components/MediaComponents';
import { getTheme }         from './utils/themes';
import { Link }             from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import JournalCover from './components/JournalCover';
import DreamJar from './components/DreamJar';

// ─── Memory Wall Shadow & Light Motes Components ───────────────────────────────
const LeafShadows = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none rounded-3xl">
    <svg className="absolute w-[160%] h-[160%] -top-1/3 -left-1/3 opacity-[0.16] mix-blend-multiply blur-xl animate-leaf-sway" viewBox="0 0 800 600">
      <path d="M100,200 Q150,100 200,200 T300,200 Q350,150 400,250 T500,200 Q600,100 650,250 T750,200" fill="none" stroke="#2c3e2e" strokeWidth="110" strokeLinecap="round" />
      <path d="M50,400 Q150,300 250,400 T450,400 Q550,350 650,450 T750,400" fill="none" stroke="#2c3e2e" strokeWidth="130" strokeLinecap="round" />
      <path d="M300,100 Q400,50 500,120 T650,100" fill="none" stroke="#2c3e2e" strokeWidth="90" strokeLinecap="round" />
    </svg>
  </div>
);

const LightMotesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.1, // Slight upward drift
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.005 + 0.002,
      fading: Math.random() > 0.5,
    }));

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Soft fade opacity cycle
        if (p.fading) {
          p.alpha -= p.fadeSpeed;
          if (p.alpha <= 0.1) p.fading = false;
        } else {
          p.alpha += p.fadeSpeed;
          if (p.alpha >= 0.6) p.fading = true;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grad.addColorStop(0, `rgba(253, 224, 71, ${p.alpha})`);
        grad.addColorStop(0.4, `rgba(251, 191, 36, ${p.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-3xl"
    />
  );
};

// ─── Cute Scrapbook Sticker Elements ──────────────────────────────────────────
const CuteButterfly = () => (
  <div className="absolute top-[15%] right-[-24px] z-20 pointer-events-auto cursor-pointer group animate-float-gentle" style={{ perspective: '100px' }}>
    <svg className="w-8 h-8 text-pink-400/85 drop-shadow-[1px_2px_2.5px_rgba(0,0,0,0.12)] animate-butterfly" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 10C11.5 5 7 2 5 2C2.5 2 1 4 1 6.5C1 10.5 6 12 12 12.5C18 12 23 10.5 23 6.5C23 4 21.5 2 19 2C17 2 12.5 5 12 10Z"/>
      <path d="M12 13.5C11.5 17.5 8 21 6 21C4.5 21 3.5 20 3.5 18.5C3.5 16 7 14.5 12 14C17 14.5 20.5 16 20.5 18.5C20.5 20 19.5 21 18 21C16 21 12.5 17.5 12 13.5Z" opacity="0.8"/>
    </svg>
    <span className="absolute bottom-full right-0 bg-white/90 border border-pink-100 text-[9px] text-pink-500 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-y-[-4px]">Flutter! 🦋</span>
  </div>
);

const CuteDaisy = () => (
  <div className="absolute top-[40%] left-[-22px] z-20 pointer-events-auto cursor-pointer group animate-wiggle">
    <svg className="w-9 h-9 text-amber-400 drop-shadow-[1px_2px_2.5px_rgba(0,0,0,0.12)] hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3.5" fill="#f59e0b" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <circle
            key={i}
            cx="12"
            cy="6"
            r="2.5"
            fill="#ffffff"
            transform={`rotate(${angle} 12 12)`}
            stroke="#fbbf24"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
    <span className="absolute bottom-full left-0 bg-white/90 border border-amber-100 text-[9px] text-amber-600 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-y-[-4px]">Grow together 🌼</span>
  </div>
);

const CuteMixTape = () => (
  <div className="absolute bottom-[20%] left-[-26px] z-20 pointer-events-auto cursor-pointer group animate-float-gentle" style={{ animationDelay: '1s' }}>
    <div className="w-12 h-8 bg-sky-200/95 border-2 border-sky-400/50 rounded-md p-1 flex flex-col justify-between shadow-[2px_3px_5px_rgba(0,0,0,0.08)] -rotate-[8deg] hover:rotate-0 hover:scale-110 transition-all">
      <div className="w-full h-4.5 bg-sky-100/90 rounded-sm flex items-center justify-center gap-1 px-0.5">
        <div className="w-2 h-2 rounded-full border border-sky-300 bg-sky-50 flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-sky-400 animate-spin" style={{ animationDuration: '3s' }}/></div>
        <div className="w-2 h-2 rounded-full border border-sky-300 bg-sky-50 flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-sky-400 animate-spin" style={{ animationDuration: '3s' }}/></div>
      </div>
      <span className="text-[5.5px] font-sans font-extrabold text-sky-600/80 tracking-tighter text-center">OUR SONG 🎵</span>
    </div>
    <span className="absolute bottom-full left-0 bg-white/90 border border-sky-100 text-[9px] text-sky-500 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-y-[-4px]">Play! 📻</span>
  </div>
);

const CuteLoveLetter = () => (
  <div className="absolute top-[65%] right-[-24px] z-20 pointer-events-auto cursor-pointer group animate-wiggle" style={{ animationDelay: '0.5s' }}>
    <div className="w-10 h-7 bg-rose-50 border-2 border-rose-300/60 rounded-md relative flex items-center justify-center shadow-[2px_3px_5px_rgba(0,0,0,0.08)] rotate-[15deg] hover:rotate-0 hover:scale-110 transition-all">
      <div className="absolute inset-0 border-t-[7px] border-t-rose-200/50 border-x-[18px] border-x-transparent border-b-transparent pointer-events-none"/>
      <Heart className="text-rose-500 fill-rose-500" size={10} />
    </div>
    <span className="absolute bottom-full right-0 bg-white/90 border border-rose-100 text-[9px] text-rose-500 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-y-[-4px]">For You 💌</span>
  </div>
);

const CuteSparkleStar = () => (
  <div className="absolute top-[5%] left-[-20px] z-20 pointer-events-auto cursor-pointer group animate-shimmer-slow">
    <svg className="w-7 h-7 text-yellow-400 hover:scale-125 transition-transform" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"/>
    </svg>
    <span className="absolute bottom-full left-0 bg-white/90 border border-yellow-100 text-[9px] text-yellow-600 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-y-[-4px]">Dream ✨</span>
  </div>
);

export default function App() {
  <HeaderLogo />
  const {
    user, ownerId, timelineId, role,
    isSharedAccess, authLoading, loginLoading,
    folderId, setFolderId,
    driveSetupNeeded, setDriveSetupNeeded,
    handleGoogleLogin, handleShareTokenLogin, handleSignOut,
    setTimelineId, setOwnerId, setRole, setIsSharedAccess, setIsCollaborator,
  } = useAuth();

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isShareModalOpen,  setIsShareModalOpen]  = useState(false);
  const [activeTab,         setActiveTab]         = useState('timeline');
  const [isPricingOpen,     setIsPricingOpen]     = useState(false);

  const fileRef  = useRef(null);
  const videoRef = useRef(null);

  const isViewer     = role === 'viewer';
  const isOwner      = role === 'owner';
  const isCollabRole = role === 'collaborator';
  const canEdit      = isOwner || isCollabRole;

  const { memories, config, setConfig, isLoading } = useMemories(timelineId, role, () => setIsConfigModalOpen(true), ownerId);
  const theme    = getTheme(config?.theme || 'love');
  const duration = useDuration(config?.startDate);
  const [layoutMode, setLayoutMode] = useState('journal'); // 'journal' | 'wall'

  // Magical Click-Burst Particle Effect for Couples
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't burst on text inputs
      if (
        e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.closest('input') || 
        e.target.closest('textarea')
      ) {
        return;
      }
      
      // Only burst on interactive elements (buttons, links, clickable layout blocks, svgs)
      if (
        e.target.closest('button') === null && 
        e.target.closest('a') === null && 
        e.target.closest('[role="button"]') === null && 
        !e.target.classList.contains('cursor-pointer') && 
        e.target.tagName !== 'path' && 
        e.target.tagName !== 'svg'
      ) {
        return;
      }

      const themeId = config?.theme || 'love';
      const count = 10;
      const newParticles = [];
      const x = e.clientX;
      const y = e.clientY;
      const colors = themeId === 'love' 
        ? ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#b6813c'] 
        : themeId === 'ocean'
        ? ['#0d9488', '#0f766e', '#0284c7', '#38bdf8', '#06b6d4']
        : themeId === 'forest'
        ? ['#15803d', '#166534', '#854d0e', '#22c55e', '#84cc16']
        : themeId === 'sunset'
        ? ['#c2410c', '#b45309', '#fb923c', '#fdba74', '#ea580c']
        : ['#6d28d9', '#7c3aed', '#db2777', '#a78bfa', '#f472b6'];
        
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 45 + 15;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 10;
        const size = Math.random() * 8 + 6;
        const id = `${Date.now()}-${i}-${Math.random()}`;
        const rot = Math.random() * 360;
        newParticles.push({ id, x, y, tx, ty, size, color: colors[i % colors.length], rot });
      }
      
      setParticles(p => [...p.slice(-30), ...newParticles]);
      setTimeout(() => {
        setParticles(p => p.filter(pt => !newParticles.some(np => np.id === pt.id)));
      }, 900);
    };
    
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [config?.theme]);

  const { isPro, limits, refreshLimits, planCustomerId } = usePlan(ownerId, timelineId, isSharedAccess);

  const { isUploadingImage, isUploadingVideo, resetDriveToken, handleDriveSetupComplete, handleUpload: _handleUpload } =
    useDrive(user, folderId, setFolderId, setDriveSetupNeeded, timelineId);

  const form          = useEventForm(timelineId, user?.uid);
  const ownerFolderId = useOwnerFolderId(isCollabRole, ownerId);
  const collab        = useCollaboration(user, timelineId);
  const viewer        = useViewerToken(user, timelineId, refreshLimits);

  const effectiveFolderId = isCollabRole ? ownerFolderId : folderId;
  const handleUpload = (e, mediaType) => _handleUpload(e, mediaType, form.setNewEvent, fileRef, videoRef, isCollabRole);

  // Load saved tokens when user changes — skip reset if already in collab session
  useEffect(() => {
    if (!user?.uid) return;
    // ✅ Skip for viewer/collab — never reset their timeline state
    if (isCollabRole || isViewer) return;
    collab.reset();
    viewer.setViewerToken(null);
    collab.loadFromFirestore(user.uid);
    viewer.loadFromFirestore(user.uid);
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDriveSetupCompleteRef = useRef(handleDriveSetupComplete);
  useEffect(() => {
    handleDriveSetupCompleteRef.current = handleDriveSetupComplete;
  });

  // ✅ Handle Deep Linking for Google Drive Setup (safarnama://drive-connected)
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let appListenerPromise = null;
    const initDeepLink = async () => {
      const { App: CapApp } = await import('@capacitor/app');
      const { Browser } = await import('@capacitor/browser');

      const listener = await CapApp.addListener('appUrlOpen', async (data) => {
        console.log('[App] Received deep link:', data.url);
        try {
          const parsedUrl = new URL(data.url);
          if (parsedUrl.host === 'drive-connected' || parsedUrl.pathname.includes('drive-connected')) {
            const folderId = parsedUrl.searchParams.get('folderId');
            if (folderId) {
              console.log('[App] Deep link matched drive-connected, folderId:', folderId);
              await handleDriveSetupCompleteRef.current(folderId, null);
            }
            await Browser.close();
          }
        } catch (e) {
          console.error('[App] Deep link parsing error:', e);
        }
      });
      return listener;
    };

    appListenerPromise = initDeepLink();

    return () => {
      if (appListenerPromise) {
        appListenerPromise.then(l => l?.remove());
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!ownerId || !config) return;
    try {
      await setDoc(doc(db, 'users', ownerId, 'config', 'main'), { ...config, updatedAt: serverTimestamp() });
      setIsConfigModalOpen(false);
    } catch (err) { alert('Error saving settings: ' + err.message); }
  };

  const handleJoinCollab = async (input) => {
    const match = input.match(/[?&]collab=([A-Za-z0-9]+)/);
    const token = match ? match[1] : input;
    return await handleShareTokenLogin(token.toUpperCase());
  };

  const handleExitCollaboration = () => {
    if (!user) { handleSignOut(); return; }
    localStorage.removeItem('collabSession');
    localStorage.removeItem('viewerSession');
    setTimelineId(user.uid);
    setOwnerId(user.uid);
    setRole('owner');
    setIsSharedAccess(false);
    setIsCollaborator(false);
    collab.reset();
    viewer.setViewerToken(null);
    resetDriveToken();
    collab.loadFromFirestore(user.uid);
    viewer.loadFromFirestore(user.uid);
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleOpenAdd = () => {
    if (isViewer) return;
    if (!isPro && memories.length >= 2) {
      if (isCollabRole) { alert("This timeline has reached its memory limit. Ask the timeline owner to upgrade to Pro."); return; }
      setIsPricingOpen(true); return;
    }
    form.openAdd();
  };

  const handleSaveEvent = async (e) => {
    await form.handleSaveEvent(e);
    await refreshLimits();
  };

  const galleryImages = useMemo(() =>
    memories.flatMap(m => (m.imageUrls || []).map(url => ({ id: `${m.id}__${url}`, url, title: m.title, date: m.date }))),
    [memories]
  );

  // ✅ Always show ALL memories — no hiding on downgrade
  const visibleMemories = memories;

  // --- Loading / auth guards ---
  if (authLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans text-dark" style={{ background: 'radial-gradient(circle at center, #f5eae0 0%, #ecdccb 100%)' }}>
      <style>{styles}</style>
      <div className="bg-[#fffefb] border border-[rgba(182,129,60,0.22)] shadow-2xl p-8 rounded-3xl text-center max-w-xs w-full relative overflow-hidden" style={{ transform: 'rotate(-1.5deg)' }}>
        {/* Binder loops at the top of the loading card */}
        <div className="absolute top-0 left-4 right-4 h-2 flex justify-between pointer-events-none select-none -translate-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
              <div className="w-1 h-3 rounded-full bg-gradient-to-b from-gray-400 to-gray-300 border border-gray-500/20 -mt-0.5" />
            </div>
          ))}
        </div>
        {/* Soft beating heart */}
        <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute w-12 h-12 bg-rose-500/20 rounded-full animate-ping" />
          <Heart className="text-rose-500 fill-rose-500 animate-pulse relative z-10" size={32} />
        </div>
        <h3 className="font-heading font-semibold text-primary text-lg leading-tight mb-1">Safarnama</h3>
        <p className="text-[10px] font-sub font-bold uppercase tracking-widest text-dark/40 animate-pulse">Initializing...</p>
      </div>
    </div>
  );
  if (!user && !isSharedAccess) return (
    <LoginScreen onGoogleLogin={handleGoogleLogin} onShareTokenLogin={handleShareTokenLogin} isLoading={loginLoading}/>
  );
  if (user && !isSharedAccess && !isCollabRole && driveSetupNeeded) return (
    <DriveSetupScreen user={user} onSetupComplete={handleDriveSetupComplete} onSkip={() => setDriveSetupNeeded(false)}/>
  );
  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans text-dark" style={{ background: 'radial-gradient(circle at center, #f5eae0 0%, #ecdccb 100%)' }}>
      <style>{styles}</style>
      <div className="bg-[#fffefb] border border-[rgba(182,129,60,0.22)] shadow-2xl p-8 rounded-3xl text-center max-w-xs w-full relative overflow-hidden" style={{ transform: 'rotate(1deg)' }}>
        {/* Binder loops */}
        <div className="absolute top-0 left-4 right-4 h-2 flex justify-between pointer-events-none select-none -translate-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
              <div className="w-1 h-3 rounded-full bg-gradient-to-b from-gray-400 to-gray-300 border border-gray-500/20 -mt-0.5" />
            </div>
          ))}
        </div>
        {/* Soft beating heart */}
        <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute w-12 h-12 bg-rose-500/20 rounded-full animate-ping" />
          <Heart className="text-rose-500 fill-rose-500 animate-pulse relative z-10" size={32} />
        </div>
        <h3 className="font-heading font-semibold text-primary text-lg leading-tight mb-1">Our Safarnama</h3>
        <p className="text-[10px] font-sub font-bold uppercase tracking-widest text-dark/40 animate-pulse">Loading your story...</p>
      </div>
    </div>
  );

  return (
    <div data-theme={theme.id} className="h-dvh w-full text-dark font-sans relative overflow-hidden flex flex-col transition-colors duration-300" style={{ background: 'var(--bg-gradient, var(--bg-color))' }}>
      {/* Soft romantic vignette overlay for film-leak atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 opacity-60 mix-blend-multiply" 
        style={{
          background: theme.id === 'love'
            ? 'radial-gradient(circle at center, transparent 65%, rgba(244,63,94,0.06) 100%)'
            : theme.id === 'ocean'
            ? 'radial-gradient(circle at center, transparent 65%, rgba(13,148,136,0.05) 100%)'
            : theme.id === 'forest'
            ? 'radial-gradient(circle at center, transparent 65%, rgba(21,128,61,0.05) 100%)'
            : theme.id === 'sunset'
            ? 'radial-gradient(circle at center, transparent 65%, rgba(194,65,12,0.06) 100%)'
            : theme.id === 'galaxy'
            ? 'radial-gradient(circle at center, transparent 65%, rgba(109,40,217,0.08) 100%)'
            : 'none'
        }} 
      />
      <JournalCover />
      <FloatingElements theme={theme}/>

      {/* Sticky top — banners + header */}
      <div className="relative z-30 shrink-0">
        {!isPro && !isSharedAccess && !isCollabRole && <FreePlanBanner onUpgrade={() => setIsPricingOpen(true)}/>}
        {/* ✅ Show manage billing bar for Pro users */}
        {isCollabRole && <CollabBanner onExit={handleExitCollaboration}/>}
        {isViewer     && <ViewerBanner theme={theme} onLeave={handleSignOut}/>}
        <AppHeader
          config={config} duration={duration}
          activeTab={activeTab} setActiveTab={setActiveTab}
          galleryCount={galleryImages.length}
          isSharedAccess={isSharedAccess}
          onShare={() => setIsShareModalOpen(true)}
          onSettings={() => setIsConfigModalOpen(true)}
          onSignOut={handleSignOut}
          isPro={isPro}
        />
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto relative z-10 px-3 py-6 md:px-6 md:py-8">
        
        
        {/* Layout Switcher (📖 Journal View / 📌 Memory Wall) */}
        {activeTab === 'timeline' && memories.length > 0 && (
          <div className="flex justify-center gap-3.5 mb-6 relative z-20">
            <button 
              onClick={() => setLayoutMode('journal')}
              className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-sub font-bold uppercase tracking-wider transition-all duration-300 shadow-theme-sm border cursor-pointer ${layoutMode === 'journal' ? 'bg-amber-800 text-cream border-amber-950 scale-105 shadow-md font-extrabold' : 'bg-white text-dark/70 border-border-theme hover:bg-gray-50 active:scale-95'}`}
            >
              📖 Journal View
            </button>
            <button 
              onClick={() => setLayoutMode('wall')}
              className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-sub font-bold uppercase tracking-wider transition-all duration-300 shadow-theme-sm border cursor-pointer ${layoutMode === 'wall' ? 'bg-amber-800 text-cream border-amber-950 scale-105 shadow-md font-extrabold' : 'bg-white text-dark/70 border-border-theme hover:bg-gray-50 active:scale-95'}`}
            >
              📌 Memory Wall
            </button>
          </div>
        )}

        {/* 1. Animated Memory Wall Layout */}
        {layoutMode === 'wall' && activeTab === 'timeline' && memories.length > 0 ? (
          <div className="memory-wall-board relative max-w-5xl mx-auto w-full min-h-[80vh] my-4 p-6 sm:p-8 md:p-12 rounded-3xl transition-all duration-300 select-none">
            {/* Window pane swaying shadows overlay */}
            <LeafShadows />
            <div className="sunlight-overlay" />
            
            {/* Ambient floating dust particles canvas */}
            <LightMotesCanvas />

            {!isPro && isOwner && (
              <div className="relative z-20 max-w-xl mx-auto mb-8">
                <MemoryLimitBar count={memories.length} onUpgrade={() => setIsPricingOpen(true)}/>
              </div>
            )}

            <div className="flex justify-center mb-12 relative z-20">
              <span className="bg-amber-950/80 text-amber-200 border border-amber-800/40 px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 font-sub uppercase tracking-wider shadow-lg backdrop-blur-sm">
                <Heart size={12} fill="currentColor" className="text-rose-500 animate-pulse" /> Pinned Memories
              </span>
            </div>

            {/* Collage Wall Masonry-like Grid */}
            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pb-20">
              {visibleMemories.map((ev, idx) => (
                <EventCard 
                  key={ev.id} 
                  event={ev} 
                  theme={theme} 
                  index={idx}
                  layoutMode="wall"
                  onDelete={canEdit ? form.handleDelete : null}
                  onEdit={canEdit ? form.openEdit : null}
                />
              ))}
            </div>

            {/* Wooden shelf holding the Dream Jar */}
            <div className="relative z-20 mt-12">
              <div className="flex justify-center -mb-[28px] relative z-30">
                <div className="scale-95 origin-bottom">
                  <DreamJar config={config} setConfig={setConfig} ownerId={ownerId} canEdit={canEdit} />
                </div>
              </div>
              <div className="wood-shelf" />
              <div className="text-center text-[9px] uppercase tracking-widest text-amber-900/60 font-bold mt-2 font-sans">
                Our Wish Shelf
              </div>
            </div>
          </div>
        ) : (
          /* 2. Physical notebook paper sheet (journal view) */
          <div className="relative max-w-4xl mx-auto w-full bg-[var(--paper-bg)] border border-[var(--paper-border)] shadow-2xl p-5 sm:p-10 md:p-12 rounded-3xl min-h-[80vh] my-4 transition-colors duration-300">
            
            {/* Cute Scrapbook Stickers */}
            <CuteButterfly />
            <CuteDaisy />
            <CuteMixTape />
            <CuteLoveLetter />
            <CuteSparkleStar />
            
            {/* Spiral binder holes & rings at the top of the paper */}
            {theme.id !== 'monochrome' && (
              <div className="absolute top-0 left-6 right-6 h-4 flex justify-between pointer-events-none select-none z-20 -translate-y-[10px]">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Outer hole ring */}
                    <div className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-black/45" />
                    {/* Metallic loop */}
                    <div className="w-1.5 h-5.5 rounded-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-400 border border-gray-500/25 -mt-1 shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
                    {/* Paper hole */}
                    <div className="w-2.5 h-2.5 rounded-full bg-black/30 dark:bg-black/65 -mt-1" />
                  </div>
                ))}
              </div>
            )}

            {/* Red/Gold margins vertical line on the left */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1px] border-l border-[var(--paper-margin-line)] opacity-80" />

            {activeTab === 'timeline' && (
              memories.length === 0
                ? <EmptyTimeline theme={theme} canEdit={canEdit} onAdd={handleOpenAdd}/>
                : (
                  <div className="relative z-10 pl-2 sm:pl-6 md:pl-8">
                    {!isPro && isOwner && <MemoryLimitBar count={memories.length} onUpgrade={() => setIsPricingOpen(true)}/>}
                    <div className="flex justify-center mb-10">
                      <span className={`${theme.badge} px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 font-sub`}>
                        <Heart size={12} fill="currentColor"/> To be continued...
                      </span>
                    </div>
                    
                    {visibleMemories.map((ev, idx) => (
                      <EventCard key={ev.id} event={ev} theme={theme} index={idx}
                        layoutMode="journal"
                        onDelete={canEdit ? form.handleDelete : null}
                        onEdit={canEdit ? form.openEdit : null}
                      />
                    ))}

                    {/* Future wishes collectors */}
                    <DreamJar config={config} setConfig={setConfig} ownerId={ownerId} canEdit={canEdit} />
                  </div>
                )
            )}
            {activeTab === 'gallery' && (
              <div className="relative z-10 pl-2 sm:pl-6 md:pl-8">
                <GalleryTab images={galleryImages}/>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="relative z-10 shrink-0 text-center py-3 text-[10px] text-gray-400 px-4 border-t border-border-theme font-sub uppercase tracking-wider flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
        <span>© 2026 Safarnama</span>
        {[['About','/about'],['Privacy','/privacy'],['Terms','/terms'],['Google API','/google-api']].map(([l,h]) => (
          <React.Fragment key={h}>
            <span className="text-gray-300">•</span>
            <Link to={h} className="hover:text-rose-safarnama transition-colors">{l}</Link>
          </React.Fragment>
        ))}
      </footer>

      {isOwner && !isSharedAccess && (
        <CollaborateButton
          onCollaborate={() => collab.handleCollaborateClick(() => setIsPricingOpen(true))}
          collabShareUrl={collab.collabShareUrl} setCollabShareUrl={collab.setCollabShareUrl}
          collabLinkCopied={collab.collabLinkCopied} onCopyLink={collab.copyCollabLink}
          limits={limits} onJoinCollab={handleJoinCollab}
          isOpen={collab.collabPopoverOpen} setIsOpen={collab.setCollabPopoverOpen}
          isGenerating={collab.collabGenerating}
        />
      )}

      {canEdit && (
        <button onClick={handleOpenAdd}
          className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 ${theme.fab} text-white p-3.5 sm:p-4 rounded-full shadow-theme-md transition-transform hover:scale-110 active:scale-95 z-40`}>
          <Plus size={24} strokeWidth={2.5}/>
        </button>
      )}

      {/* Modals */}
      <MemoryModal
        isOpen={form.isAddModalOpen} onClose={() => form.setIsAddModalOpen(false)}
        editingId={form.editingId}
        newEvent={form.newEvent} setNewEvent={form.setNewEvent}
        tempImageLink={form.tempImageLink} setTempImageLink={form.setTempImageLink}
        tempVideoLink={form.tempVideoLink} setTempVideoLink={form.setTempVideoLink}
        addImageLink={form.addImageLink} removeImage={form.removeImage}
        addVideoLink={form.addVideoLink} removeVideo={form.removeVideo}
        handleUpload={handleUpload} handleSaveEvent={handleSaveEvent}
        isSaving={form.isSaving} isUploadingImage={isUploadingImage} isUploadingVideo={isUploadingVideo}
        folderId={effectiveFolderId} fileRef={fileRef} videoRef={videoRef}
        theme={theme} memberType={config?.memberType || 'duo'}
        isCollabRole={isCollabRole}
        onConnectDrive={() => { form.setIsAddModalOpen(false); setDriveSetupNeeded(true); }}
      />
      {isOwner && (
        <SettingsModal
          isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)}
          config={config} setConfig={setConfig}
          onSave={handleSaveConfig} folderId={folderId}
          onConnectDrive={() => { setIsConfigModalOpen(false); setDriveSetupNeeded(true); }}
          theme={theme}
          isPro={isPro}
          user={user}
          customerId={planCustomerId}
          onUpgrade={() => setIsPricingOpen(true)}
        />
      )}
      {isOwner && (
        <ShareModal
          isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}
          shareToken={viewer.viewerToken} onGenerateToken={viewer.generateToken}
          theme={theme}
        />
      )}
      <PricingModal
        isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)}
        user={user} theme={theme}
        onSuccess={async () => { await refreshLimits(); }}
      />

      {/* Click-Burst magical stardust particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="click-particle"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            color: p.color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`,
          }}
        >
          {theme.id === 'love' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"/></svg>
          )}
        </div>
      ))}
    </div>
  );
}