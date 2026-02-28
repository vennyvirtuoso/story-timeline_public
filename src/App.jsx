import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Plus, Camera, Crown, Users, Copy, Check } from 'lucide-react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase/config';
import { getBackendUrl } from './gis';
import styles from './utils/styles';
import { useAuth } from './hooks/useAuth';
import { useMemories } from './hooks/useMemories';
import { useDrive } from './hooks/useDrive';
import { useEventForm } from './hooks/useEventForm';
import AppHeader from './components/AppHeader';
import MemoryModal from './components/MemoryModal';
import SettingsModal from './components/SettingsModal';
import LoginScreen from './components/LoginScreen';
import ShareModal from './components/ShareModal';
import DriveSetupScreen from './components/DriveSetupScreen';
import FloatingElements from './components/FloatingElements';
import { Btn } from './components/ui';
import { EventCard } from './components/MediaComponents';
import { getTheme } from './utils/themes';
import { usePlan } from './hooks/usePlan';
import PricingModal from './components/PricingModal';
import CollaborateButton from './components/CollaborateButton';

export default function App() {
  const {
    user, ownerId, timelineId, role,
    isSharedAccess, isCollaborator,
    authLoading, loginLoading,
    folderId, setFolderId,
    driveSetupNeeded, setDriveSetupNeeded,
    handleGoogleLogin, handleShareTokenLogin, handleSignOut,
    setTimelineId, setOwnerId, setRole, setIsSharedAccess, setIsCollaborator,
  } = useAuth();

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isShareModalOpen,  setIsShareModalOpen]  = useState(false);
  const [activeTab,         setActiveTab]         = useState('timeline');
  const [currentTime,       setCurrentTime]       = useState(new Date());
  const [isPricingOpen,     setIsPricingOpen]     = useState(false);
  const [viewerToken,       setViewerToken]       = useState(null);
  const [collabToken,       setCollabToken]       = useState(null);
  const [collabShareUrl,    setCollabShareUrl]    = useState(null);
  const [collabLinkCopied,  setCollabLinkCopied]  = useState(false);
  const [collabPopoverOpen, setCollabPopoverOpen] = useState(false);

  const fileRef  = useRef(null);
  const videoRef = useRef(null);

  // Clock ticker
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Handle share token from URL — supports ?token=, ?view=, ?collab=
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get('token') || p.get('view');
    if (t) handleShareTokenLogin(t.toUpperCase());
    // ?collab= is already handled in useAuth's own useEffect
  }, []);

  // ✅ Reset all token state when user changes (sign out / sign in as different user)
  useEffect(() => {
    setCollabToken(null);
    setCollabShareUrl(null);
    setCollabPopoverOpen(false);
    setCollabLinkCopied(false);
    setViewerToken(null);
  }, [user?.uid]);

  // Load existing tokens from Firestore for current user
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        const d = snap.data();
        if (d.viewerToken) setViewerToken(d.viewerToken);
        if (d.collabToken) setCollabToken(d.collabToken);
      }
    });
  }, [user?.uid]);

  const isViewer     = role === 'viewer';
  const isOwner      = role === 'owner';
  const isCollabRole = role === 'collaborator';
  const canEdit      = isOwner || isCollabRole;

  const { memories, config, setConfig, isLoading } = useMemories(timelineId, role, () => setIsConfigModalOpen(true), ownerId);
  const theme = getTheme(config?.theme || 'love');
  const { isUploading, handleDriveSetupComplete, handleUpload: _handleUpload } = useDrive(user, folderId, setFolderId, setDriveSetupNeeded, timelineId);
  const form = useEventForm(timelineId, user?.uid);
  const { isPro, limits, refreshLimits } = usePlan(ownerId, timelineId, isSharedAccess);

  const handleUpload = (e, mediaType) => _handleUpload(e, mediaType, form.setNewEvent, fileRef, videoRef);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!ownerId) return;
    try {
      await setDoc(doc(db, 'users', ownerId, 'config', 'main'), { ...config, updatedAt: serverTimestamp() });
      setIsConfigModalOpen(false);
    } catch (err) { alert('Error saving settings: ' + err.message); }
  };

  const generateTokens = async () => {
    if (!user || !timelineId) return;
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) { alert('Please sign in again.'); return; }
      const idToken = await currentUser.getIdToken(true);
      let vToken = viewerToken;
      if (!vToken) {
        const res  = await fetch(`${getBackendUrl()}/api/create-viewer-token`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
          body:    JSON.stringify({ timelineId }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        vToken = data.token;
        setViewerToken(vToken);
        await setDoc(doc(db, 'users', user.uid), { viewerToken: vToken }, { merge: true });
      }
      await refreshLimits();
    } catch (err) { alert('Failed to generate share code: ' + err.message); }
  };

  const handleCollaborateClick = async () => {
    if (!user || !timelineId) return;
    if (!collabToken) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) { alert('Please sign in again.'); return; }
        const idToken = await currentUser.getIdToken(true);
        const res  = await fetch(`${getBackendUrl()}/api/create-collaboration-token`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
          body:    JSON.stringify({ timelineId }),
        });
        const data = await res.json();
        if (!data.success) {
          if (data.limitReached) { setIsPricingOpen(true); return; }
          throw new Error(data.error);
        }
        const cToken = data.token;
        setCollabToken(cToken);
        await setDoc(doc(db, 'users', user.uid), { collabToken: cToken }, { merge: true });
        setCollabShareUrl(`${window.location.origin}/?collab=${cToken}`);
      } catch (err) { alert('Failed: ' + err.message); return; }
    } else {
      setCollabShareUrl(`${window.location.origin}/?collab=${collabToken}`);
    }
    setCollabPopoverOpen(prev => !prev);
  };

  const handleJoinCollab = async (input) => {
    const match = input.match(/[?&]collab=([A-Za-z0-9]+)/);
    const token = match ? match[1] : input;
    return await handleShareTokenLogin(token.toUpperCase());
  };

  const copyCollabLink = () => {
    if (!collabShareUrl) return;
    navigator.clipboard.writeText(collabShareUrl).catch(() => {});
    setCollabLinkCopied(true);
    setTimeout(() => setCollabLinkCopied(false), 2000);
  };

  const handleExitCollaboration = () => {
    if (!user) { handleSignOut(); return; }
    setTimelineId(user.uid);
    setOwnerId(user.uid);
    setRole('owner');
    setIsSharedAccess(false);
    setIsCollaborator(false);
    // ✅ Reload own tokens
    setCollabToken(null); setCollabShareUrl(null);
    setCollabPopoverOpen(false); setViewerToken(null);
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        const d = snap.data();
        if (d.viewerToken) setViewerToken(d.viewerToken);
        if (d.collabToken) setCollabToken(d.collabToken);
      }
    });
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleUpgradeToPro = () => setIsPricingOpen(true);

  const handleOpenAdd = () => {
    if (isViewer) return;
    if (!isPro && memories.length >= 2) {
      if (isCollabRole) {
        alert("This timeline has reached its memory limit. Ask the timeline owner to upgrade to Pro.");
        return;
      }
      setIsPricingOpen(true);
      return;
    }
    form.openAdd();
  };

  const handleSaveEvent = async (e) => {
    await form.handleSaveEvent(e);
    await refreshLimits();
  };

  const duration = useMemo(() => {
    if (!config.startDate) return { years:0, months:0, days:0, hours:0, minutes:0, seconds:0 };
    const s = new Date(config.startDate), n = currentTime;
    if (n < s) return { years:0, months:0, days:0, hours:0, minutes:0, seconds:0 };
    let [yr,mo,dy,hr,mi,se] = [n.getFullYear()-s.getFullYear(),n.getMonth()-s.getMonth(),n.getDate()-s.getDate(),n.getHours()-s.getHours(),n.getMinutes()-s.getMinutes(),n.getSeconds()-s.getSeconds()];
    if(se<0){se+=60;mi--;} if(mi<0){mi+=60;hr--;} if(hr<0){hr+=24;dy--;} if(dy<0){dy+=new Date(n.getFullYear(),n.getMonth(),0).getDate();mo--;} if(mo<0){mo+=12;yr--;}
    return { years:yr, months:mo, days:dy, hours:hr, minutes:mi, seconds:se };
  }, [config.startDate, currentTime]);

  const galleryImages   = useMemo(() =>
    memories.flatMap(m => (m.imageUrls || []).map(url => ({ id: m.id + url, url, title: m.title, date: m.date }))),
    [memories]
  );
  const visibleMemories = isPro ? memories : memories.slice(0, 2);

  if (authLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading...</p>
    </div>
  );
  if (!user && !isSharedAccess) return (
    <LoginScreen onGoogleLogin={handleGoogleLogin} onShareTokenLogin={handleShareTokenLogin} isLoading={loginLoading}/>
  );
  if (user && !isSharedAccess && driveSetupNeeded) return (
    <DriveSetupScreen user={user} onSetupComplete={handleDriveSetupComplete} onSkip={() => setDriveSetupNeeded(false)}/>
  );
  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading your story...</p>
    </div>
  );

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${theme.gradient} text-gray-800 font-sans relative overflow-x-hidden`}>
      <FloatingElements theme={theme}/>

      {!isPro && !isSharedAccess && !isCollabRole && (
        <div className="relative z-30 bg-amber-50 border-b border-amber-100 text-center py-1.5 px-4 text-xs text-amber-700 flex items-center justify-center gap-2">
          <Crown size={11} className="text-amber-500"/>
          Free plan: 2 memories, 2 collaborators
          <button onClick={handleUpgradeToPro} className="underline font-bold text-amber-600 hover:text-amber-700 ml-1">Upgrade to Pro →</button>
        </div>
      )}
      {isCollabRole && (
        <div className="relative z-40 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-center py-2 px-4 text-xs flex items-center justify-center gap-3">
          <span>✏️ You are collaborating on this timeline</span>
          <button onClick={handleExitCollaboration} className="underline text-white/80 font-semibold hover:text-white ml-2">Exit Collaboration</button>
        </div>
      )}
      {isViewer && (
        <div className={`relative z-40 bg-gradient-to-r ${theme.banner} text-white text-center py-2 px-4 text-xs flex items-center justify-center gap-2`}>
          <Heart size={12} fill="white"/> Viewing a shared love story
          <button onClick={handleSignOut} className="underline text-white/80 ml-2">Leave</button>
        </div>
      )}

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

      <main className="max-w-5xl mx-auto px-4 py-8 pb-28 relative z-10">
        {activeTab === 'timeline' && (
          memories.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white/60 rounded-3xl border-2 border-dashed border-rose-200 max-w-sm mx-auto mt-4">
              <div className={`w-16 h-16 ${theme.eventBg} rounded-full flex items-center justify-center mx-auto mb-4 ${theme.heart}`}><Heart size={32}/></div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Your story starts here</h3>
              <p className="text-gray-400 text-sm mb-6">Add your first memory together</p>
              {canEdit && <Btn onClick={handleOpenAdd}>Add First Memory</Btn>}
            </div>
          ) : (
            <div>
              {!isPro && isOwner && (
                <div className="mb-6 bg-white/70 rounded-2xl p-3 border border-gray-100 max-w-xs mx-auto text-center">
                  <p className="text-[11px] text-gray-400 mb-1 font-semibold">
                    Memories: <span className={`font-bold ${memories.length >= 2 ? 'text-red-500' : 'text-gray-600'}`}>{memories.length} / 2</span>
                  </p>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all"
                      style={{ width: `${Math.min((memories.length / 2) * 100, 100)}%` }}/>
                  </div>
                  {memories.length >= 2 && (
                    <button onClick={handleUpgradeToPro} className="text-[10px] text-amber-600 underline mt-1.5 block mx-auto">
                      Upgrade for unlimited memories →
                    </button>
                  )}
                </div>
              )}
              <div className="flex justify-center mb-10">
                <span className={`${theme.badge} px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5`}>
                  <Heart size={12} fill="currentColor"/> To be continued...
                </span>
              </div>
              {visibleMemories.map(ev => (
                <EventCard key={ev.id} event={ev} theme={theme}
                  onDelete={canEdit ? form.handleDelete : null}
                  onEdit={canEdit ? form.openEdit : null}
                />
              ))}
              {!isPro && isOwner && memories.length > 2 && (
                <div onClick={handleUpgradeToPro}
                  className="cursor-pointer mt-4 p-5 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 text-center hover:bg-amber-50 transition-colors">
                  <Crown size={20} className="text-amber-400 mx-auto mb-2"/>
                  <p className="text-sm font-bold text-amber-700">{memories.length - 2} more {memories.length - 2 === 1 ? 'memory' : 'memories'} hidden</p>
                  <p className="text-xs text-amber-500 mt-1">Upgrade to Pro to view all your memories →</p>
                </div>
              )}
            </div>
          )
        )}
        {activeTab === 'gallery' && (
          galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300"><Camera size={32}/></div>
              <p className="text-gray-400 text-sm">Add photos to memories to see them here</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
              {galleryImages.map((img, i) => (
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

      {isOwner && !isSharedAccess && (
        <CollaborateButton
          onCollaborate={handleCollaborateClick}
          collabShareUrl={collabShareUrl} setCollabShareUrl={setCollabShareUrl}
          collabLinkCopied={collabLinkCopied} onCopyLink={copyCollabLink}
          limits={limits} onJoinCollab={handleJoinCollab}
          isOpen={collabPopoverOpen} setIsOpen={setCollabPopoverOpen}
        />
      )}

      {canEdit && (
        <button onClick={handleOpenAdd}
          className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 bg-gradient-to-r ${theme.fab} text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-rose-300/50 transition-transform hover:scale-110 active:scale-95 z-40`}>
          <Plus size={24} strokeWidth={2.5}/>
        </button>
      )}

      <MemoryModal
        isOpen={form.isAddModalOpen} onClose={() => form.setIsAddModalOpen(false)}
        editingId={form.editingId}
        newEvent={form.newEvent} setNewEvent={form.setNewEvent}
        tempImageLink={form.tempImageLink} setTempImageLink={form.setTempImageLink}
        tempVideoLink={form.tempVideoLink} setTempVideoLink={form.setTempVideoLink}
        addImageLink={form.addImageLink} removeImage={form.removeImage}
        addVideoLink={form.addVideoLink} removeVideo={form.removeVideo}
        handleUpload={handleUpload} handleSaveEvent={handleSaveEvent}
        isSaving={form.isSaving} isUploading={isUploading}
        folderId={folderId} fileRef={fileRef} videoRef={videoRef}
        theme={theme} memberType={config?.memberType || 'duo'}
      />
      {isOwner && (
        <SettingsModal
          isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)}
          config={config} setConfig={setConfig}
          onSave={handleSaveConfig} folderId={folderId}
          onConnectDrive={() => { setIsConfigModalOpen(false); setDriveSetupNeeded(true); }}
          theme={theme}
        />
      )}
      {isOwner && (
        <ShareModal
          isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}
          shareToken={viewerToken} onGenerateToken={generateTokens}
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