import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SmartAssistant } from './components/SmartAssistant';
import { TrendVisualizer } from './components/TrendVisualizer';
import { CompetitorGrid } from './components/CompetitorGrid';
import { MessageCircle } from 'lucide-react';

function App() {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-20 lg:ml-64">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketing Intelligence Dashboard</h1>
          <section id="trends" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trending Topics</h2>
            <TrendVisualizer />
          </section>
          <section id="competitors" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Competitor Analysis</h2>
            <CompetitorGrid />
          </section>
        </div>
      </main>

      {/* Floating Chat Icon */}
      <button
        onClick={() => setShowAssistant(!showAssistant)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Smart Assistant */}
      {showAssistant && <SmartAssistant onClose={() => setShowAssistant(false)} />}
    </div>
  );
}

export default App;