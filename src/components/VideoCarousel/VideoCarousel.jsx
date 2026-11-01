import { useState, useEffect, useRef } from 'react';
import { videoCarouselData } from '../../data/videoCarouselData';

// Sub-component to handle individual video playback logic
const VideoCard = ({ item, index, isActive }) => {
  const videoRef = useRef(null);

  // Play/Pause based on visibility and active state to save performance
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {
            // Autoplay might be blocked, poster will show
          });
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative shrink-0 snap-center w-[85vw] md:w-[65vw] lg:w-[50vw] max-w-[900px] aspect-video rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive ? 'scale-100 opacity-100 shadow-2xl z-10' : 'scale-90 opacity-40 hover:opacity-60'
      }`}
    >
      <video
        ref={videoRef}
        src={item.video}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        {/* Fallback if video format isn't supported */}
        <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
      </video>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end text-white pointer-events-none">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            {item.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span className="text-xs font-medium tracking-widest text-gray-400">
            0{index + 1} / 05
          </span>
        </div>
        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
          {item.title}
        </h3>
      </div>
    </div>
  );
};

export default function VideoCarousel({
  items = videoCarouselData,
  autoplay = true,
  autoplayInterval = 4500,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollContainerRef = useRef(null);

  // Autoplay Logic
  useEffect(() => {
    if (!autoplay || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % items.length;
        scrollToCard(nextIndex);
        return nextIndex;
      });
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, isHovered, items.length]);

  // Handle manual scrolling/dragging to update active index
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Calculate which card is closest to the center
    const cardWidth = container.children[0].offsetWidth;
    const gap = 24; // Matches the gap-6 class
    const scrollCenter = container.scrollLeft + container.offsetWidth / 2;
    
    const newIndex = Math.round(scrollCenter / (cardWidth + gap));
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < items.length) {
      setActiveIndex(newIndex);
    }
  };

  // Programmatic scroll function
  const scrollToCard = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index];
    
    if (card) {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      // Center the card perfectly
      const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + items.length) % items.length;
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % items.length;
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  return (
    <div 
      className="relative w-full py-10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Main Scroll Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[7.5vw] md:px-[17.5vw] lg:px-[25vw] py-10 cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item, index) => (
          <VideoCard 
            key={item.id} 
            item={item} 
            index={index} 
            isActive={activeIndex === index} 
          />
        ))}
      </div>

      {/* Navigation & Pagination */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 flex items-center justify-between">
        
        {/* Pagination */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tracking-widest">
            0{activeIndex + 1} <span className="text-gray-400">/ 05</span>
          </span>
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  scrollToCard(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIndex === i ? 'w-8 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            aria-label="Previous video"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            aria-label="Next video"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}