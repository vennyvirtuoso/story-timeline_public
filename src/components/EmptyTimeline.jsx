import React from 'react';
import { Heart } from 'lucide-react';
import { Btn } from './ui';

const EmptyTimeline = ({ theme, canEdit, onAdd }) => (
  <div className="text-center py-20 px-8 bg-white/90 rounded-3xl border border-dashed border-border-theme max-w-sm mx-auto mt-4 shadow-theme-sm animate-fadeIn">
    <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-5 text-rose-safarnama">
      <Heart size={28} fill="currentColor"/>
    </div>
    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-primary mb-2">Your story starts here</h3>
    <p className="text-dark/50 text-sm mb-8 font-sans">Add your first memory together</p>
    {canEdit && <Btn onClick={onAdd}>Add First Memory</Btn>}
  </div>
);

export default EmptyTimeline;
