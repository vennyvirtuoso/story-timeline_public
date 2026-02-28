import React, { useState } from 'react';
import { Share2, Copy, Check, Loader2 } from 'lucide-react';
import { Modal } from './ui';

const ShareModal = ({ isOpen, onClose, shareToken, onGenerateToken, theme }) => {
  const [copied,     setCopied]     = useState('');
  const [generating, setGenerating] = useState(false);

  const t            = theme || {};
  const accentText   = t.accentText   || 'text-rose-500';
  const accentBorder = t.accentBorder || 'border-rose-100';
  const accentHover  = t.accentHover  || 'hover:bg-rose-50';
  const eventBg      = t.eventBg      || 'bg-rose-50';
  const gradient     = t.gradient     || 'from-rose-50 via-white to-pink-50';
  const btnPrimary   = t.btnPrimary   || 'from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-200';

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const generate = async () => {
    setGenerating(true);
    await onGenerateToken();
    setGenerating(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Timeline 🔗" theme={theme}>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Give someone this code — they can view your timeline without signing in.</p>

        {shareToken ? (
          <>
            <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 text-center border ${accentBorder}`}>
              <p className="text-[11px] text-gray-400 mb-1 uppercase tracking-widest font-semibold">Share Code</p>
              <p className={`text-5xl font-black tracking-[0.3em] ${accentText} my-3`}>{shareToken}</p>
              <button onClick={() => copy(shareToken, 'code')}
                className={`inline-flex items-center gap-1.5 mx-auto px-4 py-2 bg-white border ${accentBorder} rounded-xl text-sm font-medium text-gray-600 ${accentHover} transition-colors`}>
                {copied === 'code'
                  ? <><Check size={14} className="text-green-500"/>Copied!</>
                  : <><Copy size={14}/>Copy Code</>}
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[11px] text-gray-400 mb-1.5 font-semibold">Share Link</p>
              <div className="flex gap-2 items-center">
                <code className="text-[11px] text-gray-600 flex-1 truncate bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                  {window.location.origin}?token={shareToken}
                </code>
                <button onClick={() => copy(`${window.location.origin}?token=${shareToken}`, 'link')}
                  className={`p-1.5 text-gray-400 ${accentHover} ${accentText} rounded-lg transition-colors shrink-0`}>
                  {copied === 'link' ? <Check size={13} className="text-green-500"/> : <Copy size={13}/>}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-amber-600 text-center bg-amber-50 rounded-lg p-2">
              ⚠️ Anyone with this code can view your timeline
            </p>
            {/* ✅ No regenerate button when token exists */}
          </>
        ) : (
          // ✅ Only show generate button when no token exists
          <div className="text-center py-6">
            <div className={`w-14 h-14 ${eventBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Share2 size={24} className={accentText}/>
            </div>
            <p className="text-gray-400 text-sm mb-4">No share code yet</p>
            <button onClick={generate} disabled={generating}
              className={`inline-flex items-center gap-1.5 mx-auto px-4 py-2.5 bg-gradient-to-r ${btnPrimary} text-white rounded-xl text-sm font-medium shadow-md transition-all disabled:opacity-50`}>
              {generating
                ? <><Loader2 size={14} className="animate-spin"/>Generating...</>
                : <><Share2 size={14}/>Generate Code</>}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShareModal;