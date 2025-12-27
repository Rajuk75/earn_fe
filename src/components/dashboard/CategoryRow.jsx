import React from 'react';
import { Landmark, CreditCard, Globe, Layers } from 'lucide-react';

const CategoryRow = () => {
  const categories = [
    { id: 1, icon: Landmark, label: 'Banking', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 2, icon: CreditCard, label: 'Cards', color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 3, icon: Globe, label: 'Demat', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 4, icon: Layers, label: 'All', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 scrollbar-hide md:overflow-visible md:justify-center md:mx-0 md:px-0">
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col items-center gap-3 min-w-[80px] cursor-pointer hover:scale-105 transition-transform">
          <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center border border-gray-100/50 shadow-sm`}>
            <cat.icon size={28} className={cat.color} />
          </div>
          <span className="text-xs text-gray-600 font-medium">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryRow;

