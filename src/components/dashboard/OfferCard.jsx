import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackOfferClick, trackOfferCompletion } from '../../services/core.service';
import { useUser } from '../../context/UserContext';

const OfferCard = ({ id, logo, name, amount, description, posthookUrl, trackingStatus }) => {
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
      
      // Track offer click
      await trackOfferClick(id);
      console.log('Offer click tracked:', id);

      // If posthookUrl exists, open in new tab and track completion
      if (posthookUrl) {
        // Open offer URL in new tab
        window.open(posthookUrl, '_blank', 'noopener,noreferrer');
        
        // Track completion after a short delay (assuming user will complete the offer)
        // In real scenario, you might want to track completion when user returns or via webhook
        setTimeout(async () => {
          try {
            await trackOfferCompletion(id, {
              completedVia: 'external_link',
              posthookUrl,
            });
            setCompleted(true);
            console.log('Offer completion tracked:', id);
          } catch (error) {
            console.error('Error tracking offer completion:', error);
          }
        }, 2000); // 2 second delay to allow page to open
      } else {
        // If no posthookUrl, just mark as clicked
        setCompleted(true);
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

