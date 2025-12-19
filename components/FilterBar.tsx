
import React from 'react';
import { FilterState, CategoryOption } from '../types';
import { CONFIG } from '../config';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableMaterials: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, availableMaterials }) => {
  return (
    <div className="bg-maker-900/80 p-4 rounded-xl shadow-xl border border-white/10 space-y-4 md:space-y-0 md:flex md:items-center md:gap-6 sticky top-20 z-40 backdrop-blur-md">
      {/* Categories */}
      <div className="flex flex-wrap gap-2 flex-1">
        {CONFIG.CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filters.category === cat
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20 scale-105'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <select
          value={filters.material}
          onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
          className="px-3 py-2 rounded-lg border border-white/10 bg-maker-800 text-sm text-slate-200 focus:ring-2 focus:ring-accent-500/50 focus:outline-none w-1/2 md:w-40 appearance-none cursor-pointer"
        >
          {availableMaterials.map(m => (
            <option key={m} value={m}>{m === 'All' ? 'Material: All' : m}</option>
          ))}
        </select>
        
        <div className="relative w-1/2 md:w-48">
          <input 
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full px-3 py-2 pl-9 rounded-lg border border-white/10 bg-maker-800 text-sm text-slate-200 focus:ring-2 focus:ring-accent-500/50 focus:outline-none placeholder-slate-500"
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
