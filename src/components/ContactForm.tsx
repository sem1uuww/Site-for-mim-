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
      
      <div className="max-w-7xl mx-auto px-12 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight">
            <span className="text-luxury-gold">Остались</span> <span className="italic font-light text-luxury-gold">вопросы?</span>
          </h2>
          <p className="text-xl md:text-3xl text-white leading-relaxed max-w-3xl mx-auto font-light mb-4">
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
            className="group relative flex items-center gap-8 bg-luxury-gold text-luxury-charcoal px-16 py-10 rounded-sm hover:bg-white transition-all transform hover:scale-105 shadow-2xl"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-60 mb-2">Прямая связь</span>
              <span className="text-3xl md:text-4xl font-serif italic">свяжитесь со мной</span>
            </div>
            <div className="w-16 h-16 bg-luxury-charcoal text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
              <ChevronRight size={32} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
