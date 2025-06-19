import React from 'react';
import { X, Github, ExternalLink, Code, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable CSS for the custom scrollbar
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(34, 34, 34, 0.25);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #22c55e, #14b8a6);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #4ade80, #2dd4bf);
  }
`;

// Animated SVG Blob Background
const AnimatedBlobBackground = () => (
  <motion.svg
    aria-hidden="true"
    className="absolute inset-0 z-0 w-full h-full opacity-25"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 810"
  >
    <motion.path
      fill="url(#greenGradient)"
      animate={{
        d: [
          'M815.5 132.5C642.5 106 561.5 220 333 220C104.5 220 0 324.5 0 324.5V810H1440V0C1258.5 50 1021.5 165.5 815.5 132.5Z',
          'M872 148C709.5 118 601.5 241 373 241C144.5 241 0 345.5 0 345.5V810H1440V0C1258.5 50 1067.5 184.5 872 148Z',
          'M815.5 132.5C642.5 106 561.5 220 333 220C104.5 220 0 324.5 0 324.5V810H1440V0C1258.5 50 1021.5 165.5 815.5 132.5Z',
        ],
      }}
      transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
    <defs>
      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// Define a strict type for a single project object
interface ProjectData {
  title: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
  features: string[];
  techStack: string[];
  fullDescription: string;
}

// Define the type for the entire projects data map and add full data
const projectsData: { [key: string]: ProjectData } = {
  "rr-business": {
    title: "RR Business Group",
    image: "/rr.png",
    githubUrl: "http://34.100.243.199/",
    liveUrl: "http://34.100.243.199/",
    tags: ["React", "Business Website", "Modern UI"],
    features: [
      "Modern company website",
      "Multi-section layout",
      "Contact form & product inquiry",
      "Responsive design",
      "Business branding"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    fullDescription: "A professional business website for RR Business Group, a Dubai-based company. Features modern design, smooth animations, and comprehensive business info with multilingual support."
  },
  "indoor-nav": {
    title: "Indoor Navigation using AR",
    image: "/indoor.png",
    githubUrl: "https://github.com/Anandhu362/Indoor-Navigation-Using-AR-",
    liveUrl: "#",
    tags: ["Unity", "Augmented Reality", "Indoor Navigation"],
    features: [
      "Real-time AR path",
      "Indoor positioning",
      "3D markers",
      "Multi-floor navigation"
    ],
    techStack: ["Unity", "ARCore", "C#", "Android"],
    fullDescription: "An indoor navigation system using Augmented Reality technology. It overlays arrows and info directly onto the real world via smartphone camera, ideal for malls, hospitals, and offices."
  },
  "vpn-guide": {
    title: "VPN Data Optimization Guide",
    image: "/vp1.png",
    githubUrl: "https://github.com/Anandhu362/Virtual-Private-Server-",
    liveUrl: "https://github.com/Anandhu362/Virtual-Private-Server-",
    tags: ["Networking", "VPN", "Optimization", "Security"],
    features: [
      "Cloud VM setup",
      "WireGuard config",
      "Firewall & network",
      "Client config"
    ],
    techStack: ["Linux", "WireGuard", "Google Cloud"],
    fullDescription: "A step-by-step guide to setting up a Mumbai-based Google Cloud VPS running WireGuard VPN, including all configs and proof of secure client tunneling."
  },
  "text-to-speech": {
    title: "Text-to-Speech Converter",
    image: "/tots.png",
    githubUrl: "https://github.com/Anandhu362/Text-to-Speech-Converter",
    liveUrl: "https://anandhu362.github.io/Text-to-Speech-Converter/",
    tags: ["Web", "AI", "JavaScript", "API"],
    features: [
      "Multiple languages",
      "Voice customization",
      "MP3 download",
      "Fast UI"
    ],
    techStack: ["Flask", "HTML", "Bootstrap", "gTTS"],
    fullDescription: "A simple web app to convert text input to speech audio using Google's TTS API. Output can be played or downloaded as MP3."
  },
  "book-ordering": {
    title: "Online Book Ordering System",
    image: "/book.png",
    githubUrl: "https://github.com/Anandhu362/BookOrderingSystem",
    liveUrl: "#",
    tags: ["E-commerce", "React", "Database", "Web"],
    features: [
      "User authentication",
      "Shopping cart",
      "Payments",
      "Admin panel"
    ],
    techStack: ["Django", "React", "PostgreSQL"],
    fullDescription: "A full-stack e-commerce platform for book ordering with user authentication, shopping cart, payment, and admin inventory management."
  },
  "cybersecurity-cohort": {
    title: "MuLearn Cybersecurity Cohort",
    image: "/cyb.png",
    githubUrl: "https://github.com/Anandhu362/mulearn-cybersecurity-cohort1",
    liveUrl: "https://github.com/Anandhu362/mulearn-cybersecurity-cohort1",
    tags: ["Security", "Dashboard", "Team", "Monitoring"],
    features: [
      "Pentesting basics",
      "Network analysis",
      "Python automation",
      "Linux scripting"
    ],
    techStack: ["Python", "Linux", "Networking Tools"],
    fullDescription: "Hands-on cybersecurity cohort with labs, scripts, and tools for pentesting, Linux, and networking—built as part of the Mulearn student team."
  }
};

// Use the specific ProjectData type for the project prop
interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 50,
      rotateX: -30,
      boxShadow: '0px 0px 0px rgba(34, 197, 94, 0)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      boxShadow: '0px 10px 40px 0px #22c55e40',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 50,
      rotateX: 30,
      boxShadow: '0px 0px 0px rgba(34, 197, 94, 0)',
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <style>{customScrollbarStyles}</style>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            style={{ perspective: '1000px' }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-black/95 backdrop-blur-2xl rounded-3xl border border-green-400/20 shadow-2xl custom-scrollbar"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedBlobBackground />

              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/30 border border-green-400/30 rounded-full text-white hover:bg-green-400/20 transition"
                whileHover={{ scale: 1.2, rotate: 90, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                whileTap={{ scale: 0.9, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <X size={24} />
              </motion.button>

              <motion.div className="relative z-10 p-6 sm:p-8" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-green-500/10 to-teal-500/10 text-green-300 rounded-full border border-green-400/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white neon-glow">
                    {project.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-green-400/10 bg-black/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-96 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-green-400/20 transition-all duration-300 hover:border-green-400/70 hover:shadow-[0_0_20px_2px_#22c55e40]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg">
                        <Zap size={20} className="text-white drop-shadow-glow" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-200">Key Features</h3>
                    </div>
                    <ul className="space-y-3">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-zinc-200">
                          <CheckCircle size={18} className="text-green-400 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-teal-400/20 transition-all duration-300 hover:border-teal-400/70 hover:shadow-[0_0_20px_2px_#14b8a640]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-teal-400 to-green-500 rounded-lg">
                        <Code size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-teal-200">Tech Stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-gradient-to-r from-zinc-800 to-zinc-900 text-green-200 rounded-lg text-sm font-medium border border-zinc-700 hover:border-green-400 transition-all duration-200 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                    href={project.githubUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-black/40 hover:bg-black/60 text-green-300 rounded-xl font-semibold transition-all duration-300 border border-green-400/30 hover:border-green-400/50 hover:shadow-[0_0_15px_#22c55e55]"
                  >
                    <Github size={20} />
                    View Source Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink size={20} />
                    View Live Demo
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
