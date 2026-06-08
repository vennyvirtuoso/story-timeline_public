import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Refund() {
  return (
    <div className="min-h-screen bg-cream px-4 py-12 text-dark font-sans">
      <div className="max-w-[700px] mx-auto bg-white/60 p-8 sm:p-12 rounded-3xl border border-border-theme shadow-theme-md">
        
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-sub font-bold uppercase tracking-wider text-xs mb-8 hover:text-primary-hover transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>
        
        <h1 className="text-3xl font-heading font-semibold text-primary mb-2">Refund Policy</h1>
        <p className="text-dark/40 text-[10px] font-sub uppercase tracking-wider mb-10">Last Updated: January 2026</p>

        <div className="text-dark/70 leading-relaxed space-y-6">
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Subscription Payments</h2>
            <p className="text-sm font-sans">All payments are processed securely via Dodo Payments.</p>
          </section>
          
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Refund Eligibility</h2>
            <p className="text-sm font-sans">Refund requests may be considered if:</p>
            <ul className="text-sm text-dark/70 space-y-1.5 font-sub font-semibold uppercase tracking-wider text-[11px] mt-3 pl-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" /> Duplicate charges occurred
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" /> A technical issue prevented access
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" /> The request is made within 7 days of payment
              </li>
            </ul>
            <p className="text-sm font-sans mt-4">Refunds are reviewed case-by-case and are not guaranteed unless required by law.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Cancellation</h2>
            <p className="text-sm font-sans">Users may cancel subscription renewal at any time. Paid features remain active until the current billing period expires. No partial refunds are provided for unused time unless legally required.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">Contact</h2>
            <p className="text-sm font-sans">
              For refund requests, contact us at:{' '}
              <a href="mailto:help.safarnama@gmail.com" className="underline hover:text-rose-safarnama font-semibold">
                help.safarnama@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border-theme flex flex-wrap gap-4 text-[10px] font-sub font-bold uppercase tracking-wider text-dark/40">
          <Link to="/privacy"    className="hover:text-primary">Privacy</Link>
          <Link to="/terms"      className="hover:text-primary">Terms</Link>
          <Link to="/pricing"    className="hover:text-primary">Pricing</Link>
          <Link to="/google-api" className="hover:text-primary">Google API</Link>
          <Link to="/about"      className="hover:text-primary transition-colors">About</Link>
          <Link to="/"           className="hover:text-primary sm:ml-auto">← Back to app</Link>
        </div>
      </div>
    </div>
  );
}
