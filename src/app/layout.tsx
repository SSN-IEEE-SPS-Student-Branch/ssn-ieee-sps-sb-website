import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../app/globals.css';
import { IBM_Plex_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
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
        url: '/og-editorial.png',
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
    images: ['/og-editorial.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: '#00629b',
  colorScheme: 'light',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} ${ibmPlexSans.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Navbar />

        <main id="main-content" className="site-main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
