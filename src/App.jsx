import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HeroBanner from './components/HeroBanner';
import CategoryRow from './components/CategoryRow';
import FeaturedOffersGrid from './components/FeaturedOffersGrid';
import BottomNavigation from './components/BottomNavigation';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import UserProfile from './pages/UserProfile';
import WalletPage from './pages/Wallet';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { isAuthenticated, setToken } from './utils/auth';
import { useUser } from './context/UserContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, clearUser, fetchUserData } = useUser();

  useEffect(() => {
    // Check if token exists, if not redirect to home
    if (!isAuthenticated()) {
      navigate('/');
      return;
    }
    
    // If user data not loaded, fetch it
    if (!user) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.userId) {
            console.log('Dashboard: Fetching user data for userId:', payload.userId);
            fetchUserData(payload.userId);
          }
        } catch (error) {
          console.error('Dashboard: Error decoding token:', error);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  const handleUserIconClick = () => {
    // Navigate to user profile page
    navigate('/profile');
  };

  // If not authenticated, don't render dashboard
  if (!isAuthenticated()) {
    return null;
  }

  const userName = user?.name || 'User';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 md:pb-0">
      {/* Desktop Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content Wrapper */}
      <div className="md:pl-64 transition-all duration-300">
        
        {/* Top Header */}
        <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 md:px-8 border-b border-gray-200/50">
          <div className="flex items-center gap-2">
              {/* User Profile / Menu placeholder */}
              <button
                onClick={handleUserIconClick}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
                title="Refresh user data"
              >
                  <User size={16} className="text-gray-600" />
              </button>
              <div>
                  <h1 className="text-sm font-bold text-gray-800">Hello, {userName}!</h1>
                  <p className="text-[10px] text-gray-500">Welcome back</p>
              </div>
          </div>
          <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                  <Search size={18} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-white border border-gray-200 shadow-sm relative hover:bg-gray-50 transition-colors">
                  <Bell size={18} className="text-gray-600" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <button 
                onClick={handleLogout}
                className="md:hidden p-2 rounded-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
                title="Logout"
              >
                  <LogOut size={18} />
              </button>
          </div>
        </header>

        <main className="px-4 md:px-8 max-w-7xl mx-auto">
          {/* Banner Section */}
          <HeroBanner />

          {/* Categories Section */}
          <section className="mb-6">
              <CategoryRow />
          </section>

          {/* Offers Section */}
          <FeaturedOffersGrid />

        </main>
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { login, fetchUserData } = useUser();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
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
      navigate('/dashboard');
    } else {
      console.warn('handleRegisterSuccess: No user ID found in response');
      navigate('/dashboard');
    }
  };

  const handleLoginSuccess = async (responseData) => {
    // Response structure: { status: 'success', data: { user, token, message } }
    const data = responseData?.data || responseData;
    
    if (data.token) {
      // Login returns token, so decode and fetch user by ID
      console.log('handleLoginSuccess: Token received, fetching user data');
      await login(data.token, data.user);
      navigate('/dashboard');
    } else if (data.user?._id) {
      // If no token but user data, fetch user by ID
      console.log('handleLoginSuccess: No token, fetching user by ID:', data.user._id);
      await fetchUserData(data.user._id);
      navigate('/dashboard');
    } else {
      console.warn('handleLoginSuccess: No token or user ID found');
      navigate('/dashboard');
    }
  };

  // If authenticated, don't show home
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Navbar 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <LandingPage onRegisterClick={handleRegisterClick} />
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
