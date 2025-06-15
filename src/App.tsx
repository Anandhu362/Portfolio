import React, { useState } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';

// Import all your page and layout components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

// This variant defines the fade-in/slide-up animation for sections
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const otherSections = [
  { id: 'projects', Component: Projects },
  { id: 'skills', Component: Skills },
  { id: 'contact', Component: Contact }
];

const SWIPE_THRESHOLD = 100;

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const motionX = useMotionValue(0);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'about') {
      animate(motionX, 200, { type: 'spring', stiffness: 400, damping: 40 });
    } else {
      animate(motionX, 0, { type: 'spring', stiffness: 400, damping: 40 });
    }
  };

  const handleHeroSwipeEnd = () => {
    if (motionX.get() > SWIPE_THRESHOLD) {
      handleNavClick('about');
    } else {
      animate(motionX, 0, { type: 'spring', stiffness: 400, damping: 40 });
    }
  };

  const ActiveComponent = otherSections.find(s => s.id === activeSection)?.Component;

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-x-hidden relative flex flex-col">
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <Navigation
        activeSection={activeSection}
        setActiveSection={handleNavClick}
      />

      <About motionX={motionX} onClose={() => handleNavClick('home')} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* FIX: Passed the navigation handler to the Hero component */}
              <Hero 
                motionX={motionX} 
                onSwipeAboutEnd={handleHeroSwipeEnd}
                onNavigate={handleNavClick}
              />
            </motion.div>
          )}

          {ActiveComponent && (
            <motion.div
              key={activeSection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ActiveComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;