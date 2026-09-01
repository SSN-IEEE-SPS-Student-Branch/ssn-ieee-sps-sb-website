import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Achievements',
  description:
    'Celebrate scholarships, research funding, and notable achievements by SSN IEEE SPS student members.',
  alternates: { canonical: '/student-achievements' },
};

export default function AchievementsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
