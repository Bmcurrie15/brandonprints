import React from 'react';
import { EMAIL_LINK } from '../types';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 space-y-12">
      {/* 
         SEO Strategy: 
         Explicitly defining this page as a 'Person' entity helps Google Knowledge Graph 
         understand that "Brandon Currie" refers to YOU, the 3D maker.
      */}
      <SEO 
        title="About Brandon Currie | 3D Modeling & Printing Portfolio" 
        description="Brandon Currie is a 3D printing enthusiast and maker based in Leonardtown, MD, specializing in functional prints and CAD design."
        name="Brandon Currie"
        type="Person"
      />

      <header>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-normal">
          <span className="relative inline-block">
            <span className="relative z-10">Meet the Maker</span>
            
            {/* 
                Purge Strip Style Underline 
                - Modeled after a 3D printer nozzle prime line.
                - Features a "glob" (prime) at the start and a smooth extruded line.
                - Positioned slightly rotated and below text.
            */}
            <div className="absolute -bottom-2 -left-3 w-[calc(100%+24px)] flex items-center z-0 -rotate-1 opacity-90 select-none pointer-events-none">
                {/* The Prime Blob - Slightly irregular rounded shape to look like squished plastic */}
                <div className="w-5 h-4 bg-accent-600 rounded-[60%_40%_50%_50%/60%_50%_50%_40%] shadow-sm flex-shrink-0"></div>
                {/* The Filament Line - Connecting to the blob and tapering slightly at the end */}
                <div className="h-2 flex-grow bg-accent-600 -ml-1 rounded-r-full"></div>
            </div>
          </span>
        </h1>
      </header>
      
      <div className="prose prose-invert prose-lg text-slate-400 space-y-10 leading-relaxed">
        <p>
          Hi, I'm <strong className="text-slate-200">Brandon Currie</strong>, a maker based in <strong className="text-slate-200">Leonardtown, MD</strong>. I've been 3D printing and modeling for over 5 years. 
          What started as tinkering with a basic kit printer has grown into a passion 
          for functional design and rapid prototyping.
        </p>
        <p>
          I specialize in functional parts—things that fix problems around the house, 
          organize messy desks, or replace broken components that you can't buy anymore. 
          I appreciate the blend of engineering precision and creative freedom that 
          additive manufacturing provides.
        </p>
        <p>
          This site is simply a gallery of the work I'm proud of. It's not a store, 
          and I'm not a factory. I just like making cool stuff for the local community and beyond.
        </p>
      </div>

      <div className="bg-maker-900 p-8 rounded-2xl border border-white/10 mt-12 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-3">Have an idea?</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          I occasionally accept custom requests; I'd be happy to chat about bringing your unique ideas to life.
        </p>
        <a 
          href={EMAIL_LINK} 
          className="inline-flex items-center gap-2 text-accent-500 font-bold hover:text-accent-400 transition-colors group"
        >
          Send me an email
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
};

export default About;