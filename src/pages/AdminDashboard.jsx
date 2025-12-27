import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Wallet, TrendingUp, Activity, 
  UserCheck, UserX, DollarSign, BarChart3,
  Settings, UserPlus, X, Plus
} from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { getAllUsers, createAdmin, createOffer } from '../services/core.service';
import { APP_ROUTES } from '../routes/appRoutes';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [createAdminLoading, setCreateAdminLoading] = useState(false);
  const [createAdminError, setCreateAdminError] = useState('');
  const [createAdminForm, setCreateAdminForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

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

    loadDashboardData();
  }, [navigate, user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all users for stats
      const response = await getAllUsers({ page: 1, limit: 100 });
      if (response?.data?.users) {
        const users = response.data.users;
        const totalUsers = users.length;
        const activeUsers = users.filter(u => !u.isBlocked && !u.isDeleted).length;
        const blockedUsers = users.filter(u => u.isBlocked).length;
        
        setStats({
          totalUsers,
          activeUsers,
          blockedUsers,
          totalRevenue: 0, // Can be calculated from transactions later
        });

        // Get recent 5 users
        setRecentUsers(users.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setCreateAdminError('');
    setCreateAdminLoading(true);

    try {
      const response = await createAdmin(createAdminForm);
      if (response.status === 'success') {
        // Reset form
        setCreateAdminForm({
          name: '',
          mobile: '',
          email: '',
          password: '',
        });
        setShowCreateAdminModal(false);
        // Reload dashboard data
        await loadDashboardData();
        alert('Admin created successfully!');
      }
    } catch (error) {
      setCreateAdminError(error.message || 'Failed to create admin');
    } finally {
      setCreateAdminLoading(false);
    }
  };

  const handleCreateAdminFormChange = (e) => {
    setCreateAdminForm({
      ...createAdminForm,
      [e.target.name]: e.target.value,
    });
    setCreateAdminError('');
  };

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

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Blocked Users',
      value: stats.blockedUsers,
      icon: UserX,
      color: 'bg-red-500',
      change: '-2%',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+15%',
    },
  ];

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
        <button
          onClick={() => setShowCreateAdminModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <UserPlus size={18} />
          <span className="hidden md:inline">Create Admin</span>
        </button>
      </div>

      {/* Main Content */}
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <Icon size={24} className={`${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <button
              onClick={() => navigate(APP_ROUTES.ADMIN_USERS)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.mobile}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.isBlocked
                              ? 'bg-red-100 text-red-800'
                              : user.isDeleted
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.isBlocked ? 'Blocked' : user.isDeleted ? 'Deleted' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

      {/* Create Admin Modal */}
      {showCreateAdminModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New Admin</h2>
              <button
                onClick={() => {
                  setShowCreateAdminModal(false);
                  setCreateAdminError('');
                  setCreateAdminForm({
                    name: '',
                    mobile: '',
                    email: '',
                    password: '',
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="p-6 space-y-4">
              {createAdminError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {createAdminError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={createAdminForm.name}
                  onChange={handleCreateAdminFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={createAdminForm.mobile}
                  onChange={handleCreateAdminFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={createAdminForm.email}
                  onChange={handleCreateAdminFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={createAdminForm.password}
                  onChange={handleCreateAdminFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateAdminModal(false);
                    setCreateAdminError('');
                    setCreateAdminForm({
                      name: '',
                      mobile: '',
                      email: '',
                      password: '',
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createAdminLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createAdminLoading ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

