import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Activity, Settings, Shield } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { getAdminSidebarItems } from '../../config/navigationConfig';

const AdminSidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // Get navigation items from centralized config
  const navItems = getAdminSidebarItems().map(item => ({
    ...item,
    active: location.pathname === item.path,
    onClick: () => navigate(item.path),
  }));

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 p-6 z-50">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Admin Info */}
      {user && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">{user.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      )}

      {/* Logout / Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

