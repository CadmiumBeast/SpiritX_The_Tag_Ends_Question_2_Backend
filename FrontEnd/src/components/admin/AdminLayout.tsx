import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../store/adminStore';
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Trophy,
  LogOut,
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const setAuthenticated = useAdminStore((state) => state.setAuthenticated);

  const handleLogout = async () => {
    try {
        // Call the Laravel API to logout
        const response = await fetch('http://127.0.0.1:8000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            // Clear localStorage or session storage
            localStorage.removeItem('token');
            setAuthenticated(false);
            navigate('/admin/auth');
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Tournament Summary',
      path: '/admin',
    },
    {
      icon: Users,
      label: 'Players',
      path: '/admin/players',
    },
    {
      icon: BarChart2,
      label: 'Player Stats',
      path: '/admin/player-stats',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800/50">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </span>
          </div>
        </div>

        <nav className="px-4 py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors w-full px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;