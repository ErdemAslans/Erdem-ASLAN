import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { GlassCard } from '@/components/ui';

const TestimonialCard = ({ testimonial, isActive = false }) => {
  return (
    <GlassCard 
      className={`p-6 md:p-8 transition-all duration-500 ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
      }`}
    >
      <div className="relative">
        {/* Quote Icon */}
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-cyan/20" />
        
        {/* Quote Text */}
        <blockquote className="text-lg md:text-xl text-slate-light leading-relaxed mb-6 pl-6">
          "{testimonial.quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan/20 to-cyan-light/10 flex items-center justify-center text-lg font-bold text-cyan">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold text-midnight-50">{testimonial.name}</p>
            <p className="text-sm text-slate">
              {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
            </p>
          </div>
        </div>

        {/* Company Logo */}
        {testimonial.companyLogo && (
          <div className="absolute top-0 right-0">
            <img
              src={testimonial.companyLogo}
              alt={testimonial.company}
              className="h-8 opacity-50"
            />
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default TestimonialCard;