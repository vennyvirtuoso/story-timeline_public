
import React from 'react';
import { THEMES } from '../utils/themes';

const swatchGradients = {
  love: 'from-rose-400 to-pink-500',
  ocean: 'from-sky-400 to-cyan-500',
  forest: 'from-emerald-400 to-green-500',
  sunset: 'from-orange-400 to-amber-400',
  galaxy: 'from-violet-400 to-purple-500',
  monochrome: 'from-gray-500 to-slate-600',
};

const ThemePicker = ({ value, onChange }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Theme</label>
    <div className="grid grid-cols-3 gap-2">
      {THEMES.map(t => (
        <button key={t.id} type="button" onClick={() => onChange(t.id)}
          className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${value === t.id ? 'border-gray-400 shadow-md scale-105' : 'border-gray-100 hover:border-gray-200'}`}>
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${swatchGradients[t.id]} shadow-sm`}/>
          <span className="text-[10px] font-semibold text-gray-600 leading-tight text-center">{t.name}</span>
          {value === t.id && (
            <div className="absolute top-1 right-1 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center">
              <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default ThemePicker;