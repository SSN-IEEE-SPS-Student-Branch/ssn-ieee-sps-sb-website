import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../app/globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SSN IEEE Signal Processing Society',
    template: '%s | SSN IEEE SPS',
  },
  description:
    'The official home of the IEEE Signal Processing Society Student Branch Chapter at SSN College of Engineering.',
  applicationName: 'SSN IEEE SPS',
  keywords: [
    'IEEE',
    'Signal Processing Society',
    'SSN College of Engineering',
    'student branch',
    'signal processing',
  ],
  authors: [{ name: 'SSN IEEE Signal Processing Society' }],
  creator: 'SSN IEEE Signal Processing Society',
  publisher: 'SSN IEEE Signal Processing Society',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'SSN IEEE SPS',
    title: 'SSN IEEE Signal Processing Society',
    description:
      'Events, opportunities, achievements, resources, and people from the IEEE SPS Student Branch Chapter at SSN.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'SSN IEEE Signal Processing Society Student Branch Chapter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSN IEEE Signal Processing Society',
    description:
      'Events, opportunities, achievements, resources, and people from the IEEE SPS Student Branch Chapter at SSN.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: '#0a51a3',
  colorScheme: 'dark',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={plusJakartaSans.className}
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a51a3 20%, #24a647 90%)', // Your specific background
          color: 'white',
          overflowX: 'hidden', // Prevents accidental horizontal scroll
        }}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Navbar />

        <main
          id="main-content"
          style={{
            flex: 1,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
