import React from 'react';
import { Users, User, Heart, Home, Calendar } from 'lucide-react';
import { Modal, Btn, Field } from './ui';
import ThemePicker from './ThemePicker';

const MEMBER_TYPES = [
  { id: 'duo',    label: 'Couple',  icon: Heart, placeholder1: 'Partner 1',   placeholder2: 'Partner 2', showTwo: true  },
  { id: 'solo',   label: 'Solo Journey',  icon: User,  placeholder1: 'Your Name',   placeholder2: '',          showTwo: false },
  { id: 'family', label: 'Family',        icon: Home,  placeholder1: 'Family Name', placeholder2: '',          showTwo: false },
  { id: 'group',  label: 'Friend Group',  icon: Users, placeholder1: 'Group Name',  placeholder2: '',          showTwo: false },
];

const SettingsModal = ({ isOpen, onClose, config, setConfig, onSave, folderId, onConnectDrive, theme }) => {
  // ✅ Ensure memberType always has a default when config loads
  const memberType = config.memberType || 'duo';
  const memberTypeDetails = MEMBER_TYPES.find(m => m.id === memberType) || MEMBER_TYPES[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Timeline Settings ✨" theme={theme}>
      <form onSubmit={onSave}>
        <Field
          label="Timeline Name"
          value={config.timelineName || ''}
          onChange={v => setConfig({ ...config, timelineName: v })}
          placeholder="e.g. Our Adventure, The Smiths, Squad Goals"
        />

        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Type</label>
          <div className="grid grid-cols-2 gap-2">
            {MEMBER_TYPES.map(m => {
              const Icon = m.icon;
              const active = memberType === m.id;
              return (
                <button key={m.id} type="button"
                  onClick={() => setConfig({ ...config, memberType: m.id, partner2: m.showTwo ? (config.partner2 || '') : '' })}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${active ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}>
                  <Icon size={14}/>{m.label}
                </button>
              );
            })}
          </div>
        </div>

        <Field
          label={memberType === 'duo' ? 'Person 1 Name' : 'Name'}
          value={config.partner1 || ''}
          onChange={v => setConfig({ ...config, partner1: v })}
          placeholder={memberTypeDetails.placeholder1}
        />
        {memberType === 'duo' && (
          <Field
            label="Person 2 Name"
            value={config.partner2 || ''}
            onChange={v => setConfig({ ...config, partner2: v })}
            placeholder={memberTypeDetails.placeholder2}
          />
        )}

        <Field
          label="Start Date" type="date"
          value={config.startDate || ''}
          onChange={v => setConfig({ ...config, startDate: v })}
          required icon={Calendar}
        />

        <ThemePicker value={config.theme || 'love'} onChange={v => setConfig({ ...config, theme: v })}/>

        {!folderId && (
          <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
            ⚡ <button type="button" onClick={onConnectDrive} className="underline font-semibold">Connect Google Drive</button> to enable direct uploads
          </div>
        )}
        <div className="mt-5"><Btn type="submit" className="w-full">Save Changes</Btn></div>
      </form>
    </Modal>
  );
};

export default SettingsModal;