import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Mayur Saxena",
    date: "1 year ago",
    text: "I am really happy with the treatment at Amar Dental Clinic. I must say that Dr. Avinash Singh is a wonderful Dentist, very calm and helpful. Great Work!!",
    initials: "MS",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Hema Chawla",
    date: "1 year ago",
    text: "Amar Dental Clinic is fantastic! The staff is welcoming, and Dr. Avinash is incredibly skilled and caring. The clinic is clean, modern, and well-equipped. I felt completely cared for.",
    initials: "HC",
    color: "bg-teal-100 text-teal-700"
  },
  {
    name: "Naveen Pandey",
    date: "10 months ago",
    text: "Service was excellent, and the staff were incredibly humble, professional, and supportive throughout. I truly appreciate their polite attitude and dedication to patient care.",
    initials: "NP",
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "Anjali Singh",
    date: "1 year ago",
    text: "I recently visited the clinic for a cleaning, scaling, and composite restoration, and I'm extremely pleased with the results. Dr. Avinash demonstrated remarkable expertise and professionalism.",
    initials: "AS",
    color: "bg-pink-100 text-pink-700"
  },
  {
    name: "Kavita Negi",
    date: "11 months ago",
    text: "I was searching for dental implant treatment in my nearby vicinity and came to know about Amar Dental Clinic. Dr. Avinash gave thorough consultation and answered all my questions patiently.",
    initials: "KN",
    color: "bg-orange-100 text-orange-700"
  },
  {
    name: "Dharmendra Tiwari",
    date: "5 months ago",
    text: "Excellent dental clinic with highly professional staff. The treatment was done very well, and the dentist and team were extremely polite and courteous throughout the entire visit.",
    initials: "DT",
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Srishty Sharma",
    date: "3 years ago",
    text: "I am very happy and satisfied from my experience with Amar Dental Clinic. The clinic has a very hygienic environment and a painless RCT procedure was performed. Highly recommended!",
    initials: "SS",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Sapna Bhusal",
    date: "7 months ago",
    text: "Very good dentist and staff. Polite behaviour and satisfying treatment. The whole experience was smooth and comfortable. I'll definitely recommend this clinic to friends and family.",
    initials: "SB",
    color: "bg-teal-100 text-teal-700"
  },
  {
    name: "Samriti Sharma",
    date: "5 months ago",
    text: "Very good experience — all the staff and doctors are so helpful and handle patients with patience and care. Must visit! The clinic truly puts patients first in every way.",
    initials: "SS",
    color: "bg-rose-100 text-rose-700"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-50 to-teal-50/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full mb-4 text-sm"
          >
            Real Google Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            What Our Patients Say
          </motion.h2>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-2xl font-bold text-slate-900">4.9</span>
          </div>
          <p className="text-slate-500 font-medium">Based on verified Google Reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4 shrink-0" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-slate-600 leading-relaxed text-sm flex-1 mb-6">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${review.color}`}>
                  {review.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{review.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-3 h-3"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <p className="text-xs text-slate-400">{review.date} · Google Review</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to see all reviews */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://share.google/3gNXtuIAQpV7noEBj"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors shadow-sm"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            See All Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
