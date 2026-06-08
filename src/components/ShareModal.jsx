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
        <p className="text-sm text-dark/70 font-sans leading-relaxed">Give someone this code — they can view your timeline without signing in.</p>

        {shareToken ? (
          <>
            <div className="bg-cream border border-border-theme rounded-2xl p-6 text-center shadow-theme-sm">
              <p className="text-[9px] font-sub font-bold text-dark/40 mb-1.5 uppercase tracking-widest">Share Code</p>
              <p className="text-4xl font-heading font-bold tracking-[0.3em] text-primary my-4">{shareToken}</p>
              <button onClick={() => copy(shareToken, 'code')}
                className="inline-flex items-center gap-1.5 mx-auto px-4 py-2.5 bg-white border border-border-theme rounded-xl text-xs font-sub font-bold uppercase tracking-wider text-dark/70 hover:bg-cream-dark/30 transition-colors shadow-theme-sm">
                {copied === 'code'
                  ? <><Check size={14} className="text-green-600"/>Copied!</>
                  : <><Copy size={14}/>Copy Code</>}
              </button>
            </div>

            <div className="bg-cream/40 rounded-xl p-4 border border-border-theme">
              <p className="text-[9px] font-sub font-bold text-dark/40 mb-2 uppercase tracking-widest">Share Link</p>
              <div className="flex gap-2 items-center">
                <code className="text-[11px] text-dark/70 flex-1 truncate bg-white border border-border-theme rounded-lg px-2.5 py-1.5 font-mono">
                  {window.location.origin}?token={shareToken}
                </code>
                <button onClick={() => copy(`${window.location.origin}?token=${shareToken}`, 'link')}
                  className="p-1.5 text-dark/40 hover:text-primary transition-colors shrink-0">
                  {copied === 'link' ? <Check size={13} className="text-green-600"/> : <Copy size={13}/>}
                </button>
              </div>
            </div>

            <p className="text-[10px] font-sub font-bold uppercase tracking-wider text-accent text-center bg-cream border border-dashed border-accent/40 rounded-xl p-3">
              ⚠️ Anyone with this code can view your timeline
            </p>
            {/* ✅ No regenerate button when token exists */}
          </>
        ) : (
          // ✅ Only show generate button when no token exists
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 text-primary border border-border-theme">
              <Share2 size={24}/>
            </div>
            <p className="text-dark/50 text-sm mb-4 font-sans">No share code yet</p>
            <button onClick={generate} disabled={generating}
              className="inline-flex items-center gap-1.5 mx-auto px-5 py-3 bg-primary hover:bg-primary-hover text-cream rounded-xl text-xs font-sub font-bold uppercase tracking-wider shadow-theme-sm transition-all disabled:opacity-50">
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