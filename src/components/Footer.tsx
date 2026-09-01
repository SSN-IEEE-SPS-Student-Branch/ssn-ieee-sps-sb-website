import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const footerLinks = [
  { label: 'Events', href: '/events/past' },
  { label: 'Team', href: '/team' },
  { label: 'Achievements', href: '/student-achievements' },
  { label: 'Magazine', href: '/magazine' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <div className="footer-brand">
          <Image
            src="/SSN_SPS_LOGO-removebg-preview.png"
            alt="IEEE Signal Processing Society, SSN Student Branch Chapter"
            width={550}
            height={454}
          />
          <p>
            A technical community at SSN College of Engineering advancing learning,
            collaboration, and student-led work in signal processing.
          </p>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h2>Connect</h2>
          <a href="mailto:ieeespssb@ssn.edu.in">ieeespssb@ssn.edu.in</a>
          <p>SSN College of Engineering<br />Chennai, Tamil Nadu</p>
          <a
            className="footer-external"
            href="https://signalprocessingsociety.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IEEE SPS global site <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="footer-secondary">
        <p>© {new Date().getFullYear()} SSN IEEE Signal Processing Society</p>
        <div className="footer-socials" aria-label="Social media">
          <a
            href="https://www.linkedin.com/company/ssn-ieee-signal-processing-society/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@IEEESSNSPSSB"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/ieee_sps_ssn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
