import React from 'react';
import { RefreshCw } from 'lucide-react';
import OfferCard from './OfferCard';

// Dummy logos (using colored divs or SVGs for now if real images unavailable)
const PlaceholderLogo = ({ color, text }) => (
    <div className={`w-full h-full ${color} flex items-center justify-center text-white font-bold text-xs rounded`}>
        {text}
    </div>
);

const FeaturedOffersGrid = () => {
    const offers = [
        {
            id: 1,
            name: 'Xm Trade',
            amount: '2,000.00',
            logo: <PlaceholderLogo color="bg-black" text="XM" />
        },
        {
            id: 2,
            name: 'Quick TV',
            amount: '30.00',
            logo: <PlaceholderLogo color="bg-red-500" text="Q" />
        },
        {
            id: 3,
            name: 'Axis Mutual Fund',
            amount: '450.00',
            logo: <PlaceholderLogo color="bg-rose-700" text="AXIS" />
        },
        {
            id: 4,
            name: 'Kotak Bank',
            amount: '600.00',
            logo: <PlaceholderLogo color="bg-red-600" text="KB" />
        },
        {
            id: 5,
            name: 'Stable Money',
            amount: '1,200.00',
            logo: <PlaceholderLogo color="bg-black" text="SM" />
        }
    ];

  return (
    <div className="mb-24"> {/* Added margin bottom to avoid overlap with fixed nav */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-gray-900 text-lg font-bold">Featured Offers</h2>
        <RefreshCw size={16} className="text-green-500" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {offers.map((offer) => (
          <OfferCard 
            key={offer.id}
            {...offer}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedOffersGrid;
