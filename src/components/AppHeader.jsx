import React from 'react';
import { Image as ImageIcon, Clock, Settings, Share2, LogOut, Heart, Users, User, Home, Crown, Play } from 'lucide-react';
import { getTheme } from '../utils/themes';
import { useDuration } from '../hooks/useDuration';

const memberIcon = { duo: Heart, solo: User, family: Home, group: Users };

const getDisplayTitle = (config) => {
  if (config.timelineName) return config.timelineName;
  const type = config.memberType || 'duo';
  if (type === 'duo' && config.partner1 && config.partner2)
    return `${config.partner1} & ${config.partner2}`;
  if (config.partner1) return config.partner1;
  return 'Your Timeline';
};

const getSubtitle = (config) => {
  const type = config.memberType || 'duo';
  if (config.timelineName) {
    if (type === 'duo' && config.partner1 && config.partner2)
      return `${config.partner1} & ${config.partner2}`;
    if (config.partner1) return config.partner1;
  }
  return null;
};

// Isolated ticking counter so App & Timeline cards never re-render every second
const DurationCounter = React.memo(({ startDate, isDark }) => {
  const duration = useDuration(startDate);
  const items = [
    ['Yrs', duration.years],
    ['Mo', duration.months],
    ['Days', duration.days],
    ['Hrs', duration.hours],
    ['Min', duration.minutes],
    ['Sec', duration.seconds],
  ];

  return (
    <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 mb-3.5" aria-label="Time together counter">
      {items.map(([label, val]) => (
        <div
          key={label}
          className={`rounded-2xl py-2 px-1 sm:py-2.5 sm:px-2 text-center border border-border-theme shadow-theme-sm transition-colors ${
            isDark ? 'bg-white/[0.06]' : 'bg-white/75'
          }`}
        >
          <div className="text-base sm:text-xl font-heading font-semibold text-primary leading-none tabular-nums">
            {String(val).padStart(2, '0')}
          </div>
          <div className="text-[8px] sm:text-[9px] font-sub font-bold text-dark/50 uppercase tracking-[0.16em] mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
});

DurationCounter.displayName = 'DurationCounter';

const AppHeader = ({
  config,
  activeTab,
  setActiveTab,
  galleryCount,
  memoriesCount = 0,
  onPlayStory,
  isSharedAccess,
  onShare,
  onSettings,
  onSignOut,
  isPro,
}) => {
  const theme        = getTheme(config.theme || 'love');
  const MemberIcon   = memberIcon[config.memberType || 'duo'] || Heart;
  const displayTitle = getDisplayTitle(config);
  const subtitle     = getSubtitle(config);

  const formattedStartDate = config.startDate
    ? new Date(
        typeof config.startDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(config.startDate)
          ? `${config.startDate}T00:00:00`
          : config.startDate
      ).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  return (
    <header className="sticky top-0 z-30 bg-surface backdrop-blur-xl border-b border-border-theme shadow-theme-sm pt-safe transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-3.5 pb-3">
        {/* Top Row: Title + Action Pills */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-primary/10 border border-border-theme flex items-center justify-center shrink-0">
              <MemberIcon fill="currentColor" className={`${theme.heart} animate-bounce-slow`} size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-semibold text-primary leading-tight truncate">
                  {displayTitle}
                </h1>
                {isPro && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-sub font-bold bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Crown size={9} fill="currentColor" /> PRO
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap mt-0.5">
                {subtitle && (
                  <p className="text-[11px] sm:text-xs text-dark/70 font-sub font-medium truncate">
                    {subtitle}
                  </p>
                )}
                {subtitle && <span className="text-dark/25 text-[10px]">•</span>}
                <p className="text-[10px] sm:text-[11px] text-dark/50 font-sub uppercase tracking-[0.14em] inline-flex items-center gap-1.5">
                  <span className="live-beacon-dot" aria-hidden="true" />
                  Since {formattedStartDate}
                </p>
              </div>
            </div>
          </div>

          {!isSharedAccess && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onShare}
                aria-label="Share timeline"
                className={`flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-wider border border-border-theme rounded-full px-3 py-2 shadow-theme-sm transition-all duration-150 hover:-translate-y-0.5 active:scale-95 ${
                  theme.isDark
                    ? 'bg-white/10 text-dark/85 hover:bg-white/15 hover:text-primary'
                    : 'bg-white text-dark/70 hover:text-primary hover:border-primary/30'
                }`}
              >
                <Share2 size={12} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                type="button"
                onClick={onSettings}
                aria-label="Timeline settings"
                className={`flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-wider border border-border-theme rounded-full px-3 py-2 shadow-theme-sm transition-all duration-150 hover:-translate-y-0.5 active:scale-95 ${
                  theme.isDark
                    ? 'bg-white/10 text-dark/85 hover:bg-white/15 hover:text-primary'
                    : 'bg-white text-dark/70 hover:text-primary hover:border-primary/30'
                }`}
              >
                <Settings size={12} />
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                type="button"
                onClick={onSignOut}
                aria-label="Sign out"
                className={`flex items-center gap-1.5 text-[10px] font-sub font-bold uppercase tracking-wider border border-border-theme rounded-full px-3 py-2 shadow-theme-sm transition-all duration-150 hover:-translate-y-0.5 active:scale-95 ${
                  theme.isDark
                    ? 'bg-white/10 text-dark/85 hover:bg-red-500/20 hover:text-red-300'
                    : 'bg-white text-dark/70 hover:text-red-600 hover:border-red-200'
                }`}
              >
                <LogOut size={12} />
                <span className="hidden sm:inline">Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Isolated Ticking Counter */}
        <DurationCounter startDate={config.startDate} isDark={theme.isDark} />

        {/* Navigation Tabs */}
        <nav aria-label="Timeline views" className="flex items-center justify-between gap-2">
          <div className={`inline-flex p-1 rounded-full border border-border-theme ${theme.isDark ? 'bg-white/[0.05]' : 'bg-cream-dark/60'}`}>
            {[
              ['timeline', 'Timeline', <Clock key="c" size={13} />],
              ['gallery', 'Gallery', <ImageIcon key="i" size={13} />],
            ].map(([tab, label, icon]) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-sub font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? `${theme.tabActive} shadow-theme-sm`
                      : 'text-dark/60 hover:text-dark'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                  {tab === 'gallery' && galleryCount > 0 && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${
                        isActive
                          ? 'bg-black/15 text-current'
                          : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {galleryCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {memoriesCount > 0 && onPlayStory && (
            <button
              type="button"
              onClick={onPlayStory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-accent/15 hover:bg-accent/25 text-accent border border-accent/30 text-[11px] font-sub font-bold uppercase tracking-wider shadow-theme-sm transition-all duration-150 hover:-translate-y-0.5 active:scale-95 shrink-0"
            >
              <Play size={11} fill="currentColor" />
              <span>Play Story</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
