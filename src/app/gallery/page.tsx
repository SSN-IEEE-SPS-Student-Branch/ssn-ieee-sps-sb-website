'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';
import Image from 'next/image';

const MotionImage = motion.create(Image);

// --- TYPES ---
interface GalleryItem {
  id: number;
  category: string;
  title: string;
  date: string;
  cover: string;
  images: string[];
}

// --- DATA STRUCTURE (Reordered via Logic below, but kept here for reference) ---
const galleryItems: GalleryItem[] = [
  { 
    id: 10, 
    category: 'Competitions', 
    title: 'Circuit-O-Poly', 
    date: 'Jan 2026', 
    cover: '/events/event-16-2.jpg', 
    images: ['/events/event-16-2.jpg', '/events/event-16-3.jpg', '/events/event-16-4.jpg', '/events/event-16-5.jpeg', '/events/event-16-6.jpeg', '/events/event-16-7.jpeg', '/events/event-16-8.jpeg', '/events/event-16-9.jpeg', '/events/event-16-10.jpeg'] 
  },
  { 
    id: 9, 
    category: 'Talks', 
    title: 'Neuromuscular Pathways', 
    date: 'Jan 2026', 
    cover: '/events/event-15-2.jpg', 
    images: ['/events/event-15-2.jpg', '/events/event-15-3.jpg', '/events/event-15-4.jpg', '/events/event-15-5.jpeg', '/events/event-15-6.jpeg'] 
  },
  { 
    id: 8, 
    category: 'Workshops', 
    title: 'IEEE SPS Outreach Session', 
    date: 'Oct 2025', 
    cover: '/events/event-17-1.jpeg', 
    images: ['/events/event-17-1.jpeg', '/events/event-17-2.jpeg', '/events/event-17-3.jpeg', '/events/event-17-4.jpeg', '/events/event-17-5.jpeg', '/events/event-17-6.jpeg', '/events/event-17-7.jpeg', '/events/event-17-8.jpeg'] 
  },
  { 
    id: 7, 
    category: 'Workshops', 
    title: 'MathWorks Optimization Tools', 
    date: 'Sep 2025', 
    cover: '/events/event-14-2.jpeg', 
    images: ['/events/event-14-2.jpeg', '/events/event-14-3.jpeg', '/events/event-14-4.jpeg', '/events/event-14-5.jpeg', '/events/event-14-6.jpeg', '/events/event-14-7.jpeg', '/events/event-14-8.jpeg', '/events/event-14-9.jpeg', '/events/event-14-10.jpeg', '/events/event-14-11.jpeg', '/events/event-14-12.jpeg'] 
  },
  { 
    id: 6, 
    category: 'Workshops', 
    title: 'Student Outreach Program', 
    date: 'Aug 2025', 
    cover: '/events/event-13-1.jpeg', 
    images: ['/events/event-13-1.jpeg', '/events/event-13-2.jpeg', '/events/event-13-3.jpeg', '/events/event-13-4.jpeg', '/events/event-13-5.jpeg', '/events/event-13-6.jpeg', '/events/event-13-7.jpeg', '/events/event-13-8.jpeg'] 
  },
  { 
    id: 5, 
    category: 'Talks', 
    title: 'Computer Vision: Pixels to Insights', 
    date: 'Aug 2025', 
    cover: '/events/event-12-2.jpg', 
    images: ['/events/event-12-2.jpg', '/events/event-12-3.jpeg', '/events/event-12-4.jpeg', '/events/event-12-5.jpeg', '/events/event-12-6.jpeg', '/events/event-12-7.jpg', '/events/event-12-8.jpeg', '/events/event-12-9.jpeg', '/events/event-12-10.jpg', '/events/event-12-11.jpg'] 
  },
  { 
    id: 4, 
    category: 'Talks', 
    title: 'Signal Processing in Healthcare', 
    date: 'Aug 2024', 
    cover: '/events/event-5-2.png', 
    images: ['/events/event-5-2.png', '/events/event-5-3.png', '/events/event-5-4.png', '/events/event-5-5.jpeg', '/events/event-5-6.jpeg'] 
  },
  { 
    id: 3, 
    category: 'Talks', 
    title: 'Quantum Computing', 
    date: 'Aug 2024', 
    cover: '/events/event-4-2.jpg', 
    images: ['/events/event-4-2.jpg', '/events/event-4-3.jpg', '/events/event-4-4.jpeg', '/events/event-4-5.jpeg', '/events/event-4-6.jpeg', '/events/event-4-7.png'] 
  },
  { 
    id: 2, 
    category: 'Talks', 
    title: 'Research Paper Writing Logic', 
    date: 'Sep 2023', 
    cover: '/events/event-1-2.jpg', 
    images: ['/events/event-1-2.jpg', '/events/event-1-3.jpeg', '/events/event-1-4.jpeg', '/events/event-1-5.jpeg', '/events/event-1-6.png'] 
  },
  { 
    id: 1, 
    category: 'Inauguration', 
    title: 'Grand Inauguration Ceremony', 
    date: 'Aug 2023',
    cover: '/events/inaug-1.jpg',
    images: [
        '/events/inaug-1.jpg', 
        '/events/inaug-2.jpeg',
        '/events/inaug-3.jpeg',
        '/events/inaug-4.jpeg',
        '/events/inaug-5.jpeg',
        '/events/inaug-6.jpeg',
        '/events/inaug-7.jpeg',
        '/events/inaug-8.jpeg',
        '/events/inaug-9.jpeg'
    ]
  },
];

const categories = ['All', 'Inauguration', 'Talks', 'Workshops', 'Competitions'];

export default function GalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState('All');

  // --- TAB SCROLL STATE ---
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const closeSelectedEvent = useCallback(() => setSelectedEvent(null), []);

  // 1. Sort items by Date (Newest First) automatically
  const sortedItems = [...galleryItems].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 2. Filter based on the active tab
  const filteredImages = activeTab === 'All' 
    ? sortedItems 
    : sortedItems.filter(item => item.category === activeTab);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

  // --- SCROLL LOGIC ---
  const checkScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', color: 'white', minHeight: '100vh' }}>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .gallery-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
           gap: 2.5rem;
           padding-bottom: 1rem;
        }
      `}</style>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '2rem', paddingTop: '0.1rem' }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
            color: '#78BE20',
          }}
        >
          <span style={{ color: '#ffffff' }}>THE</span> GALLERY
        </h1>

        <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'inherit', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Capturing the moments that define our community. Explore photos from our talks, workshops, and competitions.
        </p>
      </motion.div>

      {/* --- CENTERED TABS --- */}
      <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 3rem auto', display: 'flex', justifyContent: 'center' }}>
        
        {/* Left Arrow */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onClick={() => scrollTabs('left')}
              style={{
                position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                background: '#0F5156', border: '1px solid rgba(120, 190, 32, 0.5)', color: '#78BE20',
                borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <ChevronLeft size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable Container */}
        <div 
          ref={tabsRef}
          onScroll={checkScrollButtons}
          className="no-scrollbar"
          style={{ 
            overflowX: 'auto', 
            whiteSpace: 'nowrap', 
            padding: '0.5rem',
            display: 'flex',
            maskImage: 'linear-gradient(to right, transparent, black 10px, black calc(100% - 10px), transparent)'
          }}
        >
          <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  position: 'relative',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '2rem',
                  border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === tab ? '#78BE20' : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab ? '#0F5156' : '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    style={{ position: 'absolute', inset: 0, borderRadius: '2rem', background: 'transparent', zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              onClick={() => scrollTabs('right')}
              style={{
                position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                background: '#0F5156', border: '1px solid rgba(120, 190, 32, 0.5)', color: '#78BE20',
                borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <ChevronRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* GALLERY GRID */}
      <motion.div 
        layout
        className="gallery-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((item, index) => (
            <GalleryCard 
              key={item.id}
              item={item} 
              priority={index === 0}
              onClick={() => setSelectedEvent(item)} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CAROUSEL MODAL */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <CarouselModal 
              event={selectedEvent} 
              onClose={closeSelectedEvent}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// --- SUB COMPONENTS ---

function GalleryCard({
  item,
  onClick,
  priority,
}: {
  item: GalleryItem;
  onClick: () => void;
  priority: boolean;
}) {
  const imageCount = item.images ? item.images.length : 1;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      aria-haspopup="dialog"
      aria-label={`Open ${item.title} gallery with ${imageCount} photos`}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', cursor: 'pointer', border: 'none', padding: 0, background: 'transparent', textAlign: 'left', color: 'inherit' }}
    >
        {/* STACK EFFECT (Background Cards) */}
        <div style={{
            position: 'absolute', inset: 0, 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '1.2rem',
            transform: isHovered ? 'rotate(6deg) scale(0.95)' : 'rotate(3deg)',
            transition: 'transform 0.4s ease',
            zIndex: 0
        }} />
        <div style={{
            position: 'absolute', inset: 0, 
            background: 'rgba(120, 190, 32, 0.2)', 
            borderRadius: '1.2rem',
            transform: isHovered ? 'rotate(-6deg) scale(0.95)' : 'rotate(-3deg)',
            transition: 'transform 0.4s ease',
            zIndex: 0
        }} />

        {/* MAIN CARD */}
        <div style={{
            backgroundColor: '#0F5156',
            borderRadius: '1.2rem',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
            position: 'relative',
            zIndex: 1,
            aspectRatio: '4/5',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Image Area */}
            <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    priority={priority}
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        transition: 'transform 0.7s ease, filter 0.3s ease',
                        transform: isHovered ? 'scale(1.15)' : 'scale(1.0)',
                        filter: isHovered ? 'blur(3px) brightness(0.7)' : 'none' 
                    }}
                />
                
                {/* Photo Count Pill */}
                <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(0,0,0,0.7)', borderRadius: '2rem', padding: '0.3rem 0.7rem',
                    backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '5px',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <Images size={12} color="#78BE20" />
                    <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: '700' }}>{imageCount}</span>
                </div>

                {/* Center "View" Icon */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease',
                    textAlign: 'center'
                }}>
                    <div style={{ background: '#78BE20', padding: '0.8rem', borderRadius: '50%', display: 'inline-flex', boxShadow: '0 0 20px rgba(120,190,32,0.6)' }}>
                        <ZoomIn size={24} color="#05191a" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '1.2rem', background: '#092C2E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: '#78BE20', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>
                    {item.category}
                </p>
                <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: '700', lineHeight: 1.4, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.title}
                </h3>
                <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    {item.date}
                </div>
            </div>
        </div>
    </motion.button>
  );
}

function CarouselModal({ event, onClose }: { event: GalleryItem, onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = event.images.length > 0 ? event.images : [event.cover];

  const paginate = useCallback((newDirection: number) => {
    if (newDirection === 1) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, paginate]);

  // Touch Swipe Logic
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(5, 25, 26, 0.95)', 
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 11000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          backgroundColor: '#092C2E',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
          maxWidth: '1100px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: '1px solid rgba(120, 190, 32, 0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(0,0,0,0.6)', 
            borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', zIndex: 20, backdropFilter: 'blur(4px)',
            transition: 'background 0.2s', 
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
          <X size={24} />
        </button>

        {/* Image Area - with Swipe handlers */}
        <div style={{ flex: 1, overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '300px' }}>
            
            {/* Left Nav Button (Desktop) */}
            {images.length > 1 && (
                <button
                type="button"
                aria-label="Show previous photo"
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="nav-btn"
                style={{
                    position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                    width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#78BE20', zIndex: 10, backdropFilter: 'blur(4px)',
                }}>
                <ChevronLeft size={32} />
                </button>
            )}

            {/* Draggable Image for Mobile Swipe */}
            <AnimatePresence initial={false} mode="wait">
                <MotionImage
                    key={currentIndex}
                    src={images[currentIndex]} 
                    alt={`${event.title} photo ${currentIndex + 1} of ${images.length}`}
                    width={1200}
                    height={800}
                    
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                    
                    style={{ width: '100%', height: '100%', maxHeight: '70vh', objectFit: 'contain', cursor: 'grab' }} 
                />
            </AnimatePresence>

            {/* Right Nav Button (Desktop) */}
            {images.length > 1 && (
                <button
                type="button"
                aria-label="Show next photo"
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="nav-btn"
                style={{
                    position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                    width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#78BE20', zIndex: 10, backdropFilter: 'blur(4px)',
                }}>
                <ChevronRight size={32} />
                </button>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10, background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '1rem' }}>
                    {images.map((_: string, idx: number) => (
                        <button
                            type="button"
                            aria-label={`Show photo ${idx + 1}`}
                            aria-current={idx === currentIndex ? 'true' : undefined}
                            onClick={() => setCurrentIndex(idx)}
                            key={idx}
                            style={{ 
                                width: idx === currentIndex ? '24px' : '8px', 
                                height: '8px', 
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                borderRadius: '4px', 
                                background: idx === currentIndex ? '#78BE20' : 'rgba(255,255,255,0.4)',
                                transition: 'all 0.3s ease'
                            }} 
                        />
                    ))}
                </div>
            )}
        </div>

        {/* Footer Info */}
        <div style={{ padding: '1.5rem 2rem', background: '#092C2E', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                    <span style={{ color: '#78BE20', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {event.category} • {event.date}
                    </span>
                    <h2 id="gallery-modal-title" style={{ margin: '0.2rem 0 0 0', fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>
                        {event.title}
                    </h2>
                </div>
                
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
      </motion.div>
      
      <style>{`
        @media (max-width: 768px) {
            .nav-btn { display: none !important; }
        }
      `}</style>
    </motion.div>
  );
}
