import { HeartPulse, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <a href="#home" className="flex items-center gap-2 group w-max">
              <div className="bg-primary/20 p-2 rounded-xl">
                <HeartPulse className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl leading-tight text-white tracking-tight">
                  AMAR DENTAL
                </h2>
                <p className="text-sm font-medium text-teal-400">अमर डेंटल क्लीनिक</p>
              </div>
            </a>
            <p className="text-slate-400 leading-relaxed text-sm">
              Healthy Smiles. Trusted Care. Advanced Dentistry for the Whole Family in a modern, comfortable environment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Gallery', 'Doctors', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-teal-400 transition-colors font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="flex flex-col gap-4">
              {[
                'Consultation', 
                'Teeth Cleaning', 
                'Dental Implants', 
                'Root Canal', 
                'Teeth Whitening', 
                'Emergency Care'
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-slate-400 hover:text-teal-400 transition-colors font-medium">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Phone</span>
                <a href="tel:+919654108374" className="text-white hover:text-teal-400 transition-colors">+91 09654 108374</a>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Email</span>
                <a href="mailto:amardentalclinic@gmail.com" className="text-white hover:text-teal-400 transition-colors">amardentalclinic@gmail.com</a>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Address</span>
                <span className="text-white">Shop No. 7, Arshia Apartments, Matiala Rd, Kiran Garden, Uttam Nagar, Delhi — 110059</span>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Hours</span>
                <span className="text-white">Mon - Sat: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-medium">
          <p>Copyright © 2026 Amar Dental Clinic. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
