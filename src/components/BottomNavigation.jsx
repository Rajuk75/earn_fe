import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Banknote, Trophy, HelpCircle } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Banknote, label: 'Earnings', path: '/wallet' },
    { icon: Trophy, label: 'Leaderboards', path: '/leaderboards' },
    { icon: HelpCircle, label: 'How it works?', path: '/how-it-works' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-6 py-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <button 
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={24} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
