import type { MetadataRoute } from 'next';

const routes = [
  '',
  '/team',
  '/student-achievements',
  '/events/upcoming',
  '/events/past',
  '/funding',
  '/mentoring',
  '/magazine',
  '/gallery',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.8,
  }));
}
