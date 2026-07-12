import React from 'react';
import { Calendar, Clock, LinkIcon, Upload, Video, Trash2, PlayCircle, Loader2 } from 'lucide-react';
import { Modal, Btn, Field, TA } from './ui';

const EVENT_TYPES = {
  duo: [
    { value: 'general', label: 'General Memory ✨' },
    { value: 'milestone', label: 'Milestone 🌟' },
    { value: 'first', label: 'First Time 💫' },
    { value: 'date', label: 'Date Night ❤️' },
    { value: 'trip', label: 'Trip ✈️' },
    { value: 'anniversary', label: 'Anniversary 💍' },
    { value: 'proposal', label: 'Proposal 💌' },
    { value: 'celebration', label: 'Celebration 🎉' },
    { value: 'little-moment', label: 'Little Moment 🌸' },
    { value: 'surprise', label: 'Surprise 🎁' },
    { value: 'challenge', label: 'Through It Together 🤝' },
    { value: 'memory-lane', label: 'Throwback 💭' },
  ],

  family: [
    { value: 'general', label: 'General Memory ✨' },
    { value: 'milestone', label: 'Milestone 🌟' },
    { value: 'birthday', label: 'Birthday 🎂' },
    { value: 'trip', label: 'Family Trip ✈️' },
    { value: 'celebration', label: 'Celebration 🎉' },
    { value: 'festival', label: 'Festival 🪔' },
    { value: 'reunion', label: 'Reunion 🏠' },
    { value: 'achievement', label: 'Proud Moment 🏆' },
    { value: 'home', label: 'Home Moments 🏡' },
    { value: 'tradition', label: 'Family Tradition 🌿' },
    { value: 'new-beginning', label: 'New Beginning 🌅' },
  ],

  group: [
    { value: 'general', label: 'General Memory ✨' },
    { value: 'milestone', label: 'Milestone 🌟' },
    { value: 'trip', label: 'Group Trip ✈️' },
    { value: 'celebration', label: 'Celebration 🎉' },
    { value: 'hangout', label: 'Hangout 🎮' },
    { value: 'late-night', label: 'Late Night Talks 🌙' },
    { value: 'achievement', label: 'Team Win 🏆' },
    { value: 'event', label: 'Special Event 🎤' },
    { value: 'throwback', label: 'Throwback 💭' },
    { value: 'random', label: 'Random Chaos 😂' },
    { value: 'farewell', label: 'Farewell 🥹' },
  ],

  solo: [
    { value: 'general', label: 'General Memory ✨' },
    { value: 'milestone', label: 'Milestone 🌟' },
    { value: 'trip', label: 'Adventure ✈️' },
    { value: 'achievement', label: 'Achievement 🏆' },
    { value: 'reflection', label: 'Reflection 📖' },
    { value: 'growth', label: 'Personal Growth 🌱' },
    { value: 'dream', label: 'Dream Moment ✨' },
    { value: 'challenge', label: 'Overcoming Challenge 💪' },
    { value: 'self-care', label: 'Self Care 🌿' },
    { value: 'gratitude', label: 'Gratitude 🤍' },
    { value: 'new-beginning', label: 'New Chapter 🌅' },
  ],
};

const MemoryModal = ({
  isOpen, onClose, editingId,
  newEvent, setNewEvent,
  tempImageLink, setTempImageLink,
  tempVideoLink, setTempVideoLink,
  addImageLink, removeImage,
  addVideoLink, removeVideo,
  handleUpload, handleSaveEvent,
  isSaving, isUploadingImage, isUploadingVideo, folderId,  // ✅ replaced isUploading
  fileRef, videoRef,
  theme, memberType,
  isCollabRole,        // ✅ add this prop
  onConnectDrive,      // ✅ add this prop
}) => {
  const t = theme || {};
  const accentBg     = t.accentBg     || 'bg-rose-100';
  const accentText   = t.accentText   || 'text-rose-500';
  const accentBorder = t.accentBorder || 'border-rose-200';
  const accentHover  = t.accentHover  || 'hover:bg-rose-50';
  const accentHoverBtn = t.accentHoverBtn || 'hover:bg-rose-200';
  const btnPrimary   = t.btnPrimary   || 'from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-200';

  const typeOptions = EVENT_TYPES[memberType || 'duo'] || EVENT_TYPES.duo;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingId ? 'Edit Memory' : 'New Memory ✨'} theme={theme}>
      <form onSubmit={handleSaveEvent}>
        {/* ✅ Stack date/time vertically on small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Date" type="date" value={newEvent.date} onChange={v => setNewEvent({ ...newEvent, date: v })} required icon={Calendar}/>
          <div className="mb-4">
            <label className="block text-[10px] font-sub font-bold text-dark/60 mb-1.5 uppercase tracking-widest flex items-center gap-1">
              <Clock size={12}/> Time <span className="text-dark/40 font-normal normal-case">(optional)</span>
            </label>
            <input
              type="time"
              value={newEvent.time || ''}
              onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full px-4 py-3 border border-border-theme rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-dark placeholder-dark/30 bg-white/70 focus:bg-white transition-all font-sans"
              style={{ colorScheme: 'light' }}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-[10px] font-sub font-bold text-dark/60 mb-1.5 uppercase tracking-widest">Type</label>
          <select value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
            style={{ fontSize: '16px' }}
            className="w-full px-4 py-3 border border-border-theme rounded-xl text-dark bg-white/70 focus:bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans transition-all">
            {typeOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        
        <Field label="Title" placeholder="e.g., One of My Favorite Moments" value={newEvent.title} onChange={v => setNewEvent({ ...newEvent, title: v })} required/>
        <TA label="Story" placeholder="What happened? What made this moment special?" value={newEvent.description} onChange={v => setNewEvent({ ...newEvent, description: v })}/>

        {/* Photos */}
        <div className="mb-4 bg-cream/40 p-4 rounded-2xl border border-border-theme">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-sub font-bold text-dark/60 uppercase tracking-widest">Photos</span>
            {isUploadingImage && <Loader2 size={13} className="animate-spin text-primary"/>}
          </div>
          {folderId ? (
            <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-border-theme rounded-xl cursor-pointer hover:bg-cream-dark/30 transition-colors text-xs text-primary font-sub font-bold uppercase tracking-wider mb-3.5 shadow-theme-sm">
              <Upload size={13}/> {isUploadingImage ? 'Uploading...' : 'Upload to Drive'}
              <input type="file" className="hidden" accept="image/*" multiple ref={fileRef} onChange={e => handleUpload(e, 'image')} disabled={isUploadingImage}/>
            </label>
          ) : isCollabRole ? (
            <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 p-2.5 rounded-xl mb-3.5 font-sans">
              ⚠️ The timeline owner hasn't connected Google Drive yet. Ask them to connect it before uploading.
            </p>
          ) : (
            <button type="button" onClick={onConnectDrive}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-dashed border-border-theme rounded-xl text-xs text-accent hover:border-primary hover:text-primary transition-colors mb-3.5 font-sub font-bold uppercase tracking-wider shadow-theme-sm">
              <Upload size={13}/> Connect Google Drive to upload photos
            </button>
          )}
          <div className="flex gap-2 items-center text-[9px] font-sub font-bold text-dark/35 uppercase tracking-[0.2em] mb-3.5">
            <div className="flex-1 border-t border-border-theme/60"/>OR PASTE<div className="flex-1 border-t border-border-theme/60"/>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40"/>
              <input value={tempImageLink} onChange={e => setTempImageLink(e.target.value)} onKeyDown={e => e.key==='Enter'&&(e.preventDefault(),addImageLink())}
                placeholder="Drive or Imgur link" className="w-full pl-9 pr-3 py-2.5 border border-border-theme rounded-xl text-xs text-dark placeholder-dark/30 bg-white/70 focus:bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans transition-all"/>
            </div>
            <button type="button" onClick={addImageLink} className="bg-primary hover:bg-primary-hover text-cream px-4 rounded-xl text-xs font-sub font-bold uppercase tracking-wider transition-colors duration-150 shadow-theme-sm">Add</button>
          </div>
          <div className="mt-3.5 space-y-1.5 max-h-28 overflow-y-auto scrollbar-thin">
            {newEvent.imageUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-border-theme shadow-theme-sm">
                <div className="w-8 h-8 rounded bg-cream overflow-hidden shrink-0"><img src={url} alt="" className="w-full h-full object-cover"/></div>
                <p className="text-[10px] text-dark/40 truncate flex-1">{url}</p>
                <button type="button" onClick={() => removeImage(url)} className="text-dark/30 hover:text-red-500 shrink-0 transition-colors"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="mb-5 bg-cream/40 p-4 rounded-2xl border border-border-theme">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-sub font-bold text-dark/60 uppercase tracking-widest">Videos</span>
            {isUploadingVideo && <Loader2 size={13} className="animate-spin text-primary"/>}
          </div>
          {folderId ? (
            <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-border-theme rounded-xl cursor-pointer hover:bg-cream-dark/30 transition-colors text-xs text-primary font-sub font-bold uppercase tracking-wider mb-3.5 shadow-theme-sm">
              <Upload size={13}/> {isUploadingVideo ? 'Uploading...' : 'Upload to Drive'}
              <input type="file" className="hidden" accept="video/*" multiple ref={videoRef} onChange={e => handleUpload(e, 'video')} disabled={isUploadingVideo}/>
            </label>
          ) : isCollabRole ? (
            <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 p-2.5 rounded-xl mb-3.5 font-sans">
              ⚠️ The timeline owner hasn't connected Google Drive yet. Ask them to connect it before uploading.
            </p>
          ) : (
            <button type="button" onClick={onConnectDrive}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-dashed border-border-theme rounded-xl text-xs text-accent hover:border-primary hover:text-primary transition-colors mb-3.5 font-sub font-bold uppercase tracking-wider shadow-theme-sm">
              <Upload size={13}/> Connect Google Drive to upload videos
            </button>
          )}
          <div className="flex gap-2 items-center text-[9px] font-sub font-bold text-dark/35 uppercase tracking-[0.2em] mb-3.5">
            <div className="flex-1 border-t border-border-theme/60"/>OR PASTE<div className="flex-1 border-t border-border-theme/60"/>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Video size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40"/>
              <input value={tempVideoLink} onChange={e => setTempVideoLink(e.target.value)} onKeyDown={e => e.key==='Enter'&&(e.preventDefault(),addVideoLink())}
                placeholder="YouTube or Drive link" className="w-full pl-9 pr-3 py-2.5 border border-border-theme rounded-xl text-xs text-dark placeholder-dark/30 bg-white/70 focus:bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans transition-all"/>
            </div>
            <button type="button" onClick={addVideoLink} className="bg-primary hover:bg-primary-hover text-cream px-4 rounded-xl text-xs font-sub font-bold uppercase tracking-wider transition-colors duration-150 shadow-theme-sm">Add</button>
          </div>
          <div className="mt-3.5 space-y-1.5 max-h-28 overflow-y-auto scrollbar-thin">
            {newEvent.videoUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-border-theme shadow-theme-sm">
                <div className="w-8 h-8 rounded bg-cream flex items-center justify-center shrink-0"><PlayCircle size={14} className="text-dark/30"/></div>
                <p className="text-[10px] text-dark/40 truncate flex-1">{url}</p>
                <button type="button" onClick={() => removeVideo(url)} className="text-dark/30 hover:text-red-500 shrink-0 transition-colors"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Scrapbook Visual Customizer */}
        <div className="mb-5 bg-cream/30 p-4.5 rounded-2xl border border-border-theme/80 backdrop-blur-[0.5px]">
          <span className="block text-[10px] font-sub font-bold text-dark/70 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
            🎨 Scrapbook Decorations
          </span>

          <div className="space-y-4.5">
            {/* Washi Tape Selector */}
            <div>
              <label className="block text-[10px] font-sub font-bold text-dark/50 mb-2 uppercase tracking-wider">
                Washi Tape Style
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'rose-floral', name: '🌸 Rose', bg: 'bg-gradient-to-r from-rose-200/80 via-pink-100/80 to-rose-200/80' },
                  { id: 'gold-stars', name: '⭐ Gold', bg: 'bg-gradient-to-r from-amber-200/80 via-yellow-100/80 to-amber-200/80' },
                  { id: 'mint-checker', name: '🏁 Mint', bg: 'bg-gradient-to-r from-emerald-200/80 via-teal-100/80 to-emerald-200/80' },
                  { id: 'lavender-lace', name: '💜 Lace', bg: 'bg-gradient-to-r from-purple-200/80 via-fuchsia-100/80 to-purple-200/80' },
                  { id: 'sky-clouds', name: '☁️ Sky', bg: 'bg-gradient-to-r from-sky-200/80 via-blue-100/80 to-sky-200/80' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, washiStyle: item.id })}
                    className={`h-11 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                      newEvent.washiStyle === item.id 
                        ? 'border-primary ring-2 ring-primary/20 scale-[1.03] bg-white' 
                        : 'border-border-theme hover:scale-[1.01] bg-white/60'
                    }`}
                  >
                    <div className={`w-8 h-3 rounded-sm ${item.bg} border border-dark/5 mb-1`} />
                    <span className="text-[9px] font-sans text-dark/70 font-semibold">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paperclip Selector */}
            <div>
              <label className="block text-[10px] font-sub font-bold text-dark/50 mb-2 uppercase tracking-wider">
                Paperclip Metal
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'silver', name: 'Silver', color: 'bg-gray-400' },
                  { id: 'rose-gold', name: 'Rose Gold', color: 'bg-rose-300' },
                  { id: 'gold', name: 'Gold', color: 'bg-amber-400' },
                  { id: 'mint', name: 'Teal', color: 'bg-emerald-400' },
                  { id: 'pink', name: 'Pink', color: 'bg-pink-400' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, paperclipColor: item.id })}
                    className={`h-10 rounded-xl border-2 flex items-center justify-center gap-1.5 transition-all ${
                      newEvent.paperclipColor === item.id 
                        ? 'border-primary ring-2 ring-primary/20 scale-[1.03] bg-white' 
                        : 'border-border-theme hover:scale-[1.01] bg-white/60'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-inner`} />
                    <span className="text-[9px] font-sans text-dark/70 font-semibold">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stamp Selector */}
            <div>
              <label className="block text-[10px] font-sub font-bold text-dark/50 mb-2 uppercase tracking-wider">
                Scrapbook Stamp / Sticker
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'none', name: 'None', label: '❌' },
                  { id: 'love', name: 'Love', label: '❤️' },
                  { id: 'adventure', name: 'Travel', label: '✈️' },
                  { id: 'forever', name: 'Forever', label: '♾️' },
                  { id: 'sweetest', name: 'Sweet', label: '💘' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, stampType: item.id })}
                    className={`h-11 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                      newEvent.stampType === item.id 
                        ? 'border-primary ring-2 ring-primary/20 scale-[1.03] bg-white' 
                        : 'border-border-theme hover:scale-[1.01] bg-white/60'
                    }`}
                  >
                    <span className="text-[14px] leading-none mb-0.5">{item.label}</span>
                    <span className="text-[9px] font-sans text-dark/70 font-semibold">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="flex gap-3">
          <Btn variant="secondary" onClick={onClose} className="flex-1">Cancel</Btn>
          <button type="submit" disabled={isSaving || isUploadingImage || isUploadingVideo}
            className="flex-1 inline-flex items-center justify-center gap-1.5 font-sub text-xs font-bold uppercase tracking-wider rounded-xl px-5 py-3 bg-primary hover:bg-primary-hover text-cream shadow-theme-sm transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSaving ? <><Loader2 size={15} className="animate-spin"/>Saving...</> : editingId ? 'Update' : 'Save Memory'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MemoryModal;