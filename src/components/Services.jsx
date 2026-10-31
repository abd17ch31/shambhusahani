import { useState, useEffect, useRef } from 'react';
import { services } from '../data/services';

export default function Services() {
  const [activeService, setActiveService] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  // Check screen size for desktop logic (safer than hover media query)
  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Core function to update the image position
  const updateCursorPosition = (e) => {
    if (!isDesktop || !cursorRef.current) return;
    
    requestAnimationFrame(() => {
      // Offset the image so it doesn't cover the text exactly
      const x = e.clientX + 20;
      const y = e.clientY + 20;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const smoothEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  // Handlers
  const handleMouseEnter = (e, id) => {
    if (isDesktop) {
      setActiveService(id);
      updateCursorPosition(e); // Snap to position instantly on hover
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) setActiveService(null);
  };

  const handleClick = (id) => {
    if (!isDesktop) {
      setActiveService(activeService === id ? null : id);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="service"
      onMouseMove={updateCursorPosition}
      className="relative w-full py-20 md:py-32 bg-white flex justify-center px-4 md:px-8 border-t border-gray-100"
      style={{ cursor: (isDesktop && activeService) ? 'none' : 'auto' }}
    >
      {/* Floating Image (z-[100] ensures it sits above everything) */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] transition-opacity duration-300 ${
          (isDesktop && activeService) ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ display: isDesktop ? 'block' : 'none' }}
      >
        {services.map((service) => (
          <img
            key={service.id}
            src={service.cursorImage}
            alt=""
            className={`absolute top-0 left-0 w-[280px] md:w-[340px] h-auto object-cover rounded-xl shadow-2xl transition-all duration-500 ${smoothEase} ${
              activeService === service.id 
                ? 'opacity-100 scale-100 rotate-2' 
                : 'opacity-0 scale-90 -rotate-6'
            }`}
          />
        ))}
      </div>

      <div className="relative w-full max-w-[1200px] px-2 md:px-8 z-10">
        
        {/* Background Watermark */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 overflow-hidden">
          <h2 className="text-[26vw] md:text-[18vw] font-bold text-gray-50 uppercase tracking-tighter leading-none select-none opacity-60 whitespace-nowrap">
            Service
          </h2>
        </div>

        {/* Section Header */}
        <div className="relative z-10 mb-16 md:mb-24">
          <h3 className="text-2xl md:text-[40px] font-medium text-gray-900 tracking-tight">
            /SERVICE
          </h3>
        </div>

        {/* Service List */}
        <div className="relative z-10 flex flex-col">
          {services.map((service, index) => {
            const isActive = activeService === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={(e) => handleMouseEnter(e, service.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(service.id)}
                className={`group relative overflow-hidden transition-all duration-500 ${smoothEase} ${
                  isActive 
                    ? 'bg-[#1a1a1a] rounded-3xl my-4 shadow-xl border-transparent' 
                    : 'bg-transparent border-b border-gray-200'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                
                {/* Main Row */}
                <div 
                  className={`relative z-20 flex items-center justify-between transition-all duration-500 ${smoothEase} ${
                    isActive ? 'px-6 md:px-12 pt-10 pb-14 md:py-14' : 'py-10 md:py-16 px-2'
                  }`}
                >
                  <h4 className={`text-4xl md:text-[60px] lg:text-[72px] font-medium uppercase tracking-tight transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h4>

                  <div className="flex items-center justify-center">
                    {isActive ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveService(null); }}
                        className="p-3 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Close service details"
                      >
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-500 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Expanded Panel (Text Only) */}
                <div className={`grid transition-all duration-500 ${smoothEase} ${
                  isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}>
                  <div className="overflow-hidden">
                    <div className="relative px-6 md:px-12 pb-12 md:pb-16 flex items-center">
                      <p className="max-w-2xl text-base md:text-2xl text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}