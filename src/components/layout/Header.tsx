
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Menu } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onListSpace: () => void;
  userAvatar?: string;
}

const Header = ({ isLoggedIn, onLogin, onLogout, onListSpace, userAvatar }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/31401a05-e202-44df-b450-17dbd7b60472.png" 
              alt="SpaceLend Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900">SpaceLend</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-gray-700 hover:text-gray-900 font-medium">
              Explore
            </Link>
            <Button variant="outline" onClick={onListSpace}>
              List Your Space
            </Button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-600" />
                  )}
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={onLogin}>
                Login
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
