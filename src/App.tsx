import React from 'react';
import { ImageProvider } from './context/ImageContext';
import Header from './components/Header';
import Converter from './components/Converter';
import Footer from './components/Footer';

function App() {
  return (
    <ImageProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Converter />
        </main>
        <Footer />
      </div>
    </ImageProvider>
  );
}

export default App;