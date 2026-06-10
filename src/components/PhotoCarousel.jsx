import { useState, useEffect } from 'react';

export default function PhotoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Sample carousel images — path ke public folder
  const images = [
    '/carousel/premium_vector-1722047091892-0a14d2a31c12.avif',
    '/carousel/premium_vector-1722047091910-4a3139373f9c.avif',
    '/carousel/premium_vector-1730728571175-bc17033b489a.avif',
  ];

  // Auto-rotate setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-sm aspect-[3/4] rounded-[4px] overflow-hidden border border-line bg-surface shadow-[0_20px_50px_-20px_rgba(26,26,26,0.15)]">
        {/* Image Container */}
        <div className="relative w-full h-full">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Sample photo ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                idx === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'bg-accent w-6'
                  : 'bg-line/60 hover:bg-line'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
