import React from 'react';
import { useImageContext } from '../context/ImageContext';
import { RefreshCw, Download, Trash2 } from 'lucide-react';

const ActionButtons: React.FC = () => {
  const { images, convertAllImages, clearImages } = useImageContext();
  
  const handleConvertAll = () => {
    convertAllImages();
  };
  
  const handleDownloadAll = () => {
    const convertedImages = images.filter((img) => img.convertedPreview);
    
    if (convertedImages.length === 0) return;
    
    // For each converted image, trigger a download
    convertedImages.forEach((image) => {
      if (!image.convertedPreview) return;
      
      const link = document.createElement('a');
      link.href = image.convertedPreview;
      
      const extension = image.format || 'jpeg';
      const filename = image.file.name.replace(/\.[^/.]+$/, '') + '.' + extension;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  
  const handleClearAll = () => {
    clearImages();
  };

  const hasConvertedImages = images.some((img) => img.status === 'converted');
  
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleConvertAll}
        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Convert All
      </button>
      
      <button
        onClick={handleDownloadAll}
        disabled={!hasConvertedImages}
        className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
          hasConvertedImages
            ? 'text-white bg-green-600 hover:bg-green-700'
            : 'text-gray-500 bg-gray-200 cursor-not-allowed'
        } transition-colors duration-200`}
      >
        <Download className="h-4 w-4 mr-2" />
        Download All
      </button>
      
      <button
        onClick={handleClearAll}
        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear All
      </button>
    </div>
  );
};

export default ActionButtons;