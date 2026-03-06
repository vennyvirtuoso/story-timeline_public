import React from 'react';
import { Check, Crown } from 'lucide-react';
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

  const t            = theme || {};
  const accentText   = t.accentText   || 'text-rose-500';
  const accentBg     = t.accentBg     || 'bg-rose-100';
  const accentBorder = t.accentBorder || 'border-rose-200';
  const badge        = t.badge        || 'bg-rose-100 text-rose-500';

  return (
    <div className="min-h-screen bg-white px-4 py-16">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 mb-3">
            Simple pricing for your memories
          </h1>

          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Safarnama lets you preserve meaningful moments with people you love.
            Start free and upgrade anytime for unlimited timelines.
          </p>

        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* FREE PLAN */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">

            <div className="mb-6">
              <h3 className="font-bold text-gray-700 text-sm mb-1">Free</h3>

              <p className="text-3xl font-black text-gray-800">
                ₹0
              </p>

              <p className="text-xs text-gray-400">
                Forever free
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {FEATURES_FREE.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                  <Check size={14} className="text-gray-400 shrink-0"/>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to="/"
              className="block text-center py-2.5 px-4 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 transition"
            >
              Start Free
            </Link>

          </div>

          {/* PRO PLAN */}
          <div className={`border-2 ${accentBorder} rounded-2xl p-6 relative`}>

            <div className={`absolute -top-3 left-5 ${badge} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
              <Crown size={12}/>
              PRO
            </div>

            <div className="mb-6">

              <h3 className="font-bold text-gray-700 text-sm mb-1">
                Pro
              </h3>

              <p className={`text-3xl font-black ${accentText}`}>
                ₹199
              </p>

              <p className="text-xs text-gray-400">
                per month
              </p>

              <p className="text-xs text-green-500 font-semibold mt-1">
                ₹1499 yearly (save 37%)
              </p>

            </div>

            <ul className="space-y-3">
              {FEATURES_PRO.map(f => (
                <li key={f} className={`flex items-center gap-2 text-sm ${accentText}`}>
                  <Check size={14} className="shrink-0"/>
                  {f}
                </li>
              ))}
            </ul>

          </div>

        </div>

        {/* Explanation */}
        <div className="mt-16 max-w-xl mx-auto text-sm text-gray-500 space-y-5">

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">
              What is Safarnama?
            </h4>

            <p>
              Safarnama is a private timeline app where users can store
              memories with photos, videos and notes and share them
              with trusted collaborators.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">
              How does the Pro plan work?
            </h4>

            <p>
              The Pro plan unlocks unlimited timelines and collaborators.
              Payment is processed securely through a Dodo Payments.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">
              Can I cancel anytime?
            </h4>

            <p>
              Yes. You can cancel anytime and your existing data
              remains available on your account.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-xs text-gray-400">

          <p className="mb-3">
            Safarnama is a digital service. No physical goods are shipped.
          </p>

          <div className="flex justify-center gap-6">

            <Link to="/privacy" className="hover:text-rose-400">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-rose-400">
              Terms
            </Link>

            <Link to="/refund" className="hover:text-rose-400">
              Refund
            </Link>

            <Link to="/about" className="hover:text-rose-400">
              About
            </Link>
            <Link to="/" className="hover:text-rose-400 ml-auto">
              ← Back to app
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}