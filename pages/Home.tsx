
import React from 'react';
import { Link } from 'react-router-dom';
import { usePrints } from '../hooks/usePrints';
import PrintCard from '../components/PrintCard';
import SEO from '../components/SEO';
import { LoadingGrid } from '../components/LoadingState';

const Home: React.FC = () => {
  const { featuredPrints, loading } = usePrints();

  return (
    <div className="space-y-16">
      <SEO 
        title="Brandon Currie | Custom 3D Printing & Design Portfolio"
        description="The personal 3D printing portfolio of Brandon Currie. Featuring custom functional prints, prototypes, and decorative 3D models."
        name="Brandon Currie"
      />

      <section className="text-center space-y-6 pt-12 pb-8 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Making things <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-amber-500">real</span>.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          I'm <strong>Brandon</strong>. I turn digital models into physical objects. 
          <br className="hidden md:inline" /> 
          This is a collection of my custom 3D printed projects, prototypes, and gifts.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-100 drop-shadow-md">Featured Prints</h2>
          <Link to="/gallery" className="text-accent-500 hover:text-accent-400 font-medium text-sm flex items-center gap-1 group">
            View Full Gallery 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {loading ? (
          <LoadingGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrints.slice(0, 6).map(print => (
              <PrintCard key={print.slug} print={print} />
            ))}
          </div>
        )}
        
        {!loading && featuredPrints.length === 0 && (
            <div className="text-center py-12 text-slate-500">
                No featured prints found.
            </div>
        )}

        <div className="mt-12 text-center">
            <Link 
                to="/gallery" 
                className="inline-block px-8 py-3 bg-maker-900/50 backdrop-blur-md border-2 border-slate-700 text-slate-200 font-bold rounded-lg hover:border-accent-500 hover:text-accent-500 transition-all shadow-lg"
            >
                Browse All Projects
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
