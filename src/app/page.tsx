import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  Lightbulb,
  Users,
} from 'lucide-react';

const latestStories = [
  {
    category: 'Competition',
    date: 'January 9, 2026',
    title: 'Circuit-O-Poly',
    description:
      'A strategy-led circuit design challenge that brought component selection, building, and debugging into one collaborative event.',
    image: '/events/event-16-1.jpg',
  },
  {
    category: 'Expert talk',
    date: 'January 7, 2026',
    title: 'Mapping Neuromuscular Pathways',
    description:
      'An expert session on multimodal biomedical analysis and the role of advanced signal processing in neuromuscular research.',
    image: '/events/event-15-1.png',
  },
  {
    category: 'Workshop',
    date: 'September 10–11, 2025',
    title: 'Optimization with MathWorks',
    description:
      'Two days of practical MATLAB training connecting optimization theory with real engineering problems.',
    image: '/events/event-14-1.png',
  },
];

const pathways = [
  {
    title: 'Learn',
    description:
      'Build practical knowledge through technical talks, workshops, and guided learning experiences.',
    href: '/events/past',
    icon: GraduationCap,
  },
  {
    title: 'Create',
    description:
      'Turn signal processing concepts into projects, research questions, and competition-ready ideas.',
    href: '/gallery',
    icon: Lightbulb,
  },
  {
    title: 'Connect',
    description:
      'Meet peers, faculty, researchers, and the wider IEEE Signal Processing Society community.',
    href: '/team',
    icon: Users,
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">IEEE Signal Processing Society · SSN Student Branch Chapter</p>
            <h1>
              Signal processing is where <span>ideas become impact.</span>
            </h1>
            <p className="home-hero-intro">
              We bring students together to explore how signals, data, and intelligent systems
              shape healthcare, communication, imaging, and the technologies around us.
            </p>
            <div className="home-actions">
              <Link className="button button-primary" href="/events/past">
                Explore our work <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" href="/contact">
                Join the chapter
              </Link>
            </div>
          </div>

          <div className="home-hero-media">
            <Image
              src="/sps-home-4.jpg"
              alt="Members of the SSN IEEE Signal Processing Society student chapter"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              className="home-hero-image"
            />
            <div className="home-hero-logo">
              <Image
                src="/SSN_SPS_LOGO-removebg-preview.png"
                alt="IEEE Signal Processing Society, SSN Student Branch Chapter"
                width={550}
                height={454}
              />
            </div>
          </div>
        </div>
      </section>

      <nav className="home-quick-links" aria-label="Explore the chapter">
        <div className="home-section-inner">
          <Link href="/events/past">
            Events <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/student-achievements">
            Student achievements <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/funding">
            Funding opportunities <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/mentoring">
            Mentoring <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <section className="home-statement">
        <div className="home-section-inner home-statement-grid">
          <p className="section-kicker">About the chapter</p>
          <div>
            <h2>A student community for serious technical exploration.</h2>
            <p>
              Founded in 2023, the SSN IEEE SPS Student Branch Chapter creates a bridge between
              classroom foundations and the wider practice of signal processing. Our members
              learn by building, presenting, collaborating, and engaging with experts.
            </p>
            <Link className="text-link" href="/team">
              Meet the people behind the chapter <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-latest" aria-labelledby="latest-heading">
        <div className="home-section-inner">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">From the chapter</p>
              <h2 id="latest-heading">Latest events</h2>
            </div>
            <Link className="text-link" href="/events/past">
              View all events <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="story-grid">
            {latestStories.map((story) => (
              <article className="story-card" key={story.title}>
                <Link href="/events/past" aria-label={`Read about ${story.title}`}>
                  <div className="story-image-wrap">
                    <Image
                      src={story.image}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className="story-image"
                    />
                  </div>
                  <div className="story-body">
                    <p className="story-meta">
                      {story.category} <span>·</span> {story.date}
                    </p>
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                    <span className="story-link">
                      Read event <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-pathways" aria-labelledby="pathways-heading">
        <div className="home-section-inner">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Your pathway</p>
              <h2 id="pathways-heading">Learn, create, and connect</h2>
            </div>
          </div>

          <div className="pathway-grid">
            {pathways.map(({ title, description, href, icon: Icon }, index) => (
              <Link className="pathway-card" href={href} key={title}>
                <span className="pathway-index">0{index + 1}</span>
                <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="pathway-arrow" aria-hidden="true">
                  <ArrowRight size={21} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-feature">
        <div className="home-section-inner home-feature-grid">
          <div className="home-feature-date" aria-hidden="true">
            <CalendarDays size={30} />
            <span>Since</span>
            <strong>2023</strong>
          </div>
          <div>
            <p className="section-kicker section-kicker-light">IEEE SPS at SSN</p>
            <h2>Part of a global community advancing signal processing.</h2>
            <p>
              Access professional resources, technical communities, mentoring, funding, and
              opportunities through the IEEE Signal Processing Society.
            </p>
            <a
              className="button button-light"
              href="https://signalprocessingsociety.org/get-involved/membership"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover IEEE SPS membership <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
