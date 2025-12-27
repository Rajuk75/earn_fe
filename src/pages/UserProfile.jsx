import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Shield, Gift, Calendar, Edit } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { getUserById } from '../services/core.service';
import { APP_ROUTES } from '../routes/appRoutes';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, fetchUserData } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(APP_ROUTES.HOME);
      return;
    }

    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.userId) {
            console.log('UserProfile: Fetching user data for userId:', payload.userId);
            const response = await getUserById(payload.userId);
            if (response?.data?.user) {
              setUserData(response.data.user);
            }
          }
        } else if (user?._id) {
          const response = await getUserById(user._id);
          if (response?.data?.user) {
            setUserData(response.data.user);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">User data not found</div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-8">
      {/* Page Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(APP_ROUTES.USER_DASHBOARD)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <User size={32} className="text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{userData.name || 'User'}</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {userData.userType === 'admin' ? 'Administrator' : 'User'}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User size={18} className="text-gray-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Mail size={20} className="text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{userData.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="text-gray-900 font-medium">{userData.mobile || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Shield size={20} className="text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">User Type</p>
                    <p className="text-gray-900 font-medium capitalize">{userData.userType || 'User'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Information */}
            {userData.referralCode && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Gift size={18} className="text-gray-600" />
                  Referral Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Gift size={20} className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Referral Code</p>
                      <p className="text-gray-900 font-medium font-mono">{userData.referralCode}</p>
                    </div>
                  </div>

                  {userData.referredBy && (
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <User size={20} className="text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Referred By</p>
                        <p className="text-gray-900 font-medium">{userData.referredBy}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={18} className="text-gray-600" />
                Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${userData.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className="text-gray-700">Account Status</span>
                  </div>
                  <span className={`font-medium ${userData.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                    {userData.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${userData.isDeleted ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className="text-gray-700">Account Deleted</span>
                  </div>
                  <span className={`font-medium ${userData.isDeleted ? 'text-red-600' : 'text-green-600'}`}>
                    {userData.isDeleted ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Dates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-gray-600" />
                Account Dates
              </h3>
              <div className="space-y-4">
                {userData.createdAt && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar size={20} className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(userData.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {userData.updatedAt && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar size={20} className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(userData.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

