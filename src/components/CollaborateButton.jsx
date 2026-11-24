import React, { useState } from 'react';
import { Users, Copy, Check, LogIn, Loader2 } from 'lucide-react';

const CollaborateButton = ({
  onCollaborate, collabShareUrl, setCollabShareUrl,
  collabLinkCopied, onCopyLink, limits, onJoinCollab,
  isOpen, setIsOpen, isGenerating,
}) => {
  const [pasteMode,  setPasteMode]  = useState(false);
  const [pasteInput, setPasteInput] = useState('');
  const [joining,    setJoining]    = useState(false);
  const [joinErr,    setJoinErr]    = useState('');

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!pasteInput.trim()) return;
    setJoining(true); setJoinErr('');
    const result = await onJoinCollab(pasteInput.trim());
    if (!result?.success) setJoinErr(result?.error || 'Invalid link');
    setJoining(false);
  };

  return (
    <div className="fixed bottom-6 left-5 sm:bottom-8 sm:left-8 z-40 flex flex-col-reverse items-start gap-2.5">
      <button
        type="button"
        onClick={onCollaborate}
        disabled={isGenerating}
        className="flex items-center gap-2 text-xs bg-surface backdrop-blur-xl border border-border-theme text-primary px-4 py-2.5 rounded-full shadow-theme-md hover:border-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all font-sub font-bold uppercase tracking-wider disabled:opacity-60"
      >
        {isGenerating ? (
          <><Loader2 size={13} className="animate-spin" /> Generating...</>
        ) : (
          <>
            <Users size={13} /> Collaborate
            {limits?.collaborators?.count > 0 && (
              <span className="ml-0.5 bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[9px] font-bold">
                {limits.collaborators.count}/{limits.collaborators.limit ?? '∞'}
              </span>
            )}
          </>
        )}
      </button>

      {isOpen && (
        <div className="bg-surface backdrop-blur-xl rounded-2xl shadow-theme-lg border border-border-theme p-4 max-w-[280px] animate-modal-enter">
          {collabShareUrl ? (
            <>
              <p className="text-[10px] font-sub uppercase tracking-wider text-primary font-bold mb-1">
                Collaboration Link
              </p>
              <p className="text-[11px] text-dark/60 mb-2.5 leading-relaxed">
                Share with someone who <strong>signs in with Google</strong> — they can view and add memories.
              </p>
              <p className="text-[10px] text-primary break-all font-mono bg-primary/10 rounded-xl px-2.5 py-2 mb-2.5">
                {collabShareUrl}
              </p>
              <button
                type="button"
                onClick={onCopyLink}
                className="w-full text-[10px] font-sub font-bold uppercase tracking-wider border border-border-theme rounded-xl py-2 hover:bg-primary/10 mb-3 flex items-center justify-center gap-1.5 transition-colors text-primary"
              >
                {collabLinkCopied ? <><Check size={11} className="text-emerald-600" /> Copied!</> : <><Copy size={11} /> Copy Link</>}
              </button>
            </>
          ) : (
            <div className="mb-3 text-center py-2">
              <p className="text-[11px] text-dark/55">Click <strong>Collaborate</strong> to generate your link</p>
            </div>
          )}

          <div className="border-t border-border-theme pt-3">
            <p className="text-[10px] font-sub uppercase tracking-wider text-dark/50 mb-2 font-bold">
              Join someone else&apos;s timeline
            </p>
            {!pasteMode ? (
              <button
                type="button"
                onClick={() => setPasteMode(true)}
                className="w-full text-[10px] font-sub font-bold uppercase tracking-wider text-primary border border-dashed border-border-theme rounded-xl py-2 hover:bg-primary/10 flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogIn size={11} /> Paste their collab link
              </button>
            ) : (
              <form onSubmit={handleJoin} className="space-y-2">
                <input
                  value={pasteInput}
                  onChange={(e) => setPasteInput(e.target.value)}
                  placeholder="Paste link or token here"
                  className="w-full text-xs px-3 py-2 border border-border-theme bg-cream/60 text-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  autoFocus
                />
                {joinErr && <p className="text-[10px] text-red-500">{joinErr}</p>}
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setPasteMode(false); setPasteInput(''); setJoinErr(''); }}
                    className="flex-1 text-[10px] font-sub font-bold uppercase py-1.5 border border-border-theme rounded-lg text-dark/55 hover:bg-cream-dark/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={joining}
                    className="flex-1 text-[10px] font-sub font-bold uppercase py-1.5 bg-primary text-cream rounded-lg hover:bg-primary-hover flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    {joining ? <Loader2 size={10} className="animate-spin" /> : <LogIn size={10} />} Join
                  </button>
                </div>
              </form>
            )}
          </div>

          {limits?.collaborators && (
            <p className="text-[10px] text-dark/45 text-center mt-2.5">
              Collaborators: <strong className="text-dark/75">{limits.collaborators.count ?? 0}</strong> / {limits.collaborators.limit ?? '∞'}
            </p>
          )}
          <button
            type="button"
            onClick={() => { setIsOpen(false); setCollabShareUrl(null); }}
            className="text-[10px] font-sub uppercase tracking-wider text-dark/45 hover:text-dark underline block mx-auto mt-2"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default CollaborateButton;
