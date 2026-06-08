import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function GoogleApiDisclosure() {
  return (
    <div className="min-h-screen bg-cream px-4 py-12 text-dark font-sans">
      <div className="max-w-[700px] mx-auto bg-white/60 p-5 sm:p-12 rounded-3xl border border-border-theme shadow-theme-md">
        
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-sub font-bold uppercase tracking-wider text-xs mb-8 hover:text-primary-hover transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>
        
        <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-primary mb-2">Google API Services Disclosure</h1>
        <p className="text-dark/40 text-[10px] font-sub uppercase tracking-wider mb-10">Last Updated: January 2026</p>

        <div className="text-dark/70 leading-relaxed space-y-6">
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">How We Use Google APIs</h2>
            <p className="text-sm font-sans">Safarnama uses Google OAuth and Google Drive API to:</p>
            <ul className="text-sm text-dark/70 space-y-1.5 font-sub font-semibold uppercase tracking-wider text-[11px] mt-3 pl-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" /> Authenticate users securely
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" /> Store files created by Safarnama in the user's Google Drive
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Limited Use</h2>
            <p className="text-sm font-sans">Safarnama does <strong>not</strong> access, read, or scan files outside those created by the application. We do not use Google user data for advertising, profiling, or any purpose beyond providing core app functionality.</p>
          </section>
          
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Compliance</h2>
            <p className="text-sm font-sans">
              Safarnama's use and transfer of information received from Google APIs complies with the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-safarnama font-semibold">
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>
          
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Revoking Access</h2>
            <p className="text-sm font-sans">
              You may revoke Safarnama's access to your Google account at any time via your{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-safarnama font-semibold">
                Google Account permissions
              </a>
              .
            </p>
          </section>
          
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Contact</h2>
            <p className="text-sm font-sans">
              Questions? Reach us at:{' '}
              <a href="mailto:help.safarnama@gmail.com" className="underline hover:text-rose-safarnama font-semibold">
                help.safarnama@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border-theme flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-sub font-bold uppercase tracking-wider text-dark/40">
          <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          <Link to="/terms"   className="hover:text-primary">Terms</Link>
          <Link to="/pricing" className="hover:text-primary">Pricing</Link>
          <Link to="/refund"  className="hover:text-primary">Refund</Link>
          <Link to="/about"   className="hover:text-primary transition-colors">About</Link>
          <Link to="/"        className="hover:text-primary sm:ml-auto">← Back to app</Link>
        </div>
      </div>
    </div>
  );
}
