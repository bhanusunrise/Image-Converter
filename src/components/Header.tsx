import React from 'react';
import { Image } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-800">ImageConverter</h1>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Convert images easily and efficiently
        </div>
      </div>
    </header>
  );
};

export default Header;