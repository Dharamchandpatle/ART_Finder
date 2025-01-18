import React from 'react';
import { Search, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-8 h-8" />
          <h1 className="text-4xl font-bold">ART Finder</h1>
        </div>
        <p className="text-xl mb-8">Automated Research and Trigger Finder</p>
        <p className="text-lg mb-8 opacity-90">
          Streamline your ad creation process with AI-driven insights and analytics
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors">
          <Zap className="w-5 h-5" />
          Get Started
        </button>
      </div>
    </header>
  );
}