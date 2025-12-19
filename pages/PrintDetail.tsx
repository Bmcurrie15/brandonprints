import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPrints } from '../services/dataService';
import { Print, EMAIL_LINK } from '../types';
import SEO from '../components/SEO';

const PrintDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [print, setPrint] = useState<Print | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchPrints().then(allPrints => {
      const found = allPrints.find(p => p.slug === slug);
      setPrint(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center text-slate-400">Loading...</div>;
  
  if (!print) return (
    <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Print not found</h2>
        <Link to="/gallery" className="text-accent-500 hover:underline">Back to Gallery</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <SEO 
        title={`${print.title} | Brandon Prints`}
        description={`Check out the ${print.title}, a ${print.category} 3D print by Brandon. ${print.description}`}
        image={print.images[0]}
        type="Article" // Using Article or Product helps it stand out in search
      />

      <nav className="text-sm text-slate-500">
        <Link to="/gallery" className="hover:text-accent-500 transition-colors">← Back to Gallery</Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-maker-900 rounded-2xl overflow-hidden shadow-lg border border-white/5">
             <img 
               src={print.images[activeImageIndex]} 
               alt={print.imageAlts[activeImageIndex] || print.title}
               className="w-full h-full object-cover"
             />
          </div>
          {print.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {print.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex ? 'border-accent-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
                 <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold tracking-wide uppercase">
                    {print.category}
                 </span>
                 {print.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent-500/20 text-accent-400 text-xs font-semibold tracking-wide uppercase">
                        Featured
                    </span>
                 )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{print.title}</h1>
            <p className="text-lg text-slate-400 leading-relaxed">{print.description}</p>
          </div>

          <div className="bg-maker-900 p-6 rounded-xl border border-white/5 shadow-inner space-y-4">
            <h3 className="font-semibold text-white border-b border-white/5 pb-2">Print Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 text-sm">
                <div>
                    <dt className="text-slate-500 mb-1">Material</dt>
                    <dd className="font-medium text-slate-200">{print.material}</dd>
                </div>
                <div>
                    <dt className="text-slate-500 mb-1">Purpose</dt>
                    <dd className="font-medium text-slate-200 capitalize">{print.purpose}</dd>
                </div>
                <div className="col-span-1">
                    <dt className="text-slate-500 mb-1">Notes / Constraints</dt>
                    <dd className="font-medium text-slate-200 italic">"{print.notes}"</dd>
                </div>
            </dl>
          </div>

          <div className="pt-4 border-t border-white/10">
             <p className="text-slate-400 mb-3">Interested in a custom print like this?</p>
             <a 
               href={EMAIL_LINK} 
               className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-accent-600 hover:bg-accent-700 transition-colors shadow-lg w-full md:w-auto"
             >
                Request Custom Print
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintDetail;