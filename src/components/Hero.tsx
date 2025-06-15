import React from 'react';
import {
  ArrowDown,
  Github,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroProps {
  motionX: MotionValue<number>;
  onSwipeAboutEnd?: () => void;
  onNavigate?: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ motionX, onSwipeAboutEnd, onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const swipeDistance = 200;
  const trackBg = useTransform(motionX, [0, swipeDistance], ["#27272a", "#4CAF50"]);
  const handleBg = useTransform(motionX, [0, swipeDistance], ["#4CAF50", "#ffffff"]);
  const arrowColor = useTransform(motionX, [0, swipeDistance], ["#ffffff", "#4CAF50"]);

  const socials = [
    { icon: Github, href: 'https://github.com/Anandhu362', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/anandhuvsin/', label: 'LinkedIn' }
  ];

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          src="/hvid.mp4"
          autoPlay
          loop
          muted
          playsInline // Important for mobile browsers
          className="min-w-full min-h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="relative flex items-center justify-start min-h-[80vh] py-16 sm:py-24 z-10">
          <motion.div
            className="w-full max-w-6xl bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl px-6 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <motion.h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6" variants={itemVariants}>
                <span className="block">Hi, I'm a</span>
                <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-gradient">
                  Full Stack Developer
                </span>
              </motion.h1>

              <motion.p className="text-base sm:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed" variants={itemVariants}>
                Crafting innovative digital experiences with cutting-edge technologies. Specializing in React, AR/VR, and modern web development.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-12" variants={itemVariants}>
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('projects');
                  }}
                  className="group w-full sm:w-auto px-8 py-4 bg-[#4CAF50] text-white rounded-full font-semibold text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  View My Work
                  <ArrowDown className="ml-2 inline-block group-hover:translate-y-1 transition-transform duration-300" size={20} />
                </button>
                
                {/* FIX: Changed button to an anchor tag for downloading the resume */}
                <a
                  href="https://drive.google.com/uc?export=download&id=1bHy0DMuP5-R9MuwQkKdANVSF7-wYDDMn"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Anandhu_Resume.pdf" // This suggests a filename to the browser
                  className="w-full sm:w-auto text-center px-8 py-4 border-2 border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/40 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Download Resume
                </a>
              </motion.div>

              <motion.div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4" variants={itemVariants}>
                <div className="flex space-x-6">
                  {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transform hover:scale-110 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon size={24} className="text-white group-hover:text-[#4CAF50] transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
                
                <motion.div
                  style={{ background: trackBg }}
                  className="relative w-full md:w-[250px] h-[52px] rounded-full flex items-center justify-start p-2 shadow-inner"
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: swipeDistance }}
                    style={{ x: motionX, background: handleBg }}
                    className="w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onDragEnd={() => {
                      if (onSwipeAboutEnd) onSwipeAboutEnd();
                    }}
                  >
                    <motion.div style={{ color: arrowColor }}>
                      <ArrowRight size={24} />
                    </motion.div>
                  </motion.div>
                  <span className="absolute left-20 text-white/50 text-sm font-medium select-none">
                    Swipe About
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;