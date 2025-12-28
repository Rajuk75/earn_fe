import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LandingPage from './components/common/LandingPage';
import RegisterModal from './components/auth/RegisterModal';
import LoginModal from './components/auth/LoginModal';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import { isAuthenticated } from './utils/auth';
import { useUser } from './context/UserContext';
import { APP_ROUTES } from './routes/appRoutes';
import { getUserRoutes, getAdminRoutes } from './config/routesConfig';

const Home = () => {
  const navigate = useNavigate();
  const { login, fetchUserData } = useUser();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      // Check user type from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.userType === 'admin') {
            navigate(APP_ROUTES.ADMIN_DASHBOARD);
          } else {
            navigate(APP_ROUTES.USER_DASHBOARD);
          }
        } catch {
          navigate(APP_ROUTES.USER_DASHBOARD);
        }
      } else {
        navigate(APP_ROUTES.USER_DASHBOARD);
      }
    }
  }, [navigate]);

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterSuccess = async (responseData) => {
    // Response structure: { status: 'success', data: { user, wallet, message } }
    // Note: Register doesn't return token, so we need to fetch user by ID
    const data = responseData?.data || responseData;
    
    if (data.user?._id) {
      // Fetch user by ID to get complete user data
      console.log('handleRegisterSuccess: Fetching user by ID:', data.user._id);
      await fetchUserData(data.user._id);
      navigate(APP_ROUTES.USER_DASHBOARD);
    } else {
      console.warn('handleRegisterSuccess: No user ID found in response');
      navigate(APP_ROUTES.USER_DASHBOARD);
    }
  };

  const handleLoginSuccess = async (responseData) => {
    // Response structure: { status: 'success', data: { user, token, message } }
    const data = responseData?.data || responseData;
    
    if (data.token) {
      // Login returns token, so decode and fetch user data
      console.log('handleLoginSuccess: Token received, fetching user data');
      await login(data.token, data.user);
      
      // Check user type and redirect accordingly
      const userType = data.user?.userType;
      if (userType === 'admin') {
        navigate(APP_ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(APP_ROUTES.USER_DASHBOARD);
      }
    } else if (data.user?._id) {
      // If no token but user data, fetch user by ID
      console.log('handleLoginSuccess: No token, fetching user by ID:', data.user._id);
      const fetchedUserData = await fetchUserData(data.user._id);
      
      // Check user type after fetching
      if (fetchedUserData?.userType === 'admin') {
        navigate(APP_ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(APP_ROUTES.USER_DASHBOARD);
      }
    } else {
      console.warn('handleLoginSuccess: No token or user ID found');
      navigate(APP_ROUTES.USER_DASHBOARD);
    }
  };

  // If authenticated, don't show home
  if (isAuthenticated()) {
    // Check user type and redirect accordingly
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.userType === 'admin') {
          return <Navigate to={APP_ROUTES.ADMIN_DASHBOARD} replace />;
        }
      } catch {
        // Fall through to default redirect
      }
    }
    return <Navigate to={APP_ROUTES.USER_DASHBOARD} replace />;
  }

  return (
    <>
      <Navbar 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <LandingPage 
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleRegisterSuccess}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

function App() {
  // Get routes from centralized config
  const userRoutes = getUserRoutes();
  const adminRoutes = getAdminRoutes();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        
        {/* User Routes with UserLayout */}
        <Route element={<UserLayout />}>
          {userRoutes.map((route) => {
            const RouteComponent = route.element;
            if (!RouteComponent) return null;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteComponent />}
              />
            );
          })}
        </Route>
        
        {/* Admin Routes with AdminLayout */}
        <Route element={<AdminLayout />}>
          {adminRoutes.map((route) => {
            const RouteComponent = route.element;
            if (!RouteComponent) return null;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteComponent />}
              />
            );
          })}
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} />
      </Routes>
    </Router>
  );
}

export default App
