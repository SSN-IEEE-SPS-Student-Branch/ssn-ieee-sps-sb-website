import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '55vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '3rem 1rem',
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: '#b6ed70',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          404
        </p>
        <h1 style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
          Page not found
        </h1>
        <p style={{ maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          The page may have moved, or the link may be outdated. Return to the chapter home page
          to continue exploring.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.85rem 1.4rem',
            borderRadius: '0.75rem',
            background: '#78be20',
            color: '#071426',
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
