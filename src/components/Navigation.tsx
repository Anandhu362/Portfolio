import React, { useState } from 'react';
import { Home, User, Briefcase, Code, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Define Props Interface
interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// 2. Navigation Bar Items
const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

// 3. Component Definition
const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  // Animation variants for the mobile menu panel
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeIn', staggerChildren: 0.05 },
    },
  };

  // Animation variants for individual mobile menu items
  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const navBase = 'transition-all duration-300 rounded-xl';
  const navInactive = 'hover:bg-white/10 hover:text-green-400 text-white/80';
  const navIcon = 'transition-colors duration-300';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white/90">Code Meets Creativity</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative px-4 py-2 flex items-center space-x-2 ${navBase} ${isActive ? 'text-green-400' : navInactive}`}
                >
                  <Icon size={18} className={`${navIcon} ${isActive ? 'text-green-400' : 'text-white/80 group-hover:text-green-400'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-green-400' : 'group-hover:text-green-400'}`}>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'x' : 'menu'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                  </motion.div>
                </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 mt-px px-4 pb-4 pt-2 bg-black/80 backdrop-blur-xl z-50 rounded-b-lg border-x border-b border-white/10"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    variants={mobileLinkVariants}
                    onClick={() => handleNavClick(item.id)}
                    className={`group w-full px-4 py-3 flex items-center space-x-3 rounded-lg ${navBase} ${isActive ? 'bg-white/10 text-green-400' : navInactive}`}
                  >
                    <Icon size={20} className={`${navIcon} ${isActive ? 'text-green-400' : 'text-white/80 group-hover:text-green-400'}`} />
                    <span className={`text-base font-medium ${isActive ? 'text-green-400' : 'group-hover:text-green-400'}`}>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;