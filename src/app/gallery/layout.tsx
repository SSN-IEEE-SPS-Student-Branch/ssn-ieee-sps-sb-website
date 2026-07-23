import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore photos from SSN IEEE SPS workshops, outreach sessions, competitions, and chapter events.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
