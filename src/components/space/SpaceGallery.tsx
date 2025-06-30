
import React from 'react';

interface SpaceGalleryProps {
  images: string[];
  title: string;
}

const SpaceGallery = ({ images, title }: SpaceGalleryProps) => {
  return (
    <div className="rounded-xl overflow-hidden mb-8">
      <img
        src={images[0]}
        alt={title}
        className="w-full h-96 object-cover"
      />
    </div>
  );
};

export default SpaceGallery;
