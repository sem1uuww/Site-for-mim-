import { motion } from "motion/react";
import { Home, Building2, Key, BarChart3 } from "lucide-react";

const services = [
  {
    label: "Вторичная недвижимость в Москве",
  },
  {
    label: "Новостройки Москвы",
  },
  {
    label: "Аренда жилых помещений в Москве",
  },
  {
    label: "Коммерческая недвижимость",
  },
  {
    label: "Недвижимость Санкт-Петербурга",
  },
  {
    label: "Недвижимость Краснодарского края",
  },
  {
    label: "Недвижимость в Турции",
  },
  {
    label: "Инвестиционный консалтинг",
  },
  {
    label: "Частные дома и загородная недвижимость",
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 border-l-4 border-luxury-gold pl-6 sm:pl-16 max-w-4xl mx-auto my-12 md:my-24">
      <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-luxury-gold mb-16 px-4 md:px-0">С чем я работаю</h3>
      <ul className="space-y-8 md:space-y-12">
        {services.map((service, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group flex justify-between items-center border-b border-luxury-border pb-8 md:pb-10 cursor-default px-4 md:px-0"
          >
            <div className="flex flex-col pr-4">
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium group-hover:translate-x-4 md:group-hover:translate-x-8 transition-transform duration-700 leading-tight">
                {service.label}
              </span>
            </div>
            <span className="font-serif italic text-luxury-gold opacity-30 group-hover:opacity-100 transition-opacity text-3xl sm:text-5xl shrink-0">
              0{index + 1}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
