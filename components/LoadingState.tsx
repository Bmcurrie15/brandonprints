
import React from 'react';

export const LoadingGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <div 
        key={i} 
        className="aspect-square bg-maker-900/50 rounded-xl animate-pulse border border-white/5" 
      />
    ))}
  </div>
);

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center py-20">
    <div className="w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(249,115,22,0.3)]"></div>
  </div>
);
