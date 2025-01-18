import React from 'react';
import { 
  TrendingUp, 
  MessageCircle, 
  Target, 
  BarChart2,
  ExternalLink
} from 'lucide-react';
import type { AnalysisResult } from '../types';

export function InsightsDashboard({ data }: { data: AnalysisResult }) {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Analysis Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={MessageCircle}
          title="Top Pain Points"
          value={`${data.painPoints.length} Identified`}
        />
        <MetricCard
          icon={Target}
          title="Best Hooks & CTAs"
          value={`${data.hooksAndCTAs.length} Found`}
        />
        <MetricCard
          icon={TrendingUp}
          title="Sentiment Score"
          value={`${(data.sentimentScore * 100).toFixed(1)}%`}
        />
        <MetricCard
          icon={BarChart2}
          title="Trending Keywords"
          value={`${data.trendingKeywords.length} Active`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Pain Points</h3>
          <ul className="space-y-2">
            {data.painPoints.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Best Performing CTAs</h3>
          <ul className="space-y-2">
            {data.hooksAndCTAs.map((cta, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {cta}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Reference Data</h3>
        <div className="bg-white rounded-lg shadow-sm">
          {data.references.map((ref, index) => (
            <a
              key={index}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-b-0"
            >
              <div>
                <span className="text-sm text-gray-500 uppercase">{ref.type}</span>
                <p className="font-medium">{ref.title}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ 
  icon: Icon, 
  title, 
  value 
}: { 
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-600">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}