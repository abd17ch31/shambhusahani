import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { behanceProjects } from '../data/behanceProjects';

const ProjectCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Extract the numeric ID from the Behance URL for the embed
  const projectId = project.url.match(/gallery\/(\d+)/)?.[1];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col bg-white border border-gray-200 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${(index % 2) * 100}ms` }}
    >
      {/* Iframe Container - Give it a fixed aspect ratio or height */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        {projectId ? (
          <iframe
            src={`https://www.behance.net/embed/project/${projectId}?ilo0=1`}
            title={project.title}
            loading="lazy"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        ) : (
          // Fallback if regex fails
          <div className="flex items-center justify-center h-full text-gray-400">
            Preview unavailable
          </div>
        )}
      </div>

      {/* Bottom Bar: Title and Link */}
      <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-100 bg-white">
        <h3 className="font-serif text-lg md:text-xl text-gray-900 tracking-wide">
          {project.title}
        </h3>
        
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors flex items-center gap-1"
        >
          Behance ↗
        </a>
      </div>
    </div>
  );
};

export default function Work() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
      
      {/* Editorial Header */}
      <header className="sticky top-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-gray-300">
        <div className="mx-auto flex h-[70px] max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link to="/work" className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 border-b border-transparent hover:border-gray-900 transition-colors pb-1">
            Work
          </Link>
          
          <Link to="/" className="font-serif text-lg md:text-xl tracking-[0.1em] uppercase text-gray-900 hover:opacity-70 transition-opacity">
            Shambhu Sahani
          </Link>
          
          <Link to="/about" className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 border-b border-transparent hover:border-gray-900 transition-colors pb-1">
            About
          </Link>
        </div>
      </header>

      {/* Main Gallery */}
      <main className="mx-auto max-w-[1600px] px-4 md:px-8 py-10 md:py-16">
        {/* Changed to a 2-column grid to accommodate iframe proportions better */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 auto-rows-auto">
          {behanceProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-gray-300 mt-12 py-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl tracking-widest uppercase mb-1">Shambhu Sahani</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Graphic Designer</p>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-medium uppercase tracking-widest">
            <a href="https://behance.net/shambhusahani" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">
              Behance
            </a>
            <Link to="/" className="hover:text-gray-500 transition-colors">
              Back to Home
            </Link>
          </div>

          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Shambhu Sahani. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}