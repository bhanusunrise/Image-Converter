import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ImageFormat = 'jpeg' | 'png' | 'webp' | 'gif';

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  convertedPreview?: string;
  format?: ImageFormat;
  quality?: number;
  status: 'idle' | 'converting' | 'converted' | 'error';
  error?: string;
}

interface ImageContextType {
  images: ImageFile[];
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  updateImage: (id: string, updates: Partial<ImageFile>) => void;
  clearImages: () => void;
  convertImage: (id: string, format: ImageFormat, quality: number) => Promise<void>;
  convertAllImages: () => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const addImages = (files: File[]) => {
    const newImages = files.map((file) => {
      const id = Math.random().toString(36).substring(2, 11);
      return {
        id,
        file,
        preview: URL.createObjectURL(file),
        status: 'idle' as const,
        quality: 80,
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== id);
      // Clean up URL object to prevent memory leaks
      const imageToRemove = prevImages.find((image) => image.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
        if (imageToRemove.convertedPreview) {
          URL.revokeObjectURL(imageToRemove.convertedPreview);
        }
      }
      return updatedImages;
    });
  };

  const updateImage = (id: string, updates: Partial<ImageFile>) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, ...updates } : image
      )
    );
  };

  const clearImages = () => {
    // Clean up URL objects
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
      if (image.convertedPreview) {
        URL.revokeObjectURL(image.convertedPreview);
      }
    });
    setImages([]);
  };

  const convertImage = async (
    id: string,
    format: ImageFormat,
    quality: number
  ): Promise<void> => {
    const image = images.find((img) => img.id === id);
    if (!image) return;

    // Update status to converting
    updateImage(id, { status: 'converting', format, quality });

    try {
      // Create a new image element
      const img = new Image();
      img.src = image.preview;
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(img, 0, 0);
      
      // Convert to the selected format
      const mimeType = `image/${format}`;
      const convertedDataUrl = canvas.toDataURL(mimeType, quality / 100);
      
      // Update the image with the converted preview
      updateImage(id, {
        convertedPreview: convertedDataUrl,
        status: 'converted',
      });
    } catch (error) {
      console.error('Error converting image:', error);
      updateImage(id, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const convertAllImages = async (): Promise<void> => {
    const promises = images.map((image) => {
      if (image.format && image.quality) {
        return convertImage(image.id, image.format, image.quality);
      }
      // Default conversion if format or quality isn't set
      return convertImage(image.id, 'jpeg', 80);
    });

    await Promise.all(promises);
  };

  const value = {
    images,
    addImages,
    removeImage,
    updateImage,
    clearImages,
    convertImage,
    convertAllImages,
  };

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
};