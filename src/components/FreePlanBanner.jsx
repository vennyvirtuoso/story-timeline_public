import React from 'react';
import { Crown } from 'lucide-react';

const FreePlanBanner = ({ onUpgrade }) => (
  <div className="bg-amber-50 border-b border-amber-100 text-center py-1.5 px-4 text-xs text-amber-700 flex items-center justify-center gap-2">
    <Crown size={11} className="text-amber-500"/>
    Free plan: 2 memories, 2 collaborators
    <button onClick={onUpgrade} className="underline font-bold text-amber-600 hover:text-amber-700 ml-1">Upgrade to Pro →</button>
  </div>
);

export default FreePlanBanner;
