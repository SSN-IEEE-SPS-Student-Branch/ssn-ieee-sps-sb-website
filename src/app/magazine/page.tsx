'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, FileText, BookOpen, ChevronDown, Calendar } from 'lucide-react';

const MAGAZINES = [
  {
    title: 'SPS Annual Magazine',
    year: '2026-2027',
    url: '/magazines/sps-annual-magazine-2026.pdf',
    description: 'Annual magazine showcasing the SSN IEEE SPS chapter’s events, achievements, and student experiences. A celebration of innovation, learning, and growth in signal processing.',
  },
  {
    title: 'SPS Annual Magazine',
    year: '2025-2026',
    url: '/magazines/sps-annual-magazine-2025.pdf',
    size: '8.5 MB', 
    description: 'Welcome to the Annual Magazine of the IEEE Signal Processing Society SSN Chapter. This publication showcases exciting research, projects, and innovations from our vibrant community of students and professionals.',
  },
  {
    title: 'SPS Annual Magazine',
    year: '2024-2025',
    url: '/magazines/sps-annual-magazine-2024.pdf',
    size: '13.4 MB',
    description: 'Explore the highlights, achievements, and technical articles from the 2024-2025 academic year of the IEEE Signal Processing Society SSN Chapter.',
  }
];

export default function MagazinePage() {
  const [selectedYear, setSelectedYear] = useState(MAGAZINES[0].year);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentIssue = MAGAZINES.find(m => m.year === selectedYear) || MAGAZINES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="subpage-shell" style={{ padding: '4rem 1rem', color: 'white', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Reusing your gradient button style */}
      <style>{`
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(9, 44, 46, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(120, 190, 32, 0.3);
          border-radius: 1rem;
          padding: 0.5rem;
          z-index: 100;
          min-width: 220px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        }
        @media (max-width: 640px) {
          .dropdown-menu {
            left: 0;
            transform: none;
          }
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
          padding: 0.8rem 1.8rem;
          border-radius: 3rem;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .event-btn:hover {
          background-position: -100% 0;
          color: #78BE20;
        }
      `}</style>

      {/* HEADER SECTION */}
      <motion.div
        className="page-header"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(120, 190, 32, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(120, 190, 32, 0.3)' }}>
          <BookOpen size={18} color="#78BE20" />
          <span style={{ color: '#78BE20', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em' }}>EDITION {selectedYear}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: '800', lineHeight: 1.1 }}>
          THE ANNUAL <span style={{ color: '#78BE20' }}>MAGAZINE</span>
        </h1>

        <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', color: 'inherit', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          {currentIssue.description}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-controls="magazine-year-menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(9, 44, 46, 0.6)',
                padding: '0.8rem 1.8rem',
                borderRadius: '3rem',
                border: '1px solid #78BE20',
                cursor: 'pointer',
                color: dropdownOpen ? '#78BE20' : '#05191a',
                fontWeight: '800',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
                backgroundImage: 'linear-gradient(to right, #78BE20 50%, #05191a 50%)',
                backgroundSize: '200% 100%',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                backgroundPosition: dropdownOpen ? '-100% 0' : '0 0',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundPosition = '-100% 0'; e.currentTarget.style.color = '#78BE20'; }}
              onMouseOut={(e) => { if (!dropdownOpen) { e.currentTarget.style.backgroundPosition = '0 0'; e.currentTarget.style.color = '#05191a'; } }}
            >
              <Calendar size={18} color={dropdownOpen ? '#78BE20' : '#05191a'} style={{ transition: 'color 0.2s ease' }} />
              <span>YEAR {selectedYear}</span>
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronDown size={18} color={dropdownOpen ? '#78BE20' : '#05191a'} style={{ transition: 'color 0.2s ease' }} />
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  id="magazine-year-menu"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="dropdown-menu"
                >
                  {MAGAZINES.map((mag) => (
                    <button
                      type="button"
                      key={mag.year}
                      onClick={() => {
                        setSelectedYear(mag.year);
                        setPreviewOpen(false);
                        setDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.65rem 1rem',
                        borderRadius: '0.6rem',
                        border: 'none',
                        background: selectedYear === mag.year ? 'rgba(120, 190, 32, 0.15)' : 'transparent',
                        color: selectedYear === mag.year ? '#78BE20' : 'rgba(255,255,255,0.75)',
                        fontWeight: selectedYear === mag.year ? '700' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        textAlign: 'left',
                      }}
                      onMouseOver={(e) => {
                        if (selectedYear !== mag.year) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (selectedYear !== mag.year) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                        }
                      }}
                    >
                      <Calendar size={14} />
                      <span>{mag.year}</span>
                      {mag.year === MAGAZINES[0].year && (
                        <span style={{
                          marginLeft: 'auto',
                          fontSize: '0.7rem',
                          background: 'rgba(120, 190, 32, 0.2)',
                          color: '#78BE20',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '1rem',
                          fontWeight: '700',
                        }}>LATEST</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ActionButton href={currentIssue.url} icon={<Download size={20} />} download>
            Download PDF
          </ActionButton>
          <ActionButton href={currentIssue.url} icon={<ExternalLink size={20} />}>
            Open in New Tab
          </ActionButton>
        </div>
      </motion.div>

      {/* PDF VIEWER SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: 'relative', marginBottom: '4rem' }}
      >
        {/* Glow effect behind the viewer */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', height: '90%', background: 'rgba(120, 190, 32, 0.15)', filter: 'blur(60px)', zIndex: -1, borderRadius: '50%' }} />

        <div className="pdf-container" style={{
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          backgroundColor: '#05191a',
          height: previewOpen ? '85vh' : '420px',
          position: 'relative',
          transition: 'height 0.3s ease',
        }}
        >
          {previewOpen ? (
            <object
              key={currentIssue.url}
              data={currentIssue.url}
              type="application/pdf"
              aria-label={`${currentIssue.title} ${currentIssue.year} preview`}
              width="100%"
              height="100%"
              style={{ position: 'relative', zIndex: 1, display: 'block' }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ccfbf1', padding: '2rem', textAlign: 'center', background: '#05191a' }}>
                <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', maxWidth: '320px' }}>
                  Your browser cannot display this PDF preview.
                </p>
                <a href={currentIssue.url} download style={{ color: '#78BE20', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'underline' }}>
                  Download PDF
                </a>
              </div>
            </object>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '2rem',
                textAlign: 'center',
                background:
                  'radial-gradient(circle at center, rgba(120,190,32,0.12), transparent 60%)',
              }}
            >
              <FileText size={64} color="#78BE20" aria-hidden="true" />
              <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                {currentIssue.year} digital edition
              </h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', maxWidth: '34rem', lineHeight: 1.6 }}>
                The embedded preview is {currentIssue.size}. Load it only when you are ready, or use
                the download and new-tab options above.
              </p>
              <button
                type="button"
                className="event-btn"
                onClick={() => setPreviewOpen(true)}
                style={{ marginTop: '0.5rem' }}
              >
                Load PDF preview
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        aria-labelledby="magazine-contribute-heading"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2.5rem',
          borderRadius: '1.25rem',
          background: 'rgba(9, 44, 46, 0.85)',
          border: '1px solid rgba(120, 190, 32, 0.35)',
          boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
          <FileText size={28} color="#78BE20" aria-hidden="true" />
          <h2 id="magazine-contribute-heading" style={{ margin: 0, fontSize: 'clamp(1.6rem, 4vw, 2.25rem)' }}>
            CONTRIBUTE TO THE <span style={{ color: '#78BE20' }}>NEXT ISSUE</span>
          </h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, fontSize: '1.05rem' }}>
          We welcome original research explainers, project stories, technical tutorials, event
          reflections, and student achievements from the SSN community.
        </p>
        <ul style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', paddingLeft: '1.25rem' }}>
          <li>Prepare 600–1,200 words in an editable document.</li>
          <li>Include a short author bio and properly credited visuals.</li>
          <li>Submit only original work and disclose any collaborators or prior publication.</li>
          <li>Deadlines are announced through official chapter channels for each annual edition.</li>
        </ul>
        <motion.a
          href="mailto:ieeespssb@ssn.edu.in?subject=SPS%20Magazine%20Contribution"
          className="event-btn"
          whileTap={{ scale: 0.96 }}
          style={{ marginTop: '0.5rem' }}
        >
          Email the Editorial Team
        </motion.a>
      </motion.section>

    </section>
  );
}

// Typed ActionButton
interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  download?: boolean;
}

function ActionButton({ href, icon, children, download = false }: ActionButtonProps) {
  return (
    <motion.a
      href={href}
      download={download}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      className="event-btn"
      whileTap={{ scale: 0.95 }}
    >
      {icon} {children}
    </motion.a>
  );
}
