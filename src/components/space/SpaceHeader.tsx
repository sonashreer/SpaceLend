
import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface SpaceHeaderProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
}

const SpaceHeader = ({ title, location, rating, reviewCount, price }: SpaceHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <div className="flex items-center text-gray-600 mb-4">
        <MapPin className="w-5 h-5 mr-2" />
        <span>{location}</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          ${price}<span className="text-lg font-normal text-gray-600">/day</span>
        </div>
      </div>
    </div>
  );
};

export default SpaceHeader;
