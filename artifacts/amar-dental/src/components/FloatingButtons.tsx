import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href="tel:+919654108374"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
              className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all hover:-translate-y-1"
            >
              <Phone className="w-6 h-6 fill-current" />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-semibold px-3 py-2 bg-slate-900 text-white border-slate-800">
            <p>Call Now</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href="https://wa.me/919654108374"
              target="_blank"
              rel="noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
              className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-emerald-600 transition-all hover:-translate-y-1 relative"
            >
              {/* Ping animation behind button */}
              <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-500 animate-ping opacity-20"></span>
              <MessageCircle className="w-7 h-7 relative z-10" />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-semibold px-3 py-2 bg-slate-900 text-white border-slate-800">
            <p>Chat with us</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
