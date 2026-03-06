import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Refund() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-[700px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-rose-400 text-sm mb-8 hover:text-rose-500 transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 mb-2">Refund Policy</h1>
        <p className="text-gray-400 text-xs mb-10">Last Updated: January 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-6">
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Subscription Payments</h2>
            <p className="text-sm">All payments are processed securely via Dodo Payments.</p>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Refund Eligibility</h2>
            <p className="text-sm">Refund requests may be considered if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500 text-sm">
              <li>Duplicate charges occurred</li>
              <li>A technical issue prevented access</li>
              <li>The request is made within 7 days of payment</li>
            </ul>
            <p className="text-sm mt-3">Refunds are reviewed case-by-case and are not guaranteed unless required by law.</p>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Cancellation</h2>
            <p className="text-sm">Users may cancel subscription renewal at any time. Paid features remain active until the current billing period expires. No partial refunds are provided for unused time unless legally required.</p>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Contact</h2>
            <p className="text-sm">For refund requests, contact us at: <a href="mailto:help.safarnama@gmail.com" className="underline hover:text-rose-400">help.safarnama@gmail.com</a></p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex gap-4 text-xs text-gray-400">
          <Link to="/privacy"    className="hover:text-rose-400">Privacy</Link>
          <Link to="/terms"      className="hover:text-rose-400">Terms</Link>
          <Link to="/pricing" className="hover:text-rose-400">Pricing</Link>
          <Link to="/google-api" className="hover:text-rose-400">Google API</Link>
          <Link to="/about"      className="hover:text-rose-400 transition-colors">About</Link>
          <Link to="/"           className="hover:text-rose-400 ml-auto">← Back to app</Link>
        </div>
      </div>
    </div>
  );
}
