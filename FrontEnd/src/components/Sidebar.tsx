import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutGrid, 
  Users, 
  UserPlus,
  Trophy,
  DollarSign,
  MessageSquare,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Players', path: '/players' },
    { icon: UserPlus, label: 'Team Selection', path: '/team-selection' },
    { icon: Shield, label: 'Team', path: '/team' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: DollarSign, label: 'Budget', path: '/budget' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary rounded-lg text-white shadow-glow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Decorative background layers */}
        <div className="absolute inset-0 bg-white/10 dark:bg-dark-card/50 backdrop-blur-xl border-r border-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[length:30px_30px] opacity-10" />

        {/* Content layer - above decorative elements */}
        <div className="relative h-full flex flex-col z-10">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl 
                flex items-center justify-center shadow-glow transform hover:scale-105 transition-transform duration-200">
                <span className="text-xl font-bold text-white cyber-text">S</span>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                from-white to-primary-light dark:from-primary-light dark:to-white cyber-text">
                Spirit11
              </h1>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/' && location.pathname === '/');
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center px-4 py-3 mb-2 rounded-xl text-gray-400 
                    hover:text-white transition-all duration-200 group
                    ${isActive ? 'text-white' : ''}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Background highlight */}
                  <div className={`
                    absolute inset-0 rounded-xl transition-opacity duration-200
                    ${isActive ? 'bg-primary/20 opacity-100' : 'bg-primary/10 opacity-0 group-hover:opacity-100'}
                  `} />

                  {/* Content */}
                  <div className="relative flex items-center z-10">
                    <div className={`
                      w-8 h-8 flex items-center justify-center rounded-lg mr-3
                      ${isActive ? 'bg-primary text-white shadow-glow' : 'bg-primary/10 text-primary-light'}
                      group-hover:bg-primary group-hover:text-white transition-all duration-200
                    `}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium cyber-text">{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-6">
            <div className="relative p-4 rounded-xl overflow-hidden">
              {/* Profile card background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent backdrop-blur-sm" />
              
              {/* Profile content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark 
                    flex items-center justify-center shadow-glow">
                    <span className="text-white font-bold cyber-text">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white cyber-text">John Doe</p>
                    <p className="text-xs text-primary-light">Premium User</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className="w-8 h-8 flex items-center justify-center rounded-lg 
                    bg-primary/10 text-primary-light hover:bg-primary hover:text-white 
                    transition-all duration-200"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;