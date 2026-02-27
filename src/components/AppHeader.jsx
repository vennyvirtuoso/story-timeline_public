import React from 'react';
import { Image as ImageIcon, Clock, Settings, Share2, LogOut, Heart, Users, User, Home, Crown } from 'lucide-react';
import { getTheme } from '../utils/themes';

const memberIcon = { duo: Heart, solo: User, family: Home, group: Users };

const getDisplayTitle = (config) => {
  if (config.timelineName) return config.timelineName;
  if (config.memberType === 'duo' && config.partner1 && config.partner2)
    return `${config.partner1} & ${config.partner2}`;
  if (config.partner1) return config.partner1;
  return 'Your Timeline';
};

const getSubtitle = (config) => {
  // If there's a timeline name, show member names as subtitle
  if (config.timelineName) {
    if (config.memberType === 'duo' && config.partner1 && config.partner2)
      return `${config.partner1} & ${config.partner2}`;
    if (config.partner1) return config.partner1;
  }
  return null;
};

const AppHeader = ({ config, duration, activeTab, setActiveTab, galleryCount, isSharedAccess, onShare, onSettings, onSignOut, isPro }) => {
  const theme        = getTheme(config.theme || 'love');
  const MemberIcon   = memberIcon[config.memberType || 'duo'] || Heart;
  const displayTitle = getDisplayTitle(config);
  const subtitle     = getSubtitle(config);

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <MemberIcon fill="currentColor" className={`${theme.heart} shrink-0 animate-bounce-slow`} size={20}/>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className={`text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${theme.header} leading-tight truncate`}>
                  {displayTitle}
                </h1>
                {isPro && (
                  <span className="shrink-0 inline-flex items-center gap-0.5 text-[9px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">
                    <Crown size={8}/>PRO
                  </span>
                )}
              </div>
              {subtitle && <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">{subtitle}</p>}
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
            <div key={i} className={`bg-white/70 rounded-xl p-1.5 sm:p-2 text-center border ${theme.counterBorder} shadow-sm`}>
              <div className={`text-base sm:text-xl font-black ${theme.counter} leading-none`}>{val}</div>
              <div className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {[['timeline','Timeline',<Clock size={13}/>],['gallery','Gallery',<ImageIcon size={13}/>]].map(([tab,label,icon])=>(
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeTab===tab ? `bg-gradient-to-r ${theme.tabActive} text-white shadow-sm` : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'}`}>
              {icon}<span>{label}</span>
              {tab==='gallery' && galleryCount>0 && <span className="bg-white/30 text-[10px] px-1.5 rounded-full">{galleryCount}</span>}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;