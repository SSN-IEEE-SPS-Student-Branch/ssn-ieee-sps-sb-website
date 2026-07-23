'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Calendar, ArrowUpRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Image from 'next/image';

interface PastEvent {
  id: number;
  category: string;
  title: string;
  image: string;
  description: string;
  fullDescription: string;
  date: string;
  time?: string;
  venue?: string;
  speaker?: string;
}

// --- DATA (Reordered: Most Recent First | Rewritten: Professional & Concise) ---
const eventsData: PastEvent[] = [
  {
    id: 16,
    category: 'Competitions',
    title: 'Circuit-O-Poly',
    image: '/events/event-16-1.jpg',
    description: 'A strategic fusion of Monopoly and circuit design. Teams rolled dice to collect components, build functional circuits, and debug challenges in a race against time.',
    fullDescription: 'Circuit-O-Poly gamified the fundamentals of electrical engineering by blending strategy with technical application. Unlike traditional Monopoly, players acquired resistors, capacitors, and microchips instead of property. The objective was to construct specific circuits while navigating "chance" cards that introduced real-world debugging scenarios. This format tested both theoretical knowledge and on-the-spot troubleshooting skills in a high-energy, collaborative environment.',
    date: 'JAN 09, 2026',
    time: '9:00 AM - 3:00 PM',
    venue: 'PG Lab, BME'
  },
  {
    id: 15,
    category: 'Talks',
    title: 'Mapping Neuromuscular Pathways',
    image: '/events/event-15-1.png',
    description: 'An expert session on non-invasive multimodal techniques for biomedical analysis, featuring insights on advanced signal processing in neuromuscular research.',
    fullDescription: 'Organized by the IEEE Photonics Society SSN SB, this session focused on cutting-edge non-invasive methods to map neuromuscular functions. Alumna Supraja Vaidhyanathan presented recent breakthroughs in multimodal signal acquisition, discussing how integrating different data sources leads to more accurate diagnostics. The talk bridged the gap between academic theory and clinical application, offering students a clear view of current trends in biomedical engineering research.',
    date: 'JAN 07, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Central Seminar Hall',
    speaker: 'Supraja Vaidhyanathan'
  },
  {
    id: 14,
    category: 'Workshops',
    title: 'Optimization Techniques with MathWorks',
    image: '/events/event-14-1.png',
    description: 'A comprehensive two-day training on MATLAB optimization tools, bridging theoretical math with practical engineering problem-solving.',
    fullDescription: 'Collaborating with the BME Department, this workshop delivered intensive hands-on training using MathWorks suites. Senior Application Engineer Afsal S. guided participants through linear and non-linear optimization problems, demonstrating how to leverage MATLAB for complex data modeling. The curriculum was designed for immediate application, helping researchers and students reduce computation time and improve algorithm efficiency in their respective projects.',
    date: 'SEP 10 - SEP 11, 2025',
    time: '9:00 AM - 3:00 PM',
    venue: 'MSDM Lab, BME',
    speaker: 'Mr. Afsal S.'
  },
  {
    id: 13,
    category: 'Workshops',
    title: 'Student Outreach Program',
    image: '/events/event-13-1.jpeg',
    description: 'An interactive STEM initiative for Mahindra World School students, designed to spark curiosity through live demonstrations and basic electronics experiments.',
    fullDescription: 'The SSN IIC and IEEE SPS team hosted students from Mahindra World School for a day of exploration. The program moved beyond textbooks, allowing students to handle basic electronic components and witness live signal processing demos. The goal was to demystify engineering concepts early on, encouraging these young minds to ask questions and view technology as a tool for creative problem-solving.',
    date: 'AUG 27, 2025',
    venue: 'SSN Campus'
  },
  {
    id: 12,
    category: 'Talks',
    title: '"From Pixels to Insights": Computer Vision',
    image: '/events/event-12-1.png',
    description: 'The inaugural keynote for the SSN IEEE SPS Student Chapter, exploring the evolution of computer vision and its ability to extract meaning from digital imagery.',
    fullDescription: 'Marking the official launch of the IEEE Signal Processing Society Student Branch, Dr. Sainarayanan Gopalakrishnan delivered a keynote on the journey from raw pixel data to actionable intelligence. He covered the progression of image recognition algorithms and their modern industrial applications. The event established the chapter’s mission to serve as a hub for research and professional networking in the signal processing domain.',
    date: 'AUG 13, 2025',
    time: '10:00 AM - 1:00 PM',
    venue: 'Central Seminar Hall',
    speaker: 'Dr. Sainarayanan Gopalakrishnan'
  },
  {
    id: 11,
    category: 'Talks',
    title: 'Intelligent Spectrum Utilization in 5G/B5G',
    image: '/events/event-11-1.png',
    description: 'A deep dive into spectrum management challenges and signal processing solutions for next-generation wireless networks.',
    fullDescription: 'As part of the IEEE SPS Day Series, S. Chris Prema from IIST Thiruvananthapuram addressed the critical issue of spectrum scarcity. The lecture examined intelligent allocation techniques required for 5G and Beyond-5G (B5G) networks. Participants gained insight into cognitive radio, dynamic spectrum access, and the signal processing algorithms that enable faster, more reliable global communication infrastructure.',
    date: 'JUN 04, 2025',
    time: '10:00 AM - 1:00 PM',
    venue: 'Central Seminar Hall (Online)',
    speaker: 'S. Chris Prema'
  },
  {
    id: 10,
    category: 'Talks',
    title: 'Brain Computer Interface (BCI)',
    image: '/events/event-10-1.png',
    description: 'An exploration of BCI fundamentals and their transformative potential in healthcare, rehabilitation, and human-computer interaction.',
    fullDescription: 'Dr. Chandra Prakash from SVNIT Surat led this session on the convergence of neuroscience and engineering. The talk detailed how BCI systems acquire brain signals to control external devices, offering hope for patients with motor disabilities. Discussions included signal acquisition challenges, feature extraction methods, and the ethical considerations surrounding direct brain-machine communication.',
    date: 'JUN 02, 2025',
    time: '10:00 AM - 1:00 PM',
    venue: 'Central Seminar Hall (Online)',
    speaker: 'Dr. Chandra Prakash'
  },
  {
    id: 9,
    category: 'Talks',
    title: 'Alumni Talk Series: Ask Us Anything',
    image: '/events/event-9-1.png',
    description: 'A mentorship session with SSN alumni from top global universities, focusing on scholarship strategies, applications, and career planning.',
    fullDescription: 'This interactive panel featured alumni currently at McGill, University of Alabama, and University of Houston. Moving beyond generic advice, the speakers broke down the specifics of drafting compelling Statements of Purpose (SOPs), securing funding, and adapting to academic life abroad. It provided a roadmap for current students aiming for higher education in competitive international environments.',
    date: 'FEB 22, 2025',
    time: '9:00 AM - 12:00 PM',
    venue: 'MSDM Lab, BME',
    speaker: 'Gurucharan M, Chetana K, Supraja V'
  },
  {
    id: 8,
    category: 'Competitions',
    title: 'Dots and Dashes',
    image: '/events/event-7-1.png',
    description: 'A fast-paced decoding challenge testing proficiency in Semaphore and Morse code through competitive team-based rounds.',
    fullDescription: 'Celebrating fundamental communication methods, this event pitted teams against each other in "Semaphore Showdown" and "Morse Code Mayhem." Speed and accuracy were paramount as participants translated visual and auditory signals under strict time limits. The event served as a fun, high-pressure reminder of the coding schemes that formed the bedrock of modern telecommunications.',
    date: 'OCT 28, 2024',
    time: '11:30 AM - 1:00 PM',
    venue: 'Mini Auditorium'
  },
  {
    id: 7,
    category: 'Workshops',
    title: 'Medical Device Design & Development',
    image: '/events/event-6-1.png',
    description: 'A two-day industrial workshop with Autodesk, teaching the end-to-end workflow of visualizing and prototyping medical devices.',
    fullDescription: 'Focusing on the transition from concept to CAD, this workshop utilized Autodesk’s professional suite to design medical products. Participants learned to model complex geometries required for ergonomic medical devices and simulate their mechanical properties. The sessions emphasized industry standards for documentation and design iteration, essential skills for anyone entering the biomedical manufacturing sector.',
    date: 'OCT 07 - OCT 08, 2024',
    time: '8:30 AM - 3:30 PM',
    venue: 'MSDM Lab, BME'
  },
  {
    id: 6,
    category: 'Talks',
    title: 'Signal Processing for Healthcare',
    image: '/events/event-5-1.png',
    description: 'A technical lecture by Dr. K. V. S. Hari (IISc Bengaluru) on the impact of advanced signal processing in modern diagnostic tools.',
    fullDescription: 'Dr. Hari, a leading voice in the field, discussed how signal processing algorithms are enhancing the resolution and reliability of healthcare systems. From radar-based vital sign monitoring to noise reduction in medical imaging, the talk illustrated the mathematical backbone of medical technology. It was a deep dive into how abstract equations translate into life-saving devices.',
    date: 'AUG 30, 2024',
    time: '2:00 PM - 3:00 PM',
    venue: 'Justice Pratap Singh Auditorium',
    speaker: 'Dr. Hari K V S'
  },
  {
    id: 5,
    category: 'Talks',
    title: 'Quantum Computing & Applications',
    image: '/events/event-4-1.png',
    description: 'An introductory session on the paradigm shift of Quantum Computing and its potential to solve previously intractable problems.',
    fullDescription: 'Karthiganesh Durai, CEO of KwantumG Research, demystified the principles of superposition and entanglement. The session moved quickly from theory to potential applications, specifically how quantum algorithms could revolutionize cryptography and material science. It provided a glimpse into the future of computation, encouraging students to prepare for the post-silicon era.',
    date: 'AUG 05, 2024',
    time: '10:00 AM - 1:00 PM',
    venue: 'Central Seminar Hall',
    speaker: 'Mr. Karthiganesh D'
  },
  {
    id: 4,
    category: 'Talks',
    title: 'Deep Oscillatory Neural Networks',
    image: '/events/event-3-1.png',
    description: 'A specialized talk on neuromorphic computing architectures and their advantages in pattern recognition and signal processing tasks.',
    fullDescription: 'Prof. V. Srinivasa Chakravarthy from IIT Madras presented his research on Deep Oscillatory Neural Networks (DONNs). Unlike standard ANNs, these networks mimic the oscillatory behavior of biological neurons. The session covered the mathematical foundations and the efficiency gains of using oscillatory dynamics for complex temporal processing tasks.',
    date: 'MAY 24, 2024',
    time: '10:00 AM - 12:00 PM',
    venue: 'Central Seminar Hall',
    speaker: 'Dr. Srinivasa Chakravarthy V'
  },
  {
    id: 3,
    category: 'Workshops',
    title: 'AI in Medical System Design',
    image: '/events/event-18-1.jpg',
    description: 'A multi-day seasonal school bridging AI methodologies with biomedical signal analysis for next-gen diagnostic systems.',
    fullDescription: 'This IEEE SPS Seasonal School offered a rigorous curriculum on applying Machine Learning and Deep Learning to biomedical datasets. Experts from academia and the healthcare industry demonstrated how to build AI models that interpret ECG, EEG, and other physiological signals. The program focused on the practical challenges of data noise, model interpretability, and clinical validation.',
    date: 'FEB 26 - MAR 01, 2024',
    time: '9:00 AM - 3:00 PM',
    venue: 'Central Seminar Hall'
  },
  {
    id: 2,
    category: 'Competitions',
    title: 'Signalysis',
    image: '/events/event-2-1.png',
    description: 'An idea-pitching contest challenging students to solve real-world problems using analytical signal processing concepts.',
    fullDescription: 'Signalysis moved assessment beyond written exams. Teams identified existing problems in industry or society and proposed solutions rooted in signal analysis. The judging criteria focused heavily on feasibility and the clarity of the technical approach, pushing participants to articulate complex engineering ideas to a general audience effectively.',
    date: 'OCT 26, 2023',
    time: '11:00 AM - 12:00 PM',
    venue: 'Central Seminar Hall'
  },
  {
    id: 1,
    category: 'Workshops',
    title: 'Research Paper Writing for High Impact Journals',
    image: '/events/event-1-1.jpg',
    description: 'A structured guide to academic writing, focusing on logic flow, methodology presentation, and targeting top-tier publications.',
    fullDescription: 'Led by Dr. Ken Sugiyama, this course deconstructed the anatomy of a successful research paper. It wasn’t just about grammar; the focus was on "logical flow"—how to construct an argument that leads the reviewer inevitably to the conclusion. Participants analyzed accepted papers to understand how to frame research questions and present data for maximum impact in the scientific community.',
    date: 'SEP 14 - SEP 15, 2023',
    time: '9:00 AM - 3:00 PM',
    venue: 'Central Seminar Hall',
    speaker: 'Dr. Ken Sugiyama'
  }
];

const categories = ['All', 'Talks', 'Workshops', 'Competitions'];

export default function PastEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const closeSelectedEvent = useCallback(() => setSelectedEvent(null), []);

  // --- TAB SCROLL STATE ---
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredEvents = activeTab === 'All'
    ? eventsData
    : eventsData.filter(item => item.category === activeTab);

  useEffect(() => {
    if (selectedEvent) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

  // --- SCROLL LOGIC ---
  const checkScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section style={{ padding: '2rem 1rem', maxWidth: '1400px', margin: '0 auto', color: 'white', minHeight: '100vh' }}>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(120, 190, 32, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7bd112ff; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .event-card-wrapper {
            width: 350px;
            flex-grow: 0;
            flex-shrink: 0;
        }

        /* Modal Responsive Layout */
        .modal-content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Image | Content */
            height: 100%;
        }

        @media (max-width: 900px) {
            .modal-content-grid {
                grid-template-columns: 1fr;
                grid-template-rows: 300px 1fr;
            }
        }

        @media (max-width: 640px) {
            .event-card-wrapper {
                width: 100%;
            }
        }
      `}</style>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1rem', color: '#7bd112ff', letterSpacing: '-0.025em' }}>
          <span style={{ color: 'white' }}>PAST </span> EVENTS
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: '400', color: 'inherit', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          An archive of our workshops, competitions, and talks. <br />Explore what we have accomplished together.
        </p>
      </motion.div>

      {/* --- FILTER TABS --- */}
      <div style={{ position: 'relative', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto', display: 'flex', justifyContent: 'center' }}>

        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onClick={() => scrollTabs('left')}
              style={{
                position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                background: '#0F5156', border: '1px solid rgba(120, 190, 32, 0.5)', color: '#7bd112ff',
                borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <ChevronLeft size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <div
          ref={tabsRef}
          onScroll={checkScrollButtons}
          className="no-scrollbar"
          style={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: '0.5rem',
            display: 'flex',
            maskImage: 'linear-gradient(to right, transparent, black 10px, black calc(100% - 10px), transparent)'
          }}
        >
          <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  position: 'relative',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '10px',
                  border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === tab ? '#7bd112ff' : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab ? '#0F5156' : '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    style={{ position: 'absolute', inset: 0, borderRadius: '10px', background: 'transparent', zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              onClick={() => scrollTabs('right')}
              style={{
                position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                background: '#0F5156', border: '1px solid rgba(120, 190, 32, 0.5)', color: '#7bd112ff',
                borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <ChevronRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* EVENTS GRID */}
      <motion.div
        layout
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2.5rem',
          width: '100%'
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="event-card-wrapper">
              <EventCard
                event={event}
                priority={index < 3}
                onClick={() => setSelectedEvent(event)}
              />
            </div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* MODAL */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              onClose={closeSelectedEvent}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// --- SUB COMPONENTS ---

function EventCard({
  event,
  onClick,
  priority,
}: {
  event: PastEvent;
  onClick: () => void;
  priority: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      aria-haspopup="dialog"
      aria-label={`View details for ${event.title}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        backgroundColor: '#05191a',
        borderRadius: '10px',
        border: '1px solid rgba(120, 190, 32, 0.2)',
        padding: 0,
        color: 'inherit',
        textAlign: 'left',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Image Section */}
      <div
        style={{
          height: '220px', width: '100%', position: 'relative', overflow: 'hidden', cursor: 'pointer'
        }}
      >
        <div style={{
          width: '100%', height: '100%', position: 'relative',
          transition: 'filter 0.3s ease, transform 0.5s ease',
          filter: isHovered ? 'blur(2px) brightness(0.7)' : 'none',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}>
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority={priority}
            sizes="(max-width: 480px) 100vw, 350px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Overlay "View Details" */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            background: '#7bd112ff', color: '#092C2E',
            padding: '0.6rem 1.2rem', borderRadius: '5px',
            fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <Eye size={18} />
            <span>View Details</span>
          </div>
        </div>
      </div>

      {/* Content Section - NOT CLICKABLE */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1, cursor: 'default' }}>

        {/* Meta Row: Date & Tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7bd112ff', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Calendar size={14} />
            <span>{event.date.split('-')[0].trim()}</span>
          </div>

          <span style={{
            backgroundColor: 'rgba(120, 190, 32, 0.1)',
            color: '#7bd112ff', padding: '0.3rem 0.6rem', borderRadius: '10px',
            fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '1rem', lineHeight: 1.2, textTransform: 'uppercase' }}>
          {event.title}
        </h3>

        {/* Description Excerpt */}
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1 }}>
          {event.description}
        </p>

        {/* Footer - View More */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            color: '#7bd112ff', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer'
          }}>
          <span>VIEW MORE</span>
          <ArrowUpRight size={18} />
        </div>
      </div>
    </motion.button>
  );
}

function EventModal({ event, onClose }: { event: PastEvent, onClose: () => void }) {
  const contentClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 11000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{
          backgroundColor: '#092C2E',
          borderRadius: '1.5rem',
          width: '95vw',
          maxWidth: '1200px', // Bigger width
          height: '85vh',     // Bigger height
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(120, 190, 32, 0.3)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        }}
        onClick={contentClick}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          style={{
            position: 'absolute', top: '1rem', right: '1rem', zIndex: 50,
            background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', backdropFilter: 'blur(4px)'
          }}>
          <X size={20} />
        </button>

        {/* MODAL GRID LAYOUT */}
        <div className="modal-content-grid">

          {/* LEFT SIDE: POSTER IMAGE (Scrollable if too long) */}
          <div className="custom-scrollbar" style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', overflowY: 'auto' }}>
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={1600}
              style={{
                width: '100%',
                minHeight: '100%',
                objectFit: 'contain', // Ensures full poster is seen, or use 'cover' if you prefer filling space
                display: 'block'
              }}
            />
          </div>

          {/* RIGHT SIDE: SCROLLABLE CONTENT */}
          <div className="custom-scrollbar" style={{ padding: '2.5rem', overflowY: 'auto' }}>

            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                color: '#7bd112ff', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem',
                display: 'inline-block', marginBottom: '0.5rem', background: 'rgba(120, 190, 32, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '10px'
              }}>
                {event.category}
              </span>

              <h2 id="event-modal-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '800', color: 'white', lineHeight: 1.1, marginTop: '0.5rem', textTransform: 'uppercase' }}>
                {event.title}
              </h2>
            </div>

            {/* Info Grid (Date, Time, Location) - Conditional Rendering */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
              background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '10px', marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'rgba(120, 190, 32, 0.1)', padding: '0.6rem', borderRadius: '50%' }}>
                  <Calendar size={20} color="#7bd112ff" />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: '700' }}>DATE</div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '1rem', textTransform: 'uppercase' }}>{event.date}</div>
                </div>
              </div>

              {event.time && (
                <>
                  <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(120, 190, 32, 0.1)', padding: '0.6rem', borderRadius: '50%' }}>
                      <Clock size={20} color="#7bd112ff" />
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: '700' }}>TIME</div>
                      <div style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>{event.time}</div>
                    </div>
                  </div>
                </>
              )}

              {event.venue && (
                <>
                  <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(120, 190, 32, 0.1)', padding: '0.6rem', borderRadius: '50%' }}>
                      <MapPin size={20} color="#7bd112ff" />
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: '700' }}>LOCATION</div>
                      <div style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>{event.venue}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* About the Event */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>ABOUT THE EVENT</h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '1rem' }}>
                {event.fullDescription}
              </p>
            </div>

            {/* Speaker (Conditional) */}
            {event.speaker && (
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>HOST / SPEAKER</div>
                <div style={{ color: '#7bd112ff', fontWeight: '700', fontSize: '1.1rem' }}>{event.speaker}</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
