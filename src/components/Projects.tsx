import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Github, ExternalLink, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { AnimatePresence, motion } from 'framer-motion';

// Define a type for a single project object for better type safety
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  techStack: string[];
  fullDescription: string;
  features: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
}

const projects: Project[] = [
    { id: 1, title: 'RR Business Group', description: 'Modern React-based business website for Dubai-based company', image: '/rr.png', tags: ['React', 'Business', 'Freelance', 'Web'], techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], fullDescription: 'A professional business website for RR Business Group, a Dubai-based company. Features modern design, smooth animations, and comprehensive business info with multilingual support.', features: ['Responsive design', 'Smooth animations', 'Multilingual support', 'SEO optimized'], githubUrl: 'http://34.100.243.199/', liveUrl: 'http://34.100.243.199/', category: 'Web' },
    { id: 2, title: 'Indoor Navigation using AR', description: 'Augmented Reality navigation for indoor spaces using Unity and ARCore.', image: '/indoor.png', tags: ['Unity', 'AR', 'Mobile', 'Final Year'], techStack: ['Unity', 'ARCore', 'C#', 'Android'], fullDescription: 'An indoor navigation system using Augmented Reality technology. It overlays arrows and info directly onto the real world via smartphone camera, ideal for malls, hospitals, and offices.', features: ['Real-time AR path', 'Indoor positioning', '3D markers', 'Multi-floor navigation'], githubUrl: 'https://github.com/Anandhu362/Indoor-Navigation-Using-AR-', liveUrl: '#', category: 'AR' },
    { id: 3, title: 'VPN Data Optimization Guide', description: 'Networking project focused on optimizing VPN data transmission', image: '/vp1.png', tags: ['Networking', 'VPN', 'Optimization', 'Security'], techStack: ['Linux', 'WireGuard', 'Google Cloud'], fullDescription: 'A step-by-step guide to setting up a Mumbai-based Google Cloud VPS running WireGuard VPN, including all configs and proof of secure client tunneling.', features: ['Cloud VM setup', 'WireGuard config', 'Firewall & network', 'Client config'], githubUrl: 'https://github.com/Anandhu362/Virtual-Private-Server-', liveUrl: 'https://github.com/Anandhu362/Virtual-Private-Server-', category: 'Networking' },
    { id: 4, title: 'Text-to-Speech Converter', description: 'Web app to convert text to natural speech with MP3 download.', image: '/tots.png', tags: ['Web', 'AI', 'JavaScript', 'API'], techStack: ['Flask', 'HTML', 'Bootstrap', 'gTTS'], fullDescription: 'A simple web app to convert text input to speech audio using Google\'s TTS API. Output can be played or downloaded as MP3.', features: ['Multiple languages', 'Voice customization', 'MP3 download', 'Fast UI'], githubUrl: 'https://github.com/Anandhu362/Text-to-Speech-Converter', liveUrl: 'https://anandhu362.github.io/Text-to-Speech-Converter/', category: 'Web' },
    { id: 5, title: 'Online Book Ordering System', description: 'E-commerce platform for book ordering with modern UI/UX', image: '/book.png', tags: ['E-commerce', 'React', 'Database', 'Web'], techStack: ['Django', 'React', 'PostgreSQL'], fullDescription: 'A full-stack e-commerce platform for book ordering with user authentication, shopping cart, payment, and admin inventory management.', features: ['User authentication', 'Shopping cart', 'Payments', 'Admin panel'], githubUrl: 'https://github.com/Anandhu362/BookOrderingSystem', liveUrl: '#', category: 'Web' },
    { id: 6, title: 'MuLearn Cybersecurity Cohort', description: 'Security monitoring dashboard and pentesting labs', image: '/cyb.png', tags: ['Security', 'Dashboard', 'Team', 'Monitoring'], techStack: ['Python', 'Linux', 'Networking Tools'], fullDescription: 'Hands-on cybersecurity cohort with labs, scripts, and tools for pentesting, Linux, and networking—built as part of the Mulearn student team.', features: ['Pentesting basics', 'Network analysis', 'Python automation', 'Linux scripting'], githubUrl: 'https://github.com/Anandhu362/mulearn-cybersecurity-cohort1', liveUrl: 'https://github.com/Anandhu362/mulearn-cybersecurity-cohort1', category: 'Security' }
];

const GlassPanel = ({ children }: { children: React.ReactNode }) => (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] backdrop-blur-md bg-gradient-to-r from-green-400/20 via-zinc-900/70 to-green-400/20 border border-green-400/20 rounded-2xl px-4 py-3 flex gap-2 sm:gap-4 justify-center" style={{ background: 'rgba(32,40,36,0.46)'}}>
        {children}
    </div>
);

const springTransition = { type: "spring", stiffness: 300, damping: 25 };
const easeTransition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };


const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoPlayRef = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const getIndices = () => ({
        left: (activeIndex - 1 + projects.length) % projects.length,
        center: activeIndex,
        right: (activeIndex + 1) % projects.length,
    });

    const { left, center, right } = getIndices();

    useEffect(() => {
        if (isHovered) {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            return;
        }
        autoPlayRef.current = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isHovered, projects.length]);

    const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

    const imageVariants = {
        initial: { opacity: 0, scale: 0.9, zIndex: 1 },
        animate: { opacity: 1, scale: 1, zIndex: 2, transition: easeTransition },
        exit: { opacity: 0, scale: 0.9, zIndex: 1, transition: { ...easeTransition, duration: 0.3 } },
    };

    const infoVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: springTransition },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const getImageSrc = (image: string) => image.startsWith('/') ? image : image;
    const isLiveEnabled = (liveUrl: string) => liveUrl && liveUrl !== "#" && liveUrl !== "";

    return (
        <section id="projects" className="py-24 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden select-none">
            <Particles id="tsparticles-projects" init={particlesInit} options={{ background: { color: { value: 'transparent' } }, fpsLimit: 60, particles: { color: { value: '#22c55e' }, links: { color: '#22c55e', distance: 130, enable: true, opacity: 0.15, width: 1 }, move: { enable: true, speed: 1, outModes: { default: 'bounce' } }, number: { value: 40, density: { enable: true, area: 700 } }, opacity: { value: 0.15 }, shape: { type: 'circle' }, size: { value: { min: 1, max: 3 } } }, detectRetina: true }} className="absolute inset-0 z-0" />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white">Featured <span className="text-green-400">Projects</span></h2>
                    <p className="text-zinc-400 text-lg mt-2">Explore my top-notch works crafted with creativity and precision.</p>
                </div>

                <div className="flex justify-center items-center md:gap-8 lg:gap-12" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    {/* FIX: Side card hidden on mobile using Tailwind classes */}
                    <motion.div
                        whileHover={{ scale: 0.9, opacity: 1 }}
                        className="relative hidden md:flex flex-col items-center cursor-pointer"
                        style={{ transform: 'translateY(-44px) scale(0.85)', zIndex: 0, opacity: 0.6 }}
                        onClick={prev}
                    >
                        <img src={getImageSrc(projects[left].image)} alt={projects[left].title} className="rounded-2xl bg-white/5 border border-white/10 shadow-xl w-[200px] lg:w-[265px] h-[195px] lg:h-[258px] object-cover" />
                    </motion.div>
                    
                    {/* FIX: Center card is now full-width on mobile */}
                    <div className="flex flex-col items-center w-full md:w-[420px] lg:w-[500px]">
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-black/80 via-zinc-900/80 to-green-700/10 border border-green-500/20 shadow-2xl shadow-green-600/20 w-full h-[350px] flex items-center justify-center z-10 group">
                            <AnimatePresence mode="wait">
                                <motion.img key={projects[center].id} src={getImageSrc(projects[center].image)} alt={projects[center].title} className="absolute w-full h-full object-cover select-none" variants={imageVariants} initial="initial" animate="animate" exit="exit" draggable={false} />
                            </AnimatePresence>
                            <motion.button onClick={prev} aria-label="Previous project" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 border border-green-500/40 rounded-full p-2" whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.4)' }} whileTap={{ scale: 0.9 }}>
                                <ChevronLeft size={30} className="text-green-400" />
                            </motion.button>
                            <motion.button onClick={next} aria-label="Next project" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 border border-green-500/40 rounded-full p-2" whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.4)' }} whileTap={{ scale: 0.9 }}>
                                <ChevronRight size={30} className="text-green-400" />
                            </motion.button>
                            <GlassPanel>
                                <motion.a href={projects[center].githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-br from-green-500/15 to-zinc-900/60 text-green-100 transition shadow" whileHover={{ scale: 1.05, y: -2, color: '#FFF', backgroundColor: 'rgba(34, 197, 94, 1)' }} whileTap={{ scale: 0.95 }}><Github size={17} /> <span className="hidden sm:inline">Code</span></motion.a>
                                {isLiveEnabled(projects[center].liveUrl) ? (<motion.a href={projects[center].liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-br from-green-500/15 to-zinc-900/60 text-green-100 transition shadow" whileHover={{ scale: 1.05, y: -2, color: '#FFF', backgroundColor: 'rgba(34, 197, 94, 1)' }} whileTap={{ scale: 0.95 }}><ExternalLink size={17} /> <span className="hidden sm:inline">Live</span></motion.a>) : (<span className="flex items-center gap-2 font-semibold px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-br from-green-500/5 to-zinc-900/30 text-zinc-500 cursor-not-allowed opacity-60 select-none"><ExternalLink size={17} /> <span className="hidden sm:inline">Live</span></span>)}
                                <motion.button onClick={() => setSelectedProject(projects[center])} className="flex items-center gap-2 font-semibold px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-br from-green-500/15 to-zinc-900/60 text-green-100 transition shadow" whileHover={{ scale: 1.05, y: -2, color: '#FFF', backgroundColor: 'rgba(34, 197, 94, 1)' }} whileTap={{ scale: 0.95 }}><Eye size={17} /> <span className="hidden sm:inline">View</span></motion.button>
                            </GlassPanel>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div key={projects[center].id + '-info'} variants={infoVariants} initial="initial" animate="animate" exit="exit" className="mt-6 text-center">
                                <div className="text-white font-bold text-xl drop-shadow-lg">{projects[center].title}</div>
                                <div className="text-green-400 text-base mt-2 max-w-[90%] sm:max-w-[420px] mx-auto font-medium" style={{ textShadow: "0 2px 24px #22c55e66" }}>{projects[center].description}</div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* FIX: Side card hidden on mobile using Tailwind classes */}
                    <motion.div
                        whileHover={{ scale: 0.9, opacity: 1 }}
                        className="relative hidden md:flex flex-col items-center cursor-pointer"
                        style={{ transform: 'translateY(-44px) scale(0.85)', zIndex: 0, opacity: 0.6 }}
                        onClick={next}
                    >
                        <img src={getImageSrc(projects[right].image)} alt={projects[right].title} className="rounded-2xl bg-white/5 border border-white/10 shadow-xl w-[200px] lg:w-[265px] h-[195px] lg:h-[258px] object-cover" />
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedProject && (<ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />)}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
