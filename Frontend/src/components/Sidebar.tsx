import React from 'react';
import { BarChart3, Users, LineChart, Lightbulb, Menu } from 'lucide-react';

const navItems = [
  { icon: BarChart3, label: 'Trend Visualization', href: '#trends' },
  { icon: Users, label: 'Competitor Analysis', href: '#competitors' },
  { icon: LineChart, label: 'Ad Performance', href: '#performance' },
  { icon: Lightbulb, label: 'Inspiration', href: '#inspiration' },
];

export function Sidebar() {
  return (
    <div className="h-screen w-20 lg:w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-4 border-b border-gray-800">
        <Menu className="w-8 h-8 text-blue-400" />
      </div>
      <nav className="flex-1 pt-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <item.icon className="w-6 h-6 mr-4" />
            <span className="hidden lg:block">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}