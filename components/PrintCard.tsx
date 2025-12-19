import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Print } from '../types';

interface PrintCardProps {
  print: Print;
}

const PrintCard: React.FC<PrintCardProps> = ({ print }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/prints/${print.slug}`} 
      // Changed bg to be very subtle (10%) and blur small (2px) to maximize background visibility
      // On hover, it snaps to solid background for clarity
      className="group block bg-maker-900/20 backdrop-blur-[2px] hover:bg-maker-900 hover:backdrop-blur-none rounded-xl overflow-hidden shadow-lg hover:shadow-accent-500/20 transition-all duration-300 border border-white/10 hover:border-accent-500/40 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-white/5">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600">
            <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <img
          src={print.images[0]}
          alt={print.imageAlts[0] || `3D print: ${print.title}`}
          // Reduced default opacity to 60% for more transparency, 100% on hover
          className={`w-full h-full object-cover transition-all duration-500 opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 ${isImageLoaded ? '' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-200 group-hover:text-accent-500 transition-colors line-clamp-1 shadow-black drop-shadow-md">
            {print.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-white/5 text-slate-400 rounded-md font-medium border border-white/5 group-hover:bg-white/10 transition-colors">
            {print.category}
          </span>
          <span className="px-2 py-1 bg-accent-500/10 text-accent-500 rounded-md font-medium border border-accent-500/20 group-hover:bg-accent-500/20 transition-colors">
            {print.material}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PrintCard;