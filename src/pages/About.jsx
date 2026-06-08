import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Lock, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-cream px-4 py-12 text-dark font-sans">
      <div className="max-w-[680px] mx-auto bg-white/60 p-8 sm:p-12 rounded-3xl border border-border-theme shadow-theme-md">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-sub font-bold uppercase tracking-wider text-xs mb-10 hover:text-primary-hover transition-colors"
        >
          <BookOpen size={14} /> Safarnama
        </Link>

        {/* Heading */}
        <h1 className="text-3xl font-heading font-semibold text-primary mb-1">
          About Safarnama
        </h1>
        <h5 className="font-cursive text-2xl text-accent mb-8">
          A private space for the journeys that matter most
        </h5>

        {/* Product Description */}
        <section className="mb-8 space-y-6">

          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
              What is Safarnama?
            </h3>
            <p className="text-sm text-dark/70 leading-relaxed font-sans">
              Safarnama is a web app that helps people create private digital timelines
              of their memories. Instead of moments getting scattered across camera
              rolls, chat apps, and social media, everything lives in one
              story-like timeline.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
              Built for
            </h3>
            <ul className="text-sm text-dark/70 space-y-1.5 font-sub font-semibold uppercase tracking-wider text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Couples
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Friends
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Families
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Solo journeys
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
              The idea
            </h3>
            <p className="text-sm text-dark/70 leading-relaxed font-sans">
              Every relationship and every life journey is a story made of moments.
              Safarnama gives those moments a place to live.
            </p>
          </div>

        </section>

        {/* Divider */}
        <div className="border-t border-border-theme mb-8" />

        {/* Business Model */}
        <section className="mb-8">
          <h2 className="font-heading text-lg font-semibold text-primary mb-2">
            How Safarnama works
          </h2>

          <p className="text-sm text-dark/70 leading-relaxed font-sans">
            Safarnama operates on a freemium model. Users can create timelines
            and store memories with a free plan, while premium subscriptions
            unlock additional features such as unlimited timelines, expanded
            collaboration capabilities, and priority support.
          </p>

          <p className="text-sm text-dark/70 leading-relaxed font-sans mt-3">
            All services are delivered digitally through the web application.
            Safarnama does not sell or ship any physical goods.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-border-theme mb-8" />

        {/* Builder */}
        <section className="mb-8">
          <h2 className="font-heading text-lg font-semibold text-primary mb-2">
            Who built Safarnama
          </h2>

          <p className="text-sm text-dark/70 leading-relaxed font-sans">
            Safarnama is developed and maintained by an independent developer
            and Master's student in Computer Science at{' '}
            <span className="text-dark font-medium underline decoration-accent decoration-2">IIT Bombay</span>.
          </p>

          <p className="text-sm text-dark/70 leading-relaxed font-sans mt-3">
            The goal behind Safarnama is simple — to create a calm, private
            place where people can preserve the moments that truly matter,
            outside the noise of traditional social media.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-border-theme mb-8" />

        {/* Security */}
        <section className="mb-10">
          <h2 className="font-heading text-lg font-semibold text-primary mb-4">
            Security and data protection
          </h2>

          <ul className="space-y-3">
            {[
              {
                icon: Shield,
                text: 'Secure authentication using Google OAuth'
              },
              {
                icon: Lock,
                text: 'All communication encrypted using HTTPS'
              },
              {
                icon: Users,
                text:
                  'Access controlled timelines — only invited collaborators can view or edit'
              },
              {
                icon: Heart,
                text: 'Safarnama does not sell user data or personal content'
              }
            ].map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3.5 text-sm text-dark/70 font-sans"
              >
                <div className="mt-0.5 p-1.5 rounded-full bg-primary/10 shrink-0 text-primary">
                  <Icon size={12} />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* Support */}
        <section className="mb-10">
          <h2 className="font-heading text-lg font-semibold text-primary mb-2">
            Support
          </h2>

          <p className="text-sm text-dark/70 leading-relaxed font-sans">
            For product questions, technical issues, or billing support, please contact:{' '}
            <a href="mailto:help.safarnama@gmail.com" className="text-sm text-rose-safarnama hover:underline font-semibold mt-2">
              help.safarnama@gmail.com
            </a>
          </p>
        </section>

        {/* Footer */}
        <div className="border-t border-border-theme pt-8 text-center">
          <a
            href="https://www.linkedin.com/in/vennyvirtuoso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-sub font-bold uppercase tracking-wider text-dark/40 hover:text-primary transition-colors"
          >
            <Heart size={11} className="text-rose-safarnama animate-pulse" fill="currentColor" />
            Made with love by 👨🏻‍🎓
          </a>
        </div>

        {/* Nav */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-[10px] font-sub font-bold uppercase tracking-wider text-dark/40 border-t border-border-theme pt-8">
          <Link to="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-primary">
            Terms
          </Link>
          <Link to="/refund" className="hover:text-primary">
            Refund
          </Link>
          <Link to="/pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link to="/google-api" className="hover:text-primary">
            Google API
          </Link>
          <Link to="/" className="hover:text-primary sm:ml-auto">
            ← Back to app
          </Link>
        </div>

      </div>
    </div>
  );
}