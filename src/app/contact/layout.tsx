import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact SSN IEEE SPS, find the chapter at SSN College of Engineering, and access membership guidance.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
