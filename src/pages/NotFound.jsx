import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LostCompassAnim } from '../components/PageAnimations';

export default function NotFound() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 text-center editorial-grain"
      style={{ background: 'var(--bg-gradient)' }}
    >
      <div className="bg-surface backdrop-blur-xl border border-border-theme rounded-[28px] shadow-theme-lg p-10 max-w-sm w-full">
        <LostCompassAnim />
        <p className="font-cursive text-3xl text-accent mb-1">Lost Page</p>
        <h1 className="font-heading text-3xl font-semibold text-primary mb-2">Page Not Found</h1>
        <p className="text-dark/60 text-sm mb-7 font-sans leading-relaxed">
          This chapter doesn&apos;t exist in our journal. Let&apos;s bring you back to your story.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-cream px-6 py-3 rounded-xl text-xs font-sub font-bold uppercase tracking-[0.14em] shadow-theme-sm transition-all hover:-translate-y-0.5"
        >
          <ArrowLeft size={14} /> Back to Safarnama
        </Link>
      </div>
    </div>
  );
}
