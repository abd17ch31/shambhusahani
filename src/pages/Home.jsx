import Hero from '../components/Hero';
import SelectedWork from '../components/SelectedWork';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Contact from '../components/Contact';
import ContactForm from '../components/ContactForm'; // <-- Import

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <SelectedWork />
      <Experience />
      <Services />
      <Contact />
      <ContactForm /> {/* <-- Add here */}
    </div>
  );
}