import { motion } from "motion/react";

interface HeroProps {
  onWizardOpen: () => void;
}

export const Hero = ({ onWizardOpen }: HeroProps) => {
  return (
    <section className="py-24 md:py-40 flex flex-col items-center text-center max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <h1 className="font-serif leading-[1.1] mb-8 md:mb-12 text-[#2C2C2C] text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
          Профессиональные решения <br className="hidden sm:block" />
          в недвижимости <span className="italic font-light text-luxury-gold">Москвы</span>
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed text-[#555555] max-w-3xl mx-auto mb-12 md:mb-20 px-4 md:px-0">
          Ваш персональный эксперт Юлия Шведова. <br className="hidden sm:block" />
          Индивидуальный подход и полное сопровождение на каждом этапе сделки.
        </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 px-6 md:px-0">
          <button 
            id="hero-service-btn"
            onClick={onWizardOpen}
            className="luxury-button text-lg md:text-xl px-8 md:px-16 py-6 md:py-8 w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-luxury-gold text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white transition-all shadow-xl hover:shadow-2xl"
          >
            Подобрать услугу
          </button>
        </div>
      </motion.div>
    </section>
  );
};
