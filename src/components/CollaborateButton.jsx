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
    <div className="fixed bottom-6 left-5 sm:bottom-8 sm:left-8 z-40 flex flex-col items-start gap-2">
      <button onClick={onCollaborate} disabled={isGenerating}
        className="flex items-center gap-1.5 text-xs bg-white border border-violet-200 text-violet-600 px-3 py-2 rounded-full shadow-md hover:bg-violet-50 transition-colors font-semibold disabled:opacity-60">
        {isGenerating
          ? <><Loader2 size={12} className="animate-spin"/> Generating...</>
          : <>
              <Users size={12}/> Collaborate
              {limits?.collaborators?.count > 0 && (
                <span className="ml-1 bg-violet-100 text-violet-600 rounded-full px-1.5 py-0.5 text-[9px] font-bold">
                  {limits.collaborators.count}/{limits.collaborators.limit ?? '∞'}
                </span>
              )}
            </>
        }
      </button>

      {/* ✅ Always show popover when isOpen, regardless of whether collabShareUrl exists */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-lg border border-violet-100 p-3 max-w-[260px]">

          {collabShareUrl ? (
            <>
              <p className="text-[10px] text-gray-500 font-bold mb-0.5">Collaboration link</p>
              <p className="text-[10px] text-gray-400 mb-2">
                Share with someone who <strong>signs in with Google</strong> — they can view and add memories.
              </p>
              <p className="text-[10px] text-violet-600 break-all font-mono bg-violet-50 rounded-lg px-2 py-1.5 mb-2">{collabShareUrl}</p>
              <button onClick={onCopyLink}
                className="w-full text-[10px] border border-violet-200 rounded-lg py-1 hover:bg-violet-50 mb-3 flex items-center justify-center gap-1 transition-colors"
                style={{ color: collabLinkCopied ? '#22c55e' : '#8b5cf6' }}>
                {collabLinkCopied ? <><Check size={10}/> Copied!</> : <><Copy size={10}/> Copy link</>}
              </button>
            </>
          ) : (
            <div className="mb-3 text-center py-2">
              <p className="text-[10px] text-gray-400">Click <strong>Collaborate</strong> to generate your link</p>
            </div>
          )}

          {/* ✅ Join someone else's timeline — always visible */}
          <div className="border-t border-gray-100 pt-2">
            <p className="text-[9px] text-gray-400 mb-1.5 font-semibold">Join someone else's timeline</p>
            {!pasteMode ? (
              <button onClick={() => setPasteMode(true)}
                className="w-full text-[10px] text-violet-500 border border-dashed border-violet-200 rounded-lg py-1.5 hover:bg-violet-50 flex items-center justify-center gap-1">
                <LogIn size={10}/> Paste their collab link
              </button>
            ) : (
              <form onSubmit={handleJoin} className="space-y-1.5">
                <input
                  value={pasteInput} onChange={e => setPasteInput(e.target.value)}
                  placeholder="Paste link or token here"
                  className="w-full text-[10px] px-2 py-1.5 border border-violet-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300"
                  autoFocus
                />
                {joinErr && <p className="text-[9px] text-red-500">{joinErr}</p>}
                <div className="flex gap-1">
                  <button type="button"
                    onClick={() => { setPasteMode(false); setPasteInput(''); setJoinErr(''); }}
                    className="flex-1 text-[9px] py-1 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={joining}
                    className="flex-1 text-[9px] py-1 bg-violet-500 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center gap-1 disabled:opacity-50">
                    {joining ? <Loader2 size={9} className="animate-spin"/> : <LogIn size={9}/>} Join
                  </button>
                </div>
              </form>
            )}
          </div>

          {limits?.collaborators && (
            <p className="text-[9px] text-gray-400 text-center mt-2">
              Collaborators: <strong>{limits.collaborators.count ?? 0}</strong> / {limits.collaborators.limit ?? '∞'}
            </p>
          )}
          <button onClick={() => { setIsOpen(false); setCollabShareUrl(null); }}
            className="text-[9px] text-gray-400 underline block mx-auto mt-1">Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default CollaborateButton;
