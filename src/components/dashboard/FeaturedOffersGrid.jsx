import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import OfferCard from './OfferCard';
import { getAllOffers, getUserTrackings } from '../../services/core.service';
import { useUser } from '../../context/UserContext';

// Placeholder logo component (using colored divs or SVGs for now if real images unavailable)
const PlaceholderLogo = ({ color, text }) => (
  <div className={`w-full h-full ${color} flex items-center justify-center text-white font-bold text-xs rounded`}>
    {text}
  </div>
);

const FeaturedOffersGrid = () => {
  const { user } = useUser();
  const [offers, setOffers] = useState([]);
  const [userTrackings, setUserTrackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOffers = async () => {
    try {
      setRefreshing(true);
      const response = await getAllOffers({ isActive: true });
      if (response?.data?.offers) {
        setOffers(response.data.offers);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchUserTrackings = async () => {
    if (!user?._id) return;
    
    try {
      const response = await getUserTrackings();
      if (response?.data?.trackings) {
        setUserTrackings(response.data.trackings);
      }
    } catch (error) {
      console.error('Error fetching user trackings:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
    if (user?._id) {
      fetchUserTrackings();
    }
  }, [user?._id]);

  const handleRefresh = () => {
    fetchOffers();
  };

  // Get tracking status for an offer
  const getOfferTrackingStatus = (offerId) => {
    const tracking = userTrackings.find(t => 
      (t.offerId?._id || t.offerId) === offerId
    );
    return tracking ? tracking.status : null;
  };

  // Format offer data for OfferCard component
  const formatOffer = (offer) => {
    let logoComponent = null;
    
    if (offer.logo) {
      // If logo is a URL string, use img tag
      logoComponent = <img src={offer.logo} alt={offer.name} className="w-full h-full object-contain" />;
    } else {
      // Use placeholder with logoColor and logoText
      const color = offer.logoColor || 'bg-blue-500';
      const text = offer.logoText || offer.name?.charAt(0) || 'O';
      logoComponent = <PlaceholderLogo color={color} text={text} />;
    }

    const offerId = offer._id || offer.id;
    const trackingStatus = getOfferTrackingStatus(offerId);

    return {
      id: offerId,
      name: offer.name,
      amount: offer.amount?.toLocaleString('en-IN') || '0',
      logo: logoComponent,
      description: offer.description,
      posthookUrl: offer.posthookUrl,
      trackingStatus, // Add tracking status
    };
  };

  if (loading) {
    return (
      <div className="mb-24">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-gray-900 text-lg font-bold">Featured Offers</h2>
        </div>
        <div className="text-center py-8 text-gray-500">Loading offers...</div>
      </div>
    );
  }

  return (
    <div className="mb-24">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-gray-900 text-lg font-bold">Featured Offers</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh offers"
        >
          <RefreshCw 
            size={16} 
            className={`text-green-500 ${refreshing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>
      
      {offers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No offers available at the moment.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <OfferCard 
              key={offer._id || offer.id}
              {...formatOffer(offer)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedOffersGrid;

