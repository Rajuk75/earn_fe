import React from 'react';
import { Home, Banknote, Trophy, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Banknote, label: 'Earnings', active: false },
    { icon: Trophy, label: 'Leaderboards', active: false },
    { icon: HelpCircle, label: 'How it works?', active: false },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 p-6 z-50">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          EarnHub
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout / Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
