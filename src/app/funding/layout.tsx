import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funding Opportunities',
  description:
    'Explore IEEE SPS scholarships, travel grants, member-driven initiatives, and chapter support.',
  alternates: { canonical: '/funding' },
};

export default function FundingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
