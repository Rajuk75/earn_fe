import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Banknote, Trophy, HelpCircle, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getWalletByUserId } from '../services/core.service';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch wallet data when component mounts or user changes
  useEffect(() => {
    const fetchWallet = async () => {
      if (!user?._id) {
        // Try to get userId from token
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.userId) {
              await loadWalletData(payload.userId);
            }
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      } else {
        await loadWalletData(user._id);
      }
    };

    fetchWallet();
  }, [user]);

  const loadWalletData = async (userId) => {
    if (!userId) return;
    
    setLoading(true);
    try {
      console.log('Sidebar: Fetching wallet for userId:', userId);
      const response = await getWalletByUserId(userId);
      if (response?.data?.wallet) {
        setWallet(response.data.wallet);
        console.log('Sidebar: Wallet data loaded:', response.data.wallet);
      }
    } catch (error) {
      console.error('Sidebar: Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEarningsClick = () => {
    navigate('/wallet');
  };

  const navItems = [
    { icon: Home, label: 'Home', active: true, onClick: () => navigate('/dashboard') },
    { icon: Banknote, label: 'Earnings', active: false, onClick: handleEarningsClick },
    { icon: Trophy, label: 'Leaderboards', active: false },
    { icon: HelpCircle, label: 'How it works?', active: false },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 p-6 z-50">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          EarnHub
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Wallet Info */}
      {wallet && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Wallet Balance</span>
            <Banknote size={16} className="text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-blue-600">
              ₹{wallet.balance?.toLocaleString('en-IN') || '0'}
            </span>
            <span className="text-xs text-gray-500">{wallet.currency || 'INR'}</span>
          </div>
          {wallet.lockedAmount > 0 && (
            <div className="mt-2 pt-2 border-t border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Locked</span>
                <span className="text-xs font-medium text-gray-700">
                  ₹{wallet.lockedAmount?.toLocaleString('en-IN') || '0'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && !wallet && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-xs text-gray-500">Loading wallet...</div>
        </div>
      )}

      {/* Logout / Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
