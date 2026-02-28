import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function GoogleApiDisclosure() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-[700px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-rose-400 text-sm mb-8 hover:text-rose-500 transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 mb-2">Google API Services Disclosure</h1>
        <p className="text-gray-400 text-sm mb-10">Last Updated: January 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">How We Use Google APIs</h2>
            <p>Safarnama uses Google OAuth and Google Drive API to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Authenticate users securely</li>
              <li>Store files created by Safarnama in the user's Google Drive</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Limited Use</h2>
            <p>Safarnama does <strong>not</strong> access, read, or scan files outside those created by the application.</p>
            <p className="mt-2">We do not use Google user data for advertising, profiling, or any purpose beyond providing core app functionality.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Compliance</h2>
            <p>
              Safarnama's use and transfer of information received from Google APIs complies with the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank" rel="noopener noreferrer"
                className="underline hover:text-rose-400">
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Revoking Access</h2>
            <p>
              You may revoke Safarnama's access to your Google account at any time via your{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer"
                className="underline hover:text-rose-400">
                Google Account permissions
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact</h2>
            <p>Questions? Reach us at: <a href="mailto:support@safarnama.app" className="underline hover:text-rose-400">support@safarnama.app</a></p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex gap-4 text-xs text-gray-400">
          <Link to="/privacy" className="hover:text-rose-400">Privacy</Link>
          <Link to="/terms"   className="hover:text-rose-400">Terms</Link>
          <Link to="/refund"  className="hover:text-rose-400">Refund</Link>
          <Link to="/"        className="hover:text-rose-400 ml-auto">← Back to app</Link>
        </div>
      </div>
    </div>
  );
}
