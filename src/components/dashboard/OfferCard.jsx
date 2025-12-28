import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackOfferClick } from '../../services/core.service';
import { useUser } from '../../context/UserContext';

const OfferCard = ({ id, logo, name, amount, description, providerUrl, trackingStatus }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(trackingStatus === 'completed');

  const handleOfferClick = async () => {
    if (!user?._id || !id) {
      console.warn('OfferCard: User or offer ID missing');
      return;
    }

    try {
      setLoading(true);
      
      // Step 1: Track offer click and get redirectUrl with clickId
      const response = await trackOfferClick(id);
      console.log('Offer click tracked:', response);
      
      // Extract redirectUrl from response
      const redirectUrl = response?.data?.tracking?.redirectUrl;
      const clickId = response?.data?.tracking?.clickId;
      
      if (redirectUrl) {
        // Step 2: Redirect user to provider URL with clickId parameter
        console.log('Redirecting to provider URL:', redirectUrl);
        window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        
        // Note: Completion will be handled by webhook when provider sends postback
        // Step 3-5: Provider will call POST /v1/offer/webhook with clickId
        // Backend will automatically:
        // - Find tracking by clickId
        // - Mark as completed
        // - Credit wallet
      } else if (providerUrl) {
        // Fallback: If redirectUrl not available but providerUrl exists, use it directly
        console.log('Using providerUrl directly:', providerUrl);
        window.open(providerUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('No redirectUrl or providerUrl available for offer:', id);
      }
    } catch (error) {
      console.error('Error tracking offer click:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-4 hover:border-blue-100 hover:shadow-md transition-all duration-300">
      
      {/* Logo Container */}
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-3 border border-gray-100 overflow-hidden">
        {logo}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-gray-900 font-bold text-sm mb-1">{name}</h3>
        {description && <p className="text-xs text-gray-500 line-clamp-2">{description}</p>}
      </div>

      {/* Amount */}
      <div className="text-green-600 font-bold text-lg">
        ₹{amount}
      </div>

      {/* Status Badge */}
      {trackingStatus === 'completed' && (
        <div className="w-full px-2 py-1 bg-green-50 border border-green-200 rounded-lg text-center">
          <span className="text-xs font-medium text-green-700">✓ Completed</span>
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleOfferClick}
        disabled={loading || completed || !user?._id}
        className={`w-full py-2 rounded-full flex items-center justify-center transition-colors shadow-lg ${
          completed || trackingStatus === 'completed'
            ? 'bg-green-500 text-white cursor-not-allowed'
            : loading
            ? 'bg-gray-400 text-white cursor-wait'
            : 'bg-[#a855f7] hover:bg-[#9333ea] text-white shadow-purple-500/20'
        }`}
      >
        {loading ? (
          <span className="text-sm">Processing...</span>
        ) : completed || trackingStatus === 'completed' ? (
          <span className="text-sm">Completed</span>
        ) : (
          <ArrowRight size={18} />
        )}
      </button>

    </div>
  );
};

export default OfferCard;

