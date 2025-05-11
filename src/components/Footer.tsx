import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} ImageConverter. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-500">
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> using React & TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;