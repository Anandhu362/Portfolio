import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser'; // Import EmailJS

const Contact = () => {
    // --- EmailJS Credentials (Replace with your own) ---
    const SERVICE_ID = 'service_hr54sq8';
    const TEMPLATE_ID = 'template_7eizd1i';
    const PUBLIC_KEY = 'SQq_ZWWgML7wfTfgQ';

    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // UPDATED: handleSubmit function now uses EmailJS
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setIsSubmitted(true); // Set success state
            // Reset form and button after a delay
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('FAILED TO SEND EMAIL:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            setIsSubmitting(false); // Stop loading state regardless of outcome
        }
    };

    const buttonState = isSubmitting ? 'loading' : isSubmitted ? 'success' : 'idle';

    const contactInfo = [
        { icon: Mail, title: 'Email', content: 'anandhuvsnalloorr@gmail.com', link: 'mailto:anandhuvsnalloorr@gmail.com' },
        { icon: Phone, title: 'Phone', content: '+91 89211 56958', link: 'tel:+918921156958' },
        { icon: MapPin, title: 'Location', content: 'Kollam, Kerala', link: '#' }
    ];

    const inputClasses = "w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-zinc-400 transition-all duration-300 focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.4)]";

    const buttonVariants = {
        idle: { width: '100%', backgroundColor: 'rgba(34, 197, 94, 0)', transition: { duration: 0.4, ease: 'easeOut' } },
        loading: { width: '56px', backgroundColor: 'rgba(34, 197, 94, 0)', transition: { duration: 0.4, ease: 'easeOut' } },
        success: { width: '56px', backgroundColor: '#22c55e', transition: { duration: 0.4, ease: 'easeOut' } }
    };

    const contentVariants = {
        idle: { opacity: 1, y: 0, scale: 1 },
        loading: { opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.2 } },
        success: { opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.2 } },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };
    
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-3000"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Get In <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Touch</span>
                    </h2>
                    <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                        Ready to collaborate on your next project? Let's create something amazing together.
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        className="space-y-8 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg hover:border-green-400/60 hover:shadow-[0_0_32px_rgba(34,197,94,0.3)] transition-all duration-300"
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                            <p className="text-zinc-300 leading-relaxed">
                                I'm always excited to work on new projects. Whether you have a question or just want to say hi, my inbox is always open.
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <motion.a 
                                        key={info.title} 
                                        href={info.link} 
                                        className="group flex items-center gap-4 p-4 bg-black/20 rounded-xl hover:bg-black/40 transition-all duration-300 border border-white/10 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                        variants={itemVariants}
                                    >
                                        <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="text-white font-semibold">{info.title}</h4>
                                            <p className="text-zinc-300 break-words">{info.content}</p>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg"
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="john@example.com" />
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">Subject</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses} placeholder="Project Collaboration" />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={`${inputClasses} resize-none`} placeholder="Tell me about your project..."/>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || isSubmitted}
                                    variants={buttonVariants}
                                    animate={buttonState}
                                    initial="idle"
                                    className="relative group h-14 px-6 rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] disabled:cursor-not-allowed"
                                >
                                    <AnimatePresence mode="wait">
                                        {buttonState === 'idle' && (
                                            <motion.div key="idle" variants={contentVariants} initial="loading" animate="idle" exit="loading" className="flex items-center justify-center gap-3">
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                <span>Send Message</span>
                                            </motion.div>
                                        )}
                                        {buttonState === 'loading' && (
                                            <motion.div key="loading" variants={contentVariants} initial="loading" animate="idle" exit="loading" className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            </motion.div>
                                        )}
                                        {buttonState === 'success' && (
                                            <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className="absolute inset-0 flex items-center justify-center">
                                                <Check size={24} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;