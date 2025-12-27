import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/dashboard/HeroBanner';
import CategoryRow from '../components/dashboard/CategoryRow';
import FeaturedOffersGrid from '../components/dashboard/FeaturedOffersGrid';
import { isAuthenticated } from '../utils/auth';
import { useUser } from '../context/UserContext';
import { APP_ROUTES } from '../routes/appRoutes';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, fetchUserData } = useUser();

  useEffect(() => {
    // Check if token exists, if not redirect to home
    if (!isAuthenticated()) {
      navigate(APP_ROUTES.HOME);
      return;
    }
    
    // If user data not loaded, fetch it
    if (!user) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.userId) {
            console.log('UserDashboard: Fetching user data for userId:', payload.userId);
            fetchUserData(payload.userId);
          }
        } catch (error) {
          console.error('UserDashboard: Error decoding token:', error);
        }
      }
    } else if (user.userType === 'admin') {
      // If user is admin, redirect to admin dashboard
      navigate(APP_ROUTES.ADMIN_DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

  // If not authenticated, don't render dashboard
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      {/* Banner Section */}
      <HeroBanner />

      {/* Categories Section */}
      <section className="mb-6">
        <CategoryRow />
      </section>

      {/* Offers Section */}
      <FeaturedOffersGrid />
    </>
  );
};

export default UserDashboard;

