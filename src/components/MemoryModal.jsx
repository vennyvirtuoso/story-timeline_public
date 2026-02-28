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
  isSaving, isUploading, folderId,
  fileRef, videoRef,
  theme, memberType
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" type="date" value={newEvent.date} onChange={v => setNewEvent({ ...newEvent, date: v })} required icon={Calendar}/>
          <Field label="Time" type="time" value={newEvent.time} onChange={v => setNewEvent({ ...newEvent, time: v })} icon={Clock}/>
        </div>
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Type</label>
          <select value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
            className={`w-full px-3 py-2.5 border ${accentBorder} rounded-xl text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:border-opacity-60`}>
            {typeOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <Field label="Title" placeholder="e.g., Our First Coffee" value={newEvent.title} onChange={v => setNewEvent({ ...newEvent, title: v })} required/>
        <TA label="Story" placeholder="What happened? How did you feel?" value={newEvent.description} onChange={v => setNewEvent({ ...newEvent, description: v })}/>

        {/* Photos */}
        <div className="mb-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Photos</span>
            {isUploading && <Loader2 size={13} className={`animate-spin ${accentText}`}/>}
          </div>
          {folderId ? (
            <label className={`flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border ${accentBorder} rounded-xl cursor-pointer ${accentHover} transition-colors text-xs ${accentText} font-semibold mb-2`}>
              <Upload size={13}/> Upload to Drive
              <input type="file" className="hidden" accept="image/*" ref={fileRef} onChange={e => handleUpload(e, 'image')} disabled={isUploading}/>
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
              <input value={tempImageLink} onChange={e => setTempImageLink(e.target.value)} onKeyDown={e => e.key==='Enter'&&(e.preventDefault(),addImageLink())}
                placeholder="Drive or Imgur link" className={`w-full pl-8 pr-2 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 bg-white outline-none focus:ring-2 focus:${accentBorder}`}/>
            </div>
            <button type="button" onClick={addImageLink} className={`${accentBg} ${accentText} px-3 rounded-xl text-xs font-semibold ${accentHoverBtn}`}>Add</button>
          </div>
          <div className="mt-2 space-y-1.5 max-h-28 overflow-y-auto">
            {newEvent.imageUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-100">
                <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0"><img src={url} alt="" className="w-full h-full object-cover"/></div>
                <p className="text-[10px] text-gray-400 truncate flex-1">{url}</p>
                <button type="button" onClick={() => removeImage(i)} className="text-gray-300 hover:text-red-400 shrink-0"><Trash2 size={12}/></button>
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
            <label className={`flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border ${accentBorder} rounded-xl cursor-pointer ${accentHover} transition-colors text-xs ${accentText} font-semibold mb-2`}>
              <Upload size={13}/> Upload to Drive
              <input type="file" className="hidden" accept="video/*" ref={videoRef} onChange={e => handleUpload(e, 'video')} disabled={isUploading}/>
            </label>
          )}
          <div className="flex gap-2 items-center text-[10px] text-gray-400 uppercase tracking-widest mb-2">
            <div className="flex-1 border-t border-gray-200"/>OR PASTE<div className="flex-1 border-t border-gray-200"/>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Video size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={tempVideoLink} onChange={e => setTempVideoLink(e.target.value)} onKeyDown={e => e.key==='Enter'&&(e.preventDefault(),addVideoLink())}
                placeholder="YouTube or Drive link" className={`w-full pl-8 pr-2 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 bg-white outline-none focus:ring-2 focus:${accentBorder}`}/>
            </div>
            <button type="button" onClick={addVideoLink} className={`${accentBg} ${accentText} px-3 rounded-xl text-xs font-semibold ${accentHoverBtn}`}>Add</button>
          </div>
          <div className="mt-2 space-y-1.5 max-h-28 overflow-y-auto">
            {newEvent.videoUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-100">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0"><PlayCircle size={14} className="text-gray-300"/></div>
                <p className="text-[10px] text-gray-400 truncate flex-1">{url}</p>
                <button type="button" onClick={() => removeVideo(i)} className="text-gray-300 hover:text-red-400 shrink-0"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Btn variant="secondary" onClick={onClose} className="flex-1">Cancel</Btn>
          <button type="submit" disabled={isSaving || isUploading}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 font-medium rounded-xl px-4 py-2.5 bg-gradient-to-r ${btnPrimary} text-white shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}>
            {isSaving ? <><Loader2 size={15} className="animate-spin"/>Saving...</> : editingId ? 'Update' : 'Save Memory'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MemoryModal;