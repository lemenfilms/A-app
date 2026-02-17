
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="relative">
        <h1 className="text-6xl font-bold tracking-tighter text-red-600 animate-pulse">
          GEMINI<span className="text-white">STREAM</span>
        </h1>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
