import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-[700px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-rose-400 text-sm mb-8 hover:text-rose-500 transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last Updated: January 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-8">

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using Safarnama, you agree to these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">2. Description of Service</h2>
            <p>Safarnama is a shared digital timeline platform that allows users to store and organize memories with selected collaborators.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">3. Account Responsibility</h2>
            <p>You are responsible for maintaining the confidentiality of your account and all activity under your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">4. User Content</h2>
            <p>You retain ownership of all content you upload. By using Safarnama, you grant us a limited license to store, display, and process your content solely to provide app functionality.</p>
            <p className="mt-2 font-medium text-gray-700">We do not claim ownership of your content.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">5. Prohibited Conduct</h2>
            <p>You may not upload illegal or harmful content, violate intellectual property rights, harass or abuse other users, misuse collaboration features, or attempt unauthorized access.</p>
            <p className="mt-2">We reserve the right to suspend or terminate accounts violating these rules.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">6. Collaboration</h2>
            <p>Timeline owners control collaboration access. Collaborators may add, edit, or delete content depending on permissions. Safarnama is not responsible for user disputes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">7. Subscription & Billing</h2>
            <p>Paid plans are processed through Razorpay. Plans may be monthly or yearly. Features may vary by plan. Downgrading limits access but does not delete stored content.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">8. Refund Policy</h2>
            <p>Refunds are governed by our <Link to="/refund" className="underline hover:text-rose-400">Refund Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">9. Limitation of Liability</h2>
            <p>Safarnama is provided "as is." We are not liable for data loss, service interruptions, third-party outages (Google, Razorpay, Firebase), or user-generated content disputes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">10. Termination</h2>
            <p>We may suspend or terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">11. Governing Law</h2>
            <p>These Terms are governed by the laws of India.</p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex gap-4 text-xs text-gray-400">
          <Link to="/privacy"    className="hover:text-rose-400">Privacy</Link>
          <Link to="/refund"     className="hover:text-rose-400">Refund Policy</Link>
          <Link to="/google-api" className="hover:text-rose-400">Google API</Link>
          <Link to="/"           className="hover:text-rose-400 ml-auto">← Back to app</Link>
        </div>
      </div>
    </div>
  );
}
