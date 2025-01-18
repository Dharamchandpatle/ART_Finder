import React, { useState } from 'react';
import { MessageSquare, X, Lightbulb, TrendingUp, Target, Send } from 'lucide-react';

interface SmartAssistantProps {
  onClose: () => void;
}

const aiSuggestions = {
  trends: [
    {
      type: 'alert',
      title: 'Trend Alert',
      message: 'Current trending topics show increased engagement with sustainability-focused content. Consider incorporating eco-friendly messaging in your next campaign.',
      color: 'blue'
    },
    {
      type: 'action',
      title: 'Suggested Action',
      message: 'Try using CTAs like "Join the Green Movement" or "Make a Sustainable Choice" to align with current trends.',
      color: 'green'
    }
  ],
  insights: [
    {
      type: 'opportunity',
      title: 'Market Opportunity',
      message: 'Tech innovation content is showing strong growth. Consider creating content around AI and automation.',
      color: 'purple'
    },
    {
      type: 'optimization',
      title: 'Content Optimization',
      message: 'Posts with how-to guides and practical tips are receiving 45% more engagement.',
      color: 'indigo'
    }
  ],
  recommendations: [
    {
      type: 'strategy',
      title: 'Strategic Focus',
      message: 'Wellness content performs best during morning hours. Schedule posts between 7-10 AM.',
      color: 'pink'
    },
    {
      type: 'engagement',
      title: 'Engagement Boost',
      message: 'Interactive polls and surveys are driving 2x more comments. Consider adding more interactive elements.',
      color: 'orange'
    }
  ]
};

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function SmartAssistant({ onClose }: SmartAssistantProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI marketing assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const renderSuggestions = (suggestions: typeof aiSuggestions.trends) => {
    return suggestions.map((suggestion, index) => (
      <div 
        key={index}
        className={`bg-${suggestion.color}-50 rounded-lg p-4 mb-4`}
      >
        <h4 className={`font-semibold text-${suggestion.color}-900 mb-2 flex items-center`}>
          {suggestion.type === 'alert' && <TrendingUp className="w-4 h-4 mr-2" />}
          {suggestion.type === 'action' && <Target className="w-4 h-4 mr-2" />}
          {suggestion.type === 'opportunity' && <Lightbulb className="w-4 h-4 mr-2" />}
          {suggestion.title}
        </h4>
        <p className={`text-sm text-${suggestion.color}-800`}>
          {suggestion.message}
        </p>
      </div>
    ));
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse: Message = {
      text: getAIResponse(inputMessage),
      isUser: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputMessage('');
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('trend')) {
      return "Based on current trends, sustainability and eco-friendly content is showing strong engagement. Would you like specific recommendations for your industry?";
    } else if (lowerMessage.includes('competitor')) {
      return "I notice your competitors are focusing on video content lately. Would you like to see a detailed analysis of their top-performing posts?";
    } else if (lowerMessage.includes('help')) {
      return "I can help you with trend analysis, competitor insights, content optimization, and marketing strategy. What specific area would you like to focus on?";
    } else {
      return "I understand you're interested in this topic. Would you like to see some data-driven insights or specific recommendations?";
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg z-50">
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          {['chat', 'trends', 'insights', 'recommendations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
          {activeTab === 'chat' ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {activeTab === 'trends' && renderSuggestions(aiSuggestions.trends)}
              {activeTab === 'insights' && renderSuggestions(aiSuggestions.insights)}
              {activeTab === 'recommendations' && renderSuggestions(aiSuggestions.recommendations)}
            </>
          )}
        </div>

        {activeTab === 'chat' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}