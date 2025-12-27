import React from 'react';
import { Search, Bell, Settings, LogOut, User } from 'lucide-react';
import { APP_ROUTES } from '../../routes/appRoutes';

const AdminHeader = ({ user, onUserIconClick, onLogout }) => {
  const userName = user?.name || 'Admin';

  return (
    <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 md:px-8 border-b border-gray-200/50">
      <div className="flex items-center gap-2">
        {/* User Profile / Menu */}
        <button
          onClick={onUserIconClick}
          className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200 hover:bg-purple-200 transition-colors cursor-pointer"
          title="View Profile"
        >
          <User size={16} className="text-purple-600" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-gray-800">Hello, {userName}!</h1>
          <p className="text-[10px] text-gray-500">Admin Dashboard</p>
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
        <button className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
          <Settings size={18} className="text-gray-600" />
        </button>
        <button 
          onClick={onLogout}
          className="md:hidden p-2 rounded-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;

