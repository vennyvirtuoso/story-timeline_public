import React from 'react';
import { Heart } from 'lucide-react';
import { Btn } from './ui';

const EmptyTimeline = ({ theme, canEdit, onAdd }) => (
  <div className="text-center py-20 px-6 bg-white/60 rounded-3xl border-2 border-dashed border-rose-200 max-w-sm mx-auto mt-4">
    <div className={`w-16 h-16 ${theme.eventBg} rounded-full flex items-center justify-center mx-auto mb-4 ${theme.heart}`}>
      <Heart size={32}/>
    </div>
    <h3 className="text-xl font-bold text-gray-700 mb-2">Your story starts here</h3>
    <p className="text-gray-400 text-sm mb-6">Add your first memory together</p>
    {canEdit && <Btn onClick={onAdd}>Add First Memory</Btn>}
  </div>
);

export default EmptyTimeline;
