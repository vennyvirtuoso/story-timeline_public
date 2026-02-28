import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Lock, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-[680px] mx-auto">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-rose-400 text-sm mb-10 hover:text-rose-500 transition-colors">
          <BookOpen size={14}/> Safarnama
        </Link>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 mb-2">
          About Safarnama
        </h1>
        <h5 className="text-gray-400 text-xs mb-10">A little story behind the app</h5>

        {/* Origin */}
        <section className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Safarnama started as a quiet idea — what if there was a beautiful, safe place where people could
            preserve the journeys that matter most to them?
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Not a social feed. Not a photo dump. Just a private, shared space for the moments you never want to forget.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8"/>

        {/* Builder */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Who built this</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Safarnama is built by a Master's student in Computer Science at{' '}
            <span className="text-gray-700 font-medium">IIT Bombay</span>.
            No team, no funding, just a genuine belief that the people and places we love deserve to be remembered with care.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8"/>

        {/* Memories are personal */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Your memories are yours</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Memories are deeply personal. They carry feelings that can't be replicated like a first trip,
            a quiet evening, a moment that changed everything. Safarnama is designed with one intent:
            to protect what matters most to you.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mt-3">
            You control who sees your timeline. Nothing is public unless you choose it to be.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8"/>

        {/* Security */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">How we protect your data</h2>
          <ul className="space-y-2.5">
            {[
              { icon: Shield, text: 'Secure Google authentication — no passwords stored' },
              { icon: Lock,   text: 'All communication encrypted over HTTPS' },
              { icon: Users,  text: 'Careful access control — only people you invite can see your memories' },
              { icon: Heart,  text: 'No data selling. Ever. Your memories are not a product.' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-gray-500">
                <div className="mt-0.5 p-1.5 rounded-full bg-rose-50 shrink-0">
                  <Icon size={12} className="text-rose-400"/>
                </div>
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <a
            href="https://www.linkedin.com/in/vennyvirtuoso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-rose-400 transition-colors"
          >
            <Heart size={11} className="text-rose-300" fill="currentColor"/>
            Made with love
          </a>
        </div>

        {/* Nav */}
        <div className="mt-8 flex gap-4 justify-center text-xs text-gray-300">
          <Link to="/privacy"    className="hover:text-rose-400">Privacy</Link>
          <Link to="/terms"      className="hover:text-rose-400">Terms</Link>
          <Link to="/refund"     className="hover:text-rose-400">Refund</Link>
          <Link to="/google-api" className="hover:text-rose-400">Google API</Link>
          <Link to="/"        className="hover:text-rose-400 ml-auto">← Back to app</Link>
        </div>

      </div>
    </div>
  );
}
