import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-cream px-4 py-12 text-dark font-sans">
      <div className="max-w-[700px] mx-auto bg-white/60 p-8 sm:p-12 rounded-3xl border border-border-theme shadow-theme-md">
        
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-sub font-bold uppercase tracking-wider text-xs mb-8 hover:text-primary-hover transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>
        
        <h1 className="text-3xl font-heading font-semibold text-primary mb-2">Terms of Service</h1>
        <p className="text-dark/40 text-[10px] font-sub uppercase tracking-wider mb-10">Last Updated: January 2026</p>

        <div className="text-dark/70 leading-relaxed space-y-6">
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">1. Acceptance of Terms</h2>
            <p className="text-sm font-sans">By accessing or using Safarnama, you agree to these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">2. Description of Service</h2>
            <p className="text-sm font-sans">Safarnama is a shared digital timeline platform that allows users to store and organize memories with selected collaborators.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">3. Account Responsibility</h2>
            <p className="text-sm font-sans">You are responsible for maintaining the confidentiality of your account and all activity under your account.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">4. User Content</h2>
            <p className="text-sm font-sans">You retain ownership of all content you upload. By using Safarnama, you grant us a limited license to store, display, and process your content solely to provide app functionality.</p>
            <p className="text-sm font-sans mt-2 font-semibold text-dark">We do not claim ownership of your content.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">5. Prohibited Conduct</h2>
            <p className="text-sm font-sans">You may not upload illegal or harmful content, violate intellectual property rights, harass or abuse other users, misuse collaboration features, or attempt unauthorized access.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">6. Collaboration</h2>
            <p className="text-sm font-sans">Timeline owners control collaboration access. Collaborators may add, edit, or delete content depending on permissions. Safarnama is not responsible for user disputes.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">7. Subscription & Billing</h2>
            <p className="text-sm font-sans">Paid plans are processed through Dodo Payments. Plans may be monthly or yearly. Downgrading limits access but does not delete stored content.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">8. Refund Policy</h2>
            <p className="text-sm font-sans">Refunds are governed by our <Link to="/refund" className="underline hover:text-rose-safarnama font-semibold">Refund Policy</Link>.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">9. Limitation of Liability</h2>
            <p className="text-sm font-sans">Safarnama is provided "as is." We are not liable for data loss, service interruptions, third-party outages, or user-generated content disputes.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">10. Termination</h2>
            <p className="text-sm font-sans">We may suspend or terminate accounts that violate these Terms.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-primary mb-1.5">11. Governing Law</h2>
            <p className="text-sm font-sans">These Terms are governed by the laws of India.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border-theme flex flex-wrap gap-4 text-[10px] font-sub font-bold uppercase tracking-wider text-dark/40">
          <Link to="/privacy"    className="hover:text-primary">Privacy</Link>
          <Link to="/refund"     className="hover:text-primary">Refund Policy</Link>
          <Link to="/pricing"    className="hover:text-primary">Pricing</Link>
          <Link to="/google-api" className="hover:text-primary">Google API</Link>
          <Link to="/about"      className="hover:text-primary transition-colors">About</Link>
          <Link to="/"           className="hover:text-primary sm:ml-auto">← Back to app</Link>
        </div>
      </div>
    </div>
  );
}
