// Application Routes Configuration
export const APP_ROUTES = {
  // Public Routes
  HOME: '/',
  
  // User Routes
  USER_DASHBOARD: '/user-dashboard',
  USER_PROFILE: '/profile',
  USER_WALLET: '/wallet',
  
  // Admin Routes
  ADMIN_DASHBOARD: '/admin-dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Other Routes
  LEADERBOARDS: '/leaderboards',
  HOW_IT_WORKS: '/how-it-works',
};

// Route configuration with metadata
export const routeConfig = {
  [APP_ROUTES.HOME]: {
    name: 'Home',
    requiresAuth: false,
    layout: 'public',
  },
  [APP_ROUTES.USER_DASHBOARD]: {
    name: 'Dashboard',
    requiresAuth: true,
    layout: 'user',
    userTypes: ['user'],
  },
  [APP_ROUTES.USER_PROFILE]: {
    name: 'Profile',
    requiresAuth: true,
    layout: 'user',
    userTypes: ['user', 'admin'],
  },
  [APP_ROUTES.USER_WALLET]: {
    name: 'Wallet',
    requiresAuth: true,
    layout: 'user',
    userTypes: ['user', 'admin'],
  },
  [APP_ROUTES.LEADERBOARDS]: {
    name: 'Leaderboards',
    requiresAuth: true,
    layout: 'user',
    userTypes: ['user', 'admin'],
  },
  [APP_ROUTES.HOW_IT_WORKS]: {
    name: 'How it Works',
    requiresAuth: false,
    layout: 'public',
  },
  [APP_ROUTES.ADMIN_DASHBOARD]: {
    name: 'Admin Dashboard',
    requiresAuth: true,
    layout: 'admin',
    userTypes: ['admin'],
  },
  [APP_ROUTES.ADMIN_USERS]: {
    name: 'Manage Users',
    requiresAuth: true,
    layout: 'admin',
    userTypes: ['admin'],
  },
  [APP_ROUTES.ADMIN_TRANSACTIONS]: {
    name: 'Transactions',
    requiresAuth: true,
    layout: 'admin',
    userTypes: ['admin'],
  },
  [APP_ROUTES.ADMIN_SETTINGS]: {
    name: 'Settings',
    requiresAuth: true,
    layout: 'admin',
    userTypes: ['admin'],
  },
};

// Helper function to get route config
export const getRouteConfig = (path) => {
  return routeConfig[path] || null;
};

// Helper function to check if route requires auth
export const requiresAuth = (path) => {
  const config = getRouteConfig(path);
  return config?.requiresAuth || false;
};

// Helper function to check if user can access route
export const canAccessRoute = (path, userType) => {
  const config = getRouteConfig(path);
  if (!config) return false;
  if (!config.requiresAuth) return true;
  if (!config.userTypes) return true;
  return config.userTypes.includes(userType);
};

