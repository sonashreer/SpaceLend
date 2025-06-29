
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  userAvatar?: string;
  onListSpace?: () => void;
  userEmail?: string;
}

const Header = ({ isLoggedIn = false, onLogin, onLogout, userAvatar, onListSpace, userEmail }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sophia Carter's avatar - updated profile pic
  const defaultAvatar = "/lovable-uploads/43608ed6-2ced-42a2-89da-0612cfd5766f.png";

  const handleListSpace = () => {
    if (onListSpace) {
      onListSpace();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with New Image */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/31401a05-e202-44df-b450-17dbd7b60472.png" 
              alt="SpaceLend Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">SpaceLend</span>
          </Link>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {/* List Your Space Link */}
            <Button 
              onClick={handleListSpace}
              variant="ghost" 
              className="hidden sm:block text-gray-700 hover:text-gray-900 font-medium"
            >
              List your space
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1 rounded-full">
                    <img
                      src={userAvatar || defaultAvatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-listings">My Listings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/earnings">Earnings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Sign in
              </Button>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
