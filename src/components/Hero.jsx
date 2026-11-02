import { useState, useEffect } from 'react';
import heroImage from '../assets/hero.png';

const SOCIALS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/shambhu0860?srtk=MWc4MjBsaHpzNjhlZw==',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    )
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/shambhusahani3',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shambhu-sahani-09a443309/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    )
  }
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const smoothEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-white flex flex-col overflow-hidden">
      
      <div className="relative w-full max-w-[1400px] mx-auto flex flex-col items-center md:block md:h-[750px] flex-grow pt-12 md:pt-0">
        
        {/* 1. Typography */}
        <div className="relative md:absolute top-0 md:top-[15%] w-full px-4 md:px-[4%] z-10 flex justify-center overflow-hidden mb-6 md:mb-0">
          <h1 
            className={`flex flex-col md:flex-row items-center md:items-baseline gap-0 md:gap-4 text-[18vw] md:text-[10.5vw] lg:text-[9vw] font-black leading-[0.85] md:leading-[0.8] tracking-tighter uppercase transition-all duration-[1800ms] ${smoothEase} ${
              mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-md'
            }`}
          >
            <span className="text-transparent [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2px_#111] md:[-webkit-text-stroke:3px_#111] [paint-order:stroke_fill]">
  Shambhu
</span>
            <span className="text-[#111]">
              Sahani
            </span>
          </h1>
        </div>

        {/* 2. Portrait Image - FULL WIDTH ON MOBILE */}
        {/* Changed max-w to max-w-none for mobile, and w-full on the img tag */}
        <div className="relative md:absolute bottom-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-none md:max-w-[700px] h-[480px] sm:h-[560px] md:h-[75%] flex justify-center items-end z-20 pointer-events-none mt-2 md:mt-0">
          <img loading="lazy" 
            src={heroImage} 
            alt="Shambhu Sahani" 
            className={`w-full md:w-auto h-full object-contain object-bottom grayscale transition-all duration-[2000ms] delay-[400ms] ${smoothEase} ${
              mounted ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-95 opacity-0'
            }`}
          />
        </div>

        {/* 3. Bottom Content Wrapper */}
        <div className="relative md:absolute md:inset-0 z-30 flex flex-col md:block w-full px-6 md:px-0 mt-8 md:mt-0">
          
          {/* Left Content */}
          <div 
            className={`flex flex-col items-center text-center md:items-start md:text-left md:absolute md:left-[8%] md:bottom-[15%] max-w-[280px] md:max-w-[260px] mx-auto transition-all duration-[1500ms] delay-[900ms] ${smoothEase} ${
              mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
            }`}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
              Graphic Designer
            </h2>
            <p className="mt-3 text-[13px] md:text-sm text-gray-500 leading-relaxed font-medium">
              Designing meaningful visual experiences through creativity, clarity, and thoughtful design.
            </p>
            <a 
              href="#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#333] hover:shadow-md"
            >
              Let's collaborate
              <span className="text-lg leading-none transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                ↗
              </span>
            </a>
          </div>

          {/* Right Content (Socials) */}
          <div className="flex flex-row md:flex-col justify-center md:justify-start gap-2 md:gap-3 mt-10 md:mt-0 md:absolute md:right-[8%] md:bottom-[15%]">
            {SOCIALS.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-center md:justify-start gap-2 md:gap-3 rounded-full border border-gray-200 bg-white px-4 md:px-5 py-2 md:py-2.5 text-[12px] md:text-[13px] font-medium text-gray-700 shadow-sm transition-all duration-[1200ms] ${smoothEase} hover:-translate-y-1 hover:border-gray-300 hover:shadow-md ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}
                style={{ transitionDelay: `${1100 + index * 200}ms` }}
              >
                <span className="text-gray-400 group-hover:text-black transition-colors duration-300">
                  {social.icon}
                </span>
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
