
import React from 'react';

const Banner = () => {
  return (
    <div className="w-full py-2.5 text-center bg-gradient-to-r from-[#064E3B] to-[#065F46] shadow-sm">
      <p className="text-sm font-medium text-green-100 flex items-center justify-center">
        <span className="px-3 py-1 mr-2 text-xs font-semibold text-white bg-emerald-500 rounded-lg animate-pulse">
          New
        </span>
        AI Feature Added
      </p>
    </div>
  );
};

export default Banner;