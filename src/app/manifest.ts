import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SSN IEEE Signal Processing Society',
    short_name: 'SSN IEEE SPS',
    description:
      'The IEEE Signal Processing Society Student Branch Chapter at SSN College of Engineering.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a51a3',
    theme_color: '#0a51a3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
