import { motion } from 'framer-motion';
import { ZoomIn, Camera } from 'lucide-react';
import { useState } from 'react';

// AI-generated clinic images
import gallery1 from '@assets/generated_images/gallery-1.jpg';
import gallery2 from '@assets/generated_images/gallery-2.jpg';
import gallery3 from '@assets/generated_images/gallery-3.jpg';
import gallery5 from '@assets/generated_images/gallery-5.jpg';
import gallery6 from '@assets/generated_images/gallery-6.jpg';

// Real clinic photos (from patient reviews)
import clinicPhoto1 from '@assets/Screenshot_20260708-151614.Maps_1783504296516.png';
import clinicPhoto2 from '@assets/Screenshot_20260708-151610.Maps_1783504296629.png';
import clinicPhoto3 from '@assets/Screenshot_20260708-151627.Maps_1783504296481.png';

const images = [
  { src: clinicPhoto1, alt: "Amar Dental Clinic Treatment Room", real: true, pos: "center 72%" },
  { src: clinicPhoto2, alt: "Amar Dental Clinic Chair & Equipment", real: true, pos: "center 68%" },
  { src: clinicPhoto3, alt: "Amar Dental Clinic Interior", real: true, pos: "center 75%" },
  { src: gallery1, alt: "Modern Clinic Reception", real: false, pos: "center" },
  { src: gallery2, alt: "Professional Dental Care", real: false, pos: "center" },
  { src: gallery5, alt: "Happy Patient", real: false, pos: "center" },
  { src: gallery3, alt: "Comfortable Waiting Area", real: false, pos: "center" },
  { src: gallery6, alt: "Our Dental Team", real: false, pos: "center" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-4 text-sm"
          >
            <Camera className="w-4 h-4" />
            Clinic Gallery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Our Clinic & Smiles
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take a look inside our modern facility — designed for your comfort, safety, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              onClick={() => setLightbox(img.src)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer bg-slate-200 ${
                idx === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
            >
              {img.real && (
                <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Real Photo
                </div>
              )}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: img.pos }}
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white transform scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Clinic photo"
            className="max-w-full max-h-full rounded-xl object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-slate-300"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
