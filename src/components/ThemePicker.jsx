
import React from 'react';
import { THEMES } from '../utils/themes';

const swatchGradients = {
  love: 'from-[#2a5c4e] to-[#b6813c]',
  ocean: 'from-[#0d9488] to-[#0284c7]',
  forest: 'from-[#15803d] to-[#854d0e]',
  sunset: 'from-[#c2410c] to-[#b45309]',
  galaxy: 'from-[#6d28d9] to-[#7c3aed]',
  monochrome: 'from-[#1f2937] to-[#4b5563]',
};

const ThemePicker = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block text-[10px] font-sub font-bold text-dark/60 mb-2 uppercase tracking-widest">Theme</label>
    <div className="grid grid-cols-3 gap-2">
      {THEMES.map(t => (
        <button key={t.id} type="button" onClick={() => onChange(t.id)}
          className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${value === t.id ? 'border-primary bg-white shadow-theme-md scale-102' : 'border-border-theme hover:bg-cream-dark/30'}`}>
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${swatchGradients[t.id]} shadow-theme-sm`}/>
          <span className="text-[10px] font-sub font-bold text-dark/70 uppercase tracking-wider leading-tight text-center mt-1">{t.name}</span>
          {value === t.id && (
            <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
              <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default ThemePicker;