import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface ContactFormProps {
  onContactClick: () => void;
}

export const ContactForm = ({ onContactClick }: ContactFormProps) => {
  return (
    <section id="contact" className="py-40 bg-luxury-charcoal text-white overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif mb-8 md:mb-12 leading-tight">
            <span className="text-luxury-gold">Остались</span> <span className="italic font-light text-luxury-gold">вопросы?</span>
          </h2>
          <p className="text-lg md:text-3xl text-white leading-relaxed max-w-3xl mx-auto font-light mb-4">
            Если вы еще сомневаетесь или хотите обсудить 
            индивидуальные условия — я всегда на связи.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-8"
        >
          <button 
            onClick={onContactClick}
            className="group relative flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-luxury-gold text-luxury-charcoal px-8 md:px-16 py-8 md:py-10 rounded-sm hover:bg-white transition-all transform hover:scale-105 shadow-2xl w-full max-w-lg md:w-auto"
          >
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-60 mb-2">Прямая связь</span>
              <span className="text-2xl md:text-4xl font-serif italic uppercase tracking-wider">Свяжитесь со мной</span>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-luxury-charcoal text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shrink-0">
              <ChevronRight size={28} className="md:w-8 md:h-8" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
