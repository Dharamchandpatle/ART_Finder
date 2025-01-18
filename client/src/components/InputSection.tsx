import React, { useState } from 'react';
import { Search, Users, MessageSquare, BarChart } from 'lucide-react';

const sources = [
  { id: 'google', label: 'Google' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'quora', label: 'Quora' },
  { id: 'reviews', label: 'App Reviews' },
];

export function InputSection({ onAnalyze }: { onAnalyze: (data: any) => void }) {
  const [formData, setFormData] = useState({
    topic: '',
    targetAudience: '',
    brandTone: '',
    sources: ['google', 'youtube'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Search className="w-6 h-6" />
        What are you looking to explore?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Topic</label>
          <input
            type="text"
            placeholder="Enter your ad topic or keyword (e.g., 'Fitness App Ads')"
            className="w-full p-3 border rounded-lg"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Target Audience
          </label>
          <input
            type="text"
            placeholder="e.g., '18-35, USA'"
            className="w-full p-3 border rounded-lg"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Brand Tone/Guidelines
          </label>
          <input
            type="text"
            placeholder="e.g., 'Friendly, Professional, Motivational'"
            className="w-full p-3 border rounded-lg"
            value={formData.brandTone}
            onChange={(e) => setFormData({ ...formData, brandTone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Select Sources</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sources.map((source) => (
              <label key={source.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.sources.includes(source.id)}
                  onChange={(e) => {
                    const newSources = e.target.checked
                      ? [...formData.sources, source.id]
                      : formData.sources.filter((s) => s !== source.id);
                    setFormData({ ...formData, sources: newSources });
                  }}
                  className="w-4 h-4"
                />
                {source.label}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <BarChart className="w-5 h-5" />
          Analyze Trends
        </button>
      </form>
    </section>
  );
}