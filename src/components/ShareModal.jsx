import React, { useState } from 'react';
import { Share2, Copy, Check, Loader2, Eye, RefreshCw } from 'lucide-react';
import { Modal } from './ui';

const ShareModal = ({ isOpen, onClose, viewerToken, onGenerateTokens, theme }) => {
  const [copied,     setCopied]     = useState(false);
  const [generating, setGenerating] = useState(false);

  const t          = theme || {};
  const accentText = t.accentText || 'text-rose-500';
  const accentBg   = t.eventBg    || 'bg-rose-50';
  const btnPrimary = t.btnPrimary  || 'from-rose-400 to-pink-500';

  const copy = () => {
    navigator.clipboard.writeText(viewerToken).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generate = async () => {
    setGenerating(true);
    try { await onGenerateTokens(); } catch (e) { console.error(e); }
    setGenerating(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Timeline" theme={theme}>
      <div className="space-y-4">

        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Eye size={14} className={accentText} />
            <p className="text-xs font-bold text-gray-700">View-Only Share Code</p>
          </div>
          <p className="text-[11px] text-gray-400 mb-3">
            Share this 6-character code with anyone — they can <strong>view</strong> your
            timeline without signing in. They <strong>cannot</strong> add or edit memories.
          </p>

          {viewerToken ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className={`flex-1 ${accentBg} border border-gray-100 rounded-xl px-4 py-2.5 text-center`}>
                  <span className={`text-2xl font-black tracking-widest ${accentText} font-mono`}>
                    {viewerToken}
                  </span>
                </div>
                <button onClick={copy}
                  className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <button onClick={generate} disabled={generating}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 py-1.5 transition-colors disabled:opacity-50">
                {generating
                  ? <><Loader2 size={11} className="animate-spin" />Regenerating...</>
                  : <><RefreshCw size={11} />Regenerate code</>}
              </button>
            </>
          ) : (
            <div className="text-center py-2">
              <div className={`w-12 h-12 ${accentBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Share2 size={20} className={accentText} />
              </div>
              <p className="text-gray-400 text-xs mb-3">No share code yet</p>
              <button onClick={generate} disabled={generating}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r ${btnPrimary} text-white rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50`}>
                {generating
                  ? <><Loader2 size={14} className="animate-spin" />Generating...</>
                  : <><Share2 size={14} />Generate Share Code</>}
              </button>
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-400 text-center">
          Want someone to <strong>add memories</strong>? Use the <strong>Collaborate</strong> button on your timeline.
        </p>
      </div>
    </Modal>
  );
};

export default ShareModal;