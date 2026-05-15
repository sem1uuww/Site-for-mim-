import { motion } from "motion/react";

const stats = [
  { label: "Лет на рынке Москвы", value: "7", suffix: "+" },
  { label: "Успешных сделок", value: "100", suffix: "+" },
  { label: "Средний срок сделки", value: "3-4", suffix: " недели" },
];

export const Stats = () => {
  return (
    <section id="expertise" className="py-20 md:py-24 bg-white p-6 sm:p-12 md:p-20 border border-luxury-border shadow-sm max-w-5xl mx-auto my-12">
      <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-luxury-gold mb-12 text-center md:text-left">Статистика</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-luxury-charcoal mb-4 flex items-baseline flex-wrap gap-2 justify-center md:justify-start">
              <span>{stat.value}{stat.suffix}</span>
            </div>
            <span className="text-sm sm:text-base text-[#888888] uppercase tracking-[0.3em] leading-relaxed font-bold">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-16 pt-8 border-t border-luxury-border">
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-luxury-charcoal/40">ОТ ИДЕИ ДО ЗАВЕРШЕНИЯ</p>
      </div>
    </section>
  );
};
