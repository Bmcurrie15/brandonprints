
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CONFIG, getEmailLink } from '../config';
import { getCSVTemplate } from '../services/dataService';

const MakerMessage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 cursor-default" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-14 left-0 w-64 bg-maker-900/95 backdrop-blur-md border border-accent-500/30 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
         <div className="absolute -top-2 left-3 w-4 h-4 bg-maker-900/95 border-t border-l border-accent-500/30 transform rotate-45"></div>
         <p className="text-sm text-slate-200 relative z-10 leading-relaxed">
           Looking to bring your idea to life? <br />
           Click <span className="text-accent-500 font-bold">"Email Me"</span> right over there! 👉
         </p>
      </div>
    </>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-accent-500' : 'text-slate-400 hover:text-white'
    }`;

  const handleDownloadTemplate = () => {
    const csvContent = getCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'brandon-prints-template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen relative font-sans text-slate-200">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-maker-950/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex-shrink-0 flex items-center gap-3 relative">
              <div className="relative">
                <button 
                  onClick={() => setShowAvatarPopup(!showAvatarPopup)}
                  className="block focus:outline-none group"
                >
                  <img 
                     src={CONFIG.AVATAR_URL}
                     alt="Brandon Avatar"
                     className="h-10 w-10 rounded-full bg-slate-800 border-2 border-accent-500/50 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
                <MakerMessage isOpen={showAvatarPopup} onClose={() => setShowAvatarPopup(false)} />
              </div>

              <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-accent-500 transition-colors">
                Brandon<span className="text-accent-500">Prints</span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8 items-center">
              {CONFIG.NAV_LINKS.map(link => (
                <NavLink key={link.path} to={link.path} className={navClass}>{link.label}</NavLink>
              ))}
              <a 
                href={getEmailLink()} 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  showAvatarPopup 
                    ? 'text-white bg-accent-600 shadow-[0_0_25px_rgba(249,115,22,0.5)] scale-105 ring-2 ring-accent-400 ring-offset-2 ring-offset-maker-950' 
                    : 'text-white bg-white/10 border border-white/10 hover:bg-white/20'
                }`}
              >
                Email Me
              </a>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-maker-900 border-b border-white/10 absolute w-full px-4 pt-2 pb-6 space-y-4 flex flex-col items-center shadow-2xl">
            {CONFIG.NAV_LINKS.map(link => (
              <NavLink key={link.path} to={link.path} className={navClass} onClick={() => setIsMenuOpen(false)}>{link.label}</NavLink>
            ))}
            <a href={getEmailLink()} className="px-6 py-2 text-sm font-medium rounded-full w-full text-center bg-accent-600 text-white">
              Email Me
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {children}
      </main>

      <footer className="w-full bg-maker-950/50 border-t border-white/5 py-8 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Brandon Prints. Built for the love of making.
          </p>
          <button onClick={handleDownloadTemplate} className="text-xs text-slate-600 hover:text-accent-500 underline transition-colors">
            Download CSV Template (For Setup)
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
