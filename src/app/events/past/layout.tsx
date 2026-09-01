import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Past Events',
  description:
    'Browse past workshops, talks, competitions, and outreach programs organized by SSN IEEE SPS.',
  alternates: { canonical: '/events/past' },
};

export default function PastEventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
