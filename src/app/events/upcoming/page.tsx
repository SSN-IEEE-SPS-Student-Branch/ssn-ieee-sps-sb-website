'use client';

import React from 'react';
import { motion, Variants, useMotionValue, type PanInfo } from 'framer-motion';
import { Radio, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// --- ANIMATION VARIANTS ---

const scannerVariant: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const pulseVariant: Variants = {
  initial: { scale: 0.8, opacity: 0.8 },
  animate: {
    scale: 1.6, // Reduced scale to keep it contained
    opacity: 0,
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeOut"
    }
  }
};

const textVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

export default function UpcomingEventsPage() {
  // Motion value to track the rotation of the center knob
  const knobRotation = useMotionValue(0);

  // Function to handle the manual rotation logic
  // We map the X and Y movement of the mouse/finger to rotation degrees
  const handlePan = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentRotation = knobRotation.get();
    // Dragging right/down increases rotation, left/up decreases it
    const delta = info.delta.x + info.delta.y; 
    knobRotation.set(currentRotation + delta);
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '80vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      overflow: 'hidden',
      position: 'relative',
      paddingTop: '8rem'
    }}>
      
      {/* Styles for the Gradient Button & Cursor Classes */}
      <style>{`
        .event-btn {
          background-size: 200% 100%;
          background-image: linear-gradient(to right, #78BE20 50%, #05191a 50%);
          transition: background-position 0.4s ease-out, color 0.4s ease-out;
          color: #05191a;
          border: 1px solid #78BE20;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
        }
        .event-btn:hover {
          background-position: -100% 0;
          color: #78BE20;
        }
        /* Custom cursor classes for the knob */
        .knob-container { cursor: grab; }
        .knob-container:active { cursor: grabbing; }
      `}</style>

      {/* --- RADAR ANIMATION CONTAINER --- */}
      <div style={{ 
          position: 'relative', 
          width: '300px', 
          height: '300px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: '2rem',
          borderRadius: '50%', 
      }}>
        
        {/* INTERACTIVE CENTER KNOB 
            We replaced the standard div with motion.div to handle 'onPan' and 'style={{ rotate }}'
        */}
        <motion.button
            type="button"
            aria-label="Rotate the signal scanner"
            className="knob-container"
            style={{ 
                zIndex: 10, 
                background: '#092C2E', 
                padding: '1.5rem', 
                borderRadius: '50%', 
                border: '2px solid #78BE20',
                rotate: knobRotation, // Bind the rotation to the motion value
                touchAction: 'none' // Prevents scrolling on mobile while twisting
            }}
            onPan={handlePan} // Listens for drag gestures
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                knobRotation.set(knobRotation.get() + 15);
              }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                knobRotation.set(knobRotation.get() - 15);
              }
            }}
            whileTap={{ scale: 0.95 }} // Visual feedback when pressing
            whileHover={{ scale: 1.05 }}
        >
            <Radio size={48} color="#78BE20" style={{ pointerEvents: 'none' }} />
        </motion.button>

        {/* Pulsing Rings (The "Signal") */}
        <motion.div 
            variants={pulseVariant}
            initial="initial"
            animate="animate"
            style={{ 
                position: 'absolute', width: '100%', height: '100%', 
                borderRadius: '50%', border: '2px solid rgba(120, 190, 32, 0.5)',
                zIndex: 1,
                pointerEvents: 'none' // Pass clicks through to the background
            }} 
        />
        <motion.div 
            variants={pulseVariant}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.8, duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            style={{ 
                position: 'absolute', width: '100%', height: '100%', 
                borderRadius: '50%', border: '1px solid rgba(120, 190, 32, 0.3)',
                zIndex: 1,
                pointerEvents: 'none'
            }} 
        />

        {/* The Rotating Scanner Line */}
        <motion.div
            variants={scannerVariant}
            animate="animate"
            style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(120, 190, 32, 0.2) 360deg)',
                zIndex: 2,
                border: '1px solid rgba(120, 190, 32, 0.1)',
                pointerEvents: 'none'
            }}
        />
      </div>

      {/* --- TEXT CONTENT --- */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        animate="visible"
        style={{ textAlign: 'center', maxWidth: '600px', zIndex: 20, padding: '0 1rem' }}
      >
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          fontWeight: '800',
          color: 'white',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}>
          Awaiting <span style={{ color: '#78BE20' }}>Transmission</span>
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: 'inherit',
          marginBottom: '2.5rem',
          lineHeight: '1.6'
        }}>
          Our sensors are currently scanning for the next big event. 
          <br />
          Stay tuned to this frequency for updates.
        </p>

        {/* --- BUTTON --- */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/events/past" className="event-btn">
                VIEW PAST EVENTS <ArrowRight size={18} />
            </Link>
        </div>

      </motion.div>
    </div>
  );
}
