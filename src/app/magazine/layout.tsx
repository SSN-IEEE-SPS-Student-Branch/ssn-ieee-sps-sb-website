import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Annual Magazine',
  description:
    'Read and download annual SSN IEEE SPS magazines featuring chapter research, projects, and achievements.',
  alternates: { canonical: '/magazine' },
};

export default function MagazineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
