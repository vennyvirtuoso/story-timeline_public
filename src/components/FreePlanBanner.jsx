import React from 'react';
import { Crown } from 'lucide-react';

const FreePlanBanner = ({ onUpgrade }) => (
  <div className="bg-amber-50 border-b border-amber-100 text-center py-2 px-4 text-xs text-amber-700 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
    <div className="flex items-center gap-1.5 justify-center">
      <Crown size={11} className="text-amber-500 shrink-0"/>
      <span>Free plan: 2 memories, 2 collaborators</span>
    </div>
    <button onClick={onUpgrade} className="underline font-bold text-amber-600 hover:text-amber-700">Unlock unlimited memories →</button>
  </div>
);

export default FreePlanBanner;
