import { motion } from "motion/react";
import { Home, Building2, Key, BarChart3 } from "lucide-react";

const services = [
  {
    label: "Вторичная недвижимость",
  },
  {
    label: "Новостройки Москвы",
  },
  {
    label: "Аренда жилых помещений",
  },
  {
    label: "Коммерческая недвижимость",
  },
  {
    label: "Инвестиционный консалтинг",
  },
  {
    label: "Юридическое сопровождение производственного строительства",
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-32 border-l-4 border-luxury-gold pl-16 max-w-4xl mx-auto my-24">
      <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-luxury-gold mb-16">c чем я работаю</h3>
      <ul className="space-y-12">
        {services.map((service, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group flex justify-between items-center text-3xl border-b border-luxury-border pb-10 cursor-default"
          >
            <div className="flex flex-col">
              <span className="font-serif text-4xl md:text-5xl font-medium group-hover:translate-x-8 transition-transform duration-700">
                {service.label}
              </span>
            </div>
            <span className="font-serif italic text-luxury-gold opacity-30 group-hover:opacity-100 transition-opacity text-5xl">
              0{index + 1}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
