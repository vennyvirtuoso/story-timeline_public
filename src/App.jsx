import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Plus, Camera, Crown } from 'lucide-react';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/config';
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

export default function App() {
  const auth = useAuth();
  const {
    user, ownerId, isSharedAccess, authLoading, loginLoading,
    shareToken, setShareToken, folderId, setFolderId,
    driveSetupNeeded, setDriveSetupNeeded,
    handleGoogleLogin, handleShareTokenLogin, handleSignOut
  } = auth;

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isShareModalOpen,  setIsShareModalOpen]  = useState(false);
  const [activeTab,  setActiveTab]  = useState('timeline');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const fileRef  = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => { const t = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get('token');
    if (t) handleShareTokenLogin(t.toUpperCase());
  }, []);

  const { memories, config, setConfig, isLoading } = useMemories(ownerId, isSharedAccess, () => setIsConfigModalOpen(true));
  const theme = getTheme(config?.theme || 'love');
  const { isUploading, handleDriveSetupComplete, handleUpload: _handleUpload } = useDrive(user, folderId, setFolderId, setDriveSetupNeeded);
  const form = useEventForm(ownerId);
  const { isPro, limits, refreshLimits } = usePlan(ownerId, isSharedAccess);

  const handleUpload = (e, mediaType) => _handleUpload(e, mediaType, form.setNewEvent, fileRef, videoRef);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!ownerId) return;
    try {
      await setDoc(doc(db, 'users', ownerId, 'config', 'main'), { ...config, updatedAt: serverTimestamp() });
      setIsConfigModalOpen(false);
    } catch (e) { alert('Error saving settings: ' + e.message); }
  };

  const generateShareToken = async () => {
    if (!user) return;
    // Gate: max 2 share tokens for free users
    if (!isPro && !limits?.collaborators?.canAdd) {
      setIsShareModalOpen(false);
      setIsPricingOpen(true);
      return;
    }
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const token = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    try {
      if (shareToken) { try { await deleteDoc(doc(db, 'shareTokens', shareToken)); } catch (_) {} }
      await setDoc(doc(db, 'shareTokens', token), { userId: user.uid, createdAt: serverTimestamp() });
      await setDoc(doc(db, 'users', user.uid), { shareToken: token }, { merge: true });
      setShareToken(token);
      await refreshLimits();
    } catch (e) { alert('Failed to generate share code: ' + e.message); }
  };

  const handleShareClick = () => {
    if (!isPro && !limits?.collaborators?.canAdd) {
      setIsPricingOpen(true);
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleUpgradeToPro = () => setIsPricingOpen(true);

  // Gate: max 2 memories for free users
  const handleOpenAdd = () => {
    if (!isPro && !limits?.memories?.canAdd) {
      setIsPricingOpen(true);
      return;
    }
    form.openAdd();
  };

  // Wrap save to refresh limits after
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

  const galleryImages = useMemo(() =>
    memories.flatMap(m => (m.imageUrls || []).map(url => ({ id: m.id + url, url, title: m.title, date: m.date }))),
    [memories]
  );

  if (authLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading...</p>
    </div>
  );
  if (!user && !isSharedAccess) return <LoginScreen onGoogleLogin={handleGoogleLogin} onShareTokenLogin={handleShareTokenLogin} isLoading={loginLoading}/>;
  if (user && !isSharedAccess && driveSetupNeeded) return <DriveSetupScreen user={user} onSetupComplete={handleDriveSetupComplete} onSkip={() => setDriveSetupNeeded(false)}/>;
  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-400 gap-3">
      <style>{styles}</style><Heart className="animate-pulse" size={40}/><p className="text-sm">Loading your story...</p>
    </div>
  );

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${theme.gradient} text-gray-800 font-sans relative overflow-x-hidden`}>
      <FloatingElements theme={theme}/>

      {!isPro && !isSharedAccess && (
        <div className="relative z-30 bg-amber-50 border-b border-amber-100 text-center py-1.5 px-4 text-xs text-amber-700 flex items-center justify-center gap-2">
          <Crown size={11} className="text-amber-500"/>
          Free plan: 2 memories, 2 collaborators
          <button onClick={handleUpgradeToPro} className="underline font-bold text-amber-600 hover:text-amber-700 ml-1">
            Upgrade to Pro →
          </button>
        </div>
      )}

      {isSharedAccess && (
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
        onShare={handleShareClick}
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
              <Btn onClick={handleOpenAdd}>Add First Memory</Btn>
            </div>
          ) : (
            <div>
              {/* Memory usage bar for free users */}
              {!isPro && (
                <div className="mb-6 bg-white/70 rounded-2xl p-3 border border-gray-100 max-w-xs mx-auto text-center">
                  <p className="text-[11px] text-gray-400 mb-1 font-semibold">
                    Memories: <span className={`font-bold ${(limits?.memories?.count ?? memories.length) >= 2 ? 'text-red-500' : 'text-gray-600'}`}>
                      {limits?.memories?.count ?? memories.length} / 2
                    </span>
                  </p>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all"
                      style={{ width: `${Math.min(((limits?.memories?.count ?? memories.length) / 2) * 100, 100)}%` }}/>
                  </div>
                  {!limits?.memories?.canAdd && (
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
              {memories.map(ev => <EventCard key={ev.id} event={ev} onDelete={form.handleDelete} onEdit={form.openEdit} theme={theme}/>)}
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

      <button onClick={handleOpenAdd}
        className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 bg-gradient-to-r ${theme.fab} text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-rose-300/50 transition-transform hover:scale-110 active:scale-95 z-40`}>
        <Plus size={24} strokeWidth={2.5}/>
      </button>

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
        theme={theme}
        memberType={config?.memberType || 'duo'}
      />

      {!isSharedAccess && (
        <SettingsModal
          isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)}
          config={config} setConfig={setConfig}
          onSave={handleSaveConfig} folderId={folderId}
          onConnectDrive={() => { setIsConfigModalOpen(false); setDriveSetupNeeded(true); }}
          theme={theme}
        />
      )}

      {!isSharedAccess && (
        <ShareModal
          isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}
          shareToken={shareToken} onGenerateToken={generateShareToken}
          theme={theme} isPro={isPro} limits={limits}
        />
      )}

      <PricingModal
        isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)}
        user={user} theme={theme} onSuccess={() => refreshLimits()}
      />
    </div>
  );
}