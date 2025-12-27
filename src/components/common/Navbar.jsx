import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            EarnHub
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <LogIn size={18} />
            <span className="font-medium">Sign In</span>
          </button>
          <button
            onClick={onRegisterClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <UserPlus size={18} />
            <span className="font-medium">Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

