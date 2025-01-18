import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, TrendingUp, LineChart, LightbulbIcon, Loader2, Brain, ChevronDown, Youtube, Hash } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  type?: 'trend' | 'insight' | 'recommendation';
  timestamp: Date;
  hashtags?: string[];
  youtubeLinks?: Array<{ title: string; url: string; }>;
}

// Demo data patterns for different types of input
const demoPatterns = {
  sales: {
    trends: [
      'Monthly sales have increased by 23% compared to last quarter',
      'Peak sales occur consistently between 2-4 PM on weekdays',
      'Online purchases show 45% higher conversion rates than in-store'
    ],
    insights: [
      'Customer retention rate is highest among 25-34 age group',
      'Products in blue color variants outsell other colors by 2.5x',
      'Repeat customers spend 3x more than new customers'
    ],
    recommendations: [
      {
        text: 'Consider implementing a loyalty program targeting the 25-34 demographic',
        hashtags: ['#CustomerLoyalty', '#RetailStrategy', '#CustomerRetention'],
        youtubeLinks: [
          { title: 'Building Customer Loyalty Programs', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { title: 'Retail Success Strategies', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        text: 'Increase stock of blue variants for upcoming collections',
        hashtags: ['#InventoryManagement', '#RetailTrends', '#ProductStrategy'],
        youtubeLinks: [
          { title: 'Inventory Management Tips', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  marketing: {
    trends: [
      'Social media engagement has grown 78% month-over-month',
      'Video content receives 4x more interactions than static posts',
      'Mobile users account for 67% of website traffic'
    ],
    insights: [
      'Instagram stories drive 40% more clicks than feed posts',
      'User-generated content has 85% higher conversion rate',
      'Weekend posts receive 22% more engagement'
    ],
    recommendations: [
      {
        text: 'Increase video content production for social media',
        hashtags: ['#ContentStrategy', '#VideoMarketing', '#SocialMediaTips'],
        youtubeLinks: [
          { title: 'Video Marketing Guide 2024', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { title: 'Social Media Video Tips', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        text: 'Implement a UGC campaign to boost engagement',
        hashtags: ['#UGC', '#CommunityMarketing', '#BrandEngagement'],
        youtubeLinks: [
          { title: 'UGC Campaign Success Stories', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  website: {
    trends: [
      'Mobile bounce rate decreased by 15% after recent optimization',
      'Average session duration increased to 4.5 minutes',
      'Cart abandonment rate reduced to 23%'
    ],
    insights: [
      'Users who view size guides are 2x more likely to purchase',
      'Product videos increase conversion rate by 40%',
      'Live chat users have 25% higher average order value'
    ],
    recommendations: [
      {
        text: 'Add size guides to all product categories',
        hashtags: ['#UXDesign', '#EcommerceTips', '#ConversionRate'],
        youtubeLinks: [
          { title: 'E-commerce UX Best Practices', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { title: 'Improving Product Pages', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      },
      {
        text: 'Implement product videos across top-selling items',
        hashtags: ['#ProductVideos', '#EcommerceStrategy', '#ConversionOptimization'],
        youtubeLinks: [
          { title: 'Product Video Creation Guide', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]
      }
    ]
  }
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI analyst. Share your data or observations about sales, marketing, or website performance, and I'll provide detailed analysis.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeInput = (text: string) => {
    setIsTyping(true);
    
    const textLower = text.toLowerCase();
    let category = 'sales';
    if (textLower.includes('market') || textLower.includes('social') || textLower.includes('campaign')) {
      category = 'marketing';
    } else if (textLower.includes('website') || textLower.includes('traffic') || textLower.includes('user')) {
      category = 'website';
    }
    setSelectedCategory(category);

    const patterns = demoPatterns[category as keyof typeof demoPatterns];
    
    const addResponse = (type: 'trend' | 'insight' | 'recommendation', index: number) => {
      let messageData: Partial<Message> = {
        text: '',
        hashtags: [],
        youtubeLinks: []
      };

      if (type === 'recommendation') {
        const recData = patterns.recommendations[index % patterns.recommendations.length];
        messageData = {
          text: recData.text,
          hashtags: recData.hashtags,
          youtubeLinks: recData.youtubeLinks
        };
      } else {
        messageData.text = patterns[type][index % patterns[type].length];
      }

      setMessages(prev => [...prev, {
        id: Date.now() + index,
        text: messageData.text!,
        sender: 'bot',
        type: type,
        timestamp: new Date(),
        hashtags: messageData.hashtags,
        youtubeLinks: messageData.youtubeLinks
      }]);
    };

    setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => addResponse('trend', 0), 500);
      setTimeout(() => addResponse('insight', 0), 2000);
      setTimeout(() => addResponse('recommendation', 0), 3500);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    analyzeInput(input);
    setInput('');
  };

  const getIcon = (type?: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-pink-500" />;
      case 'insight':
        return <LineChart className="w-5 h-5 text-pink-600" />;
      case 'recommendation':
        return <LightbulbIcon className="w-5 h-5 text-pink-700" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Bot className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI Data Analyzer</h1>
              <p className="text-sm text-gray-500">Powered by advanced analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-pink-600" />
            <span className="text-sm font-medium text-gray-600">Real-time Analysis</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } items-end gap-2`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-pink-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-pink-600 text-white rounded-br-none'
                      : 'bg-pink-50 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.type && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-opacity-20 border-current">
                      {getIcon(message.type)}
                      <span className="text-sm font-semibold capitalize">
                        {message.type}
                      </span>
                    </div>
                  )}
                  <p className="leading-relaxed">{message.text}</p>
                  
                  {message.hashtags && message.hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.hashtags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center gap-1 text-sm bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                          <Hash className="w-3 h-3" />
                          {tag.slice(1)}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {message.youtubeLinks && message.youtubeLinks.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.youtubeLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm bg-pink-100 text-pink-700 px-3 py-2 rounded-lg hover:bg-pink-200 transition-colors"
                        >
                          <Youtube className="w-4 h-4" />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-pink-600" />
                </div>
                <div className="bg-pink-50 p-4 rounded-2xl rounded-bl-none">
                  <Loader2 className="w-5 h-5 text-pink-600 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-100">
            <form onSubmit={handleSubmit} className="p-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Share your data or observations..."
                    className="w-full p-4 pr-12 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400" />
                </div>
                <button
                  type="submit"
                  disabled={isTyping}
                  className={`px-6 py-4 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors flex items-center gap-2 ${
                    isTyping ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { 
              icon: <TrendingUp className="w-6 h-6" />, 
              title: 'Trend Analysis', 
              desc: 'Identify patterns and trends in your data'
            },
            { 
              icon: <LineChart className="w-6 h-6" />, 
              title: 'Data Insights', 
              desc: 'Uncover hidden patterns and correlations'
            },
            { 
              icon: <LightbulbIcon className="w-6 h-6" />, 
              title: 'Smart Recommendations', 
              desc: 'Get actionable suggestions for improvement'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-block p-3 bg-pink-50 rounded-xl mb-4">
                <div className="text-pink-500">{feature.icon}</div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;