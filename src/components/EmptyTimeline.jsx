import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { Btn } from './ui';

const EmptyTimeline = ({ canEdit, onAdd }) => (
  <div className="text-center py-16 px-8 bg-surface rounded-3xl border border-dashed border-border-theme max-w-md mx-auto mt-8 shadow-theme-md animate-modal-enter">
    <div className="w-16 h-16 bg-primary/10 border border-border-theme rounded-full flex items-center justify-center mx-auto mb-5 text-rose-safarnama">
      <Heart size={28} fill="currentColor" />
    </div>
    <p className="font-cursive text-3xl text-accent mb-1">Chapter One</p>
    <h3 className="text-2xl font-heading font-semibold text-primary mb-2">Your story starts here</h3>
    <p className="text-dark/60 text-sm mb-7 font-sans leading-relaxed">
      Capture your first photo, note, or milestone together — every unforgettable timeline begins with a single page.
    </p>
    {canEdit && (
      <Btn onClick={onAdd}>
        <Plus size={15} /> Add First Memory
      </Btn>
    )}
  </div>
);

export default EmptyTimeline;
