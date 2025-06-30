
import React from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';

interface Review {
  author: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
  helpfulCount: number;
  unhelpfulCount: number;
}

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const ReviewsSection = ({ rating, reviewCount, reviews }: ReviewsSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Ratings and reviews</h2>
      </div>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{rating}</div>
            <div className="flex items-center justify-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{reviewCount} reviews</div>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((ratingLevel) => (
              <div key={ratingLevel} className="flex items-center mb-2">
                <span className="text-sm text-gray-600 w-4">{ratingLevel}</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-800 h-2 rounded-full"
                    style={{ width: ratingLevel === 5 ? '70%' : ratingLevel === 4 ? '25%' : '5%' }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {ratingLevel === 5 ? '70%' : ratingLevel === 4 ? '25%' : '5%'}
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
  );
};

export default ReviewsSection;
