import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Lock, Calendar, RefreshCw } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { getWalletByUserId } from '../services/core.service';
import BottomNavigation from '../components/BottomNavigation';

const WalletPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
      return;
    }

    loadWalletData();
  }, [navigate]);

  const loadWalletData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let userId = user?._id;
      
      // If user not in context, get from token
      if (!userId) {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userId = payload.userId;
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }

      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      console.log('WalletPage: Fetching wallet for userId:', userId);
      const response = await getWalletByUserId(userId);
      
      if (response?.data?.wallet) {
        setWallet(response.data.wallet);
        console.log('WalletPage: Wallet data loaded:', response.data.wallet);
      } else {
        setError('Wallet data not found');
      }
    } catch (err) {
      console.error('WalletPage: Error fetching wallet:', err);
      setError(err.message || 'Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={32} className="text-blue-600 animate-spin mx-auto mb-4" />
          <div className="text-gray-600">Loading wallet...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadWalletData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-gray-600">No wallet data found</p>
          </div>
        </main>
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
          <button
            onClick={loadWalletData}
            className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh"
          >
            <RefreshCw size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Wallet Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 md:p-8 mb-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Wallet size={20} className="md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-xs md:text-sm">Total Balance</p>
                <h2 className="text-3xl md:text-4xl font-bold mt-1">
                  ₹{wallet.balance?.toLocaleString('en-IN') || '0'}
                </h2>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-blue-100 text-xs md:text-sm">Currency</p>
              <p className="text-lg md:text-xl font-semibold mt-1">{wallet.currency || 'INR'}</p>
            </div>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Locked Amount */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={18} className="text-gray-600" />
                Locked Amount
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-600">Locked Balance</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    ₹{wallet.lockedAmount?.toLocaleString('en-IN') || '0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Available Balance */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Balance</h3>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-700">Available to Use</span>
                  <span className="text-xl md:text-2xl font-bold text-green-600">
                    ₹{((wallet.balance || 0) - (wallet.lockedAmount || 0)).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Total Balance - Locked Amount
                </p>
              </div>
            </div>

            {/* Wallet Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-gray-600" />
                Wallet Information
              </h3>
              <div className="space-y-3">
                {wallet._id && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Wallet ID</span>
                    <span className="text-sm font-mono text-gray-900">{wallet._id}</span>
                  </div>
                )}
                
                {wallet.userId && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">User ID</span>
                    <span className="text-sm font-mono text-gray-900">{wallet.userId}</span>
                  </div>
                )}

                {wallet.createdAt && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Created At</span>
                    <span className="text-sm text-gray-900">
                      {new Date(wallet.createdAt).toLocaleString()}
                    </span>
                  </div>
                )}

                {wallet.updatedAt && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm text-gray-900">
                      {new Date(wallet.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WalletPage;

