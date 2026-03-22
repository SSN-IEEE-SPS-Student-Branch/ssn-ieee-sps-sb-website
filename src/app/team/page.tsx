'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, X, ChevronLeft, ChevronRight, Calendar, Eye, ChevronDown } from 'lucide-react';

// --- DATA STRUCTURE ---
const facultyCoordinators = [
  {
    name: 'Dr. Venkateswaran N',
    role: 'Chair of IEEE SPS Madras Section',
    img: '/faculty/venkateswaran.jpg',
    linkedin: 'https://www.linkedin.com/in/venkateswarann2021/',
  },
  {
    name: 'Dr. Vijay Jeyakumar',
    role: 'Faculty Coordinator',
    img: '/faculty/vijay.jpg',
    linkedin: 'https://www.linkedin.com/in/vijayjeyakumar/',
  }
];

const teamsData: Record<string, any[]> = {
  "Office Bearers": [
    { name: 'Augustine W Bezalel', role: 'Chair', img: '/officebearers/augustine.jpeg', linkedin: 'http://www.linkedin.com/in/augustine-wisely-bezalel-5a985a250', instagram: 'https://www.instagram.com/Bezalel_4270' },
    { name: 'Abirami T', role: 'Vice-Chair', img: '/officebearers/abirami.jpg', linkedin: 'http://www.linkedin.com/in/abirami-thirupathy-aa4408305', instagram: 'https://www.instagram.com/abirami._.3' },
    { name: 'Pradeep K M', role: 'Vice-Chair', img: '/officebearers/pradeep.jpg', linkedin: 'http://www.linkedin.com/in/pradeepkmaran', instagram: 'https://www.instagram.com/pradeepkmaran' },
    { name: 'Bharathi K', role: 'Secretary', img: '/officebearers/bharathi.jpg', linkedin: 'https://www.linkedin.com/in/bharathi-kamaraj-0134b1305/', instagram: 'https://www.instagram.com/kamaraj_bharathi/' },
    { name: 'Monish Kumar S', role: 'Treasurer', img: '/officebearers/monish.png', linkedin: 'http://www.linkedin.com/in/monish-kumar-278531315', instagram: 'https://www.instagram.com/monish_kumar2004' },
    { name: 'Leelasri B', role: 'Joint-Secretary', img: '/officebearers/leela.png', linkedin: 'https://www.linkedin.com/in/leelasri', instagram: 'https://www.instagram.com/insiko_110110 ' },
  ],
  "Core Committee": [
    { name: 'Sharadha G', role: 'Coordinator', img: '/core/sharadha.jpg', linkedin: 'https://www.linkedin.com/in/shar-gopal', instagram: 'https://www.instagram.com/shar_1512' },
    { name: 'Shivani M', role: 'Coordinator', img: '/core/shivani.jpg', linkedin: 'https://in.linkedin.com/in/shivani-m-259240305', instagram: 'https://www.instagram.com/5hivani_26' },
  ],
  "Content & Editorial": [
    { name: 'Anindhitha A', role: 'Editorial Head', img: '/editorial/Anindhitha Aravind-Content and Editorial_.jpg', linkedin: 'https://www.linkedin.com/in/anindhitha-aravind-861858317/', instagram: 'https://www.instagram.com/anindhithaaa' },
    { name: 'Aravindaa Krishnan M', role: 'Editorial Head', img: '/editorial/Aravindaa Krishnan editorial_.jpg', linkedin: 'https://www.linkedin.com/in/aravindaa-krishnan-m-7a5b75309', instagram: 'https://www.instagram.com/auro_krish' },
  ],
  "Design": [
    { name: 'Swathi M', role: 'Design Head', img: '/design/swathi.png', linkedin: 'http://www.linkedin.com/in/swathi-muralikrishnan447744', instagram: 'https://www.instagram.com/__wobblyjelly474__' },
    { name: 'Maanasvini A', role: 'Design Head', img: '/design/maanasvini.jpg', linkedin: 'https://www.linkedin.com/in/maanasvini-anand-9068312ab', instagram: 'https://www.instagram.com/iniminivini' },
    { name: 'Praveen N R', role: 'Design Member', img: '/design/praveen.jpg', linkedin: 'https://www.linkedin.com/in/praveen-n-r-945230305/', instagram: 'https://www.instagram.com/pevi_2225' },
  ],
  "Event Management": [
    { name: 'Varsha V', role: 'Event Mgmt Head', img: '/eventmgmt/varsha.jpg', linkedin: 'http://www.linkedin.com/in/varsha-valliappan-a81733278', instagram: 'https://www.instagram.com/vvvvarshavvvv' },
    { name: 'Kavya S', role: 'Event Mgmt Head', img: '/eventmgmt/kavya.jpg', linkedin: 'https://www.linkedin.com/in/kavya-suresh-00a305288/', instagram: 'https://www.instagram.com/kavya__1205' },
  ],
  "Photography": [
    { name: 'Rasi R', role: 'Photography Head', img: '/photography/rasi.jpg', linkedin: 'https://www.linkedin.com/in/rasi-rajesh-239ba722b', instagram: 'https://www.instagram.com/raawsyndrome' },
    { name: 'Seanan Josh D', role: 'Photography Head', img: '/photography/seanan.jpg', linkedin: 'https://www.linkedin.com/in/seanan-josh-darbin-028162283', instagram: 'https://www.instagram.com/_.seanan.josh.7._' },
  ],
  "Social Media": [
    { name: 'Shrinithi S K', role: 'Social Media Head', img: '/socialmedia/shrinithi.png', linkedin: 'http://www.linkedin.com/in/shrinithi-sk-a98240305', instagram: 'https://www.instagram.com/shriiiiini_625' },
    { name: 'Harvin Vardhan C S', role: 'Social Media Head', img: '/socialmedia/harvin.jpg', linkedin: 'https://www.linkedin.com/in/harvin-vardhan-cs-03774428b/', instagram: 'https://www.instagram.com/harvin_vardhan_21' },
    { name: 'Deeksha S', role: 'Social Media Head', img: '/socialmedia/deeksha.jpg', linkedin: 'http://www.linkedin.com/in/sdeeksha2605', instagram: 'https://www.instagram.com/deeksh_aa._' },
  ],
  "Web Development": [
    { name: 'Mugilkrishna D U', role: 'Web Dev Head', img: '/webdev/mugil.jpg', linkedin: 'https://www.linkedin.com/in/mugilkrishna-du', instagram: 'https://www.instagram.com/mugil._.13' },
    { name: 'Prawin Kumar S', role: 'Web Dev Head', img: '/webdev/prawin.jpg', linkedin: 'https://www.linkedin.com/in/prawin-kumar-s-a60153284', instagram: 'https://www.instagram.com/prawin._.spk' },
  ],
};

const pastTeamsData: Record<string, { name: string; role: string; img: string }[]> = {
  "2023-2024": [
    { name: 'Shri Thrisha', role: 'Chair', img: '/past-teams/2023-2024/Shri Thrisha.png' },
    { name: 'Shivapriya S', role: 'Vice Chair', img: '/past-teams/2023-2024/Shivapriya S.png' },
    { name: 'Anusha A', role: 'Secretary', img: '/past-teams/2023-2024/Anusha A.png' },
    { name: 'Jothisa K', role: 'Treasurer', img: '/past-teams/2023-2024/Jothisa K.png' },
  ],
  "2024-2025": [
    { name: 'Venkatesh M', role: 'Chair', img: '/past-teams/2024-2025/Venkatesh M.png' },
    { name: 'Jothisa K', role: 'Vice Chair', img: '/past-teams/2024-2025/Jothisa K.png' },
    { name: 'Jeevan J', role: 'Vice Chair', img: '/past-teams/2024-2025/Jeevan J.png' },
    { name: 'Swaati S', role: 'Treasurer', img: '/past-teams/2024-2025/Swaati S.png' },
    { name: 'Karthick Siva R', role: 'Secretary', img: '/past-teams/2024-2025/Karthick Siva R.png' },
    { name: 'Jeya Marshalin M', role: 'Joint Secretary', img: '/past-teams/2024-2025/Jeya Marshalin M.png' },
  ],
};

const categories = Object.keys(teamsData);
const activeYear = "2025-26";
const allYears = ["2025-26", "2024-2025", "2023-2024"];

export default function CurrentMembersPage() {
  const [selected, setSelected] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Office Bearers");
  const [mounted, setMounted] = useState(false);
  const [selectedYear, setSelectedYear] = useState(activeYear);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActiveYear = selectedYear === activeYear;

  // --- TAB SCROLL STATE ---
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- SCROLL CHECK LOGIC ---
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* UNIFIED GRID WITH INCREASED VERTICAL GAP */
        .universal-grid {
           display: grid;
           /* 250px min ensures the original 'portrait' ratio feels restored */
           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
           column-gap: 3rem;
           row-gap: 4.5rem; /* Increased vertical spacing significantly */
           justify-content: center;
        }
        
        /* Centering Logic for rows with few items */
        @media (min-width: 768px) {
            .universal-grid[data-count="1"], 
            .universal-grid[data-count="2"] {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 3rem;
            }
            .universal-grid[data-count="1"] > div, 
            .universal-grid[data-count="2"] > div {
                max-width: 300px;
                width: 100%;
            }
        }
      `}</style>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '1rem' }}
      >
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '1.5rem', color: 'white', letterSpacing: '-0.025em' }}>
          MEET THE <span style={{ color: '#78BE20' }}>TEAM</span>
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white', opacity: 1.0, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          The brilliant minds and dedicated volunteers driving the IEEE Signal Processing Society SSN Chapter.
        </p>
      </motion.div>

      {/* FACULTY COORDINATORS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          {/* Left Line Animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 150, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ height: '1px', background: 'white' }}
          />

          <h2 style={{ fontSize: '1.5rem', color: '#E0F2FE', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', margin: 0, whiteSpace: 'nowrap' }}>
            Faculty Advisors
          </h2>

          {/* Right Line Animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 150, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ height: '1px', background: 'white' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          {facultyCoordinators.map((faculty, index) => (
            <div key={index} style={{ width: '100%', maxWidth: '300px' }}>
              <ProfileCard
                member={faculty}
                isFaculty={true}
                onClick={() => setSelected(faculty)}
                category="Faculty"
              />
            </div>
          ))}
        </div>
      </motion.div>


      {/* YEAR SELECTOR DROPDOWN */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '0', paddingTop: '3rem' }}
      >
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(9, 44, 46, 0.6)',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              marginBottom: '0.1rem',
              border: '1px solid rgba(120, 190, 32, 0.3)',
              cursor: 'pointer',
              color: '#78BE20',
              fontWeight: '700',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(9, 44, 46, 0.85)'; e.currentTarget.style.borderColor = 'rgba(120, 190, 32, 0.6)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(9, 44, 46, 0.6)'; e.currentTarget.style.borderColor = 'rgba(120, 190, 32, 0.3)'; }}
          >
            <Calendar size={16} color="#78BE20" />
            <span>ACADEMIC YEAR {selectedYear}</span>
            <motion.span
              animate={{ rotate: yearDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {yearDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(9, 44, 46, 0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(120, 190, 32, 0.3)',
                  borderRadius: '1rem',
                  padding: '0.5rem',
                  zIndex: 100,
                  minWidth: '220px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                }}
              >
                {allYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setYearDropdownOpen(false);
                      if (year === activeYear) setActiveTab("Office Bearers");
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.65rem 1rem',
                      borderRadius: '0.6rem',
                      border: 'none',
                      background: selectedYear === year ? 'rgba(120, 190, 32, 0.15)' : 'transparent',
                      color: selectedYear === year ? '#78BE20' : 'rgba(255,255,255,0.75)',
                      fontWeight: selectedYear === year ? '700' : '500',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseOver={(e) => {
                      if (selectedYear !== year) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedYear !== year) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                      }
                    }}
                  >
                    <Calendar size={14} />
                    <span>{year}</span>
                    {year === activeYear && (
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: '0.7rem',
                        background: 'rgba(120, 190, 32, 0.2)',
                        color: '#78BE20',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '1rem',
                        fontWeight: '700',
                      }}>CURRENT</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- ACTIVE YEAR: TABS + CATEGORIZED GRID --- */}
      {isActiveYear && (
        <>
          {/* --- TABS SECTION --- */}
          <div style={{ position: 'relative', marginBottom: '3.5rem', maxWidth: '100%' }}>
            {/* Scroll Controls */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  onClick={() => scrollTabs('left')}
                  style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#092C2E', border: '1px solid #78BE20', color: '#78BE20', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
              )}
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  onClick={() => scrollTabs('right')}
                  style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#092C2E', border: '1px solid #78BE20', color: '#78BE20', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Tab Container */}
            <div
              ref={tabsRef}
              onScroll={checkScrollButtons}
              className="no-scrollbar"
              style={{
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                padding: '1rem 3rem',
                maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
                {categories.map((tab) => (
                  <TabButton
                    key={tab}
                    tab={tab}
                    isActive={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC MEMBERS GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="universal-grid" data-count={teamsData[activeTab].length} style={{ marginBottom: '5rem' }}>
                {teamsData[activeTab].map((m, index) => (
                  <div key={`${activeTab}-${index}`} className="member-item">
                    <ProfileCard member={m} onClick={() => setSelected(m)} category={activeTab} />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {/* --- PAST YEAR: OFFICE BEARERS ONLY --- */}
      {!isActiveYear && pastTeamsData[selectedYear] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '2rem' }}
        >
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 150, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              style={{ height: '1px', background: 'white' }}
            />
            <h2 style={{ fontSize: '1.5rem', color: '#E0F2FE', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', margin: 0, whiteSpace: 'nowrap' }}>
              Office Bearers
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 150, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              style={{ height: '1px', background: 'white' }}
            />
          </div>

          {/* Past Team Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="universal-grid" data-count={pastTeamsData[selectedYear].length} style={{ marginBottom: '5rem' }}>
                {pastTeamsData[selectedYear].map((m, index) => (
                  <div key={`past-${selectedYear}-${index}`} className="member-item">
                    <ProfileCard member={m} onClick={() => setSelected(m)} category="Office Bearers" />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* MODAL */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <ProfileModal member={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// --- SUB COMPONENTS ---

function TabButton({ tab, isActive, onClick }: { tab: string, isActive: boolean, onClick: () => void }) {
  // Note: Tooltip removed as requested
  return (
    <motion.button
      onClick={onClick}
      style={{
        position: 'relative',
        padding: '0.75rem 1.5rem',
        borderRadius: '2rem',
        border: 'none',
        background: 'transparent',
        color: isActive ? '#0F5156' : '#ffffff',
        fontWeight: '700',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        zIndex: 1
      }}
    >
      {tab}

      {/* Active Background */}
      {isActive ? (
        <motion.div
          layoutId="activeTab"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '2rem',
            background: '#78BE20',
            zIndex: -1,
            boxShadow: '0 0 20px rgba(120, 190, 32, 0.4)'
          }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '2rem',
          border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', zIndex: -1
        }} />
      )}
    </motion.button>
  );
}

function ProfileCard({ member, onClick, isFaculty = false, category = "" }: { member: any, onClick: () => void, isFaculty?: boolean, category?: string }) {
  const [isShimmying, setIsShimmying] = useState(false);
  const isOfficeBearer = category === "Office Bearers";

  const handleCardClick = async () => {
    if (isOfficeBearer) {
      setIsShimmying(true);
      // Wait for the shimmer animation (approx 300ms) before opening modal
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsShimmying(false);
    }
    onClick();
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        tap: { scale: 0.98 }
      }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); } }}
      style={{
        background: isFaculty
          ? 'linear-gradient(145deg, rgba(15, 81, 86, 0.9), rgba(9, 44, 46, 0.95))'
          : 'linear-gradient(180deg, rgba(5, 20, 25, 0.85) 0%, rgba(3, 15, 18, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1.5rem',
        padding: '1rem 1.5rem',
        cursor: 'pointer',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* SHIMMER EFFECT FOR OFFICE BEARERS (COIN SHINE) */}
      <AnimatePresence>
        {isShimmying && (
          <motion.div
            initial={{ x: '-150%', opacity: 0 }}
            animate={{ x: '150%', opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)',
              zIndex: 20,
              transform: 'skewX(-20deg)',
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Decorative top gradient line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: isFaculty ? '#EAB308' : '#78BE20' }} />

      {/* Content that blurs on hover */}
      <motion.div
        variants={{
          rest: { filter: 'blur(0px)', opacity: 1 },
          hover: { filter: 'blur(5px)', opacity: 0.4 }
        }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ width: 140, height: 140, margin: '0 auto 1.5rem auto', position: 'relative' }}>
          <img
            src={member.img}
            alt={member.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%',
              border: isFaculty ? '3px solid #EAB308' : '3px solid #78BE20',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
            }}
          />
        </div>
        <h3 style={{ fontWeight: 800, fontSize: '1.35rem', marginBottom: '0.1rem', color: 'white', lineHeight: 1.2 }}>{member.name}</h3>
        <p style={{ fontSize: '0.95rem', color: isFaculty ? '#FDE047' : '#78BE20', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '-0.1rem' }}>{member.role}</p>
      </motion.div>

      {/* "View Details" Overlay - appears on hover */}
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1 }
        }}
        transition={{ duration: 0.1 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          background: 'rgba(120, 190, 32, 0.9)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '30px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          <Eye size={18} />
          <span>View Details</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProfileModal({ member, onClose }: { member: any, onClose: () => void }) {
  const isValidLink = (link: string) => link && link.trim() !== '' && link !== '#';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 11000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          background: 'linear-gradient(145deg, #092C2E 0%, #05191a 100%)',
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          border: '1px solid rgba(120, 190, 32, 0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            transition: 'background 0.2s'
          }}>
          <X size={20} />
        </button>

        <img src={member.img} alt={member.name}
          style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '4px solid #78BE20', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
        />
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', fontWeight: '800', color: 'white' }}>{member.name}</h3>
        <div style={{ color: '#78BE20', fontWeight: '700', marginBottom: '2rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.role}</div>

        {/* Social Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {isValidLink(member.linkedin) && (
            <a
              href={member.linkedin} target="_blank" rel="noopener noreferrer"
              style={{ transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ background: '#0077b5', padding: '10px', borderRadius: '50%', display: 'flex' }}>
                <Linkedin color="white" size={24} />
              </div>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>LinkedIn</span>
            </a>
          )}

          {isValidLink(member.instagram) && (
            <a
              href={member.instagram} target="_blank" rel="noopener noreferrer"
              style={{ transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ background: '#E1306C', padding: '10px', borderRadius: '50%', display: 'flex' }}>
                <Instagram color="white" size={24} />
              </div>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Instagram</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}