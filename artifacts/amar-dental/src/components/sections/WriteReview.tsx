import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2, Quote, UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

const STORAGE_KEY = 'amar_dental_patient_reviews';

interface PatientReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
}

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-teal-100 text-teal-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-orange-100 text-orange-700',
  'bg-green-100 text-green-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

// ── Star Picker ───────────────────────────────────────────────────────────────
function StarPicker({
  value,
  onChange,
  errorId,
}: {
  value: number;
  onChange: (v: number) => void;
  errorId?: string;
}) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div
      role="radiogroup"
      aria-label="Star rating"
      aria-required="true"
      aria-errormessage={errorId}
      className="flex flex-col items-start gap-2"
    >
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''} — ${labels[star]}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <Star
              className={`w-9 h-9 transition-colors ${
                star <= (hovered || value)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-slate-200 fill-slate-200'
              }`}
            />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {(hovered || value) > 0 && (
          <motion.span
            key={hovered || value}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold text-yellow-600"
          >
            {labels[hovered || value]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ review, idx }: { review: PatientReview; idx: number }) {
  const color = avatarColors[idx % avatarColors.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06 }}
      className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <Quote className="w-7 h-7 text-primary/20 mb-4 shrink-0" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-4 h-4 ${
              s <= review.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-200 fill-slate-200'
            }`}
          />
        ))}
      </div>

      <p className="text-slate-600 leading-relaxed text-sm flex-1 mb-6">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${color}`}
        >
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 text-sm truncate">{review.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {timeAgo(review.date)} · Patient Review
          </p>
        </div>
        {/* Badge */}
        <span className="flex items-center gap-1 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full shrink-0">
          <CheckCircle2 className="w-3 h-3" />
          Patient Review
        </span>
      </div>
    </motion.div>
  );
}

// ── Form schema ───────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().trim().min(2, { message: 'Please enter your name (min 2 characters).' }),
  text: z.string().trim().min(10, { message: 'Please write at least 10 characters.' }),
});

// ── Main Section ──────────────────────────────────────────────────────────────
export function WriteReview() {
  const [reviews, setReviews] = useState<PatientReview[]>([]);
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount; clear timer on unmount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setReviews(JSON.parse(stored) as PatientReview[]);
    } catch {
      // ignore
    }
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', text: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (rating === 0) {
      setRatingError('Please select a star rating.');
      return;
    }
    setRatingError('');

    const newReview: PatientReview = {
      id: Date.now().toString(),
      name: values.name.trim(),
      rating,
      text: values.text.trim(),
      date: new Date().toISOString(),
      initials: getInitials(values.name.trim()),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore quota
    }

    form.reset();
    setRating(0);
    setSubmitted(true);
    successTimerRef.current = setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-4 text-sm"
          >
            Share Your Experience
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Rate Your Visit
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Your feedback helps us improve and helps other patients make informed decisions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Form (2/5) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-8 rounded-3xl border border-slate-100 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <UserRound className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Write a Review</h3>
                  <p className="text-sm text-slate-500">Takes less than a minute</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Thank You!</h4>
                    <p className="text-slate-500 text-sm max-w-xs">
                      Your review has been posted. We truly appreciate your feedback.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Star Rating */}
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-700" id="rating-label">
                            Your Rating <span className="text-red-500">*</span>
                          </p>
                          <StarPicker
                            value={rating}
                            onChange={(v) => { setRating(v); setRatingError(''); }}
                            errorId={ratingError ? 'rating-error' : undefined}
                          />
                          {ratingError && (
                            <p id="rating-error" className="text-sm font-medium text-destructive">{ratingError}</p>
                          )}
                        </div>

                        {/* Name */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700">Your Name <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Rahul Sharma"
                                  className="rounded-xl bg-white border-slate-200 focus-visible:ring-primary/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Review Text */}
                        <FormField
                          control={form.control}
                          name="text"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700">Your Review <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your experience at Amar Dental Clinic..."
                                  className="resize-none rounded-xl bg-white border-slate-200 focus-visible:ring-primary/20 min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-all gap-2">
                          <Send className="w-4 h-4" />
                          Submit Review
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Patient Reviews Feed (3/5) ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {reviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full py-20 gap-4 text-center bg-slate-50 rounded-3xl border border-slate-100"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Be the First to Review!</h4>
                <p className="text-slate-500 text-sm max-w-xs">
                  Share your experience and help future patients choose the right care.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
                <AnimatePresence>
                  {reviews.map((review, idx) => (
                    <ReviewCard key={review.id} review={review} idx={idx} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
