import React, { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Code, Palette, Database, Smartphone, Shield, Zap } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

// Data for skill categories (no changes needed)
const skillCategories = [
    {
        icon: Code,
        title: 'Frontend Development',
        color: 'from-green-500 to-teal-400',
        skills: [
            { name: 'React', level: 95 }, { name: 'TypeScript', level: 90 },
            { name: 'JavaScript', level: 95 }, { name: 'Tailwind CSS', level: 90 },
            { name: 'HTML5/CSS3', level: 95 }, { name: 'Next.js', level: 85 }
        ]
    },
    {
        icon: Database,
        title: 'Backend Development',
        color: 'from-green-600 to-teal-500',
        skills: [
            { name: 'Node.js', level: 85 }, { name: 'Express.js', level: 80 },
            { name: 'MongoDB', level: 75 }, { name: 'PostgreSQL', level: 70 },
            { name: 'REST APIs', level: 90 }, { name: 'GraphQL', level: 65 }
        ]
    },
    {
        icon: Smartphone,
        title: 'Mobile & AR/VR',
        color: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'React Native', level: 80 }, { name: 'Unity', level: 85 },
            { name: 'ARCore', level: 80 }, { name: 'C#', level: 75 },
            { name: 'Flutter', level: 60 }, { name: '3D Modeling', level: 70 }
        ]
    },
    {
        icon: Shield,
        title: 'Security & Networking',
        color: 'from-teal-500 to-green-400',
        skills: [
            { name: 'Cybersecurity', level: 75 }, { name: 'VPN Technologies', level: 80 },
            { name: 'Network Protocols', level: 85 }, { name: 'Linux', level: 80 },
            { name: 'Python', level: 85 }, { name: 'Penetration Testing', level: 65 }
        ]
    },
    {
        icon: Zap,
        title: 'Tools & DevOps',
        color: 'from-emerald-500 to-green-500',
        skills: [
            { name: 'Git/GitHub', level: 95 }, { name: 'Docker', level: 70 },
            { name: 'AWS', level: 65 }, { name: 'Vercel', level: 85 },
            { name: 'VS Code', level: 95 }, { name: 'Figma', level: 80 }
        ]
    },
    {
        icon: Palette,
        title: 'Design & UX',
        color: 'from-green-400 to-teal-500',
        skills: [
            { name: 'UI/UX Design', level: 85 }, { name: 'Responsive Design', level: 95 },
            { name: 'Animations', level: 80 }, { name: 'Prototyping', level: 75 },
            { name: 'Color Theory', level: 80 }, { name: 'Typography', level: 85 }
        ]
    }
];

// Data for stats section (no changes needed)
const stats = [
    { number: 10, suffix: '+', label: 'Projects Completed' },
    { number: 1, suffix: '+', label: 'Years Experience' },
    { number: 7, suffix: '+', label: 'Technologies' },
    { number: 100, suffix: '%', label: 'Client Satisfaction' }
];

// --- Main Skills Section ---
const Skills: React.FC = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: '-100px' });

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <section id="skills" className="py-20 bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden" ref={sectionRef}>
            
            {/* Holographic animated highlights */}
            <span className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/20 to-teal-500/5 blur-3xl rounded-full animate-spin-slow pointer-events-none" />
            <span className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-500/20 to-green-500/5 blur-3xl rounded-full animate-pulse pointer-events-none" />
            
            {/* Particles Background */}
            <Particles
                id="tsparticles-skills"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    particles: {
                        color: { value: "#22c55e" },
                        links: { color: "#22c55e", distance: 150, enable: true, opacity: 0.1, width: 1 },
                        move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 1, straight: false },
                        number: { density: { enable: true, area: 800 }, value: 50 },
                        opacity: { value: 0.1 },
                        shape: { type: "circle" },
                        size: { value: { min: 1, max: 3 } },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 z-0"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Technical <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Skills</span>
                    </h2>
                    <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                        A versatile skill set spanning the full development lifecycle, from concept to deployment.
                    </p>
                </motion.div>

                {/* Skill Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skillCategories.map((category, categoryIndex) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={categoryIndex}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: categoryIndex * 0.1 }}
                                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 p-6 transition-all duration-300 neon-glow-animate cursor-hoverable"
                            >
                                {/* Neon highlight */}
                                <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-green-400 blur-xl opacity-20 pointer-events-none animate-pulse group-hover:opacity-40 transition-opacity" />

                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-zinc-300 font-medium text-sm">
                                                    {skill.name}
                                                </span>
                                                <span className="text-sm font-semibold text-zinc-400">
                                                    {inView ? <CountUp end={skill.level} duration={1.5} /> : 0}%
                                                </span>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                                                <motion.div
                                                    className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: inView ? `${skill.level}%` : '0%' }}
                                                    transition={{ duration: 1.3, delay: 0.2 + skillIndex * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats Row */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3 }}
                >
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-300 hover:border-green-400/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-hoverable"
                        >
                            <div className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
                                {inView
                                    ? <CountUp end={stat.number} duration={2} suffix={stat.suffix} />
                                    : `0${stat.suffix}`}
                            </div>
                            <div className="text-zinc-300 text-sm sm:text-base">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;