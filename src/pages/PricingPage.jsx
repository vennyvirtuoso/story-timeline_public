import React from 'react';
import { Check, Crown, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES_FREE = [
  '2 timelines',
  '2 collaborators',
  'All themes',
  'Google Drive upload'
];

const FEATURES_PRO = [
  'Unlimited timelines',
  'Unlimited collaborators',
  'All themes',
  'Google Drive upload',
  'Priority support'
];

export default function Pricing({ theme }) {
  const t = theme || {};

  return (
    <div className="min-h-screen bg-cream px-4 py-16 text-dark font-sans">
      <div className="max-w-5xl mx-auto bg-white/60 p-6 sm:p-12 rounded-3xl border border-border-theme shadow-theme-md">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-sub font-bold uppercase tracking-wider text-xs mb-8 hover:text-primary-hover transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-primary mb-3">
            Simple pricing for your memories
          </h1>
          <p className="text-dark/60 text-sm max-w-md mx-auto font-sans leading-relaxed">
            Safarnama lets you preserve meaningful moments with people you love.
            Start free and upgrade anytime for unlimited timelines.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* FREE PLAN */}
          <div className="border border-border-theme rounded-2xl p-6 bg-white shadow-theme-sm flex flex-col justify-between">
            <div>
              <div className="mb-6 font-sub">
                <h3 className="font-bold text-dark/50 text-xs uppercase tracking-widest mb-1">Free</h3>
                <p className="text-4xl font-heading font-semibold text-primary">₹0</p>
                <p className="text-[10px] text-dark/40 uppercase tracking-wider mt-1">Forever free</p>
              </div>

              <ul className="space-y-3 mb-8">
                {FEATURES_FREE.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-dark/70 font-sans">
                    <Check size={14} className="text-accent shrink-0"/>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/"
              className="block text-center py-3 px-4 bg-cream text-dark border border-border-theme hover:bg-cream-dark/50 rounded-xl text-xs font-sub font-bold uppercase tracking-wider transition duration-150 active:scale-95"
            >
              Start Free
            </Link>
          </div>

          {/* PRO PLAN */}
          <div className="border-2 border-primary rounded-2xl p-6 bg-white shadow-theme-md relative flex flex-col justify-between">
            <div className="absolute -top-3 left-5 bg-primary text-cream px-3 py-1 rounded-full text-[9px] font-sub font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-theme-sm">
              <Crown size={10} fill="currentColor"/>
              PRO
            </div>

            <div>
              <div className="mb-6 font-sub mt-2">
                <h3 className="font-bold text-dark/50 text-xs uppercase tracking-widest mb-1">Pro</h3>
                <p className="text-4xl font-heading font-semibold text-primary">₹199</p>
                <p className="text-[10px] text-dark/40 uppercase tracking-wider mt-1">per month</p>
                <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider mt-1.5">
                  ₹1499 yearly (save 37%)
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {FEATURES_PRO.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-dark/70 font-sans">
                    <Check size={14} className="text-primary shrink-0"/>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/"
              className="block text-center py-3 px-4 bg-primary text-cream hover:bg-primary-hover rounded-xl text-xs font-sub font-bold uppercase tracking-wider transition duration-150 active:scale-95 shadow-theme-sm"
            >
              Get Pro Access
            </Link>
          </div>

        </div>

        {/* Explanation */}
        <div className="mt-16 max-w-xl mx-auto text-sm text-dark/70 space-y-6">
          <div className="border-t border-border-theme pt-8" />
          <div>
            <h4 className="font-heading text-base font-semibold text-primary mb-1.5">
              What is Safarnama?
            </h4>
            <p className="text-sm font-sans leading-relaxed">
              Safarnama is a private timeline app where users can store
              memories with photos, videos, and notes and share them
              with trusted collaborators.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-primary mb-1.5">
              How does the Pro plan work?
            </h4>
            <p className="text-sm font-sans leading-relaxed">
              The Pro plan unlocks unlimited timelines and collaborators.
              Payment is processed securely through Dodo Payments.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-primary mb-1.5">
              Can I cancel anytime?
            </h4>
            <p className="text-sm font-sans leading-relaxed">
              Yes. You can cancel anytime and your existing data
              remains available on your account.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-xs text-dark/40 font-sub border-t border-border-theme pt-8">
          <p className="mb-4 uppercase tracking-wider text-[9px]">
            Safarnama is a digital service. No physical goods are shipped.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wider">
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link to="/refund" className="hover:text-primary">
              Refund
            </Link>
            <Link to="/about" className="hover:text-primary">
              About
            </Link>
            <Link to="/" className="hover:text-primary sm:ml-auto">
              ← Back to app
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}