import React, { useState } from 'react';
import { Eye, ThumbsUp, MessageCircle, TrendingUp, BarChart, Share2 } from 'lucide-react';

const competitors = [
  {
    id: 1,
    name: 'EcoLife',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400',
    engagement: '24.5K',
    sentiment: 92,
    comments: 856,
    details: {
      performance: {
        views: [24.5, 23.8, 25.2, 26.1, 24.9, 25.5, 27.2],
        engagement: [92, 90, 93, 91, 94, 92, 95],
        reach: [45.2, 44.8, 46.1, 45.9, 46.5, 47.2, 48.1]
      },
      topContent: [
        {
          title: 'Sustainable Living Tips',
          engagement: '12.3K',
          sentiment: 95
        },
        {
          title: 'Eco-Friendly Products Review',
          engagement: '8.9K',
          sentiment: 88
        }
      ],
      aiInsights: [
        'Strong focus on sustainability content',
        'High engagement on how-to guides',
        'Positive sentiment on product reviews'
      ]
    }
  },
  {
    id: 2,
    name: 'TechFuture',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400',
    engagement: '18.2K',
    sentiment: 88,
    comments: 645,
    details: {
      performance: {
        views: [18.2, 17.9, 19.1, 18.8, 19.5, 20.1, 21.2],
        engagement: [88, 87, 89, 88, 90, 89, 91],
        reach: [35.6, 35.2, 36.1, 36.8, 37.2, 37.9, 38.5]
      },
      topContent: [
        {
          title: 'AI Technology Trends',
          engagement: '9.5K',
          sentiment: 90
        },
        {
          title: 'Future of Work',
          engagement: '7.2K',
          sentiment: 85
        }
      ],
      aiInsights: [
        'Technology innovation content performs well',
        'Growing interest in AI-related posts',
        'Consistent engagement on future trends'
      ]
    }
  },
  {
    id: 3,
    name: 'WellnessHub',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400',
    engagement: '15.8K',
    sentiment: 94,
    comments: 532,
    details: {
      performance: {
        views: [15.8, 16.2, 16.5, 16.9, 17.2, 17.8, 18.1],
        engagement: [94, 93, 95, 94, 96, 95, 97],
        reach: [28.9, 29.2, 29.8, 30.1, 30.5, 31.2, 31.8]
      },
      topContent: [
        {
          title: 'Mindfulness Practices',
          engagement: '8.2K',
          sentiment: 96
        },
        {
          title: 'Healthy Living Guide',
          engagement: '6.9K',
          sentiment: 92
        }
      ],
      aiInsights: [
        'Wellness content receives high engagement',
        'Strong community interaction',
        'Positive sentiment on health tips'
      ]
    }
  }
];

export function CompetitorGrid() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('performance');

  const renderPerformanceGraph = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="h-32 flex items-end space-x-1">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-400 rounded-t"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs mt-1">{value}K</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {competitors.map((competitor) => (
        <div 
          key={competitor.id}
          className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
            selectedCompetitor === competitor.id ? 'lg:col-span-2 lg:row-span-2' : ''
          }`}
          onClick={() => setSelectedCompetitor(selectedCompetitor === competitor.id ? null : competitor.id)}
        >
          <img
            src={competitor.image}
            alt={competitor.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">{competitor.name}</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center">
                <Eye className="w-5 h-5 text-blue-500 mb-1" />
                <span className="font-medium">{competitor.engagement}</span>
                <span className="text-gray-500 text-xs">Views</span>
              </div>
              <div className="flex flex-col items-center">
                <ThumbsUp className="w-5 h-5 text-green-500 mb-1" />
                <span className="font-medium">{competitor.sentiment}%</span>
                <span className="text-gray-500 text-xs">Sentiment</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-5 h-5 text-purple-500 mb-1" />
                <span className="font-medium">{competitor.comments}</span>
                <span className="text-gray-500 text-xs">Comments</span>
              </div>
            </div>

            {selectedCompetitor === competitor.id && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('performance');
                    }}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeTab === 'performance'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <BarChart className="w-4 h-4" />
                    <span>Performance</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('content');
                    }}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeTab === 'content'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Top Content</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('insights');
                    }}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeTab === 'insights'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>AI Insights</span>
                  </button>
                </div>

                {activeTab === 'performance' && (
                  <div>
                    <h4 className="font-semibold mb-2">Weekly Performance</h4>
                    {renderPerformanceGraph(competitor.details.performance.views)}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Engagement Rate</span>
                        <span className="font-medium text-blue-600">
                          {Math.round(competitor.details.performance.engagement.reduce((a, b) => a + b) / 7)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Reach</span>
                        <span className="font-medium text-blue-600">
                          {Math.round(competitor.details.performance.reach.reduce((a, b) => a + b) / 7)}K
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="space-y-4">
                    {competitor.details.topContent.map((content, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">{content.title}</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Engagement: {content.engagement}</span>
                          <span className="text-green-600">Sentiment: {content.sentiment}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'insights' && (
                  <div className="space-y-3">
                    {competitor.details.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-600">{insight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}