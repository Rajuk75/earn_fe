import UserDashboard from '../pages/UserDashboard';
import UserProfile from '../pages/UserProfile';
import WalletPage from '../pages/Wallet';
import Leaderboards from '../pages/Leaderboards';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminOffers from '../pages/AdminOffers';
import AdminTrackings from '../pages/AdminTrackings';
import AdminAnalytics from '../pages/AdminAnalytics';
import { APP_ROUTES } from '../routes/appRoutes';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Centralized Routes Configuration
export const routesConfig = {
  // Public Routes (no layout)
  public: [
    {
      path: APP_ROUTES.HOME,
      element: null, // Home is handled separately in App.jsx
      requiresAuth: false,
    },
  ],

  // User Routes (with UserLayout)
  user: [
    {
      path: APP_ROUTES.USER_DASHBOARD,
      element: UserDashboard,
      requiresAuth: true,
      userTypes: ['user'],
    },
    {
      path: APP_ROUTES.USER_PROFILE,
      element: UserProfile,
      requiresAuth: true,
      userTypes: ['user', 'admin'],
    },
    {
      path: APP_ROUTES.USER_WALLET,
      element: WalletPage,
      requiresAuth: true,
      userTypes: ['user', 'admin'],
    },
    {
      path: APP_ROUTES.LEADERBOARDS,
      element: Leaderboards,
      requiresAuth: true,
      userTypes: ['user', 'admin'],
    },
  ],

  // Admin Routes (with AdminLayout)
  admin: [
    {
      path: APP_ROUTES.ADMIN_DASHBOARD,
      element: AdminDashboard,
      requiresAuth: true,
      userTypes: ['admin'],
    },
    {
      path: APP_ROUTES.ADMIN_USERS,
      element: AdminUsers,
      requiresAuth: true,
      userTypes: ['admin'],
    },
    {
      path: APP_ROUTES.ADMIN_OFFERS,
      element: AdminOffers,
      requiresAuth: true,
      userTypes: ['admin'],
    },
    {
      path: APP_ROUTES.ADMIN_TRACKINGS,
      element: AdminTrackings,
      requiresAuth: true,
      userTypes: ['admin'],
    },
    {
      path: APP_ROUTES.ADMIN_ANALYTICS,
      element: AdminAnalytics,
      requiresAuth: true,
      userTypes: ['admin'],
    },
    {
      path: APP_ROUTES.ADMIN_TRANSACTIONS,
      element: null, // To be created
      requiresAuth: true,
      userTypes: ['admin'],
    },
    {
      path: APP_ROUTES.ADMIN_SETTINGS,
      element: null, // To be created
      requiresAuth: true,
      userTypes: ['admin'],
    },
  ],
};

// Helper function to get all routes for a layout
export const getUserRoutes = () => {
  return routesConfig.user;
};

export const getAdminRoutes = () => {
  return routesConfig.admin;
};

export const getPublicRoutes = () => {
  return routesConfig.public;
};

