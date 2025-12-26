import React from 'react';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome to EarnHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The Future of Earning. Start your journey to financial freedom today.
          </p>
          <button
            onClick={onRegisterClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

