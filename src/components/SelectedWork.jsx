import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom'; // Added for View All button

export default function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState('all');
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

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Real Project', value: 'real-project' },
    { label: 'Exploration', value: 'exploration' },
  ];

  const smoothEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-white flex justify-center px-4 md:px-8 border-t border-gray-100 overflow-hidden"
    >
      <div 
        className={`relative w-full max-w-[1400px] px-2 md:px-12 transition-all duration-1000 ${smoothEase} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        
        {/* Background Watermark */}
        <div className="absolute top-0 md:top-8 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 overflow-hidden">
          <h2 className="text-[22vw] md:text-[14vw] font-bold text-gray-50 uppercase tracking-tighter leading-none select-none opacity-50 whitespace-nowrap">
            Portfolio
          </h2>
        </div>

        <div className="relative z-10 flex flex-col items-center mb-12 md:mb-16">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 tracking-widest uppercase">
            / Selected Work
          </h3>
        </div>

        {/* Filter Nav */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 md:mb-12 border-b border-gray-100 pb-6">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`text-[13px] md:text-sm font-medium transition-colors duration-300 ${
                  activeFilter === filter.value
                    ? 'text-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <Link 
            to="/work" 
            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[12px] font-medium text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shrink-0"
          >
            View All Work
            <span className="text-sm leading-none transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
              ↗
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {filteredProjects.map((project, index) => {
            // Extract the numeric ID for the iframe embed
            const projectId = project.behanceUrl.match(/gallery\/(\d+)/)?.[1];

            return (
              <div
                key={project.id}
                className={`group flex flex-col transition-all duration-700 ${smoothEase} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150 + 300}ms` }}
              >
                
                {/* Iframe Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                  {projectId ? (
                    <iframe
                      src={`https://www.behance.net/embed/project/${projectId}?ilo0=1`}
                      title={project.title}
                      loading="lazy"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">Preview unavailable</div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="inline-block rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider text-black shadow-sm">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Overlay to make the whole thing clickable */}
                  <a 
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100"
                  >
                    <span className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold tracking-wide shadow-xl translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      Open Project ↗
                    </span>
                  </a>
                </div>

                {/* Text Content */}
                <div className="mt-5 flex flex-col">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {project.description}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.metadata.map((meta, i) => (
                      <span 
                        key={i} 
                        className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-500"
                      >
                        {meta}
                      </span>
                    ))}
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