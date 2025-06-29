
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AuthModal from '@/components/AuthModal';

const MyBookings = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Fake bookings data with 5 completed bookings and 1 confirmed
  const bookings = [
    {
      id: '1',
      title: 'Private Parking Spot in Downtown',
      location: '456 Oak Ave, West Hollywood, CA',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      checkIn: '2024-12-20',
      checkOut: '2024-12-22',
      totalPrice: 55,
      status: 'confirmed',
      rating: 4.9
    },
    {
      id: '2',
      title: 'Secure Downtown Garage',
      location: '123 Main St, Beverly Hills, CA',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      checkIn: '2024-12-15',
      checkOut: '2024-12-16',
      totalPrice: 40,
      status: 'completed',
      rating: 4.8
    },
    {
      id: '3',
      title: 'Hollywood Storage Unit',
      location: '789 Sunset Blvd, Hollywood, CA',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      checkIn: '2024-12-10',
      checkOut: '2024-12-12',
      totalPrice: 70,
      status: 'completed',
      rating: 4.7
    },
    {
      id: '4',
      title: 'Warehouse Space Rental',
      location: '321 Industrial Ave, LA, CA',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      checkIn: '2024-12-05',
      checkOut: '2024-12-07',
      totalPrice: 120,
      status: 'completed',
      rating: 4.6
    },
    {
      id: '5',
      title: 'Beverly Hills Driveway',
      location: '654 Residential St, Beverly Hills, CA',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      checkIn: '2024-12-01',
      checkOut: '2024-12-03',
      totalPrice: 90,
      status: 'completed',
      rating: 4.9
    }
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your bookings</h1>
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
        userAvatar="/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png"
      />
      
      <div className="flex">
        <Sidebar 
          userAvatar="/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png"
          userName="Sophia Carter"
        />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your space reservations</p>
          </div>

          {/* Bookings List */}
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex">
                  <img
                    src={booking.image}
                    alt={booking.title}
                    className="w-48 h-32 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{booking.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-900">${booking.totalPrice}</span>
                        <div className="flex space-x-2">
                          {booking.status === 'confirmed' && (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Amend
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start exploring amazing spaces to make your first booking</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore Spaces
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
