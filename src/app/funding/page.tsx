'use client';

import { useState, useEffect, cloneElement, JSX } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, GraduationCap, Plane, Users, ArrowRight, Globe, X, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

// --- Types ---
interface ModalContent {
  overview: string;
  benefits: string[];
  eligibility: string[];
  deadline: string;
}

interface Opportunity {
  id: string;
  title: string;
  icon: JSX.Element;
  shortDesc: string;
  link: string;
  image?: string;
  imageCaption?: string;
  modalContent: ModalContent;
}

// --- Data ---
const opportunities: Opportunity[] = [
  {
    id: 'scholarship',
    title: "SPS Scholarship Program",
    icon: <GraduationCap size={40} className="icon-svg" />, 
    shortDesc: "Financial support for students exhibiting commitment to signal processing education.",
    link: "https://signalprocessingsociety.org/community-involvement/sps-scholarship-program",
    // Ensure you have this image in public/ folder or remove this line
    image: "/scholarship-abirami.png", 
    imageCaption: "Proud recipient of the IEEE SPS Scholarship",
    modalContent: {
      overview: "The IEEE SPS Scholarship Program creates a pool of potential future leaders by supporting students who have exhibited creativity and high aptitude in the Signal Processing field.",
      benefits: ["Up to US$7,000 total (spread over 3 years)", "Certificate of recognition", "Global exposure in SPS publications"],
      eligibility: ["Must be an active IEEE SPS Student Member", "Must be a Junior, Senior, or Graduate student", "Must have completed at least 30 credit hours"],
      deadline: "Annual Cycle"
    }
  },
  {
    id: 'travel',
    title: "Travel Grants",
    icon: <Plane size={40} className="icon-svg" />, 
    shortDesc: "Support for authors presenting papers at flagship conferences like ICASSP and ICIP.",
    link: "https://signalprocessingsociety.org/events/sps-travel-grants",
    modalContent: {
      overview: "Travel grants are available to students and non-student members who have paper acceptances at major SPS conferences (ICASSP, ICIP, etc.) but need financial assistance to attend.",
      benefits: ["US$500 - US$1,000 (varies by region)", "Covers airfare, accommodation, or registration"],
      eligibility: ["Paper accepted at the conference", "Must be the presenting author", "IEEE SPS Membership required"],
      deadline: "Conference Cycle"
    }
  },
  {
    id: 'initiatives',
    title: "Member Driven Initiatives",
    icon: <Globe size={40} className="icon-svg" />, 
    shortDesc: "Funding for local chapters to organize forums, regional meetings, and seasonal schools.",
    link: "https://signalprocessingsociety.org/get-involved/member-driven-initiatives",
    modalContent: {
      overview: "The Member Driven Initiatives (MDI) program allows chapters to propose local events like workshops, seasonal schools, or forums. This empowers members to create value relevant to their specific region.",
      benefits: ["Up to US$5,000 for approved events", "Support for Seasonal Schools & Forums"],
      eligibility: ["Proposal must be submitted by Chapter Chair", "Event must be technical in nature"],
      deadline: "Bi-Annual Cycle"
    }
  },
  {
    id: 'support',
    title: "Chapter Support",
    icon: <Users size={40} className="icon-svg" />, 
    shortDesc: "Operational funding for Student Branch Chapters to host speakers and career activities.",
    link: "https://signalprocessingsociety.org/community/chapters",
    modalContent: {
      overview: "SPS provides annual funding to keep chapters active and vibrant. This includes support for inviting Distinguished Lecturers (DLs) and general operating expenses.",
      benefits: ["US$500 Annual Operating Grant", "US$3,500 max for Distinguished Lecturer travel", "US$25 reward per new member recruited"],
      eligibility: ["Active status (min. 2 reports filed)", "Min. 6 active members"],
      deadline: "Annual Cycle"
    }
  }
];

export default function FundingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = opportunities.find(item => item.id === selectedId);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section style={{ padding: '5rem 1rem', color: 'white', minHeight: '100vh', position: 'relative' }}>
      
      <style>{`
        .glass-backdrop {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background-color: rgba(5, 20, 35, 0.85);
        }

        .modal-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(120, 190, 32, 0.5) rgba(255, 255, 255, 0.05);
        }
        .modal-scrollbar::-webkit-scrollbar {
          width: 8px; 
        }
        .modal-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(120, 190, 32, 0.5); 
          border-radius: 4px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(120, 190, 32, 0.8);
        }

        .icon-box {
          background-color: rgba(120, 190, 32, 0.1);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .icon-svg {
          stroke: #78BE20;
          transition: stroke 0.3s ease;
        }

        .card-hover:hover .icon-box {
          background-color: #78BE20 !important;
          transform: scale(1.1);
        }
        .card-hover:hover .icon-svg {
          stroke: #0F5156 !important;
        }
        
        .card-hover:focus {
           outline: 2px solid #78BE20;
           outline-offset: 4px;
        }

        .event-btn {
          background-size: 200% 100%;
          background-image: linear-gradient(to right, #78BE20 50%, #05191a 50%);
          transition: background-position 0.4s ease-out, color 0.4s ease-out;
          color: #05191a;
          border: 1px solid #78BE20;
          display: inline-flex;
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
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              marginBottom: '1rem',
              fontWeight: '800',
              letterSpacing: '-0.025em',
              color: '#78BE20',
            }}
          >
            FUNDING{' '}
            <span style={{ color: '#ffffff', fontWeight: '900' }}>
              OPPORTUNITIES
            </span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'inherit', maxWidth: '700px', margin: '0 auto', fontWeight: '700', lineHeight: 1.6 }}>
            Explore grants, scholarships, and financial support available to IEEE SPS members to foster innovation and professional growth.
          </p>
        </motion.div>

        {/* GRID OF CARDS */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center', 
          gap: '2.5rem',
          marginBottom: '5rem'
        }}>
          {opportunities.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`} 
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              className="card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: '#0F5156',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                flex: '1 1 300px',
                maxWidth: '400px'
              }}
            >
              <div>
                <motion.div 
                  className="icon-box"
                  layoutId={`icon-${item.id}`}
                  style={{ 
                    width: 'fit-content', 
                    padding: '1rem', 
                    borderRadius: '1rem', 
                    margin: '0 auto 1.5rem auto' 
                  }}
                >
                  {item.icon}
                </motion.div>

                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#E0F2FE', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9, textAlign: 'center' }}>
                  {item.shortDesc}
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#78BE20', fontWeight: '700', fontSize: '0.95rem' }}>
                VIEW DETAILS <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
           {/* Assuming you have a mentoring page, otherwise change href */}
           <Link href="/mentoring" className="event-btn">
            <motion.span
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE MENTORING PROGRAMS <ArrowRight size={18} />
            </motion.span>
          </Link>
        </div>

      </div>

      {/* MODAL PORTAL */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-backdrop"
              style={{
                position: 'fixed', 
                inset: 0, 
                zIndex: 11000, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '1rem'
              }}
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                layoutId={`card-${selectedId}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="funding-modal-title"
                onClick={(e) => e.stopPropagation()} 
                style={{
                  backgroundColor: '#092C2E', 
                  width: '100%', 
                  maxWidth: '700px',
                  borderRadius: '1.5rem', 
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(120, 190, 32, 0.3)',
                  maxHeight: '90vh',
                  display: 'flex', 
                  flexDirection: 'column'
                }}
              >
                {/* Modal Header */}
                <div style={{ 
                    padding: '2rem', 
                    background: 'linear-gradient(to right, rgba(120, 190, 32, 0.1), transparent)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start' 
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <motion.div 
                        layoutId={`icon-${selectedId}`} 
                        style={{ backgroundColor: 'rgba(120, 190, 32, 0.15)', padding: '0.75rem', borderRadius: '0.75rem' }}
                    >
                        {cloneElement(selectedItem.icon, { color: '#78BE20', className: '' })}
                    </motion.div>
                    <h2 id="funding-modal-title" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '800', color: 'white', margin: 0, lineHeight: 1.2 }}>
                      {selectedItem.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    aria-label="Close funding details"
                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.5rem' }}
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="modal-scrollbar" style={{ padding: '2.5rem', overflowY: 'auto' }}>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#E0F2FE', marginBottom: '2rem' }}>
                    {selectedItem.modalContent.overview}
                  </p>

                  {/* Optional Image Section */}
                  {selectedItem.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(120, 190, 32, 0.3)' }}>
                             <Image 
                                src={selectedItem.image}
                                alt="Scholarship Recipient"
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                             />
                        </div>
                        {selectedItem.imageCaption && (
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                {selectedItem.imageCaption}
                            </span>
                        )}
                    </motion.div>
                  )}

                  {/* Details Grid */}
                  <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    {/* Benefits Column */}
                    <div>
                      <h4 style={{ color: '#78BE20', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={18}/> BENEFITS & FUNDING
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedItem.modalContent.benefits.map((point, idx) => (
                          <li key={idx} style={{ marginBottom: '0.75rem', color: 'rgba(255,255,255,0.9)', display: 'flex', gap: '0.75rem', fontSize: '0.95rem' }}>
                            <span style={{ color: '#78BE20', marginTop: '4px' }}>•</span> {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Eligibility Column */}
                    <div>
                      <h4 style={{ color: '#78BE20', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={18}/> ELIGIBILITY
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedItem.modalContent.eligibility.map((point, idx) => (
                          <li key={idx} style={{ marginBottom: '0.75rem', color: 'rgba(255,255,255,0.9)', display: 'flex', gap: '0.75rem', fontSize: '0.95rem' }}>
                            <span style={{ color: '#78BE20', marginTop: '4px' }}>•</span> {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Deadline Footer */}
                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Calendar size={20} color="#78BE20" />
                      <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>
                        {selectedItem.modalContent.deadline}
                      </span>
                  </div>
                </div>

                {/* External Link Footer */}
                <div style={{ padding: '1.5rem 2.5rem', backgroundColor: 'rgba(0,0,0,0.2)', textAlign: 'right' }}>
                  <motion.a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Visit Official Page <ExternalLink size={16}/>
                  </motion.a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
