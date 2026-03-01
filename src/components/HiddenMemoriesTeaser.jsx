import React from 'react';
import { Crown } from 'lucide-react';

const HiddenMemoriesTeaser = ({ count, onUpgrade }) => (
  <div onClick={onUpgrade}
    className="cursor-pointer mt-4 p-5 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 text-center hover:bg-amber-50 transition-colors">
    <Crown size={20} className="text-amber-400 mx-auto mb-2"/>
    <p className="text-sm font-bold text-amber-700">{count} more {count === 1 ? 'memory' : 'memories'} hidden</p>
    <p className="text-xs text-amber-500 mt-1">Upgrade to Pro to view all your memories →</p>
  </div>
);

export default HiddenMemoriesTeaser;
