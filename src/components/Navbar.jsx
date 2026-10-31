import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Work', count: '16', path: '/work' },
  { label: 'Service', count: '5', path: '/#service' }, // <-- Updated to use hash
  { label: 'Experience', count: '1.5y', path: '/#experience' }, // <-- Updated
  { label: 'Contact', count: null, path: '/#contact' }, // <-- Updated
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Custom click handler for smooth scrolling
  const handleNavClick = (e, path) => {
    e.preventDefault();
    
    // Check if it's a hash link (e.g., "/#service")
    if (path.includes('#')) {
      const id = path.split('#')[1];
      
      // If we are not on the homepage, go to homepage first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for the page to render, then scroll
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // If already on homepage, just scroll
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Normal route (like /work)
      navigate(path);
    }
    
    setIsMobileMenuOpen(false);
  };

  // Helper to determine active state (handles both routes and hashes)
  const isActive = (path) => {
    if (path === '/work') return location.pathname === '/work';
    // For hashes, we don't highlight them as "active" since they are just scroll targets
    return false; 
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT */}
        <div className="flex items-center shrink-0">
          <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-[13px] font-medium tracking-wide text-gray-600">
              Available for New Project
            </span>
          </div>
          <div className="sm:hidden font-semibold tracking-tighter text-lg cursor-pointer" onClick={() => navigate('/')}>
            STUDIO.
          </div>
        </div>

        {/* CENTER */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={(e) => handleNavClick(e, item.path)}
              className={`group relative flex items-baseline gap-1 text-[14px] transition-colors duration-300 ${
                isActive(item.path) ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span>{item.label}</span>
              {item.count && (
                <span className="text-[11px] font-normal text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                  [{item.count}]
                </span>
              )}
              <span className="absolute -bottom-1.5 left-0 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="group flex h-[40px] sm:h-[42px] items-center justify-center gap-1.5 rounded-full bg-[#111] px-4 sm:px-6 text-[13px] sm:text-[14px] font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#333] hover:shadow-md active:translate-y-0"
          >
            Let's Talk
            <span className="transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
              ↗
            </span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute top-[80px] left-0 w-full overflow-hidden border-b border-gray-100 bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100 shadow-lg' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={(e) => handleNavClick(e, item.path)}
              className={`flex w-full items-baseline justify-between border-b border-gray-50 pb-2 text-lg ${
                isActive(item.path) ? 'text-black font-medium' : 'text-gray-600'
              }`}
            >
              <span>{item.label}</span>
              {item.count && (
                <span className="text-sm font-normal text-gray-400">[{item.count}]</span>
              )}
            </button>
          ))}
          <div className="pt-2 sm:hidden">
            <div className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2 w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-[13px] font-medium text-gray-600">Available for New Project</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}