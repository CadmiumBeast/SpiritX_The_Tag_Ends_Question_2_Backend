import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen">
        <header className="p-6 border-b border-gray-200 dark:border-gray-800/50 bg-white dark:bg-dark-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back 👋</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your team today.</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-64 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-lighter border border-gray-200 dark:border-gray-800/50 text-gray-900 dark:text-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;