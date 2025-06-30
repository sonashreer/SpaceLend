
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/AuthModal';
import SpaceHeader from '@/components/space/SpaceHeader';
import SpaceGallery from '@/components/space/SpaceGallery';
import HostInfo from '@/components/space/HostInfo';
import SpaceAmenities from '@/components/space/SpaceAmenities';
import ReviewsSection from '@/components/space/ReviewsSection';
import BookingSidebar from '@/components/space/BookingSidebar';

const SpaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState<{from: Date | undefined, to: Date | undefined}>({from: undefined, to: undefined});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Blocked dates for demo
  const blockedDates = [
    new Date(2024, 11, 15), // Dec 15
    new Date(2024, 11, 22), // Dec 22
    new Date(2024, 11, 25), // Dec 25
    new Date(2025, 0, 1),   // Jan 1
    new Date(2025, 0, 8),   // Jan 8
  ];

  React.useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

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
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', 'sophia.carter@example.com');
    localStorage.setItem('userName', 'Sophia Carter');
  };

  const handleListSpace = () => {
    navigate('/list-space');
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else if (selectedDates.from) {
      const startDate = selectedDates.from.toISOString().split('T')[0];
      const endDate = selectedDates.to ? selectedDates.to.toISOString().split('T')[0] : startDate;
      const days = selectedDates.to ? 
        Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 1;
      
      navigate(`/booking/${space.id}?startDate=${startDate}&endDate=${endDate}&days=${days}`);
    } else {
      alert('Please select a date first');
    }
  };

  const handleDateSelect = (range: {from: Date | undefined, to: Date | undefined} | undefined) => {
    setSelectedDates(range || {from: undefined, to: undefined});
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => 
      date.toDateString() === blockedDate.toDateString()
    );
  };

  const getDayCount = () => {
    if (selectedDates.from && selectedDates.to) {
      return Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    return selectedDates.from ? 1 : 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setIsLoggedIn(false);
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
        }}
        onListSpace={handleListSpace}
        userAvatar={isLoggedIn ? 'https://images.unsplash.com/photo-1494790108755-2616b332c1b5?w=50&h=50&fit=crop&crop=face' : undefined}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SpaceGallery images={space.images} title={space.title} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <SpaceHeader 
              title={space.title}
              location={space.location}
              rating={space.rating}
              reviewCount={space.reviewCount}
              price={space.price}
            />

            <HostInfo host={space.host} />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed">{space.description}</p>
            </div>

            <SpaceAmenities amenities={space.amenities} />

            <ReviewsSection 
              rating={space.rating}
              reviewCount={space.reviewCount}
              reviews={reviews}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              price={space.price}
              rating={space.rating}
              reviewCount={space.reviewCount}
              selectedDates={selectedDates}
              onDateSelect={handleDateSelect}
              isDateBlocked={isDateBlocked}
              blockedDates={blockedDates}
              onBooking={handleBooking}
              getDayCount={getDayCount}
            />
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
