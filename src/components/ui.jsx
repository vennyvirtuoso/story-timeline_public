import React from 'react';
import { X } from 'lucide-react';

export const Btn = ({ children, onClick, variant='primary', className='', type='button', disabled=false }) => {
  const base = "inline-flex items-center justify-center gap-1.5 font-sub text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-150 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const v = {
    primary: "bg-primary hover:bg-primary-hover text-cream shadow-theme-sm px-5 py-3 transform transition hover:-translate-y-0.5",
    secondary: "bg-white text-dark border border-border-theme hover:bg-cream-dark/50 shadow-theme-sm px-5 py-3",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 px-5 py-3",
    ghost: "text-dark/70 hover:bg-primary/10 hover:text-primary px-4 py-2.5",
    icon: "p-2 rounded-full hover:bg-cream-dark/50 text-dark/60 hover:text-dark",
    google: "bg-white border border-border-theme text-dark/80 hover:bg-cream-dark/30 shadow-theme-sm px-5 py-3",
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${v[variant]} ${className}`}>{children}</button>;
};

export const Field = ({ label, value, onChange, placeholder, type='text', required=false, icon:Icon }) => {
  const isDateOrTime = type === 'date' || type === 'time';
  return (
    <div className="mb-4">
      <label className="block text-[10px] font-sub font-bold text-dark/60 mb-1.5 uppercase tracking-widest">
        {label}{required && <span className="text-rose-safarnama ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && !isDateOrTime && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none">
            <Icon size={15}/>
          </div>
        )}
        <input 
          type={type} 
          value={value} 
          onChange={e=>onChange(e.target.value)} 
          placeholder={placeholder} 
          required={required}
          className={`w-full py-3 border border-border-theme rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-dark placeholder-dark/30 bg-white/70 focus:bg-white transition-all ${Icon && !isDateOrTime ? 'pl-10 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
};

export const TA = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-[10px] font-sub font-bold text-dark/60 mb-1.5 uppercase tracking-widest">{label}</label>
    <textarea 
      value={value} 
      onChange={e=>onChange(e.target.value)} 
      placeholder={placeholder} 
      rows={3}
      className="w-full px-4 py-3 border border-border-theme rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-dark placeholder-dark/30 bg-white/70 focus:bg-white resize-none transition-all"
    />
  </div>
);

export const Modal = ({ isOpen, onClose, title, children, theme }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="bg-cream w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-theme-lg flex flex-col max-h-[92vh] sm:max-h-[88vh] border border-border-theme">
        <div className="px-6 py-4.5 border-b border-border-theme flex items-center justify-between bg-cream-dark/40 rounded-t-3xl sm:rounded-t-3xl shrink-0">
          <h3 className="text-base font-heading font-semibold text-primary">{title}</h3>
          <button onClick={onClose} className="text-dark/40 hover:text-dark/80 p-1 hover:bg-cream-dark/60 rounded-full transition-colors">
            <X size={18}/>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6 bg-cream/20">{children}</div>
      </div>
    </div>
  );
};