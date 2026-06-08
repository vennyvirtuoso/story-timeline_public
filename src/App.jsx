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
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading...</p>
    </div>
  );
  if (!user && !isSharedAccess) return (
    <LoginScreen onGoogleLogin={handleGoogleLogin} onShareTokenLogin={handleShareTokenLogin} isLoading={loginLoading}/>
  );
  if (user && !isSharedAccess && !isCollabRole && driveSetupNeeded) return (
    <DriveSetupScreen user={user} onSetupComplete={handleDriveSetupComplete} onSkip={() => setDriveSetupNeeded(false)}/>
  );
  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading your story...</p>
    </div>
  );

  return (
    <div data-theme={theme.id} className="h-dvh w-full bg-cream text-dark font-sans relative overflow-hidden flex flex-col transition-colors duration-300">
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
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-5xl mx-auto w-full px-4 py-8 pb-24 sm:pb-16">
          {activeTab === 'timeline' && (
            memories.length === 0
              ? <EmptyTimeline theme={theme} canEdit={canEdit} onAdd={handleOpenAdd}/>
              : (
                <div>
                  {!isPro && isOwner && <MemoryLimitBar count={memories.length} onUpgrade={() => setIsPricingOpen(true)}/>}
                  <div className="flex justify-center mb-10">
                    <span className={`${theme.badge} px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 font-sub`}>
                      <Heart size={12} fill="currentColor"/> To be continued...
                    </span>
                  </div>
                  {visibleMemories.map(ev => (
                    <EventCard key={ev.id} event={ev} theme={theme}
                      onDelete={canEdit ? form.handleDelete : null}
                      onEdit={canEdit ? form.openEdit : null}
                    />
                  ))}
                  {/* ✅ Removed HiddenMemoriesTeaser — memories never hidden */}
                </div>
              )
          )}
          {activeTab === 'gallery' && <GalleryTab images={galleryImages}/>}
        </div>
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
    </div>
  );
}