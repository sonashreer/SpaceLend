
import React, { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Star, MapPin, Calendar, User, Wifi, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import Header from '@/components/layout/Header';
import ReviewCard from '@/components/ReviewCard';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import type { DateRange } from 'react-day-picker';

const SpaceDetail = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isLoggedIn, login, logout, userAvatar, userEmail } = useAuth();

  // Blocked dates for demo
  const blockedDates = [
    new Date(2024, 11, 15), // Dec 15
    new Date(2024, 11, 22), // Dec 22
    new Date(2024, 11, 25), // Dec 25
    new Date(2025, 0, 1),   // Jan 1
    new Date(2025, 0, 8),   // Jan 8
  ];



  // Mock space data - updated for "Private Parking Spot in Downtown"
  const space = {
    id: id || '1',
    title: 'Private Parking Spot in Downtown',
    location: '456 Oak Ave, West Hollywood, CA',
    price: 25,
    rating: 4.9,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
    ],
    description: 'Secure private driveway parking spot in prime downtown location. Perfect for daily commuters or event parking. Easy access, well-lit area with 24/7 availability. Walking distance to restaurants, shops, and public transportation.',
    host: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      joinedDate: '2021',
      rating: 4.9
    },
    amenities: ['24/7 Access', 'Security Camera', 'Well-lit', 'Easy Access'],
    availability: {
      available: [5, 7, 15, 22, 28], // Mock available dates for current month
      booked: [3, 8, 14, 21]
    }
  };

  const reviews = [
    {
      author: 'Emily Carter',
      date: 'May 15, 2024',
      rating: 5,
      comment: 'Great location and very secure. Easy to find and access. Will definitely use again!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1b5?w=50&h=50&fit=crop&crop=face',
      helpfulCount: 10,
      unhelpfulCount: 2
    },
    {
      author: 'David Lee',
      date: 'April 22, 2024',
      rating: 4,
      comment: 'Good spot, but a bit tight for larger vehicles. Otherwise, it was perfect for my needs.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      helpfulCount: 5,
      unhelpfulCount: 1
    },
    {
      author: 'Jessica Brown',
      date: 'March 10, 2024',
      rating: 5,
      comment: 'Excellent parking space! Clean, safe, and close to everything. Highly recommend.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      helpfulCount: 12,
      unhelpfulCount: 0
    }
  ];

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setIsAuthModalOpen(false);
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else if (selectedDates?.from) {
      const startDate = selectedDates.from.toISOString().split('T')[0];
      const endDate = selectedDates.to ? selectedDates.to.toISOString().split('T')[0] : startDate;
      const days = selectedDates.to ? 
        Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 1;
      
      // Pass booking data via URL search parameters
      const bookingParams = new URLSearchParams({
        startDate,
        endDate,
        days: days.toString(),
        price: space.price.toString(),
        title: space.title,
        location: space.location,
        image: space.images[0] // Use first image from the images array
      });
      
      setLocation(`/booking/${space.id}?${bookingParams.toString()}`);
    } else {
      alert('Please select a date first');
    }
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedDates(range);
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => 
      date.toDateString() === blockedDate.toDateString()
    );
  };

  const getDayCount = () => {
    if (selectedDates?.from && selectedDates?.to) {
      return Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    return selectedDates?.from ? 1 : 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={logout}
        userAvatar={isLoggedIn ? userAvatar : undefined}
        userEmail={userEmail}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={space.images[0]}
            alt={space.title}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{space.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{space.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{space.rating}</span>
                  <span className="text-gray-500 ml-1">({space.reviewCount} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${space.price}<span className="text-lg font-normal text-gray-600">/day</span>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the host</h2>
              <div className="flex items-center space-x-4">
                <img 
                  src={space.host.avatar}
                  alt={space.host.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">Hosted by {space.host.name}</p>
                  <p className="text-sm text-gray-600">Joined in {space.host.joinedDate}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What this space offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Car className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Ratings and reviews</h2>
              </div>

              {/* Rating Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{space.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(space.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{space.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-2">
                        <span className="text-sm text-gray-600 w-4">{rating}</span>
                        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-800 h-2 rounded-full"
                            style={{ width: rating === 5 ? '70%' : rating === 4 ? '25%' : '5%' }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5 ? '70%' : rating === 4 ? '25%' : '5%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div>
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    author={review.author}
                    date={review.date}
                    rating={review.rating}
                    comment={review.comment}
                    avatar={review.avatar}
                    helpfulCount={review.helpfulCount}
                    unhelpfulCount={review.unhelpfulCount}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${space.price}</span>
                  <span className="text-gray-600 ml-1">/ day</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{space.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({space.reviewCount})</span>
                </div>
              </div>

              {/* Date Range Calendar */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Select Dates</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <CalendarComponent
                    mode="range"
                    selected={selectedDates}
                    onSelect={handleDateSelect}
                    className="rounded-md border-0 p-0 w-full"
                    disabled={(date) => {
                      // Disable past dates and blocked dates
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || isDateBlocked(date);
                    }}
                    modifiers={{
                      blocked: blockedDates
                    }}
                    modifiersStyles={{
                      blocked: {
                        backgroundColor: '#fca5a5',
                        color: '#dc2626',
                        textDecoration: 'line-through'
                      }
                    }}
                  />
                </div>
                {selectedDates?.from && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Selected:</strong> {selectedDates.from.toLocaleDateString()}
                      {selectedDates?.to && selectedDates.to !== selectedDates.from && 
                        ` - ${selectedDates.to.toLocaleDateString()}`
                      }
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Duration: {getDayCount()} day{getDayCount() > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                disabled={!selectedDates?.from}
              >
                Book Now
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                You won't be charged yet
              </p>

              {getDayCount() > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span>${space.price} × {getDayCount()} day{getDayCount() > 1 ? 's' : ''}</span>
                    <span>${space.price * getDayCount()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default SpaceDetail;
