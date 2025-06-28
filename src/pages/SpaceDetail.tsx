
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Calendar, User, Wifi, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import ReviewCard from '@/components/ReviewCard';

const SpaceDetail = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock space data
  const space = {
    id: id || '1',
    title: 'Private Parking Spot in Downtown',
    location: '123 Elm Street, Downtown, CA',
    price: 25,
    rating: 4.8,
    reviewCount: 120,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
    ],
    description: 'Discover a secure and convenient parking solution in the heart of downtown. This private parking spot offers easy access to major attractions, business centers, and public transportation. Ideal for daily commuters or visitors, the space is well-lit, monitored, and easily accessible. Book now for a hassle-free parking experience!',
    host: {
      name: 'Sarah',
      avatar: '',
      joinedDate: '2021',
      rating: 4.9
    },
    amenities: ['24/7 Access', 'Security Camera', 'Well-lit'],
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
      avatar: '',
      helpfulCount: 10,
      unhelpfulCount: 2
    },
    {
      author: 'David Lee',
      date: 'April 22, 2024',
      rating: 4,
      comment: 'Good spot, but a bit tight for larger vehicles. Otherwise, it was perfect for my needs.',
      avatar: '',
      helpfulCount: 5,
      unhelpfulCount: 1
    },
    {
      author: 'Jessica Brown',
      date: 'March 10, 2024',
      rating: 5,
      comment: 'Excellent parking space! Clean, safe, and close to everything. Highly recommend.',
      avatar: '',
      helpfulCount: 12,
      unhelpfulCount: 0
    }
  ];

  const handleBooking = () => {
    console.log('Booking space:', space.id);
    // Navigate to booking confirmation or payment
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
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
                            style={{ width: rating === 5 ? '70%' : rating === 4 ? '20%' : '5%' }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}
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

              {/* Calendar */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Availability</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">July 2024</p>
                  </div>
                  
                  {/* Mini Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mt-4 text-xs">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center font-medium text-gray-500 p-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                      <button
                        key={date}
                        className={`p-2 text-center rounded ${
                          space.availability.available.includes(date)
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : space.availability.booked.includes(date)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                        disabled={space.availability.booked.includes(date)}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                Book Now
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
