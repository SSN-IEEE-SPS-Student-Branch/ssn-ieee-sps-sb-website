'use client';

import { useState, useEffect, cloneElement, JSX } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Lightbulb, 
  Map, 
  MessageCircle, 
  ArrowRight, 
  X, 
  Calendar, 
  CheckCircle, 
  Target,
  ExternalLink
} from 'lucide-react';

// --- Types ---
interface ModalContent {
  overview: string;
  benefits: string[];
  eligibility: string[];
  deadline: string;
}

interface MentoringProgram {
  id: string;
  title: string;
  link: string;
  icon: JSX.Element;
  image?: string;
  imageCaption?: string;
  shortDesc: string;
  modalContent: ModalContent;
}

// --- Data ---
const mentoringPrograms: MentoringProgram[] = [
  {
    id: 'sigma',
    title: "SigMA Program",
    link: "https://signalprocessingsociety.org/professional-development/signal-processing-mentorship-academy-sigma-program",
    icon: <Lightbulb size={40} className="icon-svg" />,
    // Ensure this image exists in your /public folder
    image: "/augustine-funding.png", 
    imageCaption: "Proud recipient of the SigMA Funding", 
    shortDesc: "Signal Processing Mentorship Academy: 9-month collaborative research projects for young researchers.",
    modalContent: {
      overview: "The Signal Processing Mentorship Academy (SigMA) is a flagship initiative designed to provide mentoring experiences for young researchers by pairing them with established researchers in signal processing from different institutions (typically in another country). The program focuses on developing technical research skills, professional growth, and international collaboration.",
      benefits: [
        "Funding (US$2,000 - $4,000) for conference travel and lab visits",
        "Joint research paper submission to ICASSP",
        "Access to computational resources and datasets provided by the mentor",
        "Participation in the exclusive SigMA event at ICASSP"
      ],
      eligibility: [
        "Undergraduate or Graduate student (MSc/PhD)",
        "Active IEEE SPS Member (Student/Graduate Student grade)",
        "Must submit a joint project proposal with a mentor from a different institution"
      ],
      deadline: "Annual Cycle (Call for Proposals: Oct-Dec; Projects Start: Jan)"
    }
  },
  {
    id: 'mime',
    title: "MiME Program",
    link: "https://signalprocessingsociety.org/professional-development/micro-mentoring-experience-program",
    icon: <Map size={40} className="icon-svg" />,
    shortDesc: "Micro Mentoring Experience: Short-term guidance for navigating flagship conferences like ICASSP and ICIP.",
    modalContent: {
      overview: "The Micro Mentoring Experience (MiME) aims to enhance the conference experience for first-time attendees. Mentees are paired with experienced society members to help them navigate technical sessions, plenaries, and social events at major SPS conferences (ICASSP, ICIP). It is designed to make large conferences less intimidating and more productive.",
      benefits: [
        "Personalized advice on session selection and technical tracks",
        "Networking breakfast/meetups at the conference",
        "Introduction to relevant players and leaders in your research area",
        "Guidance on navigating the conference venue and social events"
      ],
      eligibility: [
        "First-time attendee at ICASSP or ICIP",
        "Students, Young Professionals, or Mid-career researchers",
        "Must be registered for the specific conference"
      ],
      deadline: "Conference Cycle (Apply 1-2 months prior to ICASSP/ICIP)"
    }
  },
  {
    id: 'me-uyr',
    title: "ME-UYR Program",
    link: "https://signalprocessingsociety.org/tags/me-uyr-program",
    icon: <Users size={40} className="icon-svg" />,
    shortDesc: "Mentoring Experiences for Underrepresented Young Researchers in Signal Processing.",
    modalContent: {
      overview: "ME-UYR connects young researchers from underrepresented groups (women, minorities, and other underrepresented demographics in SPS) with established mentors. The goal is to address diversity issues in SPS by fostering collaborative research projects that support the retention and growth of diverse talent in the field.",
      benefits: [
        "9-month guided collaborative research project",
        "Support for submitting a paper to a special ME-UYR session at ICASSP",
        "Travel grants for conference attendance (irrespective of paper acceptance)",
        "Virtual 'Students Meet Mentors' connecting events"
      ],
      eligibility: [
        "Member of an underrepresented group in SPS (Gender/Region/Ethnicity)",
        "Undergraduate or Graduate student",
        "Active IEEE SPS Membership required"
      ],
      deadline: "Annual Cycle (Call for Proposals: Fall/Sept-Oct)"
    }
  },
  {
    id: 'collabratec',
    title: "IEEE Mentoring",
    link: "https://signalprocessingsociety.org/professional-development",
    icon: <MessageCircle size={40} className="icon-svg" />,
    shortDesc: "A personalized mentoring partnership available to all IEEE members via IEEE Collabratec.",
    modalContent: {
      overview: "The IEEE Mentoring Program creates a partnership between an experienced IEEE member and a student or young professional. Unlike the research-focused SPS specific programs, this covers a broad range of topics including career planning, soft skills, leadership, volunteering, and general technical guidance.",
      benefits: [
        "Flexible structure (career, technical, or leadership focus)",
        "Access to a global network of potential mentors via IEEE Collabratec",
        "Self-paced interaction tailored to your schedule",
        "Official recognition of mentoring service for mentors"
      ],
      eligibility: [
        "Active IEEE Member (Student, Professional, or Life Member)",
        "Must have an active IEEE Collabratec account",
        "Open to all technical fields, not just Signal Processing"
      ],
      deadline: "Open Year-Round (Rolling Applications)"
    }
  }
];

export default function MentoringPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = mentoringPrograms.find(item => item.id === selectedId);

  // Handle hydration mismatch and body scroll locking
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden'; // Lock background scroll
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  // Helper for keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedId(id);
    }
  };

  return (
    <section style={{ padding: '5rem 1rem', color: 'white', minHeight: '100vh', position: 'relative' }}>
      
      <style>{`
        .glass-backdrop {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background-color: rgba(5, 20, 35, 0.85);
        }

        /* --- CUSTOM SCROLLBAR --- */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(120, 190, 32, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 190, 32, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(120, 190, 32, 0.5) rgba(255, 255, 255, 0.05);
        }

        /* --- STYLES FOR ICON HOVER --- */
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
        .card-hover:focus-visible {
           outline: 3px solid #78BE20;
           outline-offset: 4px;
        }

        /* --- NEW BUTTON STYLE --- */
        .event-btn {
          background-size: 200% 100%;
          /* Gradient: Left (50%) is Green, Right (50%) is Dark */
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
        
        {/* Header */}
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
            MENTORING{' '}
            <span style={{ color: '#ffffff', fontWeight: '900' }}>
              PROGRAMS
            </span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'inherit', maxWidth: '700px', margin: '0 auto', fontWeight: '700', lineHeight: 1.6 }}>
            Connect with global leaders, researchers, and professionals in Signal Processing to accelerate your career and research.
          </p>
        </motion.div>

        {/* Card Grid */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center', 
          gap: '2.5rem',
          marginBottom: '5rem'
        }}>
          {mentoringPrograms.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              role="button" 
              tabIndex={0}
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
                flex: '1 1 350px',
                maxWidth: '450px', 
                minWidth: '300px'
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

        {/* --- BOTTOM CTA BUTTONS --- */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '1.5rem', 
          marginTop: '3rem',
          flexWrap: 'wrap' 
        }}>
           
           {/* Link back to funding */}
           <Link href="/funding" className="event-btn">
            <motion.span
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE FUNDING PROGRAMS <ArrowRight size={18} />
            </motion.span>
          </Link>

           {/* Link to Membership */}
           <motion.a
              href="https://signalprocessingsociety.org/community-involvement/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="event-btn"
              whileTap={{ scale: 0.95 }}
            >
              JOIN IEEE SPS <ExternalLink size={18} />
          </motion.a>

        </div>

      </div>

      {/* --- POPUP MODAL --- */}
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
                aria-labelledby="mentoring-modal-title"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
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
                <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <motion.div 
                        layoutId={`icon-${selectedId}`}
                        style={{ backgroundColor: 'rgba(120, 190, 32, 0.1)', padding: '0.75rem', borderRadius: '0.75rem' }}
                    >
                        {cloneElement(selectedItem.icon, { color: '#78BE20', className: '' })}
                    </motion.div>
                    <h2 id="mentoring-modal-title" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '800', color: 'white', margin: 0 }}>
                      {selectedItem.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.5rem' }}
                    aria-label="Close modal"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Modal Scrollable Content */}
                <div className="custom-scrollbar" style={{ padding: '2.5rem', overflowY: 'auto' }}>
                  
                  {/* OPTIONAL IMAGE FOR SIGMA with CAPTION */}
                  {selectedItem.image && (
                    <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(120, 190, 32, 0.3)', width: '100%', maxWidth: '500px' }}>
                        <Image 
                          src={selectedItem.image} 
                          alt={selectedItem.title} 
                          width={600}
                          height={400}
                          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                        />
                      </div>
                      {selectedItem.imageCaption && (
                          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                             {selectedItem.imageCaption}
                          </span>
                       )}
                    </div>
                  )}
                  
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#E0F2FE', marginBottom: '2rem' }}>
                    {selectedItem.modalContent.overview}
                  </p>

                  <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    
                    {/* Benefits Section */}
                    <div>
                      <h4 style={{ color: '#78BE20', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Target size={18}/> PROGRAM BENEFITS
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedItem.modalContent.benefits.map((point, idx) => (
                          <li key={idx} style={{ marginBottom: '0.75rem', color: 'rgba(255,255,255,0.9)', display: 'flex', gap: '0.75rem', fontSize: '0.95rem' }}>
                            <span style={{ color: '#78BE20', marginTop: '4px' }}>•</span> {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Eligibility Section */}
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

                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Calendar size={20} color="#78BE20" />
                      <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>
                        {selectedItem.modalContent.deadline}
                      </span>
                  </div>

                </div>

                {/* Modal Footer with Dynamic Link */}
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
                      View Official Program Details <ExternalLink size={16}/>
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
