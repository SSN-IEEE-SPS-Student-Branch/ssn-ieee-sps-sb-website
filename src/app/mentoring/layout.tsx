import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentoring Programs',
  description:
    'Discover IEEE SPS research, conference, career, and community mentoring opportunities.',
  alternates: { canonical: '/mentoring' },
};

export default function MentoringLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
