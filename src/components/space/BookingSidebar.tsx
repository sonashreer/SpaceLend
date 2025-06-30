
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface BookingSidebarProps {
  price: number;
  rating: number;
  reviewCount: number;
  selectedDates: {from: Date | undefined, to: Date | undefined};
  onDateSelect: (range: {from: Date | undefined, to: Date | undefined} | undefined) => void;
  isDateBlocked: (date: Date) => boolean;
  blockedDates: Date[];
  onBooking: () => void;
  getDayCount: () => number;
}

const BookingSidebar = ({ 
  price, 
  rating, 
  reviewCount, 
  selectedDates, 
  onDateSelect, 
  isDateBlocked, 
  blockedDates, 
  onBooking,
  getDayCount 
}: BookingSidebarProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-600 ml-1">/ day</span>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
        </div>
      </div>

      {/* Date Range Calendar */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Select Dates</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <CalendarComponent
            mode="range"
            selected={selectedDates}
            onSelect={onDateSelect}
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
        {selectedDates.from && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> {selectedDates.from.toLocaleDateString()}
              {selectedDates.to && selectedDates.to !== selectedDates.from && 
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
        onClick={onBooking}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
        disabled={!selectedDates.from}
      >
        Book Now
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        You won't be charged yet
      </p>

      {getDayCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span>${price} × {getDayCount()} day{getDayCount() > 1 ? 's' : ''}</span>
            <span>${price * getDayCount()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSidebar;
