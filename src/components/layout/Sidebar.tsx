
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  List, 
  MessageSquare, 
  DollarSign, 
  Settings,
  User 
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: List, label: 'My Listings', path: '/my-listings' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: DollarSign, label: 'Earnings', path: '/earnings' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  userAvatar?: string;
  userName?: string;
}

const Sidebar = ({ userAvatar, userName = "Sophia Carter" }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{userName}</h3>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
