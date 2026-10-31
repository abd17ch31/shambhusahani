import { useState, useEffect, useRef } from 'react';

export default function ContactForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const sectionRef = useRef(null);

  // Intersection Observer for entrance animation
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);
    // Add the Web3Forms Access Key
    formData.append("access_key", "b35f2aaa-5177-4c13-88df-a796dd69c161");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.target.reset(); // Clear the form
      } else {
        console.error("Form submission failed:", data);
        setStatus('error');
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus('error');
    }
  };

  const smoothEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-white flex justify-center px-4 md:px-8 border-t border-gray-100 overflow-hidden"
    >
      <div className="relative w-full max-w-[800px] px-2 z-10">
        
        {/* Header */}
        <div 
          className={`mb-12 text-center transition-all duration-1000 ${smoothEase} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-[40px] font-semibold text-gray-900 tracking-tight mb-4">
            Let's build something great.
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Form Container */}
        {status === 'success' ? (
          <div className="bg-[#151515] text-white rounded-2xl p-12 text-center shadow-lg transition-all duration-500">
            <svg className="w-16 h-16 mx-auto mb-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-gray-400">Thank you for reaching out. I'll be in touch shortly.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm font-medium text-white hover:text-gray-300 transition-colors underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className={`flex flex-col gap-8 transition-all duration-1000 delay-200 ${smoothEase} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Row 1: Name & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <label htmlFor="name" className="text-sm font-medium text-gray-500 mb-2 block">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-colors duration-300"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="relative group">
                <label htmlFor="contact" className="text-sm font-medium text-gray-500 mb-2 block">Contact (Email or Phone)</label>
                <input 
                  type="text" 
                  id="contact" 
                  name="contact" 
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-colors duration-300"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            {/* Row 2: Date */}
            <div className="relative group">
              <label htmlFor="date" className="text-sm font-medium text-gray-500 mb-2 block">Date</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                required
                className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors duration-300"
              />
            </div>

            {/* Row 3: Project Details */}
            <div className="relative group">
              <label htmlFor="project_details" className="text-sm font-medium text-gray-500 mb-2 block">Tell us about your project <span className="text-gray-400 font-normal">(Optional)</span></label>
              <textarea 
                id="project_details" 
                name="project_details" 
                rows="4"
                className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-colors duration-300 resize-none"
                placeholder="I'm looking for help with..."
              ></textarea>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again or contact me directly.</p>
            )}

            {/* Submit Button */}
            <div className="mt-4">
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="group flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#111] px-8 text-[14px] font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#333] hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#111]"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                {status !== 'submitting' && (
                  <span className="transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                    ↗
                  </span>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}