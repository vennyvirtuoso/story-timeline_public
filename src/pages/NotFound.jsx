import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center px-4 text-center">
      <BookOpen size={40} className="text-rose-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-500 text-sm mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow hover:opacity-90 transition">
        ← Back to Safarnama
      </Link>
    </div>
  );
}