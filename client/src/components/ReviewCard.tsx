
import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
  helpfulCount: number;
  unhelpfulCount: number;
}

const ReviewCard = ({
  author,
  date,
  rating,
  comment,
  avatar,
  helpfulCount,
  unhelpfulCount
}: ReviewCardProps) => {
  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {author.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{author}</h4>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{comment}</p>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{helpfulCount}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
              <ThumbsDown className="w-4 h-4" />
              <span className="text-sm">{unhelpfulCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
