import React from 'react';
import { Image as ImageIcon, Clock, Settings, Share2, LogOut, Heart, Users, User, Home, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTheme } from '../utils/themes';

const memberIcon = { duo: Heart, solo: User, family: Home, group: Users };

const getDisplayTitle = (config) => {
  if (config.timelineName) return config.timelineName;
  // ✅ treat undefined memberType as 'duo'
  const type = config.memberType || 'duo';
  if (type === 'duo' && config.partner1 && config.partner2)
    return `${config.partner1} & ${config.partner2}`;
  if (config.partner1) return config.partner1;
  return 'Your Timeline';
};

const getSubtitle = (config) => {
  const type = config.memberType || 'duo';
  if (config.timelineName) {
    // ✅ show member names as subtitle under custom timeline name
    if (type === 'duo' && config.partner1 && config.partner2)
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
    <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-border-theme shadow-theme-sm pt-safe">
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <MemberIcon fill="currentColor" className={`${theme.heart} shrink-0 animate-bounce-slow`} size={20}/>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-heading font-medium text-primary leading-tight truncate">
                  {displayTitle}
                </h1>
                {isPro && (
                  <span className="shrink-0 inline-flex items-center gap-0.5 text-[8px] font-sub font-bold bg-accent/15 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Crown size={8}/>PRO
                  </span>
                )}
              </div>
              {subtitle && <p className="text-[10px] sm:text-xs text-dark/70 font-sub font-medium truncate">{subtitle}</p>}
              <p className="text-[10px] sm:text-xs text-dark/40 font-sub uppercase tracking-widest mt-0.5">
                Since {config.startDate ? new Date(config.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
              </p>
            </div>
          </div>
          {!isSharedAccess && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button onClick={onShare} className="flex items-center gap-1 text-[10px] font-sub font-bold uppercase tracking-wider text-dark/60 hover:text-primary bg-white border border-border-theme rounded-full px-3 py-1.5 shadow-theme-sm transition-colors">
                <Share2 size={11}/><span className="hidden sm:inline">Share</span>
              </button>
              <button onClick={onSettings} className="flex items-center gap-1 text-[10px] font-sub font-bold uppercase tracking-wider text-dark/60 hover:text-primary bg-white border border-border-theme rounded-full px-3 py-1.5 shadow-theme-sm transition-colors">
                <Settings size={11}/><span className="hidden sm:inline">Settings</span>
              </button>
              <button onClick={onSignOut} className="flex items-center gap-1 text-[10px] font-sub font-bold uppercase tracking-wider text-dark/60 hover:text-red-500 bg-white border border-border-theme rounded-full px-3 py-1.5 shadow-theme-sm transition-colors">
                <LogOut size={11}/><span className="hidden sm:inline">Out</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-4">
          {[['Yrs',duration.years],['Mo',duration.months],['Days',duration.days],['Hrs',duration.hours],['Min',duration.minutes],['Sec',duration.seconds]].map(([label,val],i)=>(
            <div key={i} className="bg-white/50 rounded-xl p-1.5 sm:p-2 text-center border border-border-theme shadow-theme-sm">
              <div className="text-base sm:text-xl font-heading font-semibold text-primary leading-none">{val}</div>
              <div className="text-[8px] sm:text-[9px] font-sub font-bold text-dark/50 uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2.5">
            {[['timeline','Timeline',<Clock size={13}/>],['gallery','Gallery',<ImageIcon size={13}/>]].map(([tab,label,icon])=>(
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sub font-bold uppercase tracking-wider transition-all ${activeTab===tab ? 'bg-primary text-cream shadow-theme-sm' : 'text-dark/60 hover:bg-white/60 hover:text-dark'}`}>
                {icon}<span>{label}</span>
                {tab==='gallery' && galleryCount>0 && <span className="bg-primary-hover text-cream text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-0.5">{galleryCount}</span>}
              </button>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;