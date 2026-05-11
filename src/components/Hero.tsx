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
        <h1 className="font-serif leading-[1.05] mb-12 text-[#2C2C2C] text-5xl md:text-7xl lg:text-8xl">
          Профессиональные решения <br />
          в недвижимости <span className="italic font-light text-luxury-gold">Москвы</span>
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed text-[#555555] max-w-3xl mx-auto mb-20">
          Ваш персональный эксперт Юлия Шведова. <br />
          Индивидуальный подход и полное сопровождение на каждом этапе сделки.
        </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button 
            id="hero-service-btn"
            onClick={onWizardOpen}
            className="luxury-button text-xl px-16 py-8 min-w-[320px] bg-luxury-gold text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white transition-all shadow-xl hover:shadow-2xl"
          >
            Подобрать услугу
          </button>
        </div>
      </motion.div>
    </section>
  );
};
