
import React, { useState, useEffect } from 'react';
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
import { useSearchParams } from 'react-router-dom';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [priceFilter, setPriceFilter] = useState('');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Default mock listings - always show these 5
  const mockListings = [
    {
      id: '1',
      title: 'Secure Downtown Garage',
      location: '123 Main St, Beverly Hills',
      price: 35,
      rating: 4.8,
      reviewCount: 127,
      distance: '0.5 miles',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      type: 'garage'
    },
    {
      id: '2', 
      title: 'Private Driveway Spot',
      location: '456 Oak Ave, West Hollywood',
      price: 25,
      rating: 4.9,
      reviewCount: 89,
      distance: '1.2 miles',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      type: 'driveway'
    },
    {
      id: '3',
      title: 'Cozy Guest Room',
      location: '789 Pine St, Los Angeles',
      price: 80,
      rating: 4.7,
      reviewCount: 45,
      distance: '2.1 miles',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      type: 'room'
    },
    {
      id: '4',
      title: 'Climate Controlled Storage',
      location: '321 Elm St, Santa Monica',
      price: 45,
      rating: 4.6,
      reviewCount: 67,
      distance: '3.0 miles',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
      type: 'storage'
    },
    {
      id: '5',
      title: 'Event Space Downtown',
      location: '654 Broadway, Los Angeles',
      price: 200,
      rating: 4.9,
      reviewCount: 23,
      distance: '1.8 miles',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
      type: 'event'
    }
  ];

  // Show default listings on page load
  useEffect(() => {
    setSearchResults(mockListings);
    setHasSearched(true);
  }, []);

  const handleSearch = () => {
    // Always show the same 5 listings regardless of search query
    setSearchResults(mockListings);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredResults = searchResults.filter(space => {
    const matchesType = !spaceTypeFilter || space.type === spaceTypeFilter;
    const matchesPrice = !priceFilter || 
      (priceFilter === '0-25' && space.price <= 25) ||
      (priceFilter === '25-50' && space.price > 25 && space.price <= 50) ||
      (priceFilter === '50-100' && space.price > 50 && space.price <= 100) ||
      (priceFilter === '100+' && space.price > 100);
    
    return matchesType && matchesPrice;
  });

  // Sort listings
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });

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
              <div className="relative flex">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter location (ZIP code, city, etc.)"
                  className="pl-10 pr-4 py-2 flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={spaceTypeFilter} onValueChange={setSpaceTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Space Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="">Show All Listings</SelectItem>
                  <SelectItem value="driveway">Driveway</SelectItem>
                  <SelectItem value="garage">Garage</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="storage">Storage Unit</SelectItem>
                  <SelectItem value="event">Event Space</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="">Show All Listings</SelectItem>
                  <SelectItem value="0-25">$0 - $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100+">$100+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="More Filters" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="distance-1">Within 1 mile</SelectItem>
                  <SelectItem value="distance-5">Within 5 miles</SelectItem>
                  <SelectItem value="distance-10">Within 10 miles</SelectItem>
                  <SelectItem value="rating-4">4+ Rating</SelectItem>
                  <SelectItem value="rating-45">4.5+ Rating</SelectItem>
                  <SelectItem value="available-only">Only Available</SelectItem>
                </SelectContent>
              </Select>
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
        {hasSearched && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Available Spaces</h1>
              <p className="text-gray-600">{sortedResults.length} spaces available</p>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
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
        )}

        {/* Results */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResults.map((space) => (
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 relative">
              {/* Interactive Map View */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map View</h3>
                  <p className="text-gray-600">Map showing {sortedResults.length} available spaces</p>
                </div>
              </div>
              
              {/* Fake map markers */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
            
            {/* Map controls */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Showing {sortedResults.length} spaces on map
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  View as List
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
