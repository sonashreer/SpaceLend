
import React, { useState } from 'react';
import { DollarSign, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AuthModal from '@/components/AuthModal';

const Dashboard = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to show logged in state

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const dashboardStats = [
    { title: 'Total Earnings', value: '$2,840', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Bookings', value: '12', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Messages', value: '3', icon: MessageSquare, color: 'bg-purple-500' },
    { title: 'Views This Week', value: '47', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const recentBookings = [
    { id: 1, space: 'Downtown Parking Spot', guest: 'John Doe', dates: 'Dec 28-30', amount: '$75' },
    { id: 2, space: 'Storage Unit', guest: 'Jane Smith', dates: 'Dec 25-28', amount: '$120' },
    { id: 3, space: 'Event Space', guest: 'Mike Johnson', dates: 'Dec 22', amount: '$200' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          isLoggedIn={isLoggedIn}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your dashboard</h1>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        userAvatar="/lovable-uploads/43608ed6-2ced-42a2-89da-0612cfd5766f.png"
      />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your spaces.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h2>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{booking.space}</p>
                      <p className="text-sm text-gray-600">{booking.guest} • {booking.dates}</p>
                    </div>
                    <span className="font-semibold text-green-600">{booking.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">Add New Listing</span>
                  <p className="text-sm text-gray-600">List a new space to rent</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">Update Calendar</span>
                  <p className="text-sm text-gray-600">Manage your availability</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">View Messages</span>
                  <p className="text-sm text-gray-600">Respond to guest inquiries</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
