import React from 'react';
import { Calendar } from 'lucide-react';
import { Modal, Btn, Field } from './ui';

const SettingsModal = ({ isOpen, onClose, config, setConfig, onSave, folderId, onConnectDrive }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Relationship Settings">
    <form onSubmit={onSave}>
      <Field label="Partner 1 Name" value={config.partner1} onChange={v => setConfig({ ...config, partner1: v })} placeholder="e.g., Romeo"/>
      <Field label="Partner 2 Name" value={config.partner2} onChange={v => setConfig({ ...config, partner2: v })} placeholder="e.g., Juliet"/>
      <Field label="Start Date" type="date" value={config.startDate} onChange={v => setConfig({ ...config, startDate: v })} required icon={Calendar}/>
      {!folderId && (
        <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
          ⚡ <button type="button" onClick={onConnectDrive} className="underline font-semibold">Connect Google Drive</button> to enable direct uploads
        </div>
      )}
      <div className="mt-5"><Btn type="submit" className="w-full">Save Changes</Btn></div>
    </form>
  </Modal>
);

export default SettingsModal;