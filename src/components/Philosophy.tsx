import { motion } from "motion/react";

export const Philosophy = () => {
  return (
    <section id="culture" className="py-32 border-t border-luxury-stone max-w-5xl mx-auto my-24 overflow-hidden">
      <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-luxury-gold mb-12">Философия</h3>
      <motion.p 
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif italic text-5xl md:text-6xl lg:text-7xl leading-[1.2] text-[#444444]"
      >
        "Недвижимость — это не просто стены, это жизнь, которая происходит внутри них. Мы ставим профессионализм и прозрачность рынка превыше всего."
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 flex items-center gap-8"
      >
        <div className="w-24 h-[1px] bg-luxury-gold" />
        <span className="text-sm uppercase tracking-[0.5em] font-bold text-luxury-charcoal/60">Юлия Шведова. Частная практика</span>
      </motion.div>
    </section>
  );
};
