'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const dropdowns = [
  {
    label: 'EVENTS',
    items: [
      { name: 'UPCOMING EVENTS', path: '/events/upcoming' },
      { name: 'PAST EVENTS', path: '/events/past' },
    ],
  },
  {
    label: 'RESOURCES',
    items: [
      { name: 'FUNDING', path: '/funding' },
      { name: 'MENTORING', path: '/mentoring' },
    ],
  },
];

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'TEAM', path: '/team' },
  { name: 'STUDENT ACHIEVEMENTS', path: '/student-achievements' },
  { name: 'MAGAZINE', path: '/magazine' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'CONTACT', path: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // --- SMART RESIZE LOGIC ---
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const debouncedCheck = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (navRef.current && navListRef.current && logoRef.current) {
          const navWidth = navRef.current.clientWidth;
          const logoWidth = logoRef.current.clientWidth;

          const wasHidden = navListRef.current.style.display === 'none';
          if (wasHidden) {
            navListRef.current.style.display = 'flex';
            navListRef.current.style.visibility = 'hidden';
            navListRef.current.style.position = 'absolute';
            navListRef.current.style.top = '-9999px';
          }

          const navListWidth = navListRef.current.scrollWidth;
          const padding = 150;

          if (wasHidden) {
            navListRef.current.style.display = 'none';
            navListRef.current.style.visibility = '';
            navListRef.current.style.position = '';
            navListRef.current.style.top = '';
          }

          const shouldShowHamburger = logoWidth + navListWidth + padding > navWidth;
          setShowHamburger(shouldShowHamburger);

          if (!shouldShowHamburger && isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
            setOpenDropdown(null);
          }
        }
      }, 100);
    };

    debouncedCheck();
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(debouncedCheck));

    if (navRef.current) resizeObserver.observe(navRef.current);
    if (navListRef.current) resizeObserver.observe(navListRef.current);

    window.addEventListener('resize', debouncedCheck);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [isMobileMenuOpen]);

  // Click Outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isLinkActive = (path: string) => pathname === path;
  const isDropdownActive = (items: { path: string }[]) => items.some(item => pathname === item.path);

  const renderNavItems = (isMobile = false) => (
    <>
      {/* Home Link */}
      <li>
        <Link href="/">
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: isLinkActive('/') || hoveredItem === 'home' ? '#78BE20' : '#ffffff',
              fontWeight: 600,
              fontSize: isMobile ? '1.1rem' : '0.9rem',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease',
              cursor: 'pointer',
              padding: isMobile ? '0.75rem 0' : '0.5rem 0',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={() => setHoveredItem('home')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            HOME
            {!isMobile && (isLinkActive('/') || hoveredItem === 'home') && (
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: '#78BE20', borderRadius: '2px', boxShadow: '0 0 8px #78BE20' }} />
            )}
          </span>
        </Link>
      </li>

      {/* Dropdowns */}
      {dropdowns.map((dropdown) => {
        const isOpen = openDropdown === dropdown.label;
        const isActive = isDropdownActive(dropdown.items);

        return (
          <li key={dropdown.label} style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown(dropdown.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'none',
                border: 'none',
                color: isActive || isOpen || hoveredItem === dropdown.label ? '#78BE20' : '#ffffff',
                fontWeight: 600,
                fontSize: isMobile ? '1.1rem' : '0.9rem',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                padding: isMobile ? '0.75rem 0' : '0.5rem 0',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                justifyContent: isMobile ? 'space-between' : 'center',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setHoveredItem(dropdown.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {dropdown.label}
              <ChevronDown
                size={14}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <ul
                style={{
                  listStyle: 'none',
                  position: isMobile ? 'static' : 'absolute',
                  top: isMobile ? '0' : '140%',
                  left: isMobile ? '0' : '-1rem',
                  minWidth: '220px',
                  background: 'rgba(10, 25, 40, 0.95)',
                  border: '1px solid rgba(120, 190, 32, 0.3)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  padding: '0.5rem',
                  zIndex: 10000,
                  backdropFilter: 'blur(10px)',
                  animation: 'fadeIn 0.2s ease-out',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px'
                }}
              >
                {dropdown.items.map((item) => {
                  const isItemActive = pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link href={item.path}>
                        <span
                          style={{
                            display: 'block',
                            padding: '0.6rem 1rem',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            background: isItemActive ? 'rgba(120, 190, 32, 0.15)' : 'transparent',
                            color: isItemActive ? '#78BE20' : '#cccccc',
                            borderLeft: isItemActive ? '3px solid #78BE20' : '3px solid transparent',
                            whiteSpace: 'nowrap'
                          }}
                          className="dropdown-item"
                          onClick={() => {
                            setOpenDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}

      {/* Other Nav Links */}
      {navLinks.slice(1).map((link) => {
        const isActive = isLinkActive(link.path);
        return (
          <li key={link.name}>
            <Link href={link.path}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  color: isActive || hoveredItem === link.name.toLowerCase() ? '#78BE20' : '#ffffff',
                  fontWeight: 600,
                  fontSize: isMobile ? '1.1rem' : '0.9rem',
                  letterSpacing: '0.5px',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  padding: isMobile ? '0.75rem 0' : '0.5rem 0',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={() => setHoveredItem(link.name.toLowerCase())}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                {link.name}
                {!isMobile && (isActive || hoveredItem === link.name.toLowerCase()) && (
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: '#78BE20', borderRadius: '2px', boxShadow: '0 0 8px #78BE20' }} />
                )}
              </span>
            </Link>
          </li>
        )
      })}
    </>
  );

  return (
    <>
      <nav
        ref={navRef}
        style={{
          background: 'rgba(0, 30, 50, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(120, 190, 32, 0.3)',

          // --- CHANGE 1: Reduced Vertical Padding here (was 0.8rem) ---
          padding: '0.5rem 2rem',
          // ------------------------------------------------------------

          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 9999,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* LEFT: LOGO + TITLE */}
        <div ref={logoRef} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link href="/" passHref>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <img
                src="/SSN_SPS_LOGO.jpg"
                alt="SPS Logo"
                style={{
                  // --- CHANGE 2: Reduced Logo Size here (was 60px) ---
                  width: '40px',
                  height: '40px',
                  // ---------------------------------------------------
                  objectFit: 'contain',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  padding: '3px', // Slightly reduced padding inside circle
                }}
              />
            </div>
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              // --- CHANGE 3: Adjusted Font Size clamp ---
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              // ------------------------------------------
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#ffffff' }}>SSN IEEE</span>
            &nbsp;
            <span style={{ color: '#78BE20' }}>SPS SB</span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <ul
          ref={navListRef}
          style={{
            listStyle: 'none',
            display: showHamburger ? 'none' : 'flex',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            gap: 'clamp(1rem, 2vw, 2.5rem)',
            marginLeft: 'auto',
          }}
        >
          {renderNavItems()}
        </ul>

        {/* HAMBURGER BUTTON */}
        {showHamburger && (
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setOpenDropdown(null);
            }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '0.4rem', // Reduced button padding slightly
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto'
            }}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}

        {/* MOBILE MENU DROPDOWN */}
        {showHamburger && isMobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(5, 20, 35, 0.98)',
              backdropFilter: 'blur(15px)',
              borderBottom: '1px solid rgba(120,190,32,0.4)',
              animation: 'fadeIn 0.3s ease-out',
              height: '100vh',
              zIndex: 9998,
            }}
          >
            <ul style={{ listStyle: 'none', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {renderNavItems(true)}
            </ul>
          </div>
        )}
      </nav>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-item:hover {
          background-color: rgba(120, 190, 32, 0.2) !important;
          color: #78BE20 !important;
          transform: translateX(5px);
        }
      `}</style>
    </>
  );
}