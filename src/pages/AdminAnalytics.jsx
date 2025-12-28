import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, MousePointerClick, CheckCircle, RefreshCw } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { getAnalytics } from '../services/core.service';
import { APP_ROUTES } from '../routes/appRoutes';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    offerId: '',
    userId: '',
  });

  useEffect(() => {
    if (!isAuthenticated() || user?.userType !== 'admin') {
      navigate(APP_ROUTES.ADMIN_DASHBOARD);
      return;
    }
    loadAnalytics();
  }, [navigate, user, filters]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const params = { ...filters };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key];
      });

      const response = await getAnalytics(params);
      if (response?.data?.analytics) {
        setAnalytics(response.data.analytics);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const conversionRate = analytics?.totalClicks 
    ? ((analytics.conversions / analytics.totalClicks) * 100).toFixed(2)
    : 0;

  if (loading && !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track offer performance and conversions</p>
          </div>
          <button
            onClick={loadAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Offer ID</label>
              <input
                type="text"
                name="offerId"
                value={filters.offerId}
                onChange={handleFilterChange}
                placeholder="Filter by offer ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <input
                type="text"
                name="userId"
                value={filters.userId}
                onChange={handleFilterChange}
                placeholder="Filter by user ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MousePointerClick className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Clicks</h3>
            <p className="text-3xl font-bold text-gray-900">
              {analytics?.totalClicks || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Conversions</h3>
            <p className="text-3xl font-bold text-gray-900">
              {analytics?.conversions || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h3>
            <p className="text-3xl font-bold text-gray-900">
              {conversionRate}%
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BarChart3 className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">
              ₹{analytics?.totalRevenue?.toLocaleString('en-IN') || '0'}
            </p>
          </div>
        </div>

        {/* Additional Analytics */}
        {analytics && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Offer Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Offers</span>
                    <span className="font-medium">{analytics.totalOffers || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Offers</span>
                    <span className="font-medium">{analytics.activeOffers || 0}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">User Engagement</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unique Users</span>
                    <span className="font-medium">{analytics.uniqueUsers || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Clicks per User</span>
                    <span className="font-medium">
                      {analytics.totalClicks && analytics.uniqueUsers
                        ? (analytics.totalClicks / analytics.uniqueUsers).toFixed(2)
                        : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!analytics && !loading && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;

