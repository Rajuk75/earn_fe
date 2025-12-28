import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            EarnHub
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-gray-50"
          >
            <LogIn size={18} />
            <span className="hidden sm:inline">Sign In</span>
          </button>
          <button
            onClick={onRegisterClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            <UserPlus size={18} />
            <span>Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

