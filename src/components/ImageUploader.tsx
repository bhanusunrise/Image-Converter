import React, { useCallback, useState } from 'react';
import { useImageContext } from '../context/ImageContext';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageUploader: React.FC = () => {
  const { addImages } = useImageContext();
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList) => {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/')
      );
      
      if (imageFiles.length > 0) {
        addImages(imageFiles);
      }
    },
    [addImages]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
      
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <div className="mb-4 p-4 bg-blue-100 rounded-full">
          {isDragging ? (
            <Upload className="h-10 w-10 text-blue-500" />
          ) : (
            <ImageIcon className="h-10 w-10 text-blue-500" />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {isDragging ? 'Drop images here' : 'Upload images'}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop image files here or click to browse
        </p>
        <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
          Select Files
        </span>
      </label>
    </div>
  );
};

export default ImageUploader;