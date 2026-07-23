'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const groupedLinks = [
  {
    label: 'Events',
    items: [
      { name: 'Upcoming events', path: '/events/upcoming' },
      { name: 'Past events', path: '/events/past' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { name: 'Funding', path: '/funding' },
      { name: 'Mentoring', path: '/mentoring' },
    ],
  },
];

const links = [
  { name: 'Team', path: '/team' },
  { name: 'Achievements', path: '/student-achievements' },
  { name: 'Magazine', path: '/magazine' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const closeNavigation = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (items: { path: string }[]) =>
    items.some((item) => pathname === item.path);

  const navigation = (mobile = false) => (
    <>
      <li>
        <Link
          className={`nav-link ${isActive('/') ? 'is-active' : ''}`}
          href="/"
          aria-current={isActive('/') ? 'page' : undefined}
          onClick={closeNavigation}
        >
          Home
        </Link>
      </li>

      {groupedLinks.map((group) => {
        const open = openDropdown === group.label;
        return (
          <li className="nav-group" key={group.label}>
            <button
              className={`nav-link nav-group-button ${
                isGroupActive(group.items) ? 'is-active' : ''
              }`}
              type="button"
              aria-expanded={open}
              aria-controls={`nav-${group.label.toLowerCase()}${mobile ? '-mobile' : ''}`}
              onClick={() => setOpenDropdown(open ? null : group.label)}
            >
              {group.label}
              <ChevronDown
                size={15}
                className={open ? 'chevron-open' : ''}
                aria-hidden="true"
              />
            </button>
            {open && (
              <ul
                className={`nav-dropdown ${mobile ? 'nav-dropdown-mobile' : ''}`}
                id={`nav-${group.label.toLowerCase()}${mobile ? '-mobile' : ''}`}
              >
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      className={isActive(item.path) ? 'is-active' : ''}
                      href={item.path}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                      onClick={closeNavigation}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}

      {links.map((link) => (
        <li key={link.path}>
          <Link
            className={`nav-link ${isActive(link.path) ? 'is-active' : ''}`}
            href={link.path}
            aria-current={isActive(link.path) ? 'page' : undefined}
            onClick={closeNavigation}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-masthead">
        <Link className="site-brand" href="/" aria-label="SSN IEEE SPS home">
          <Image
            src="/SSN_SPS_LOGO-removebg-preview.png"
            alt=""
            width={550}
            height={454}
            priority
            className="site-brand-logo"
          />
          <span className="site-brand-copy">
            <span>SSN College of Engineering</span>
            <strong>IEEE Signal Processing Society</strong>
            <small>Student Branch Chapter</small>
          </span>
        </Link>
        <a
          className="masthead-external"
          href="https://signalprocessingsociety.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE SPS <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>

      <nav className="site-navigation" aria-label="Primary navigation">
        <ul className="desktop-navigation">{navigation()}</ul>
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => {
            setMobileOpen((current) => !current);
            setOpenDropdown(null);
          }}
        >
          <span>Menu</span>
          {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
        {mobileOpen && (
          <div className="mobile-navigation" id="mobile-navigation">
            <ul>{navigation(true)}</ul>
          </div>
        )}
      </nav>
    </header>
  );
}
