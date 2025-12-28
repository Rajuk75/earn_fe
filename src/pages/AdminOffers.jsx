import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, X, Check, XCircle } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { getAllOffers, createOffer, updateOffer, deleteOffer } from '../services/core.service';
import { APP_ROUTES } from '../routes/appRoutes';

const AdminOffers = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
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
    if (!isAuthenticated() || user?.userType !== 'admin') {
      navigate(APP_ROUTES.ADMIN_DASHBOARD);
      return;
    }
    loadOffers();
  }, [navigate, user]);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const response = await getAllOffers();
      if (response?.data?.offers) {
        setOffers(response.data.offers);
      }
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (offer = null) => {
    if (offer) {
      setEditingOffer(offer);
      setFormData({
        name: offer.name || '',
        description: offer.description || '',
        amount: offer.amount?.toString() || '',
        logo: offer.logo || '',
        logoColor: offer.logoColor || 'bg-blue-500',
        logoText: offer.logoText || '',
        providerUrl: offer.providerUrl || '',
        webhookSecret: offer.webhookSecret || '',
        webhookUrl: offer.webhookUrl || '',
        posthookUrl: offer.posthookUrl || '',
        isActive: offer.isActive !== undefined ? offer.isActive : true,
        order: offer.order || 0,
      });
    } else {
      setEditingOffer(null);
      setFormData({
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
    }
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOffer(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        order: parseInt(formData.order),
      };

      if (editingOffer) {
        await updateOffer(editingOffer._id, payload);
      } else {
        await createOffer(payload);
      }

      await loadOffers();
      handleCloseModal();
    } catch (error) {
      setError(error.message || 'Failed to save offer');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) {
      return;
    }

    try {
      await deleteOffer(offerId);
      await loadOffers();
    } catch (error) {
      alert(error.message || 'Failed to delete offer');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading offers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Offers</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage offers</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={20} />
            <span>Create Offer</span>
          </button>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{offer.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">₹{offer.amount?.toLocaleString('en-IN')}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  offer.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {offer.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              {offer.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{offer.description}</p>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOpenModal(offer)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No offers found. Create your first offer!</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter offer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
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
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter reward amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Display order"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter logo image URL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Color (Tailwind class)</label>
                <input
                  type="text"
                  name="logoColor"
                  value={formData.logoColor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., bg-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Text</label>
                <input
                  type="text"
                  name="logoText"
                  value={formData.logoText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., XM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider URL</label>
                <input
                  type="text"
                  name="providerUrl"
                  value={formData.providerUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://provider.com/offer"
                />
                <p className="text-xs text-gray-500 mt-1">Where user will be redirected with clickId</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Secret</label>
                <input
                  type="text"
                  name="webhookSecret"
                  value={formData.webhookSecret}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Secret key for webhook verification"
                />
                <p className="text-xs text-gray-500 mt-1">Secret for verifying webhook requests from provider</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="text"
                  name="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://yourapi.com/v1/offer/webhook"
                />
                <p className="text-xs text-gray-500 mt-1">Reference URL for provider (documentation purpose)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posthook URL</label>
                <input
                  type="text"
                  name="posthookUrl"
                  value={formData.posthookUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter posthook URL"
                />
                <p className="text-xs text-gray-500 mt-1">URL to notify external systems after completion</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  id="isActive"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Is Active
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? 'Saving...' : editingOffer ? 'Update Offer' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;

