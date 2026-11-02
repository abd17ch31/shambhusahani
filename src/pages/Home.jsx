import Hero from '../components/Hero';
import SelectedWork from '../components/SelectedWork';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Contact from '../components/Contact';
import ContactForm from '../components/ContactForm';
import VideoGrid from '../components/VideoCarousel/VideoGrid'; // <-- Import Grid instead

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <SelectedWork />
      <Experience />
      <Services />
      
      <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-8 md:mb-12">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 tracking-widest uppercase mb-2">
            / Motion & Video
          </h3>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Tools Mastered
          </h2>
        </div>
        
        <VideoGrid />
      </section>

      {/* <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8 md:mb-12">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 tracking-widest uppercase">
            / More Explorations
          </h3>
        </div>
      </section> */}

      <Contact />
      <ContactForm />
    </div>
  );
}