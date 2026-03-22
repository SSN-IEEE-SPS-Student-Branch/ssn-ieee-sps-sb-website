'use client';

import { motion, Variants } from 'framer-motion';
import { Award, Star } from 'lucide-react';

export default function StudentAchievements() {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section style={{ padding: '4rem 1rem 6rem 1rem', color: 'white', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>

            {/* HEADER SECTION */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(120, 190, 32, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(120, 190, 32, 0.3)' }}>
                    <Star size={18} color="#78BE20" fill="#78BE20" />
                    <span style={{ color: '#78BE20', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em' }}>HALL OF FAME</span>
                </div>

                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: '800', lineHeight: 1.1 }}>
                    STUDENT <span style={{ color: '#78BE20' }}>ACHIEVEMENTS</span>
                </h1>

                <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                    Celebrating the exceptional milestones, research contributions, and global recognition of our IEEE Signal Processing Society SSN Chapter student members.
                </p>
            </motion.div>

            {/* ACHIEVEMENT CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                {/* Recognition Card: Scholarship and Project Fund */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: 'linear-gradient(145deg, #092C2E 0%, #05191a 100%)',
                        border: '1px solid rgba(120, 190, 32, 0.2)',
                        borderRadius: '1.5rem',
                        padding: '2.5rem',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Decorative Glow */}
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(120,190,32,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ background: 'rgba(120, 190, 32, 0.15)', padding: '1rem', borderRadius: '50%', color: '#78BE20', flexShrink: 0 }}>
                                <Award size={32} />
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: 'white', margin: 0, lineHeight: 1.2 }}>
                                Scholarship and Project Fund from IEEE
                            </h2>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '2rem', borderRadius: '1.2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1rem', border: '2px solid #78BE20', transition: 'transform 0.2s ease', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0px)'}>
                                    <p style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                                        <strong style={{ color: 'white', fontSize: '1.25rem' }}>Abirami Thirupathy</strong>, Final year <strong style={{ color: 'white' }}>BME</strong>, has been selected to be the recipient of the IEEE Signal Processing Society Scholarship of <strong style={{ color: '#78BE20' }}>1000 USD</strong> in recognition of her academic excellence.
                                    </p>
                                </li>
                                <li style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1rem', border: '2px solid #78BE20', transition: 'transform 0.2s ease', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0px)'}>
                                    <p style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                                        <strong style={{ color: 'white', fontSize: '1.25rem' }}>Augustine Wisely Bezalel</strong>, Final year <strong style={{ color: 'white' }}>BME</strong>, has been funded <strong style={{ color: '#78BE20' }}>4000 USD</strong> to work on a project under the mentorship of Dr. Deepak Mishra, The University of New South Wales, Sydney for the IEEE SPS sigMA Program.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
