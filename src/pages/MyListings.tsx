
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SpaceCard from '@/components/SpaceCard';
import AuthModal from '@/components/AuthModal';

const MyListings = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [listings, setListings] = useState<any[]>([]);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDeleteListing = (listingId: string) => {
    setListings(listings.filter(listing => listing.id !== listingId));
    // Also remove from localStorage if it exists there
    const savedListings = JSON.parse(localStorage.getItem('myListings') || '[]');
    const filteredSaved = savedListings.filter((listing: any) => listing.id !== listingId);
    localStorage.setItem('myListings', JSON.stringify(filteredSaved));
  };

  useEffect(() => {
    // Load listings from localStorage
    const savedListings = JSON.parse(localStorage.getItem('myListings') || '[]');
    
    // Default fake listings with 5 items
    const defaultListings = [
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
        title: 'Garage Space in Hollywood',
        location: '789 Sunset Blvd, Hollywood, CA',
        price: 35,
        rating: 4.7,
        reviewCount: 64,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
        totalEarnings: 1450
      },
      {
        id: '4',
        title: 'Warehouse Storage Space',
        location: '321 Industrial Ave, LA, CA',
        price: 60,
        rating: 4.6,
        reviewCount: 42,
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        totalEarnings: 2100
      },
      {
        id: '5',
        title: 'Private Driveway Parking',
        location: '654 Residential St, Beverly Hills, CA',
        price: 30,
        rating: 4.9,
        reviewCount: 156,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
        totalEarnings: 1950
      }
    ];
    
    // Combine fake listings with user's saved listings
    const allListings = [...defaultListings, ...savedListings];
    setListings(allListings);
  }, []);

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
        userAvatar="/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png"
      />
      
      <div className="flex">
        <Sidebar 
          userAvatar="/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png"
          userName="Sophia Carter"
        />
        
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
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="relative">
                  <SpaceCard
                    id={listing.id}
                    title={listing.title}
                    location={listing.location}
                    price={listing.price}
                    rating={parseFloat(listing.rating)}
                    reviewCount={listing.reviewCount}
                    image={listing.image}
                    showEarnings={true}
                    totalEarnings={listing.totalEarnings || 0}
                  />
                  <Button
                    onClick={() => handleDeleteListing(listing.id)}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
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
