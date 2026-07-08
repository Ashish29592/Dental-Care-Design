import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import doc1 from '@assets/generated_images/doc-1.jpg';
import doc2 from '@assets/generated_images/doc-2.jpg';
import doc3 from '@assets/generated_images/doc-3.jpg';

const doctors = [
  {
    name: "Dr. Avinash Singh",
    qual: "BDS, MDS",
    exp: "18+ Years Experience",
    spec: "Lead dentist at Amar Dental Clinic. Specialist in root canal treatment, dental implants, and cosmetic dentistry. Praised by patients for being calm, humble, and hardworking — always putting patient comfort first.",
    img: doc1
  },
  {
    name: "Dr. Priya Sharma",
    qual: "BDS",
    exp: "7+ Years Experience",
    spec: "Expert in children's dentistry, preventive care, and teeth cleaning. Gentle approach for patients of all ages.",
    img: doc2
  },
  {
    name: "Dr. Rohan Mehta",
    qual: "BDS, MDS (Oral Surgery)",
    exp: "8+ Years Experience",
    spec: "Specialist in oral surgery, wisdom tooth extraction, and dental prosthetics. Trained in advanced surgical techniques.",
    img: doc3
  }
];

export function Doctors() {
  return (
    <section id="doctors" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-4 text-sm"
          >
            Our Specialists
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Meet Our Dental Team
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {doctors.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-slate-50 rounded-[2rem] overflow-hidden group border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-slate-200">
                <img 
                  src={doc.img} 
                  alt={doc.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 text-center bg-white relative -mt-8 mx-4 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{doc.qual}</p>
                <div className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {doc.exp}
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {doc.spec}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
