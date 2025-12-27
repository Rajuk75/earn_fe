import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import AdminHeader from '../components/dashboard/AdminHeader';
import { useUser } from '../context/UserContext';
import { isAuthenticated } from '../utils/auth';
import { APP_ROUTES } from '../routes/appRoutes';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();

  const handleLogout = () => {
    clearUser();
    navigate(APP_ROUTES.HOME);
  };

  const handleUserIconClick = () => {
    navigate(APP_ROUTES.USER_PROFILE);
  };

  // If not authenticated or not admin, don't render layout
  if (!isAuthenticated() || user?.userType !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 md:pb-0">
      {/* Desktop Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content Wrapper */}
      <div className="md:pl-64 transition-all duration-300">
        {/* Top Header */}
        <AdminHeader 
          user={user}
          onUserIconClick={handleUserIconClick}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="px-4 md:px-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

