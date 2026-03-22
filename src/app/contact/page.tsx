'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Plus, Minus, Send, CheckCircle, AlertCircle, Linkedin, Instagram, Globe, Youtube, User } from 'lucide-react';

// --- ANIMATION VARIANTS (Typed to fix TS Error) ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

// --- SIGNAL WAVE SEPARATOR ---
const SignalWaveSeparator = () => (
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
        strokeWidth="4"
      />
      <path
        d="M1200,60 C1350,120 1350,0 1500,60 C1650,120 1650,0 1800,60 C1950,120 1950,0 2100,60 C2250,120 2250,0 2400,60 V120 H1200 V60 Z"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="4"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="50%" stopColor="#78BE20" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
      </defs>
    </motion.svg>
  </div>
);

// --- FAQ COMPONENT ---
const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.75rem' }}>
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.75rem 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
      }}
    >
      <span style={{ fontWeight: '700', color: isOpen ? '#78BE20' : 'white', fontSize: '1.5rem', transition: 'color 0.3s' }}>
        {question}
      </span>
      {isOpen ? <Minus size={18} color="#78BE20" /> : <Plus size={18} color="rgba(255,255,255,0.7)" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{ color: '#cbd5e1', fontSize: '1.3rem', lineHeight: '1.5', paddingBottom: '1rem' }}>
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'How do I become a member?', a: 'Visit our Current Members page and fill out the membership application form. IEEE membership is required.' },
    { q: 'How do I apply for funding?', a: 'Visit our Funding page to see available opportunities and application procedures for each program.' },
    { q: 'Are events free for members?', a: 'Most events are free for IEEE members. Some specialized workshops may have a nominal fee.' },
    { q: 'Do you offer mentoring?', a: 'Yes, we have comprehensive mentoring programs. Check our Mentoring page for different program options.' },
    { q: 'Can I contribute to the magazine?', a: 'Yes! Check our Magazine page for submission guidelines and deadlines for different types of articles.' },
    { q: 'Where are events held?', a: 'Most events are held at SSN College of Engineering. Specific venues are mentioned in event details.' },
  ];

  // --- STYLES ---
  const cardStyle = {
    padding: '2rem',
    borderRadius: '1.5rem',
    backgroundColor: '#092C2E',
    border: '1px solid rgba(120, 190, 32, 0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    color: 'white',
    height: '95%',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const inputStyle = {
    width: '95%',
    padding: '1rem 1.2rem',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '0.6rem',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '600'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '700',
    marginBottom: '0.6rem',
    color: '#cbd5e1',
    letterSpacing: '0.02em'
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <style>{`
        .contact-input:focus {
          border-color: #78BE20 !important;
          background-color: rgba(120, 190, 32, 0.05) !important;
          box-shadow: 0 0 0 4px rgba(120, 190, 32, 0.1);
        }
        .contact-grid {
          width: 60%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .contact-grid {
             width: 95%;
          }
        }
        .submit-btn {
          background-size: 200% 100%;
          background-image: linear-gradient(to right, #78BE20 50%, #05191a 50%);
          transition: background-position 0.4s ease-out, color 0.4s ease-out;
          color: #05191a;
        }
        .submit-btn:hover {
          background-position: -100% 0;
          color: #78BE20;
          border: 1px solid #78BE20;
        }
      `}</style>

      {/* --- SECTION 1: HEADER & CARDS --- */}
      <section style={{ padding: '3rem 1rem 5rem 1rem', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1.1 }}>
              <span style={{ color: '#78BE20' }}>CONTACT </span> US
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'inherit', maxWidth: '600px', margin: '0 auto' }}>
              Have questions? We'd love to hear from you.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'inherit', maxWidth: '600px', margin: '0 auto' }}>
              Feel free to reach out to us using the contact information below.
            </p>
          </motion.div>

          <div className="contact-grid">
            {/* Info Card */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -5, transition: { duration: 0.1 } }} // HOVER EFFECT ADDED
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ height: '100%' }}
            >
              <div style={cardStyle}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>
                  Contact Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '1.5rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <InfoItem icon={<User size={20} />} label="Faculty Coordinator" value="Dr. Vijay Jeyakumar" />
                    <InfoItem icon={<Mail size={20} />} label="Email" value="ieeespssb@ssn.edu.in" href="mailto:ieeespssb@ssn.edu.in" />
                    <InfoItem icon={<MapPin size={20} />} label="Location" value="SSN College of Engineering, Chennai" />
                    <InfoItem icon={<Clock size={20} />} label="Hours" value="Mon - Fri: 9:00 AM - 4:00 PM" />
                  </ul>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '1rem', textTransform: 'uppercase' }}>Follow Us</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/company/ssn-ieee-signal-processing-society/" />
                      <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/ieee_sps_ssn/" />
                      <SocialIcon icon={<Globe size={20} />} href="https://signalprocessingsociety.org/" />
                      <SocialIcon icon={<Youtube size={20} />} href="https://www.youtube.com/@IEEESSNSPSSB" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: MAP (TRANSPARENT - NO BACKGROUND) --- */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Top Wave */}
        <SignalWaveSeparator />

        {/* Map Content Wrapper */}
        <div style={{ width: '100%', maxWidth: '1200px', padding: '1rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Headline */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', margin: 0 }}>
              FIND <span style={{ color: '#78BE20' }}>US</span>
            </h2>
          </div>

          {/* Map - HOVER EFFECT ADDED */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }} // HOVER EFFECT
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ height: '500px', width: '100%', borderRadius: '1.5rem', overflow: 'hidden' }}
          >
            <iframe
              src="https://maps.google.com/maps?q=SSN+College+of+Engineering&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 'none',
                filter: 'grayscale(100%) invert(90%) hue-rotate(180deg)',
                display: 'block'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <SignalWaveSeparator />

      </section>

      {/* --- SECTION 3: FAQ --- */}
      <section style={{ padding: '2rem 1rem 4rem 1rem' }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white' }}>
              FREQUENTLY ASKED <span style={{ color: '#78BE20' }}>QUESTIONS</span>
            </h2>
          </div>

          {/* FAQ CONTAINER - HOVER EFFECT ADDED */}
          <motion.div
            style={{ ...cardStyle, maxWidth: '800px', margin: '0 auto', height: 'auto', padding: '2rem' }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }} // HOVER EFFECT
          >
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}

function InfoItem({ icon, label, value, href }: any) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
      <div style={{ color: '#78BE20', marginTop: '0.1rem' }}>{icon}</div>
      <div>
        <span style={{ fontWeight: '700', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</span>
        {href ? (
          <a href={href} style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#78BE20'} onMouseOut={e => e.currentTarget.style.color = 'white'}>
            {value}
          </a>
        ) : (
          <span style={{ color: 'white', fontWeight: '600', fontSize: '1.05rem' }}>{value}</span>
        )}
      </div>
    </li>
  );
}

function SocialIcon({ icon, href }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
        transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)'
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = '#78BE20';
        e.currentTarget.style.color = '#05191a';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon}
    </a>
  )
}