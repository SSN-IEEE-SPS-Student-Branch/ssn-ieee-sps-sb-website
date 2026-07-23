import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the faculty advisors, office bearers, committee heads, and past leaders of SSN IEEE SPS.',
  alternates: { canonical: '/team' },
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
