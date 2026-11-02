import { useState, useEffect, useRef } from 'react';
import { contactConfig } from '../data/contact';
import heroImage from '../assets/hero.png';

const ICONS = {
  Instagram: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  ),
  WhatsApp: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  LinkedIn: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  ),
  Behance: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>
  )
};

export default function Contact() {
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
      id="contact1"
      className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-white flex justify-center overflow-hidden border-t border-gray-100"
    >
      {/* Outer Cloudy Atmospheric Container */}
      <div className="relative w-full max-w-[1400px] rounded-[32px] border border-gray-100 overflow-hidden bg-[#f8f9fa] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-200/60 shadow-sm flex flex-col items-center justify-center px-4 py-20 md:py-32">
        
        {/* Soft cloud blur overlays */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-white rounded-full blur-[120px] opacity-50 pointer-events-none" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[800px]">
          
          {/* 1. Availability Pill */}
          <div 
            className={`flex items-center gap-2.5 rounded-full border border-gray-200/60 bg-white/80 backdrop-blur-md px-4 py-1.5 shadow-sm transition-all duration-1000 ${smoothEase} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-[13px] font-medium tracking-wide text-gray-600">
              {contactConfig.availabilityText}
            </span>
          </div>

          {/* 2. Main Heading */}
          <h2 
            className={`mt-8 md:mt-10 text-4xl md:text-[56px] lg:text-[64px] font-semibold text-gray-900 tracking-tight leading-[1.1] transition-all duration-1000 delay-150 ${smoothEase} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {contactConfig.heading}
          </h2>

          {/* 3. Description */}
          <p 
            className={`mt-6 text-base md:text-[18px] text-gray-500 leading-relaxed max-w-[700px] transition-all duration-1000 delay-300 ${smoothEase} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {contactConfig.description}
          </p>

          {/* 4. CTA Button */}
<a 
  href={contactConfig.contactUrl} // <-- This now equals "tel:+919217902386"
  className={`group mt-10 flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#111] px-8 text-[14px] font-medium text-white shadow-md transition-all duration-500 delay-[400ms] ${smoothEase} hover:-translate-y-1 hover:bg-[#333] hover:shadow-lg active:translate-y-0 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>
  {contactConfig.ctaText}
  <span className="transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
    ↗
  </span>
</a>

        </div>

        {/* 5. Bottom Identity & Socials Row */}
        <div 
          className={`relative z-10 mt-24 flex flex-wrap items-center justify-center gap-4 md:gap-8 transition-all duration-1000 delay-500 ${smoothEase} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          
          {/* Designer Identity Pill */}
          <a 
            href={contactConfig.designer.url}
            className="group flex h-[44px] items-center gap-3 rounded-full bg-[#151515] pl-1.5 pr-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20">
              <img loading="lazy" 
                src={heroImage} 
                alt={contactConfig.designer.name}
                className="h-full w-full object-cover object-top grayscale"
              />
            </div>
            <span className="text-[13px] font-medium text-white">
              {contactConfig.designer.name}
            </span>
          </a>

          {/* Social Pills */}
          {contactConfig.socials.map((social) => {
            // Case-insensitive lookup for the icon
            const iconKey = Object.keys(ICONS).find(
              (key) => key.toLowerCase() === social.name.toLowerCase()
            );

            return (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-[44px] items-center gap-2.5 rounded-full border border-gray-200 bg-white px-5 text-[13px] font-medium text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
              >
                <span className="text-gray-400 group-hover:text-black transition-colors duration-300">
                  {ICONS[iconKey]}
                </span>
                {social.name}
              </a>
            );
          })}

        </div>

      </div>
    </section>
  );
}
