import React, { useState } from 'react';
import { useImageContext, ImageFormat } from '../context/ImageContext';

const ConversionControls: React.FC = () => {
  const { images, updateImage } = useImageContext();
  const [globalFormat, setGlobalFormat] = useState<ImageFormat>('jpeg');
  const [globalQuality, setGlobalQuality] = useState(80);

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const format = e.target.value as ImageFormat;
    setGlobalFormat(format);
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quality = parseInt(e.target.value, 10);
    setGlobalQuality(quality);
  };

  const applySettingsToAll = () => {
    images.forEach((image) => {
      updateImage(image.id, {
        format: globalFormat,
        quality: globalQuality,
      });
    });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Batch Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="global-format" className="block text-sm font-medium text-gray-700 mb-1">
            Format
          </label>
          <select
            id="global-format"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={globalFormat}
            onChange={handleFormatChange}
            style={{ border: '1px solid #e2e8f0', padding: '0.5rem' }}
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
            <option value="gif">GIF</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="global-quality" className="block text-sm font-medium text-gray-700 mb-1">
            Quality: {globalQuality}%
          </label>
          <input
            id="global-quality"
            type="range"
            min="1"
            max="100"
            value={globalQuality}
            onChange={handleQualityChange}
            className="w-full"
          />
        </div>
      </div>
      
      <button
        onClick={applySettingsToAll}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Apply to All Images
      </button>
    </div>
  );
};

export default ConversionControls;