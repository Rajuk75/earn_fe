import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, TrendingUp, Activity, 
  DollarSign, BarChart3,
  Settings, X, Plus
} from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { createOffer } from '../services/core.service';
import { APP_ROUTES } from '../routes/appRoutes';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();
  const [loading, setLoading] = useState(true);

  // Create Offer Modal State
  const [showCreateOfferModal, setShowCreateOfferModal] = useState(false);
  const [createOfferLoading, setCreateOfferLoading] = useState(false);
  const [createOfferError, setCreateOfferError] = useState('');
  const [createOfferForm, setCreateOfferForm] = useState({
    name: '',
    description: '',
    amount: '',
    logo: '',
    logoColor: 'bg-blue-500',
    logoText: '',
    providerUrl: '',
    webhookSecret: '',
    webhookUrl: '',
    posthookUrl: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(APP_ROUTES.HOME);
      return;
    }

    // Check if user is admin
    if (user?.userType !== 'admin') {
      navigate(APP_ROUTES.USER_DASHBOARD);
      return;
    }

    // Simple loading state - APIs will be added later
    setLoading(false);
  }, [navigate, user]);

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    setCreateOfferError('');
    setCreateOfferLoading(true);

    try {
      const offerData = {
        name: createOfferForm.name,
        description: createOfferForm.description || undefined,
        amount: parseFloat(createOfferForm.amount),
        logo: createOfferForm.logo || undefined,
        logoColor: createOfferForm.logoColor,
        logoText: createOfferForm.logoText || undefined,
        providerUrl: createOfferForm.providerUrl || undefined,
        webhookSecret: createOfferForm.webhookSecret || undefined,
        webhookUrl: createOfferForm.webhookUrl || undefined,
        posthookUrl: createOfferForm.posthookUrl || undefined,
        isActive: createOfferForm.isActive,
        order: parseInt(createOfferForm.order) || 0,
      };

      const response = await createOffer(offerData);
      if (response.status === 'success') {
        // Reset form
        setCreateOfferForm({
          name: '',
          description: '',
          amount: '',
          logo: '',
          logoColor: 'bg-blue-500',
          logoText: '',
          providerUrl: '',
          webhookSecret: '',
          webhookUrl: '',
          posthookUrl: '',
          isActive: true,
          order: 0,
        });
        setShowCreateOfferModal(false);
        alert('Offer created successfully!');
      }
    } catch (error) {
      setCreateOfferError(error.message || 'Failed to create offer');
    } finally {
      setCreateOfferLoading(false);
    }
  };

  const handleCreateOfferFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateOfferForm({
      ...createOfferForm,
      [name]: type === 'checkbox' ? checked : value,
    });
    setCreateOfferError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!user || user.userType !== 'admin') {
    return null;
  }

  return (
    <>
      {/* Action Buttons */}
      <div className="mb-6 flex justify-end gap-3">
        <button
          onClick={() => setShowCreateOfferModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          <span className="hidden md:inline">Create Offer</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your platform from here.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <button
            onClick={() => navigate(APP_ROUTES.ADMIN_USERS)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <Users size={32} className="text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage all users</p>
          </button>

          <button
            onClick={() => navigate(APP_ROUTES.ADMIN_TRANSACTIONS)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <BarChart3 size={32} className="text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Transactions</h3>
            <p className="text-sm text-gray-600">View all transactions</p>
          </button>

          <button
            onClick={() => navigate(APP_ROUTES.ADMIN_SETTINGS)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <Settings size={32} className="text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Settings</h3>
            <p className="text-sm text-gray-600">Configure system settings</p>
          </button>
        </div>
      </div>

      {/* Create Offer Modal */}
      {showCreateOfferModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New Offer</h2>
              <button
                onClick={() => {
                  setShowCreateOfferModal(false);
                  setCreateOfferError('');
                  setCreateOfferForm({
                    name: '',
                    description: '',
                    amount: '',
                    logo: '',
                    logoColor: 'bg-blue-500',
                    logoText: '',
                    posthookUrl: '',
                    isActive: true,
                    order: 0,
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="p-6 space-y-4">
              {createOfferError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {createOfferError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={createOfferForm.name}
                    onChange={handleCreateOfferFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Xm Trade"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={createOfferForm.description}
                    onChange={handleCreateOfferFormChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter offer description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={createOfferForm.amount}
                    onChange={handleCreateOfferFormChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="2000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={createOfferForm.order}
                    onChange={handleCreateOfferFormChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={createOfferForm.logo}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Color (Tailwind class)
                  </label>
                  <input
                    type="text"
                    name="logoColor"
                    value={createOfferForm.logoColor}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="bg-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Text
                  </label>
                  <input
                    type="text"
                    name="logoText"
                    value={createOfferForm.logoText}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="XM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provider URL
                  </label>
                  <input
                    type="url"
                    name="providerUrl"
                    value={createOfferForm.providerUrl}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://provider.com/offer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Where user will be redirected with clickId</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook Secret
                  </label>
                  <input
                    type="text"
                    name="webhookSecret"
                    value={createOfferForm.webhookSecret}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Secret key for webhook verification"
                  />
                  <p className="text-xs text-gray-500 mt-1">Secret for verifying webhook requests from provider</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    name="webhookUrl"
                    value={createOfferForm.webhookUrl}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yourapi.com/v1/offer/webhook"
                  />
                  <p className="text-xs text-gray-500 mt-1">Reference URL for provider (documentation purpose)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posthook URL
                  </label>
                  <input
                    type="url"
                    name="posthookUrl"
                    value={createOfferForm.posthookUrl}
                    onChange={handleCreateOfferFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/webhook"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL to notify external systems after completion</p>
                </div>

                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={createOfferForm.isActive}
                    onChange={handleCreateOfferFormChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Active (Offer will be visible to users)
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateOfferModal(false);
                    setCreateOfferError('');
                    setCreateOfferForm({
                      name: '',
                      description: '',
                      amount: '',
                      logo: '',
                      logoColor: 'bg-blue-500',
                      logoText: '',
                      providerUrl: '',
                      webhookSecret: '',
                      webhookUrl: '',
                      posthookUrl: '',
                      isActive: true,
                      order: 0,
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createOfferLoading}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createOfferLoading ? 'Creating...' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

