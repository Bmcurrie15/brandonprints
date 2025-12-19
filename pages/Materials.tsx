import React from 'react';
import SEO from '../components/SEO';

interface MaterialSpec {
  name: string;
  bestFor: string;
  description: string;
  cost: 1 | 2 | 3;
  strengths: string[];
  limitations: string[];
  specs: {
    impact: number; // 1-5
    heat: number;   // 1-5
    flex: number;   // 1-5
  };
  useCase: string;
  image: string;
}

// Using abstract textures to represent the material properties visually
// These are high-reliability Unsplash IDs for textures (Wood, Carbon, Plastic, etc.)
const materials: MaterialSpec[] = [
  {
    name: 'PLA / PLA+',
    bestFor: 'Rapid Prototyping',
    description: 'The standard for cosmetic prints and non-stressed parts.',
    cost: 1,
    strengths: ['High detail resolution', 'Wide color variety', 'Biodegradable source'],
    limitations: ['Low heat resistance (deforms ~55°C)', 'Brittle under snap-loads', 'Not UV stable'],
    specs: { impact: 2, heat: 1, flex: 2 },
    useCase: 'Visual prototypes, desk organizers, and decorative figurines.',
    // Colorful geometric abstract
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'PETG',
    bestFor: 'Functional Utility',
    description: 'The balanced workhorse. Combines the ease of PLA with added durability.',
    cost: 1,
    strengths: ['Water/Chemical resistant', 'Slightly flexible (ductile)', 'Food-safe raw material'],
    limitations: ['Prone to stringing', 'Softer surface scratches easily', 'Difficult to glue/paint'],
    specs: { impact: 3, heat: 2, flex: 3 },
    useCase: 'Water bottles, planters, snap-fit enclosures, and mechanical brackets.',
    // Translucent blue/glassy texture
    image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'ASA / ABS',
    bestFor: 'Outdoor & Automotive',
    description: 'Engineering grade plastics built for harsh environments.',
    cost: 2,
    strengths: ['High UV stability (ASA)', 'Can be vapor smoothed', 'Machinable'],
    limitations: ['Prone to warping', 'Requires ventilated enclosure', 'Shrinkage during cooling'],
    specs: { impact: 4, heat: 4, flex: 3 },
    useCase: 'Automotive dashboard clips, outdoor signage, and tool handles.',
    // Rugged dark industrial texture
    image: 'https://images.unsplash.com/photo-1535555462310-8636fb3e41c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'TPU (95A)',
    bestFor: 'Flexible Parts',
    description: 'Rubber-like elastomer that withstands repeated compression and abrasion.',
    cost: 2,
    strengths: ['Extremely tough', 'Vibration dampening', 'Indestructible layer adhesion'],
    limitations: ['Difficult to print fast', 'Cannot bridge gaps well', 'Supports are hard to remove'],
    specs: { impact: 5, heat: 2, flex: 5 },
    useCase: 'Phone cases, drone bumpers, gaskets, and vibration isolators.',
    // Soft waves / rubbery abstract
    image: 'https://images.unsplash.com/photo-1516644293309-906d9531846b?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'PA6-CF (Nylon)',
    bestFor: 'End-Use Engineering',
    description: 'Nylon reinforced with chopped carbon fibers for extreme rigidity.',
    cost: 3,
    strengths: ['High stiffness-to-weight', 'Matte surface finish', 'High temperature resistance'],
    limitations: ['Abrasive (wears nozzles)', 'Absorbs moisture (hygroscopic)', 'Expensive'],
    specs: { impact: 5, heat: 5, flex: 3 },
    useCase: 'Functional gears, structural brackets, and drone frames.',
    // Carbon fiber pattern
    image: 'https://images.unsplash.com/photo-1633519363065-2259160a2ec7?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Wood / Marble PLA',
    bestFor: 'Aesthetic Display',
    description: 'Composite filaments designed strictly for visual texture and feel.',
    cost: 2,
    strengths: ['Unique matte texture', 'Hides layer lines', 'Can be sanded/stained'],
    limitations: ['Weaker than standard PLA', 'Abrasive to hardware', 'Inconsistent coloration'],
    specs: { impact: 1, heat: 1, flex: 1 },
    useCase: 'Architectural models, busts, and rustic home decor.',
    // Wood grain texture
    image: 'https://images.unsplash.com/photo-1542384703-a129d5929837?auto=format&fit=crop&q=80&w=800'
  }
];

const RatingBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
    <span className="uppercase tracking-wider w-20">{label}</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`h-1.5 w-4 rounded-sm transition-colors ${
            i <= value ? 'bg-accent-500' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  </div>
);

const Materials: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEO 
        title="Material Guide | Brandon Prints" 
        description="A technical comparison of 3D printing materials offered, including PLA, PETG, ABS, ASA, TPU, and Carbon Fiber Nylon."
      />

      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">Material Reference</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
            Choosing the right material is just as important as the design itself. 
            Use this matrix to balance strength, flexibility, and cost for your project.
        </p>
      </section>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {materials.map((mat) => (
            <div 
                key={mat.name}
                className="group flex flex-col bg-maker-900/20 backdrop-blur-[2px] hover:bg-maker-900 rounded-xl overflow-hidden shadow-lg border border-white/10 transition-all duration-300 hover:border-accent-500/30"
            >
                {/* Image Header */}
                <div className="h-32 overflow-hidden relative border-b border-white/5 bg-maker-950">
                    <img 
                        src={mat.image} 
                        alt={`${mat.name} texture`} 
                        className="w-full h-full object-cover opacity-60 grayscale-[50%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null; 
                          // Hide image if it fails, showing the bg-maker-950 background instead
                          e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maker-900 via-maker-900/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                        <h2 className="text-xl font-bold text-white drop-shadow-md">{mat.name}</h2>
                        <span className="text-xs font-bold text-accent-500 bg-accent-500/10 border border-accent-500/20 px-2 py-1 rounded backdrop-blur-md">
                            {mat.bestFor}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow space-y-6">
                    
                    {/* Columns: Pros/Cons/Cost */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-white/5 pb-4">
                        <div className="space-y-2">
                            <span className="text-green-400 font-bold uppercase tracking-wider block mb-1">Strengths</span>
                            <ul className="space-y-1 text-slate-300">
                                {mat.strengths.map(s => <li key={s} className="flex gap-2"><span>+</span>{s}</li>)}
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <span className="text-red-400 font-bold uppercase tracking-wider block mb-1">Limits</span>
                            <ul className="space-y-1 text-slate-400">
                                {mat.limitations.map(l => <li key={l} className="flex gap-2"><span>-</span>{l}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Cost & Use Case */}
                    <div className="flex items-center justify-between font-mono text-xs">
                         <span className="text-slate-500 uppercase tracking-wider">Est. Cost</span>
                         <div className="flex tracking-widest text-base">
                            <span className={mat.cost >= 1 ? 'text-accent-500' : 'text-slate-700'}>$</span>
                            <span className={mat.cost >= 2 ? 'text-accent-500' : 'text-slate-700'}>$</span>
                            <span className={mat.cost >= 3 ? 'text-accent-500' : 'text-slate-700'}>$</span>
                         </div>
                    </div>

                    {/* Specs Bars */}
                    <div className="space-y-2 bg-black/20 p-3 rounded-lg border border-white/5">
                        <RatingBar label="Impact" value={mat.specs.impact} />
                        <RatingBar label="Heat" value={mat.specs.heat} />
                        <RatingBar label="Flex" value={mat.specs.flex} />
                    </div>

                    {/* Real World Application */}
                    <div className="mt-auto pt-2">
                        <p className="text-sm text-slate-300 italic border-l-2 border-accent-500/50 pl-3">
                            "{mat.useCase}"
                        </p>
                    </div>

                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;