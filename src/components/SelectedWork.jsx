import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import projectImage from '../assets/videos/projects/image.png';
import projectOne from '../assets/videos/projects/project 1.mp4';
import projectTwo from '../assets/videos/projects/project 2.mp4';
import projectThree from '../assets/videos/projects/project 3.mp4';

const workItems = [
  { type: 'image', src: projectImage, title: 'Visual Identity', label: 'Brand exploration', layout: 'side' },
  { type: 'video', src: projectOne, title: 'Product in Motion', label: 'Motion design', layout: 'top' },
  { type: 'video', src: projectTwo, title: 'Colour & Form', label: 'Visual system', layout: 'bottom' },
  { type: 'video', src: projectThree, title: 'A Moving Story', label: 'Creative direction', layout: 'side' },
];

function Media({ item }) {
  const className = 'h-full w-full bg-[#ecebe6] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 md:object-contain';

  if (item.type === 'image') {
    return <img src={item.src} alt={item.title} className={className} />;
  }

  return (
    <video
      src={item.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={item.title}
      className={className}
    />
  );
}

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden border-t border-gray-100 bg-[#f7f6f2] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className={`mb-8 flex flex-col gap-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:mb-10 md:flex-row md:items-end md:justify-between ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">/ Selected Work</p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-gray-950 md:text-6xl">Ideas with a pulse.</h2>
          </div>
          <Link to="/work" className="group inline-flex w-fit items-center gap-3 border-b border-gray-900 pb-2 text-sm font-medium text-gray-900 transition-opacity hover:opacity-60">
            View all work
            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
          </Link>
        </div>

        <div className="selected-work-grid grid grid-cols-1 gap-3 md:h-[520px] md:grid-cols-12 md:grid-rows-2 md:gap-4 lg:h-[600px]">
          {workItems.map((item, index) => (
            <article
              key={item.title}
              className={`selected-work-card selected-work-card-${index} group relative min-h-[16rem] overflow-hidden rounded-[1.25rem] bg-gray-200 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-0 md:h-full ${item.layout === 'side' ? 'md:row-span-2' : ''} ${index === 0 ? 'md:col-span-3' : index === 1 ? 'md:col-span-6 md:col-start-4 md:row-start-1' : index === 2 ? 'md:col-span-6 md:col-start-4 md:row-start-2' : 'md:col-span-3 md:col-start-10 md:row-start-1'} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 120 + 150}ms` }}
            >
              <Media item={item} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-6">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">{item.label}</p>
                  <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{item.title}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 -translate-x-2 items-center justify-center rounded-full border border-white/40 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">↗</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
