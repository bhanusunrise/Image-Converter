import React from 'react';
import { useImageContext } from '../context/ImageContext';
import ImageCard from './ImageCard';

const ImageList: React.FC = () => {
  const { images } = useImageContext();

  if (images.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">Your Images</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default ImageList;