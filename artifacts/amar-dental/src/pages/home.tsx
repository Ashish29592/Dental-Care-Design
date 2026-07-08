import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Gallery } from '@/components/sections/Gallery';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Doctors } from '@/components/sections/Doctors';
import { Testimonials } from '@/components/sections/Testimonials';
import { WriteReview } from '@/components/sections/WriteReview';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features />
      <WhyChooseUs />
      <Gallery />
      <BeforeAfter />
      <Doctors />
      <Testimonials />
      <WriteReview />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
