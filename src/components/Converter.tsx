import React from 'react';
import { useImageContext } from '../context/ImageContext';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import ConversionControls from './ConversionControls';
import ActionButtons from './ActionButtons';

const Converter: React.FC = () => {
  const { images } = useImageContext();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Image Converter</h2>
          
          <ImageUploader />
          
          {images.length > 0 && (
            <>
              <div className="mt-8">
                <ConversionControls />
              </div>
              
              <div className="mt-8">
                <ImageList />
              </div>
              
              <div className="mt-8">
                <ActionButtons />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Converter;