
import React, { useState, useMemo } from 'react';
import { usePrints } from '../hooks/usePrints';
import { FilterState } from '../types';
import PrintCard from '../components/PrintCard';
import FilterBar from '../components/FilterBar';
import { LoadingSpinner } from '../components/LoadingState';
import SEO from '../components/SEO';

const Gallery: React.FC = () => {
  const { prints, materials, loading } = usePrints();
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    material: 'All',
    search: ''
  });

  const filteredPrints = useMemo(() => {
    return prints.filter(print => {
      const matchCat = filters.category === 'All' || print.category === filters.category;
      const matchMat = filters.material === 'All' || print.material === filters.material;
      const matchSearch = print.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          print.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchCat && matchMat && matchSearch;
    });
  }, [prints, filters]);

  return (
    <div className="space-y-8 min-h-[60vh]">
      <SEO 
        title="Project Gallery | Brandon Prints"
        description="Browse a complete gallery of 3D printed projects by Brandon Currie, filtered by category and material."
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Gallery</h1>
        <p className="text-slate-400">Explore the full archive of functional and decorative builds.</p>
      </div>

      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        availableMaterials={materials} 
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrints.map(print => (
                <PrintCard key={print.slug} print={print} />
                ))}
            </div>
            {!loading && filteredPrints.length === 0 && (
                <div className="text-center py-20 text-slate-500 bg-maker-900/20 rounded-2xl border border-dashed border-white/10">
                    <p className="text-lg">No prints match your current filters.</p>
                    <button 
                      onClick={() => setFilters({ category: 'All', material: 'All', search: '' })}
                      className="mt-4 text-accent-500 hover:underline"
                    >
                      Clear all filters
                    </button>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default Gallery;
