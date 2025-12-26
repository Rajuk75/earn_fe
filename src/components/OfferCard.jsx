import React from 'react';
import { ArrowRight } from 'lucide-react';

const OfferCard = ({ logo, name, amount, subText }) => {
  return (
    <div className="group bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-4 hover:border-blue-100 hover:shadow-md transition-all duration-300">
      
      {/* Logo Container */}
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-3 border border-gray-100 overflow-hidden">
        {/* Placeholder for Logo if image not provided */}
         {typeof logo === 'string' ? (
             <img src={logo} alt={name} className="w-full h-full object-contain" />
         ) : (
             logo // Render component if passed as icon
         )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-gray-900 font-bold text-sm mb-1">{name}</h3>
        {subText && <p className="text-xs text-gray-500">{subText}</p>}
      </div>

      {/* Amount */}
      <div className="text-green-600 font-bold text-lg">
        ₹{amount}
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white py-2 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-purple-500/20">
        <ArrowRight size={18} />
      </button>

    </div>
  );
};

export default OfferCard;
