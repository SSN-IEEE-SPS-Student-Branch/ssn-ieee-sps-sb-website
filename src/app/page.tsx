'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView, Variants } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

// --- COMPONENT 1: Scramble Text Effect (Matrix/Decoder Style) ---
const ScrambleText = ({ children, className, style }: { children: string, className?: string, style?: React.CSSProperties }) => {
  const [displayText, setDisplayText] = useState(children);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(prev =>
          children
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return children[index];
              }
              if (letter === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= children.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    startScramble();

    return () => clearInterval(interval);
  }, [children, isInView]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayText}
    </span>
  );
};

// --- COMPONENT 2: Signal Wave Separator (BOLDER VERSION) ---
const SignalWaveSeparator = () => (
  // Increased opacity from 0.6 to 0.9 for better visibility
  <div style={{ width: '100%', overflow: 'hidden', padding: '1rem 0', opacity: 0.9 }}>
    <motion.svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ width: '200%', height: '60px', display: 'block' }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    >
      <path
        d="M0,60 C150,120 150,0 300,60 C450,120 450,0 600,60 C750,120 750,0 900,60 C1050,120 1050,0 1200,60 V120 H0 V60 Z"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="4" // Increased from 2 to 4
      />
      <path
        d="M1200,60 C1350,120 1350,0 1500,60 C1650,120 1650,0 1800,60 C1950,120 1950,0 2100,60 C2250,120 2250,0 2400,60 V120 H1200 V60 Z"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="4" // Increased from 2 to 4
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          {/* Made the center color more vibrant */}
          <stop offset="50%" stopColor="#78BE20" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
      </defs>
    </motion.svg>
  </div>
);

// --- COMPONENT 3: 3D Tilting Logo ---
const HeroLogo = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) - 0.5;
    const yPct = ((e.clientY - rect.top) / rect.height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        minWidth: '300px',
        perspective: 1000,
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.img
          src="/SSN_SPS_LOGO.jpg"
          alt="SSN SPS Logo"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transform: 'translateZ(50px)',
            filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.4))',
            borderRadius: '8px',
          }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT 4: Image Slideshow Carousel ---
const ImageCarousel = () => {
  const images = [
    "/sps-home-1.jpg", "/sps-home-2.jpg", "/sps-home-3.jpg", "/sps-home-4.jpg", "/sps-home-5.jpg"
  ];
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const slideTimer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(slideTimer);
  }, [page]);

  const variants: Variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(120, 190, 32, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 1 } }}
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
          draggable={false}
        />
      </AnimatePresence>

      <div onClick={() => paginate(-1)} style={{ position: 'absolute', left: '10px', zIndex: 2, background: 'rgba(0,0,0,0.4)', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </div>
      <div onClick={() => paginate(1)} style={{ position: 'absolute', right: '10px', zIndex: 2, background: 'rgba(0,0,0,0.4)', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const hoverLift: Variants = {
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  return (
    <main style={{ width: '100%', overflowX: 'hidden', background: 'transparent', color: '#ffffff', minHeight: '100vh' }}>

      {/* --- HERO SECTION --- */}
      {/* UPDATE 1: Changed alignItems to flex-start and added significant paddingTop (180px) to push content down away from navbar */}
      <section style={{
        minHeight: '100vh', // Changed to 100vh to ensure full coverage
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start', // Changed from center to flex-start to respect top padding
        justifyContent: 'center',
        position: 'relative',
        padding: '110px 1rem 4rem 1rem', // Added 180px top padding
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', margin: '0 auto', flexWrap: 'wrap' }}>

          {/* LEFT COLUMN: Text & Buttons */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minWidth: '300px' }}>
            <motion.span variants={fadeInUp} style={{ color: '#78BE20', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <ScrambleText>Founded 2023</ScrambleText>
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: 'clamp(2.3rem, 4.5vw, 4.3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(90deg, #ffffffff, #2ecc71, #ffffff)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              <ScrambleText>SSN IEEE SPS Student Branch</ScrambleText>
            </motion.h1>

            <motion.p variants={fadeInUp} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'inherit', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500, maxWidth: '600px' }}>
              Get ready for an exciting journey where we uncover the secrets behind signal processing. Join a smart community that turns theories into real things that matter.
            </motion.p>

            <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="https://signalprocessingsociety.org/get-involved/membership" target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #78BE20, #5a9617)', color: 'white', padding: '1rem 2.2rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer' }}>
                Join IEEE SPS
              </motion.a>
              <motion.a whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', y: -2 }} whileTap={{ scale: 0.95 }} href="/contact" style={{ background: 'transparent', color: 'inherit', padding: '1rem 2.2rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', border: '2px solid currentColor', cursor: 'pointer' }}>
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: The 3D Logo Component */}
          <HeroLogo />
        </div>
      </section>

      {/* --- SEPARATOR 1 (Updated BOLDER Wave) --- */}
      <SignalWaveSeparator />

      {/* --- WHO WE ARE SECTION --- */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} style={{ width: '100%', padding: '6rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* UPDATE 2: Added justifyContent: 'center' and ensured alignItems: 'center' is active to align the image to the middle of the text */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap-reverse' }}>

          <motion.div whileHover={{ y: -5 }} style={{ flex: '1 1 400px', height: '400px', alignSelf: 'center' }}>
            <ImageCarousel />
          </motion.div>

          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'inherit', marginBottom: '1.5rem' }}>
              <ScrambleText>MORE THAN JUST</ScrambleText> <br />
              <span style={{ color: '#7bd112ff' }}><ScrambleText>A TECH GROUP</ScrambleText></span>
            </h2>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'inherit', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500, }}>
              Being a member of the SSN IEEE SPS Student Chapter means you are becoming part of a community of curious minds. We don't just read about technology; we dive into how sounds, pictures, and data get transformed.
            </p>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'inherit', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500, }}>
              Whether you're into tech, love figuring things out, or just want to be part of cool projects, this is your ticket to a place where ideas turn into real actions.
            </p>
          </div>
        </div>
      </motion.section>

      {/* --- SEPARATOR 2 (Updated BOLDER Wave) --- */}
      <SignalWaveSeparator />

      {/* --- MISSION & VISION SECTION --- */}
      <section style={{ width: '100%', padding: '6rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

          {/* MISSION */}
          <motion.div initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true }} variants={fadeInUp} style={{ height: '100%' }}>
            <motion.div variants={hoverLift} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#7bd112ff', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <ScrambleText>MISSION</ScrambleText>
              </h3>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'inherit', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                  To move beyond reading and get hands-on. We aim to do projects where you make cool stuff using clever ideas and tools. Our mission is to show you how technologies work.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* VISION */}
          <motion.div initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true }} variants={fadeInUp} style={{ height: '100%' }}>
            <motion.div variants={hoverLift} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'inherit', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <ScrambleText>VISION</ScrambleText>
              </h3>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'inherit', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                  To shape the future of technology by bringing cool ideas to life. We envision a smart community where curious minds share what they know and learn from each other.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}