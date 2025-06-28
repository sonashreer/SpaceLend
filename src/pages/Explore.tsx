
import React, { useState } from 'react';
import { Search, Filter, Map, List as ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import SpaceCard from '@/components/SpaceCard';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('90210');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [priceFilter, setPriceFilter] = useState('');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState('');

  // Mock data for spaces
  const spaces = [
    {
      id: '1',
      title: 'Secure Downtown Parking',
      location: '123 Main St, Beverly Hills',
      price: 25,
      rating: 4.8,
      reviewCount: 127,
      distance: '0.5 miles',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'
    },
    {
      id: '2', 
      title: 'Covered Garage Space',
      location: '456 Oak Ave, West Hollywood',
      price: 35,
      rating: 4.9,
      reviewCount: 89,
      distance: '1.2 miles',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'Event Space Downtown',
      location: '789 Pine St, Los Angeles',
      price: 150,
      rating: 4.7,
      reviewCount: 45,
      distance: '2.1 miles',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    }
  ];

  const handleBooking = (spaceId: string) => {
    console.log('Booking space:', spaceId);
    // Navigate to booking page or show booking modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter location (ZIP code, city, etc.)"
                  className="pl-10 pr-4 py-2"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={spaceTypeFilter} onValueChange={setSpaceTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Space Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="parking">Parking</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="event">Event Space</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="0-25">$0 - $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100+">$100+</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <ListIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="rounded-none"
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Spaces near {searchQuery}</h1>
            <p className="text-gray-600">{spaces.length} spaces available</p>
          </div>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                id={space.id}
                title={space.title}
                location={space.location}
                price={space.price}
                rating={space.rating}
                reviewCount={space.reviewCount}
                distance={space.distance}
                image={space.image}
                onBook={() => handleBooking(space.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Map View</h3>
            <p className="text-gray-600">Interactive map would be displayed here showing all available spaces</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
