/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Philosophy } from "./components/Philosophy";
import { ContactForm } from "./components/ContactForm";
import { AIAssistant } from "./components/AIAssistant";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  const openWizard = (step: number = 1) => {
    setWizardStep(step);
    setIsWizardOpen(true);
  };

  return (
    <div className="relative overflow-x-hidden selection:bg-luxury-gold selection:text-white">
      {/* Header Branding */}
      <header className="fixed top-0 left-0 right-0 px-12 md:px-24 py-8 flex justify-between items-center border-b border-luxury-stone bg-luxury-cream/95 backdrop-blur-md z-[100] transition-all">
        <div className="flex flex-col">
          <span className="font-serif italic text-3xl md:text-4xl tracking-tight text-[#2C2C2C]">Юлия Шведова</span>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mt-1">Эксперт по недвижимости</span>
        </div>
        <nav className="hidden lg:flex gap-16 text-[10px] uppercase tracking-[0.3em] font-bold">
          <a href="#expertise" className="opacity-50 hover:opacity-100 transition-opacity">статистика</a>
          <a href="#services" className="opacity-50 hover:opacity-100 transition-opacity">Услуги</a>
          <a href="#culture" className="opacity-50 hover:opacity-100 transition-opacity">Философия</a>
          <span className="text-luxury-gold">Москва, RU</span>
        </nav>
        <button 
          onClick={() => openWizard(1)}
          className="luxury-button-outline px-6 py-3 text-[10px]"
        >
          Консультация
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-12 pt-32 md:pt-40">
        <div id="home">
          <Hero onWizardOpen={() => openWizard(1)} />
        </div>
        
        <div id="expertise">
          <Stats />
        </div>
        
        <div id="services">
          <Services />
        </div>
        
        <div id="culture">
          <Philosophy />
        </div>
        
        <div id="inquiry">
          <ContactForm onContactClick={() => openWizard(3)} />
        </div>
      </main>

      {/* Footer Details */}
      <footer className="max-w-7xl mx-auto px-12 mt-40 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.3em] opacity-50 border-t border-luxury-stone pt-12 pb-20">
        <span>© 2026 Юлия Шведова. Недвижимость Москвы</span>
        <div className="flex gap-12 mt-8 md:mt-0">
          <span>ул. Тверская, 12, Москва</span>
          <span>Лицензия №084-21-MM</span>
        </div>
        <span className="mt-8 md:mt-0">Конфиденциальность гарантирована</span>
      </footer>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isWizardOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => openWizard(1)}
            className="fixed bottom-10 right-10 z-40 w-16 h-16 bg-luxury-charcoal text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="relative z-10"
            >
              <Check className="group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Consultation Wizard Sidebar */}
      <AIAssistant 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        initialStep={wizardStep}
      />
    </div>
  );
}
