import React from 'react';

import { Link } from '@/components/Elements';
import { Image } from '@/types';

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 image-list">
      {images.map((image, index) => (
        <Link key={index} to={`/images/${image.id}`}>
          <img
            src={image.largeImageURL}
            alt={image.tags}
            className="w-full h-full object-cover image-item"
          />
          <h3 className="text-lg font-bold mt-2">by: {image.user}</h3>
          <p className="text-gray-500">views: {image.views}</p>
        </Link>
      ))}
    </div>
  );
};

export default ImageGrid;
