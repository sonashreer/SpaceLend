
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SpaceCard from '@/components/SpaceCard';
import AuthModal from '@/components/AuthModal';

const MyListings = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to show logged in state

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Mock listings data
  const listings = [
    {
      id: '1',
      title: 'Downtown Parking Spot',
      location: '123 Main Street, Unit 4B',
      price: 25,
      rating: 4.8,
      reviewCount: 127,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      totalEarnings: 2300
    },
    {
      id: '2',
      title: 'Storage Unit in Midtown',
      location: '456 Oak Avenue, Building C',
      price: 40,
      rating: 4.9,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      totalEarnings: 1800
    },
    {
      id: '3',
      title: 'Event Space in Arts District',
      location: '789 Elm Street, Loft 2A',
      price: 150,
      rating: 4.7,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      totalEarnings: 3500
    },
    {
      id: '4',
      title: 'Residential Parking Spot',
      location: '101 Pine Lane, Spot 15',
      price: 20,
      rating: 4.6,
      reviewCount: 32,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      totalEarnings: 1200
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your listings</h1>
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
      />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">My Listings</h1>
              <p className="text-gray-600">Manage your rental spaces and track performance</p>
            </div>
            <Link to="/list-space">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add new listing
              </Button>
            </Link>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <SpaceCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                location={listing.location}
                price={listing.price}
                rating={listing.rating}
                reviewCount={listing.reviewCount}
                image={listing.image}
                showEarnings={true}
                totalEarnings={listing.totalEarnings}
              />
            ))}
          </div>

          {/* Empty State */}
          {listings.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
              <p className="text-gray-600 mb-6">Start earning by listing your first space</p>
              <Link to="/list-space">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Create your first listing
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
