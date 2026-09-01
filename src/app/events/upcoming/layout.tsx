import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'See upcoming workshops, talks, outreach sessions, and technical events from SSN IEEE SPS.',
  alternates: { canonical: '/events/upcoming' },
};

export default function UpcomingEventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
