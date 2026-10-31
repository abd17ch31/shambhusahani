import { useState, useEffect, useRef } from 'react';
import { experienceData } from '../data/experience';

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const smoothEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative w-full py-12 md:py-20 bg-white flex justify-center px-4 md:px-8 border-t border-gray-100 overflow-hidden"
    >
      {/* Dark Container */}
      <div className="relative w-full max-w-[1200px] bg-[#151515] rounded-[32px] p-8 md:p-16 overflow-hidden shadow-2xl z-10">
        
        {/* Background Watermark */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 overflow-hidden">
          <h2 className="text-[18vw] md:text-[12vw] font-bold text-white/[0.03] uppercase tracking-tighter leading-none select-none whitespace-nowrap">
            Experience
          </h2>
        </div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-4">
          <h3 className="text-2xl md:text-[40px] font-medium text-white tracking-tight">
            /EXPERIENCE
          </h3>
          <p className="text-sm md:text-base text-gray-400 font-medium">
            1.5+ years of experience
          </p>
        </div>

        {/* Experience List */}
        <div className="relative z-10 flex flex-col">
          {experienceData.map((item, index) => (
            <div
              key={item.id}
              className={`group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-white/10 hover:border-white/30 transition-all duration-500 ${smoothEase} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              
              {/* Left Side: Company & Role */}
              <div className="flex flex-col gap-1 md:gap-2">
                <h4 className="text-xl md:text-2xl font-medium text-white transition-colors duration-300 group-hover:text-gray-300">
                  {item.company}
                </h4>
                <p className="text-sm md:text-base text-gray-500 font-medium transition-colors duration-300 group-hover:text-gray-400">
                  {item.role}
                </p>
              </div>

              {/* Right Side: Date */}
              <div className="mt-2 md:mt-0">
                <p className="text-sm md:text-base text-gray-500 font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-gray-300">
                  {item.date}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}