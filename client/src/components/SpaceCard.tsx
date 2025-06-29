
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SpaceCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance?: string;
  image: string;
  onBook?: () => void;
  showEarnings?: boolean;
  totalEarnings?: number;
}

const SpaceCard = ({
  id,
  title,
  location,
  price,
  rating,
  reviewCount,
  distance,
  image,
  onBook,
  showEarnings = false,
  totalEarnings
}: SpaceCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/space/${id}`}>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link to={`/space/${id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
              {distance && (
                <>
                  <span className="mx-2">•</span>
                  <span>{distance}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            <span className="text-sm text-gray-500 ml-1">/ day</span>
          </div>
        </div>

        {showEarnings && totalEarnings !== undefined && (
          <div className="mb-3 p-2 bg-green-50 rounded-lg">
            <span className="text-sm text-green-700">
              Total Earnings: <span className="font-semibold">${totalEarnings.toLocaleString()}</span>
            </span>
          </div>
        )}

        {onBook && (
          <Button 
            onClick={onBook}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpaceCard;
