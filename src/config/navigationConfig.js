import { Home, Banknote, Trophy, HelpCircle, LayoutDashboard, Users, Activity, Settings, Gift, BarChart3, TrendingUp } from 'lucide-react';
import { APP_ROUTES } from '../routes/appRoutes';

// Centralized Navigation Configuration
export const navigationConfig = {
  // User Navigation Items
  user: [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      path: APP_ROUTES.USER_DASHBOARD,
      showInSidebar: true,
      showInBottomNav: true,
    },
    {
      id: 'earnings',
      icon: Banknote,
      label: 'Earnings',
      path: APP_ROUTES.USER_WALLET,
      showInSidebar: true,
      showInBottomNav: true,
    },
    {
      id: 'leaderboards',
      icon: Trophy,
      label: 'Leaderboards',
      path: APP_ROUTES.LEADERBOARDS,
      showInSidebar: true,
      showInBottomNav: true,
    },
    {
      id: 'how-it-works',
      icon: HelpCircle,
      label: 'How it works?',
      path: APP_ROUTES.HOW_IT_WORKS,
      showInSidebar: true,
      showInBottomNav: true,
    },
  ],
  
  // Admin Navigation Items
  admin: [
    {
      id: 'admin-dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: APP_ROUTES.ADMIN_DASHBOARD,
      showInSidebar: true,
      showInBottomNav: false,
    },
    {
      id: 'admin-users',
      icon: Users,
      label: 'Manage Users',
      path: APP_ROUTES.ADMIN_USERS,
      showInSidebar: true,
      showInBottomNav: false,
    },
    {
      id: 'admin-offers',
      icon: Gift,
      label: 'Manage Offers',
      path: APP_ROUTES.ADMIN_OFFERS,
      showInSidebar: true,
      showInBottomNav: false,
    },
    {
      id: 'admin-trackings',
      icon: Activity,
      label: 'Trackings',
      path: APP_ROUTES.ADMIN_TRACKINGS,
      showInSidebar: true,
      showInBottomNav: false,
    },
    {
      id: 'admin-analytics',
      icon: BarChart3,
      label: 'Analytics',
      path: APP_ROUTES.ADMIN_ANALYTICS,
      showInSidebar: true,
      showInBottomNav: false,
    },
    {
      id: 'admin-transactions',
      icon: TrendingUp,
      label: 'Transactions',
      path: APP_ROUTES.ADMIN_TRANSACTIONS,
      showInSidebar: true,
      showInBottomNav: false,
    },
    {
      id: 'admin-settings',
      icon: Settings,
      label: 'Settings',
      path: APP_ROUTES.ADMIN_SETTINGS,
      showInSidebar: true,
      showInBottomNav: false,
    },
  ],
};

// Helper function to get navigation items for a user type
export const getNavigationItems = (userType = 'user') => {
  return navigationConfig[userType] || navigationConfig.user;
};

// Helper function to get sidebar items
export const getSidebarItems = (userType = 'user') => {
  return getNavigationItems(userType).filter(item => item.showInSidebar);
};

// Helper function to get bottom nav items
export const getBottomNavItems = (userType = 'user') => {
  return getNavigationItems(userType).filter(item => item.showInBottomNav);
};

// Helper function to get admin sidebar items
export const getAdminSidebarItems = () => {
  return navigationConfig.admin.filter(item => item.showInSidebar);
};

