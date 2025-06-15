import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const sectionIds = ['home', 'about', 'projects', 'skills', 'contact'];

// Define a type for the component's props for type safety
interface FooterProps {
  onNav?: (sectionId: string) => void; // onNav is an optional function
}

// Apply the prop types to the component
const Footer: React.FC<FooterProps> = ({ onNav }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Check if onNav exists before calling it
    if (onNav) {
      onNav('home');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center justify-center w-12 h-12 
            bg-gradient-to-r from-green-500 to-teal-400 
            rounded-full hover:from-teal-500 hover:to-emerald-400 
            transition-all duration-300 transform hover:scale-110 
            shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.18)] mb-8"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} className="text-white group-hover:-translate-y-1 transition-transform duration-200" />
          </button>

          {/* Logo/Brand */}
          <div className="mb-6">
            <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>

          {/* Description */}
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Passionate full-stack developer creating innovative digital experiences with modern technologies.<br />
            Always ready for the next exciting project.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {sectionIds.map((item) => (
              <button
                key={item}
                onClick={() => onNav && onNav(item)} // Also check here before calling
                className="text-teal-300 hover:text-green-400 transition-colors duration-200 hover:underline underline-offset-4 cursor-pointer bg-transparent border-0 outline-none"
                style={{ background: 'none' }}
                type="button"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-zinc-400 flex items-center justify-center gap-2">
              Made with <Heart size={16} className="text-green-400 animate-pulse" /> by{' '}
              <span className="text-white font-semibold">Anandhu V</span>
            </p>
            <p className="text-zinc-500 text-sm mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;