import React from 'react';

const MemoryLimitBar = ({ count, onUpgrade }) => (
  <div className="mb-6 bg-white/70 rounded-2xl p-3 border border-gray-100 max-w-xs mx-auto text-center">
    <p className="text-[11px] text-gray-400 mb-1 font-semibold">
      Memories: <span className={`font-bold ${count >= 2 ? 'text-red-500' : 'text-gray-600'}`}>{count} / 2</span>
    </p>
    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all"
        style={{ width: `${Math.min((count / 2) * 100, 100)}%` }}/>
    </div>
    {count >= 2 && (
      <button onClick={onUpgrade} className="text-[10px] text-amber-600 underline mt-1.5 block mx-auto">
        Upgrade for unlimited memories →
      </button>
    )}
  </div>
);

export default MemoryLimitBar;
