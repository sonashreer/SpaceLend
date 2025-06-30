
import React from 'react';
import { Car } from 'lucide-react';

interface SpaceAmenitiesProps {
  amenities: string[];
}

const SpaceAmenities = ({ amenities }: SpaceAmenitiesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">What this space offers</h2>
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Car className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceAmenities;
