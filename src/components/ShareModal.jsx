import React, { useState } from 'react';
import { Share2, Copy, Check, Loader2 } from 'lucide-react';
import { Modal, Btn } from './ui';

const ShareModal = ({ isOpen, onClose, shareToken, onGenerateToken }) => {
  const [copied, setCopied] = useState('');
  const [generating, setGenerating] = useState(false);

  const copy = (text, key) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(()=>setCopied(''),2000); };
  const generate = async () => { setGenerating(true); await onGenerateToken(); setGenerating(false); };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Story 💕">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Give your partner this code — they can view and add memories without signing in.</p>
        {shareToken ? (
          <>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 text-center border border-rose-100">
              <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-widest font-semibold">Share Code</p>
              <p className="text-5xl font-black tracking-[0.3em] text-rose-500 my-3">{shareToken}</p>
              <Btn variant="secondary" onClick={()=>copy(shareToken,'code')} className="mx-auto text-sm">
                {copied==='code'?<><Check size={14} className="text-green-500"/>Copied!</>:<><Copy size={14}/>Copy Code</>}
              </Btn>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[11px] text-gray-400 mb-1.5 font-semibold">Share Link</p>
              <div className="flex gap-2 items-center">
                <code className="text-[11px] text-gray-600 flex-1 truncate bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                  {window.location.origin}?token={shareToken}
                </code>
                <button onClick={()=>copy(`${window.location.origin}?token=${shareToken}`,'link')}
                  className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0">
                  {copied==='link'?<Check size={13} className="text-green-500"/>:<Copy size={13}/>}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-amber-600 text-center bg-amber-50 rounded-lg p-2">⚠️ Anyone with this code can add memories to your page</p>
            <Btn variant="danger" onClick={generate} disabled={generating} className="w-full text-sm">
              {generating?<><Loader2 size={14} className="animate-spin"/>Regenerating...</>:'Regenerate Code'}
            </Btn>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 size={24} className="text-rose-400"/>
            </div>
            <p className="text-gray-400 text-sm mb-4">No share code yet</p>
            <Btn onClick={generate} disabled={generating} className="mx-auto">
              {generating?<><Loader2 size={14} className="animate-spin"/>Generating...</>:<><Share2 size={14}/>Generate Code</>}
            </Btn>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShareModal;