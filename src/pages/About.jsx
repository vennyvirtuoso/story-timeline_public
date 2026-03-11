import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Lock, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-[680px] mx-auto">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-rose-400 text-sm mb-10 hover:text-rose-500 transition-colors"
        >
          <BookOpen size={14} /> Safarnama
        </Link>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 mb-2">
          About Safarnama
        </h1>
        <h5 className="text-gray-400 text-xs mb-10">
          A private space for the journeys that matter most
        </h5>

        {/* Product Description */}
        <section className="mb-8">
  <p className="text-sm text-gray-600 leading-relaxed">
    Safarnama lets people create private digital
    timelines of their memories. Instead of moments getting scattered across
    camera rolls, chat apps, and social media, Safarnama brings them together
    into a single, story-like timeline.
  </p>

  <p className="text-sm text-gray-600 leading-relaxed mt-3">
    It is designed for every kind of journey — couples ❤️, friends 👯,
    families 👨‍👩‍👧‍👦, and even solo adventures 🌍. Users can upload photos,
    videos, and notes to document meaningful moments and watch their story
    unfold over time.
  </p>

  <p className="text-sm text-gray-600 leading-relaxed mt-3">
    Every relationship and every life journey is a story made of moments.
    Safarnama simply gives those moments a beautiful place to live.
  </p>
</section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Business Model */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            How Safarnama works
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">
            Safarnama operates on a freemium model. Users can create timelines
            and store memories with a free plan, while premium subscriptions
            unlock additional features such as unlimited timelines, expanded
            collaboration capabilities, and priority support.
          </p>

          <p className="text-sm text-gray-500 leading-relaxed mt-3">
            All services are delivered digitally through the web application.
            Safarnama does not sell or ship any physical goods.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Builder */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Who built Safarnama
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">
            Safarnama is developed and maintained by an independent developer
            and Master's student in Computer Science at{' '}
            <span className="text-gray-700 font-medium">IIT Bombay</span>.
          </p>

          <p className="text-sm text-gray-500 leading-relaxed mt-3">
            The goal behind Safarnama is simple — to create a calm, private
            place where people can preserve the moments that truly matter,
            outside the noise of traditional social media.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Security */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Security and data protection
          </h2>

          <ul className="space-y-2.5">
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
                className="flex items-start gap-3 text-sm text-gray-500"
              >
                <div className="mt-0.5 p-1.5 rounded-full bg-rose-50 shrink-0">
                  <Icon size={12} className="text-rose-400" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* Support */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Support
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">For product questions, technical issues, or billing support, please contact: <a href="mailto:help.safarnama@gmail.com" className="text-sm text-rose-400 mt-2">help.safarnama@gmail.com</a></p>

        </section>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <a
            href="https://www.linkedin.com/in/vennyvirtuoso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-rose-400 transition-colors"
          >
            <Heart size={11} className="text-rose-300" fill="currentColor" />
            Made with love by 👨🏻‍🎓
          </a>
        </div>

        {/* Nav */}
        <div className="mt-8 flex gap-4 justify-center text-xs text-gray-300">
          <Link to="/privacy" className="hover:text-rose-400">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-rose-400">
            Terms
          </Link>
          <Link to="/refund" className="hover:text-rose-400">
            Refund
          </Link>
          <Link to="/pricing" className="hover:text-rose-400">
            Pricing
          </Link>
          <Link to="/google-api" className="hover:text-rose-400">
            Google API
          </Link>
          <Link to="/" className="hover:text-rose-400 ml-auto">
            ← Back to app
          </Link>
        </div>

      </div>
    </div>
  );
}