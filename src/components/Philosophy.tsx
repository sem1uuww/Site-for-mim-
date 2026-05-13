import { motion } from "motion/react";

export const Philosophy = () => {
  return (
    <section id="culture" className="py-24 md:py-48 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Philosophy Content */}
        <div className="flex flex-col justify-center text-center items-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.4em] font-bold text-luxury-gold mb-12"
          >
            Философия & Видение
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[1.2] text-luxury-charcoal mb-16">
              "Недвижимость — это не просто стены, это <span className="text-luxury-gold">жизнь</span>, которая происходит внутри них."
            </p>
            
            <div className="space-y-8 text-luxury-charcoal/70 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              <p>
                В мире элитной недвижимости Москвы цена ошибки слишком высока. Моя миссия — обеспечить безупречный сервис, где каждое решение подкреплено глубокой аналитикой и пониманием истинных ценностей клиента.
              </p>
              <p>
                Мы ставим профессионализм, конфиденциальность и прозрачность сделки превыше всего. Каждому объекту — индивидуальный сценарий продажи, каждому клиенту — персональная архитектура владения.
              </p>
            </div>

            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="mt-24 h-px bg-luxury-stone" 
            />
            
            <div className="mt-12 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-luxury-charcoal/40">Юлия Шведова • Private practice</span>
              <span className="font-serif italic text-luxury-charcoal text-xl">Est. 2021</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

