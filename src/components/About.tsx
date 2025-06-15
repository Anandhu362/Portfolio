import React, { useCallback } from 'react';
import { User, Award, Code, Briefcase, X } from 'lucide-react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

// Define the props interface for the About component
interface AboutProps {
  motionX: MotionValue<number>;
  onClose: () => void;
}

// Data for the achievements section
const achievements = [
  { icon: Award, title: 'Final Year Project', description: 'Indoor Navigation using Augmented Reality', color: 'from-green-500 to-teal-400' },
  { icon: Briefcase, title: 'Freelance Success', description: 'React business website for RR Business Group (Dubai)', color: 'from-green-600 to-teal-500' },
  { icon: Code, title: 'Technical Innovation', description: 'VPN data optimization & Text-to-speech converter', color: 'from-green-500 to-emerald-500' },
  { icon: User, title: 'Cybersecurity', description: 'Active member of MuLearn team', color: 'from-teal-500 to-green-400' }
];

// Animation variants for container elements
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Animation variants for item elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
};

const About: React.FC<AboutProps> = ({ motionX, onClose }) => {
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    await loadFull(engine);
  }, []);

  const pageX = useTransform(motionX, [0, 200], ["100%", "0%"]);

  return (
    <motion.section
      id="about"
      style={{ x: pageX }}
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-y-auto z-30"
    >
      <Particles
        id="tsparticles-about"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#22c55e" },
            links: { color: "#22c55e", distance: 150, enable: true, opacity: 0.1, width: 1 },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.1 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* FIX: Adjusted padding for better mobile spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-20 sm:pt-32">
        <button
          onClick={onClose}
          className="fixed top-6 right-6 text-zinc-300 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full backdrop-blur-md"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
            Passionate full-stack developer with expertise in modern web technologies and emerging tech like AR/VR.
          </p>
        </div>

        {/* FIX: Reduced gap on mobile for tighter layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* FIX: Made avatar container responsive to prevent overflow on mobile */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_0_32px_rgba(34,197,94,0.3)] transform rotate-6 hover:rotate-3 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-teal-500/10 to-emerald-500/10 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_0_32px_rgba(34,197,94,0.3)] transform -rotate-6 hover:-rotate-3 transition-transform duration-500"></div>
              
              <div className="relative z-10 w-full h-full bg-zinc-800/60 rounded-3xl border border-white/10 flex items-center justify-center shadow-[0_0_32px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform duration-300 backdrop-blur-xl overflow-hidden">
                <img src="/photo.jpg" alt="My Portrait" className="w-full h-full object-cover" />
              </div>

              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Code size={24} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Award size={20} className="text-white" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-green-400/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_32px_rgba(34,197,94,0.3)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                I'm a passionate full-stack developer who thrives on creating innovative digital solutions. 
                My expertise spans from traditional web development to cutting-edge technologies like 
                Augmented Reality and VPN optimization systems.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                With a strong foundation in React, TypeScript, and modern web frameworks, I've successfully 
                delivered projects ranging from business websites to complex AR navigation systems. 
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-green-400/60 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    variants={itemVariants}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
                    <p className="text-zinc-400 text-sm">{achievement.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;