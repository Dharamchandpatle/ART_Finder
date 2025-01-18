import React, { useState } from 'react';
import { TrendingUp, Users, ThumbsUp, MessageCircle, ChevronDown } from 'lucide-react';

const trendCards = [
  {
    title: 'Sustainability',
    growth: '+45%',
    sentiment: 'Positive',
    icon: TrendingUp,
    color: 'bg-green-500',
    details: {
      weeklyData: [45, 48, 52, 51, 48, 50, 55],
      insights: [
        'Eco-friendly products trending up',
        'High engagement in recycling content',
        'Growing interest in sustainable packaging'
      ],
      keywords: ['eco-friendly', 'sustainable', 'green', 'recycling']
    }
  },
  {
    title: 'Tech Innovation',
    growth: '+32%',
    sentiment: 'Neutral',
    icon: Users,
    color: 'bg-blue-500',
    details: {
      weeklyData: [32, 35, 33, 38, 40, 38, 42],
      insights: [
        'AI tools gaining traction',
        'Remote work solutions popular',
        'Digital transformation focus'
      ],
      keywords: ['AI', 'automation', 'digital', 'tech']
    }
  },
  {
    title: 'Wellness',
    growth: '+28%',
    sentiment: 'Positive',
    icon: ThumbsUp,
    color: 'bg-purple-500',
    details: {
      weeklyData: [28, 30, 32, 35, 33, 34, 36],
      insights: [
        'Mental health awareness rising',
        'Fitness tech integration trending',
        'Holistic wellness approaches preferred'
      ],
      keywords: ['wellness', 'health', 'fitness', 'mindfulness']
    }
  },
  {
    title: 'Remote Work',
    growth: '+22%',
    sentiment: 'Positive',
    icon: MessageCircle,
    color: 'bg-indigo-500',
    details: {
      weeklyData: [22, 24, 25, 28, 27, 29, 30],
      insights: [
        'Hybrid work models gaining popularity',
        'Collaboration tools in demand',
        'Work-life balance emphasis'
      ],
      keywords: ['remote', 'hybrid', 'flexible', 'virtual']
    }
  },
];

export function TrendVisualizer() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const toggleCard = (title: string) => {
    setExpandedCard(expandedCard === title ? null : title);
  };

  const renderTrendGraph = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="h-24 flex items-end space-x-1">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-400 rounded-t"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs mt-1">{value}%</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {trendCards.map((trend) => (
        <div
          key={trend.title}
          className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
            expandedCard === trend.title ? 'lg:col-span-2 lg:row-span-2' : ''
          }`}
        >
          <div 
            className={`${trend.color} p-4 text-white cursor-pointer`}
            onClick={() => toggleCard(trend.title)}
          >
            <div className="flex justify-between items-center">
              <trend.icon className="w-8 h-8" />
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${
                  expandedCard === trend.title ? 'transform rotate-180' : ''
                }`} 
              />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{trend.title}</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Growth</span>
              <span className="font-medium text-green-600">{trend.growth}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Sentiment</span>
              <span className="font-medium text-blue-600">{trend.sentiment}</span>
            </div>

            {expandedCard === trend.title && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Trend Analysis</h4>
                  <div className="flex space-x-2 mb-4">
                    {['week', 'month', 'quarter'].map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedTimeframe === timeframe
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                      </button>
                    ))}
                  </div>
                  {renderTrendGraph(trend.details.weeklyData)}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Insights</h4>
                  <ul className="space-y-2">
                    {trend.details.insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-600">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Trending Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {trend.details.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}