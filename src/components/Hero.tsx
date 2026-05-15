import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface HeroProps {
  onWizardOpen: () => void;
}

const locations = [
  "Москвы",
  "Санкт-Петербурга",
  "Турции",
  "Краснодарского края"
];

export const Hero = ({ onWizardOpen }: HeroProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % locations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
          в недвижимости{" "}
          <span className="inline-flex overflow-hidden h-[1.1em] align-top">
            <AnimatePresence mode="wait">
              <motion.span
                key={locations[index]}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="italic font-light text-luxury-gold inline-block"
              >
                {locations[index]}
              </motion.span>
            </AnimatePresence>
          </span>
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
