import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import styles from '../utils/styles';

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  const mk = (id) => ({ id, left: Math.random()*100, size: Math.random()*28+12, duration: Math.random()*6+6, delay: Math.random()*5, color: Math.random()>0.5?'text-rose-300':'text-pink-300' });
  useEffect(() => {
    setHearts(Array.from({length:12}).map((_,i)=>mk(i)));
    const t = setInterval(() => setHearts(p=>[...p.slice(-38), mk(Date.now())]), 700);
    return ()=>clearInterval(t);
  }, []);
  return (
    <>
      <style>{styles}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        {hearts.map(h=>(
          <div key={h.id} className={`floating-heart ${h.color}`}
            style={{left:`${h.left}%`,fontSize:`${h.size}px`,animationDuration:`${h.duration}s`,animationDelay:`-${h.delay}s`,opacity:0.35}}>
            <Heart fill="currentColor"/>
          </div>
        ))}
      </div>
    </>
  );
};

export const Btn = ({ children, onClick, variant='primary', className='', type='button', disabled=false }) => {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-xl transition-all duration-150 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const v = {
    primary: "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-md shadow-rose-200 px-4 py-2.5",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm px-4 py-2.5",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5",
    ghost: "text-gray-600 hover:bg-white/60 hover:text-rose-600 px-3 py-2",
    icon: "p-2 rounded-full hover:bg-white/80 text-gray-500",
    google: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow px-4 py-2.5",
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${v[variant]} ${className}`}>{children}</button>;
};

export const Field = ({ label, value, onChange, placeholder, type='text', required=false, icon:Icon }) => {
    const isDateOrTime = type === 'date' || type === 'time';
    return (
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}{required&&<span className="text-rose-400 ml-0.5">*</span>}</label>
        <div className="relative">
          {Icon && !isDateOrTime && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Icon size={15}/></div>}
          <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required}
            className={`w-full py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 text-sm text-gray-700 placeholder-gray-400 bg-white transition-all ${Icon && !isDateOrTime ?'pl-9 pr-3':'px-3'}`}/>
        </div>
      </div>
    );
  };

export const TA = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 text-sm text-gray-700 placeholder-gray-400 bg-white resize-none transition-all"/>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-3xl sm:rounded-t-3xl shrink-0">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-white rounded-full transition-colors"><X size={18}/></button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};