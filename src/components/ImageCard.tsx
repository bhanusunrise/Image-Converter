import React from 'react';
import { X, RotateCw, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useImageContext, ImageFile, ImageFormat } from '../context/ImageContext';

interface ImageCardProps {
  image: ImageFile;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const { removeImage, convertImage, updateImage } = useImageContext();

  const handleRemove = () => {
    removeImage(image.id);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateImage(image.id, { format: e.target.value as ImageFormat });
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateImage(image.id, { quality: parseInt(e.target.value, 10) });
  };

  const handleConvertClick = () => {
    if (image.format && image.quality) {
      convertImage(image.id, image.format, image.quality);
    } else {
      // Default conversion
      convertImage(image.id, 'jpeg', 80);
    }
  };

  const handleDownload = () => {
    if (!image.convertedPreview) return;
    
    const link = document.createElement('a');
    link.href = image.convertedPreview;
    
    const extension = image.format || 'jpeg';
    const filename = image.file.name.replace(/\.[^/.]+$/, '') + '.' + extension;
    
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = () => {
    switch (image.status) {
      case 'converting':
        return <RotateCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'converted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img
            src={image.convertedPreview || image.preview}
            alt={image.file.name}
            className="object-contain w-full h-full"
          />
        </div>
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-800 truncate" title={image.file.name}>
            {image.file.name}
          </div>
          <div className="flex items-center">
            {getStatusIcon()}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label htmlFor={`format-${image.id}`} className="block text-xs font-medium text-gray-500 mb-1">
              Format
            </label>
            <select
              id={`format-${image.id}`}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={image.format || 'jpeg'}
              onChange={handleFormatChange}
              disabled={image.status === 'converting'}
              style={{ border: '1px solid #e2e8f0', padding: '0.5rem' }}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
              <option value="gif">GIF</option>
            </select>
          </div>

          <div>
            <label htmlFor={`quality-${image.id}`} className="block text-xs font-medium text-gray-500 mb-1">
              Quality: {image.quality || 80}%
            </label>
            <input
              id={`quality-${image.id}`}
              type="range"
              min="1"
              max="100"
              value={image.quality || 80}
              onChange={handleQualityChange}
              className="w-full"
              disabled={image.status === 'converting'}
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleConvertClick}
              disabled={image.status === 'converting'}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md ${
                image.status === 'converting'
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors duration-200`}
            >
              {image.status === 'converting' ? (
                <>Converting...</>
              ) : image.status === 'converted' ? (
                <>Reconvert</>
              ) : (
                <>Convert</>
              )}
            </button>
            
            {image.convertedPreview && (
              <button
                onClick={handleDownload}
                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-500 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-1" />
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;