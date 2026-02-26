import React from 'react';
import { Heart, Image as ImageIcon, Clock, Settings, Share2, LogOut } from 'lucide-react';

const AppHeader = ({ config, duration, activeTab, setActiveTab, galleryCount, isSharedAccess, onShare, onSettings, onSignOut }) => (
  <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-rose-100/50 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 pt-4 pb-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Heart fill="currentColor" className="text-rose-400 shrink-0 animate-bounce-slow" size={20}/>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 leading-tight truncate">
              {config.partner1 || 'Partner 1'} & {config.partner2 || 'Partner 2'}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
              Since {config.startDate ? new Date(config.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
            </p>
          </div>
        </div>
        {!isSharedAccess && (
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button onClick={onShare} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-rose-500 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm transition-colors">
              <Share2 size={11}/><span className="hidden sm:inline">Share</span>
            </button>
            <button onClick={onSettings} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm transition-colors">
              <Settings size={11}/><span className="hidden sm:inline">Settings</span>
            </button>
            <button onClick={onSignOut} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-red-500 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm transition-colors">
              <LogOut size={11}/><span className="hidden sm:inline">Out</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-3">
        {[['Yrs',duration.years],['Mo',duration.months],['Days',duration.days],['Hrs',duration.hours],['Min',duration.minutes],['Sec',duration.seconds]].map(([label,val],i)=>(
          <div key={i} className="bg-white/70 rounded-xl p-1.5 sm:p-2 text-center border border-rose-100 shadow-sm">
            <div className="text-base sm:text-xl font-black text-rose-500 leading-none">{val}</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab==='timeline'?'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-sm':'text-gray-500 hover:bg-white/70 hover:text-rose-500'}`}>
          <Clock size={13}/><span>Timeline</span>
        </button>
        <button onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab==='gallery'?'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-sm':'text-gray-500 hover:bg-white/70 hover:text-rose-500'}`}>
          <ImageIcon size={13}/><span>Gallery</span>
          {galleryCount > 0 && <span className="bg-white/30 text-[10px] px-1.5 rounded-full">{galleryCount}</span>}
        </button>
      </div>
    </div>
  </header>
);

export default AppHeader;