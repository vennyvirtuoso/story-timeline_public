import React from 'react';
import { Heart } from 'lucide-react';

export const CollabBanner = ({ onExit }) => (
  <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-center py-2 px-4 text-xs flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
    <span>✏️ You are collaborating on this timeline</span>
    <button onClick={onExit} className="underline text-white/80 font-semibold hover:text-white">Exit Collaboration</button>
  </div>
);

export const ViewerBanner = ({ theme, onLeave }) => (
  <div className={`bg-gradient-to-r ${theme.banner} text-white text-center py-2 px-4 text-xs flex flex-wrap items-center justify-center gap-x-2 gap-y-1`}>
    <div className="flex items-center gap-1.5 justify-center">
      <Heart size={12} fill="white" className="shrink-0"/>
      <span>Viewing a shared Timeline</span>
    </div>
    <button onClick={onLeave} className="underline text-white/80">Leave</button>
  </div>
);
