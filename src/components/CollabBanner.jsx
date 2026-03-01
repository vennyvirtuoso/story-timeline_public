import React from 'react';
import { Heart } from 'lucide-react';

export const CollabBanner = ({ onExit }) => (
  <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-center py-2 px-4 text-xs flex items-center justify-center gap-3">
    <span>✏️ You are collaborating on this timeline</span>
    <button onClick={onExit} className="underline text-white/80 font-semibold hover:text-white ml-2">Exit Collaboration</button>
  </div>
);

export const ViewerBanner = ({ theme, onLeave }) => (
  <div className={`bg-gradient-to-r ${theme.banner} text-white text-center py-2 px-4 text-xs flex items-center justify-center gap-2`}>
    <Heart size={12} fill="white"/> Viewing a shared love story
    <button onClick={onLeave} className="underline text-white/80 ml-2">Leave</button>
  </div>
);
