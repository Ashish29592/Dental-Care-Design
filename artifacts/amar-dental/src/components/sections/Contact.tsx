import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  treatment: z.string().min(1, { message: "Please select a treatment." }),
  date: z.string().min(1, { message: "Please select a preferred date." }),
  message: z.string().optional(),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      treatment: "",
      date: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "Request Sent Successfully",
        description: "Thank you! We'll confirm your appointment soon.",
      });
      form.reset();
    }, 1000);
  }

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Book Your Appointment
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take the first step towards a healthier smile. Fill out the form below or contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-xl bg-slate-50 border-transparent focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 XXXXX XXXXX" type="tel" className="rounded-xl bg-slate-50 border-transparent focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="treatment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Treatment Needed *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-transparent focus:ring-primary/20">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="consultation">Consultation / Check-up</SelectItem>
                            <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                            <SelectItem value="whitening">Teeth Whitening</SelectItem>
                            <SelectItem value="implants">Dental Implants</SelectItem>
                            <SelectItem value="rct">Root Canal</SelectItem>
                            <SelectItem value="emergency">Emergency Care</SelectItem>
                            <SelectItem value="other">Other / Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Preferred Date *</FormLabel>
                        <FormControl>
                          <Input type="date" className="rounded-xl bg-slate-50 border-transparent focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your dental concern..." 
                          className="resize-none rounded-xl bg-slate-50 border-transparent focus-visible:ring-primary/20 min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-xl text-lg font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Request..." : "Send Appointment Request"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Right Column - Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Contact Information</h3>
              
              <a href="tel:+919654108374" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Call Us</p>
                  <p className="text-lg font-bold text-slate-900">+91 09654 108374</p>
                </div>
              </a>

              <a href="https://wa.me/919654108374" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">WhatsApp</p>
                  <p className="text-lg font-bold text-slate-900">+91 09654 108374</p>
                </div>
              </a>

              <a href="mailto:amardentalclinic@gmail.com" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Email</p>
                  <p className="text-lg font-bold text-slate-900">amardentalclinic@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Location</p>
                  <p className="text-base font-medium text-slate-900 leading-relaxed">
                    Shop No. 7, Arshia Apartments, Matiala Rd,<br />
                    Kiran Garden, Uttam Nagar, Delhi — 110059<br />
                    <span className="text-slate-500 text-sm">Opp. Dhingra Honda Service Centre</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden aspect-video relative shadow-sm border border-slate-100">
              <iframe
                title="Amar Dental Clinic Location"
                src="https://maps.google.com/maps?q=AMAR+DENTAL+CLINIC+Shop+No+7+Arshia+Apartments+Matiala+Road+Kiran+Garden+Uttam+Nagar+Delhi+110059&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
