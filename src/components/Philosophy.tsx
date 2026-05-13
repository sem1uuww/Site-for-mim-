import { motion } from "motion/react";

export const Philosophy = () => {
  return (
    <section id="culture" className="py-24 md:py-48 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left Side: Image with sophisticated frame */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group h-full"
        >
          <div className="absolute -inset-4 border border-luxury-gold/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
          <div className="relative overflow-hidden bg-luxury-stone/10 aspect-[3/4] md:aspect-auto md:h-[700px]">
             {/* Note: src/assets/julia.png should contain the image provided by the user */}
            <img 
              src="/src/assets/images/regenerated_image_1778673551334.png" 
              alt="Julia Shvedova"
              className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100"
              onError={(e) => {
                // Fallback if image not found (for preview consistency)
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/40 to-transparent" />
          </div>
          <div className="absolute bottom-8 -right-4 md:-right-12 bg-white p-8 shadow-2xl max-w-[280px]">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mb-2">Основатель</p>
            <h4 className="font-serif italic text-2xl text-luxury-charcoal">Юлия Шведова</h4>
            <div className="w-12 h-px bg-luxury-gold mt-4" />
          </div>
        </motion.div>

        {/* Right Side: Philosophy Content */}
        <div className="flex flex-col justify-center">
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
            <p className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-luxury-charcoal mb-12">
              "Недвижимость — это не просто стены, это <span className="text-luxury-gold">жизнь</span>, которая происходит внутри них."
            </p>
            
            <div className="space-y-8 text-luxury-charcoal/70 text-lg md:text-xl font-light leading-relaxed max-w-xl">
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
              className="mt-20 h-px bg-luxury-stone" 
            />
            
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-luxury-charcoal/40">Private practice</span>
              <span className="font-serif italic text-luxury-charcoal">Est. 2021</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

