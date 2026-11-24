import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Plus, BookOpen, Pin, ArrowUp, Sparkles, Flame } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/config';
import { useAuth }          from './hooks/useAuth';
import { useMemories }      from './hooks/useMemories';
import { useDrive }         from './hooks/useDrive';
import { useEventForm }     from './hooks/useEventForm';
import { usePlan }          from './hooks/usePlan';
import { useCollaboration } from './hooks/useCollaboration';
import { useViewerToken }   from './hooks/useViewerToken';
import { useOwnerFolderId } from './hooks/useOwnerFolderId';
import AppHeader            from './components/AppHeader';
import MemoryModal          from './components/MemoryModal';
import SettingsModal        from './components/SettingsModal';
import LoginScreen          from './components/LoginScreen';
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
import { WarmDustMotes } from './components/PageAnimations';
import StorySlideshow from './components/StorySlideshow';
import PrintableMemoryModal from './components/PrintableMemoryModal';

// ─── Isolated Click-Burst Layer (never triggers App re-renders) ────────────────
const ClickBurstLayer = React.memo(({ themeId }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleGlobalClick = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.closest('input') ||
        e.target.closest('textarea')
      ) {
        return;
      }

      if (
        e.target.closest('button') === null &&
        e.target.closest('a') === null &&
        e.target.closest('[role="button"]') === null
      ) {
        return;
      }

      const count = 8;
      const newParticles = [];
      const x = e.clientX;
      const y = e.clientY;
      const colors =
        themeId === 'love'
          ? ['#e11d48', '#ec4899', '#f472b6', '#fb7185', '#a97132']
          : themeId === 'ocean'
          ? ['#0f766e', '#0369a1', '#0284c7', '#38bdf8', '#06b6d4']
          : themeId === 'forest'
          ? ['#166534', '#15803d', '#854d0e', '#22c55e', '#84cc16']
          : themeId === 'sunset'
          ? ['#c2410c', '#b45309', '#fb923c', '#fdba74', '#ea580c']
          : ['#c4b5fd', '#a78bfa', '#f472b6', '#f0abfc', '#818cf8'];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * 38 + 16;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 10;
        const size = Math.random() * 7 + 6;
        const id = `${Date.now()}-${i}-${Math.random()}`;
        const rot = Math.random() * 360;
        newParticles.push({ id, x, y, tx, ty, size, color: colors[i % colors.length], rot });
      }

      setParticles((p) => [...p.slice(-24), ...newParticles]);
      setTimeout(() => {
        setParticles((p) => p.filter((pt) => !newParticles.some((np) => np.id === pt.id)));
      }, 900);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [themeId]);

  if (!particles.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {particles.map((p) => (
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
          {themeId === 'love' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
});

ClickBurstLayer.displayName = 'ClickBurstLayer';

// ─── Memory Wall Shadow Component ──────────────────────────────────────────────
const LeafShadows = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none rounded-3xl" aria-hidden="true">
    <svg className="absolute w-[160%] h-[160%] -top-1/3 -left-1/3 opacity-[0.14] mix-blend-multiply blur-xl animate-leaf-sway" viewBox="0 0 800 600">
      <path d="M100,200 Q150,100 200,200 T300,200 Q350,150 400,250 T500,200 Q600,100 650,250 T750,200" fill="none" stroke="#2c3e2e" strokeWidth="110" strokeLinecap="round" />
      <path d="M50,400 Q150,300 250,400 T450,400 Q550,350 650,450 T750,400" fill="none" stroke="#2c3e2e" strokeWidth="130" strokeLinecap="round" />
      <path d="M300,100 Q400,50 500,120 T650,100" fill="none" stroke="#2c3e2e" strokeWidth="90" strokeLinecap="round" />
    </svg>
  </div>
);

// ─── Cute Scrapbook Sticker Elements (Desktop margins only to prevent mobile clipping) ───
const CuteButterfly = () => (
  <div className="hidden lg:block absolute top-[14%] -right-6 z-20 pointer-events-auto cursor-pointer group animate-float-gentle" style={{ perspective: '100px' }} aria-hidden="true">
    <svg className="w-8 h-8 text-pink-400/85 drop-shadow-[1px_2px_2.5px_rgba(0,0,0,0.12)] animate-butterfly" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 10C11.5 5 7 2 5 2C2.5 2 1 4 1 6.5C1 10.5 6 12 12 12.5C18 12 23 10.5 23 6.5C23 4 21.5 2 19 2C17 2 12.5 5 12 10Z"/>
      <path d="M12 13.5C11.5 17.5 8 21 6 21C4.5 21 3.5 20 3.5 18.5C3.5 16 7 14.5 12 14C17 14.5 20.5 16 20.5 18.5C20.5 20 19.5 21 18 21C16 21 12.5 17.5 12 13.5Z" opacity="0.8"/>
    </svg>
    <span className="absolute bottom-full right-0 bg-white/95 border border-pink-100 text-[9px] text-pink-500 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none -translate-y-1">Flutter! 🦋</span>
  </div>
);

const CuteDaisy = () => (
  <div className="hidden lg:block absolute top-[40%] -left-5 z-20 pointer-events-auto cursor-pointer group animate-wiggle" aria-hidden="true">
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
    <span className="absolute bottom-full left-0 bg-white/95 border border-amber-100 text-[9px] text-amber-600 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none -translate-y-1">Grow together 🌼</span>
  </div>
);

const CuteMixTape = () => (
  <div className="hidden lg:block absolute bottom-[20%] -left-6 z-20 pointer-events-auto cursor-pointer group animate-float-gentle" style={{ animationDelay: '1s' }} aria-hidden="true">
    <div className="w-12 h-8 bg-sky-200/95 border-2 border-sky-400/50 rounded-md p-1 flex flex-col justify-between shadow-[2px_3px_5px_rgba(0,0,0,0.08)] -rotate-[8deg] hover:rotate-0 hover:scale-110 transition-all">
      <div className="w-full h-4 bg-sky-100/90 rounded-sm flex items-center justify-center gap-1 px-0.5">
        <div className="w-2 h-2 rounded-full border border-sky-300 bg-sky-50 flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-sky-400 animate-spin" style={{ animationDuration: '3s' }}/></div>
        <div className="w-2 h-2 rounded-full border border-sky-300 bg-sky-50 flex items-center justify-center"><div className="w-0.5 h-0.5 rounded-full bg-sky-400 animate-spin" style={{ animationDuration: '3s' }}/></div>
      </div>
      <span className="text-[5.5px] font-sans font-extrabold text-sky-600/80 tracking-tighter text-center">OUR SONG 🎵</span>
    </div>
    <span className="absolute bottom-full left-0 bg-white/95 border border-sky-100 text-[9px] text-sky-500 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none -translate-y-1">Play! 📻</span>
  </div>
);

const CuteLoveLetter = () => (
  <div className="hidden lg:block absolute top-[64%] -right-6 z-20 pointer-events-auto cursor-pointer group animate-wiggle" style={{ animationDelay: '0.5s' }} aria-hidden="true">
    <div className="w-10 h-7 bg-rose-50 border-2 border-rose-300/60 rounded-md relative flex items-center justify-center shadow-[2px_3px_5px_rgba(0,0,0,0.08)] rotate-[15deg] hover:rotate-0 hover:scale-110 transition-all">
      <div className="absolute inset-0 border-t-[7px] border-t-rose-200/50 border-x-[18px] border-x-transparent border-b-transparent pointer-events-none"/>
      <Heart className="text-rose-500 fill-rose-500" size={10} />
    </div>
    <span className="absolute bottom-full right-0 bg-white/95 border border-rose-100 text-[9px] text-rose-500 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none -translate-y-1">For You 💌</span>
  </div>
);

const CuteSparkleStar = () => (
  <div className="hidden lg:block absolute top-[5%] -left-5 z-20 pointer-events-auto cursor-pointer group animate-shimmer-slow" aria-hidden="true">
    <svg className="w-7 h-7 text-yellow-400 hover:scale-125 transition-transform" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"/>
    </svg>
    <span className="absolute bottom-full left-0 bg-white/95 border border-yellow-100 text-[9px] text-yellow-600 font-sans font-bold px-2 py-0.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none -translate-y-1">Dream ✨</span>
  </div>
);

// ─── Refined Loading Card ──────────────────────────────────────────────────────
const LoadingState = ({ title, subtitle, rotateDeg }) => (
  <div
    className="min-h-dvh flex flex-col items-center justify-center font-sans text-dark p-6 editorial-grain"
    style={{ background: 'var(--bg-gradient)' }}
  >
    <div
      className="bg-[#fffdf9] border border-[rgba(169,113,50,0.22)] shadow-theme-lg p-8 rounded-3xl text-center max-w-xs w-full relative overflow-hidden"
      style={{ transform: `rotate(${rotateDeg})` }}
    >
      <div className="absolute top-0 left-5 right-5 h-2 flex justify-between pointer-events-none select-none -translate-y-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
            <div className="w-1 h-3 rounded-full bg-gradient-to-b from-gray-400 to-gray-300 border border-gray-500/20 -mt-0.5" />
          </div>
        ))}
      </div>
      <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <div className="absolute w-12 h-12 bg-rose-500/20 rounded-full animate-ping" />
        <Heart className="text-rose-safarnama fill-rose-safarnama animate-pulse relative z-10" size={30} />
      </div>
      <h3 className="font-heading font-semibold text-primary text-xl leading-tight mb-1">{title}</h3>
      <p className="text-[10px] font-sub font-bold uppercase tracking-[0.2em] text-dark/45 animate-pulse">{subtitle}</p>
    </div>
  </div>
);

export default function App() {
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
  const [layoutMode,        setLayoutMode]        = useState('journal'); // 'journal' | 'wall'
  const [showBackToTop,     setShowBackToTop]     = useState(false);
  const [isSlideshowOpen,   setIsSlideshowOpen]   = useState(false);
  const [highlightedId,     setHighlightedId]     = useState(null);
  const [printingMemory,    setPrintingMemory]    = useState(null);
  const [candlelightMode,   setCandlelightMode]   = useState(() => {
    try {
      return localStorage.getItem('safarnama_candlelight') === '1';
    } catch {
      return false;
    }
  });

  const toggleCandlelight = () => {
    setCandlelightMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('safarnama_candlelight', next ? '1' : '0');
      } catch {
        // ignore storage restrictions
      }
      return next;
    });
  };

  const fileRef           = useRef(null);
  const videoRef          = useRef(null);
  const mainRef           = useRef(null);
  const highlightTimerRef = useRef(null);
  const lastSurpriseIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    };
  }, []);

  const isViewer     = role === 'viewer';
  const isOwner      = role === 'owner';
  const isCollabRole = role === 'collaborator';
  const canEdit      = isOwner || isCollabRole;

  const { memories, config, setConfig, isLoading } = useMemories(timelineId, role, () => setIsConfigModalOpen(true), ownerId);
  const theme = getTheme(config?.theme || 'love');
  const effectiveTheme = useMemo(
    () => (candlelightMode ? { ...theme, isDark: true } : theme),
    [theme, candlelightMode]
  );

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

  // Handle Deep Linking for Google Drive Setup (safarnama://drive-connected)
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let appListenerPromise = null;
    const initDeepLink = async () => {
      const { App: CapApp } = await import('@capacitor/app');
      const { Browser } = await import('@capacitor/browser');

      const listener = await CapApp.addListener('appUrlOpen', async (data) => {
        try {
          const parsedUrl = new URL(data.url);
          if (parsedUrl.host === 'drive-connected' || parsedUrl.pathname.includes('drive-connected')) {
            const deepFolderId = parsedUrl.searchParams.get('folderId');
            if (deepFolderId) {
              await handleDriveSetupCompleteRef.current(deepFolderId, null);
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
        appListenerPromise.then((l) => l?.remove());
      }
    };
  }, []);

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
      if (isCollabRole) { alert('This timeline has reached its memory limit. Ask the timeline owner to upgrade to Pro.'); return; }
      setIsPricingOpen(true); return;
    }
    form.openAdd();
  };

  const handleSaveEvent = async (e) => {
    await form.handleSaveEvent(e);
    await refreshLimits();
  };

  const galleryImages = useMemo(() =>
    memories.flatMap((m) => (m.imageUrls || []).map((url) => ({ id: `${m.id}__${url}`, url, title: m.title, date: m.date }))),
    [memories]
  );

  const visibleMemories = memories;

  const handleSurpriseMemory = () => {
    if (!visibleMemories.length) return;
    const pool =
      visibleMemories.length > 1
        ? visibleMemories.filter((m) => m.id !== lastSurpriseIdRef.current)
        : visibleMemories;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    lastSurpriseIdRef.current = pick.id;
    setHighlightedId(pick.id);

    const targetEl = document.getElementById(`memory-${pick.id}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightedId(null), 2400);
  };

  const slideshowTitle =
    config?.timelineName ||
    (config?.partner1 && config?.partner2 ? `${config.partner1} & ${config.partner2}` : config?.partner1) ||
    'Our Safarnama';

  // --- Loading / auth guards ---
  if (authLoading) return <LoadingState title="Safarnama" subtitle="Initializing..." rotateDeg="-1.2deg" />;
  if (!user && !isSharedAccess) return (
    <LoginScreen onGoogleLogin={handleGoogleLogin} onShareTokenLogin={handleShareTokenLogin} isLoading={loginLoading} />
  );
  if (user && !isSharedAccess && !isCollabRole && driveSetupNeeded) return (
    <DriveSetupScreen user={user} onSetupComplete={handleDriveSetupComplete} onSkip={() => setDriveSetupNeeded(false)} />
  );
  if (isLoading) return <LoadingState title="Our Safarnama" subtitle="Opening your story..." rotateDeg="1deg" />;

  return (
    <div
      data-theme={theme.id}
      className={`h-dvh w-full text-dark font-sans relative overflow-hidden flex flex-col transition-colors duration-500 app-scroll-host ${candlelightMode ? 'candlelight-active' : ''}`}
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* Warm reading-lamp vignette when Midnight Candlelight Mode is active */}
      {candlelightMode && <div className="candlelight-vignette" aria-hidden="true" />}
      {/* Subtle romantic vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 opacity-50 mix-blend-multiply"
        style={{
          background:
            theme.id === 'love'
              ? 'radial-gradient(circle at center, transparent 62%, rgba(225,29,72,0.06) 100%)'
              : theme.id === 'ocean'
              ? 'radial-gradient(circle at center, transparent 62%, rgba(15,118,110,0.05) 100%)'
              : theme.id === 'forest'
              ? 'radial-gradient(circle at center, transparent 62%, rgba(22,101,52,0.05) 100%)'
              : theme.id === 'sunset'
              ? 'radial-gradient(circle at center, transparent 62%, rgba(194,65,12,0.06) 100%)'
              : 'none',
        }}
      />

      <JournalCover />
      <FloatingElements theme={theme} />

      {/* Sticky top — banners + header */}
      <div className="relative z-30 shrink-0">
        {!isPro && !isSharedAccess && !isCollabRole && <FreePlanBanner onUpgrade={() => setIsPricingOpen(true)} />}
        {isCollabRole && <CollabBanner onExit={handleExitCollaboration} />}
        {isViewer     && <ViewerBanner theme={theme} onLeave={handleSignOut} />}
        <AppHeader
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          galleryCount={galleryImages.length}
          memoriesCount={memories.length}
          onPlayStory={() => setIsSlideshowOpen(true)}
          isSharedAccess={isSharedAccess}
          onShare={() => setIsShareModalOpen(true)}
          onSettings={() => setIsConfigModalOpen(true)}
          onSignOut={handleSignOut}
          isPro={isPro}
        />
        {/* Pure-CSS reading progress ribbon synced to <main> scroll */}
        <div className="app-scroll-progress-bar" aria-hidden="true" />
      </div>

      {/* Smooth scrollable content */}
      <main
        ref={mainRef}
        onScroll={(e) => {
          const past = e.currentTarget.scrollTop > 420;
          if (past !== showBackToTop) setShowBackToTop(past);
        }}
        className="flex-1 overflow-y-auto smooth-scroll-pane app-main-scroller relative z-10 px-3 py-6 md:px-6 md:py-8"
      >
        {/* Layout Switcher (Journal View / Memory Wall) + Surprise Me */}
        {activeTab === 'timeline' && memories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 relative z-20">
            <div className={`inline-flex p-1 rounded-full border border-border-theme shadow-theme-sm ${theme.isDark ? 'bg-white/[0.06]' : 'bg-white/80 backdrop-blur-md'}`}>
              <button
                type="button"
                onClick={() => setLayoutMode('journal')}
                aria-pressed={layoutMode === 'journal'}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sub font-bold uppercase tracking-wider transition-all duration-200 ${
                  layoutMode === 'journal'
                    ? `${theme.tabActive} shadow-theme-sm`
                    : 'text-dark/60 hover:text-dark'
                }`}
              >
                <BookOpen size={13} /> Journal View
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('wall')}
                aria-pressed={layoutMode === 'wall'}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sub font-bold uppercase tracking-wider transition-all duration-200 ${
                  layoutMode === 'wall'
                    ? 'bg-amber-900 text-amber-50 shadow-theme-sm'
                    : 'text-dark/60 hover:text-dark'
                }`}
              >
                <Pin size={13} /> Memory Wall
              </button>
            </div>

            {memories.length > 1 && (
              <button
                type="button"
                onClick={handleSurpriseMemory}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-sub font-bold uppercase tracking-wider border border-accent/35 shadow-theme-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                  effectiveTheme.isDark
                    ? 'bg-white/10 text-amber-200 hover:bg-white/15'
                    : 'bg-white/90 text-accent hover:bg-amber-50'
                }`}
              >
                <Sparkles size={13} /> Surprise Me
              </button>
            )}

            <button
              type="button"
              onClick={toggleCandlelight}
              aria-pressed={candlelightMode}
              title={candlelightMode ? 'Exit Candlelight Reading Mode' : 'Midnight Candlelight Reading Mode'}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-sub font-bold uppercase tracking-wider border shadow-theme-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                candlelightMode
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-[0_0_18px_rgba(245,158,11,0.28)]'
                  : effectiveTheme.isDark
                  ? 'bg-white/10 text-dark/75 border-border-theme hover:bg-white/15'
                  : 'bg-white/90 text-dark/70 border-border-theme hover:text-amber-700 hover:border-amber-300/60'
              }`}
            >
              <Flame size={13} className={candlelightMode ? 'text-amber-300 fill-amber-300/40' : ''} />
              <span className="hidden sm:inline">{candlelightMode ? 'Candlelight On' : 'Candlelight'}</span>
            </button>
          </div>
        )}

        {/* 1. Animated Memory Wall Layout */}
        {layoutMode === 'wall' && activeTab === 'timeline' && memories.length > 0 ? (
          <div className="memory-wall-board relative max-w-5xl mx-auto w-full min-h-[78vh] my-2 p-5 sm:p-8 md:p-12 rounded-3xl select-none">
            <LeafShadows />
            <div className="sunlight-overlay" />
            <WarmDustMotes />

            {!isPro && isOwner && (
              <div className="relative z-20 max-w-xl mx-auto mb-8">
                <MemoryLimitBar count={memories.length} onUpgrade={() => setIsPricingOpen(true)} />
              </div>
            )}

            <div className="flex justify-center mb-10 relative z-20">
              <span className="bg-amber-950/85 text-amber-100 border border-amber-700/50 px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 font-sub uppercase tracking-[0.16em] shadow-lg backdrop-blur-sm">
                <Heart size={12} fill="currentColor" className="text-rose-400 animate-pulse" /> Pinned Memories
              </span>
            </div>

            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pb-16">
              {visibleMemories.map((ev, idx) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  theme={theme}
                  index={idx}
                  layoutMode="wall"
                  isHighlighted={highlightedId === ev.id}
                  onPrint={setPrintingMemory}
                  onDelete={canEdit ? form.handleDelete : null}
                  onEdit={canEdit ? form.openEdit : null}
                />
              ))}
            </div>

            {/* Wooden shelf holding the Dream Jar */}
            <div className="relative z-20 mt-10">
              <div className="flex justify-center -mb-[26px] relative z-30">
                <div className="scale-95 origin-bottom">
                  <DreamJar config={config} setConfig={setConfig} ownerId={ownerId} canEdit={canEdit} />
                </div>
              </div>
              <div className="wood-shelf" />
              <div className="text-center text-[10px] uppercase tracking-[0.22em] text-amber-950/70 font-bold mt-2 font-sub">
                Our Wish Shelf
              </div>
            </div>
          </div>
        ) : (
          /* 2. Physical notebook paper sheet (journal view) */
          <div className="relative max-w-4xl mx-auto w-full bg-[var(--paper-bg)] border border-[var(--paper-border)] shadow-theme-lg p-5 sm:p-10 md:p-12 rounded-3xl min-h-[78vh] my-2 transition-colors duration-300">
            <CuteButterfly />
            <CuteDaisy />
            <CuteMixTape />
            <CuteLoveLetter />
            <CuteSparkleStar />

            {/* Spiral binder holes & rings at the top of the paper */}
            {theme.id !== 'monochrome' && (
              <div className="absolute top-0 left-6 right-6 h-4 flex justify-between pointer-events-none select-none z-20 -translate-y-[10px]" aria-hidden="true">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/15" />
                    <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-400 border border-gray-500/25 -mt-1 shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-black/25 -mt-1" />
                  </div>
                ))}
              </div>
            )}

            {/* Margin vertical line on the left */}
            <div className="absolute left-7 md:left-12 top-0 bottom-0 w-px border-l border-[var(--paper-margin-line)] opacity-80 pointer-events-none" aria-hidden="true" />

            {activeTab === 'timeline' && (
              memories.length === 0
                ? <EmptyTimeline theme={theme} canEdit={canEdit} onAdd={handleOpenAdd} />
                : (
                  <div className="relative z-10 pl-2 sm:pl-6 md:pl-8 pb-12">
                    {!isPro && isOwner && <MemoryLimitBar count={memories.length} onUpgrade={() => setIsPricingOpen(true)} />}
                    <div className="flex justify-center mb-10">
                      <span className={`${theme.badge} px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 font-sub uppercase tracking-wider`}>
                        <Heart size={12} fill="currentColor" /> To be continued...
                      </span>
                    </div>

                    {visibleMemories.map((ev, idx) => (
                      <EventCard
                        key={ev.id}
                        event={ev}
                        theme={effectiveTheme}
                        index={idx}
                        layoutMode="journal"
                        isHighlighted={highlightedId === ev.id}
                        onPrint={setPrintingMemory}
                        onDelete={canEdit ? form.handleDelete : null}
                        onEdit={canEdit ? form.openEdit : null}
                      />
                    ))}

                    <DreamJar config={config} setConfig={setConfig} ownerId={ownerId} canEdit={canEdit} />
                  </div>
                )
            )}
            {activeTab === 'gallery' && (
              <div className="relative z-10 pl-2 sm:pl-6 md:pl-8 pb-10">
                <GalleryTab images={galleryImages} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="relative z-10 shrink-0 text-center py-2.5 text-[10px] text-dark/45 px-4 border-t border-border-theme bg-surface/70 backdrop-blur-sm font-sub uppercase tracking-[0.14em] flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1">
        <span>© 2026 Safarnama</span>
        {[['About', '/about'], ['Privacy', '/privacy'], ['Terms', '/terms'], ['Google API', '/google-api']].map(([l, h]) => (
          <React.Fragment key={h}>
            <span className="text-dark/25" aria-hidden="true">•</span>
            <Link to={h} className="hover:text-primary transition-colors">{l}</Link>
          </React.Fragment>
        ))}
      </footer>

      {isOwner && !isSharedAccess && (
        <CollaborateButton
          onCollaborate={() => collab.handleCollaborateClick(() => setIsPricingOpen(true))}
          collabShareUrl={collab.collabShareUrl}
          setCollabShareUrl={collab.setCollabShareUrl}
          collabLinkCopied={collab.collabLinkCopied}
          onCopyLink={collab.copyCollabLink}
          limits={limits}
          onJoinCollab={handleJoinCollab}
          isOpen={collab.collabPopoverOpen}
          setIsOpen={collab.setCollabPopoverOpen}
          isGenerating={collab.collabGenerating}
        />
      )}

      {showBackToTop && (
        <button
          type="button"
          onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="fixed bottom-24 right-5 sm:bottom-28 sm:right-8 bg-surface backdrop-blur-xl border border-border-theme text-primary p-3 rounded-full shadow-theme-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 z-40 animate-modal-enter"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </button>
      )}

      {canEdit && (
        <button
          type="button"
          onClick={handleOpenAdd}
          aria-label="Add new memory"
          className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 ${theme.fab} p-4 rounded-full shadow-theme-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 z-40 ring-4 ring-white/25`}
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      )}

      {/* Modals */}
      <MemoryModal
        isOpen={form.isAddModalOpen}
        onClose={() => form.setIsAddModalOpen(false)}
        editingId={form.editingId}
        newEvent={form.newEvent}
        setNewEvent={form.setNewEvent}
        tempImageLink={form.tempImageLink}
        setTempImageLink={form.setTempImageLink}
        tempVideoLink={form.tempVideoLink}
        setTempVideoLink={form.setTempVideoLink}
        addImageLink={form.addImageLink}
        removeImage={form.removeImage}
        addVideoLink={form.addVideoLink}
        removeVideo={form.removeVideo}
        handleUpload={handleUpload}
        handleSaveEvent={handleSaveEvent}
        isSaving={form.isSaving}
        isUploadingImage={isUploadingImage}
        isUploadingVideo={isUploadingVideo}
        folderId={effectiveFolderId}
        fileRef={fileRef}
        videoRef={videoRef}
        theme={theme}
        memberType={config?.memberType || 'duo'}
        isCollabRole={isCollabRole}
        onConnectDrive={() => { form.setIsAddModalOpen(false); setDriveSetupNeeded(true); }}
      />
      {isOwner && (
        <SettingsModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          config={config}
          setConfig={setConfig}
          onSave={handleSaveConfig}
          folderId={folderId}
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
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          shareToken={viewer.viewerToken}
          onGenerateToken={viewer.generateToken}
          theme={theme}
        />
      )}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        user={user}
        theme={theme}
        onSuccess={async () => { await refreshLimits(); }}
      />

      <StorySlideshow
        isOpen={isSlideshowOpen}
        onClose={() => setIsSlideshowOpen(false)}
        memories={visibleMemories}
        title={slideshowTitle}
      />

      <PrintableMemoryModal
        memory={printingMemory}
        onClose={() => setPrintingMemory(null)}
        timelineTitle={slideshowTitle}
      />

      <ClickBurstLayer themeId={theme.id} />
    </div>
  );
}
