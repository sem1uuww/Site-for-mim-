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
import { ConsultationWizard } from "./components/ConsultationWizard";
import { Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X as CloseIcon } from "lucide-react";

export default function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWizard = (step: number = 1) => {
    setWizardStep(step);
    setIsWizardOpen(true);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative overflow-x-hidden selection:bg-luxury-gold selection:text-white">
      {/* Header Branding */}
      <header className="fixed top-0 left-0 right-0 px-6 md:px-24 py-6 md:py-8 flex justify-between items-center border-b border-luxury-stone bg-luxury-cream/95 backdrop-blur-md z-[100] transition-all">
        <div className="flex flex-col min-w-0">
          <span className="font-serif italic text-xl sm:text-2xl md:text-4xl tracking-tight text-[#2C2C2C] truncate">Юлия Шведова</span>
          <span className="text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] font-bold text-luxury-gold mt-1 truncate">Эксперт по недвижимости</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-16 text-[10px] uppercase tracking-[0.3em] font-bold">
          <a href="#expertise" className="opacity-50 hover:opacity-100 transition-opacity">Статистика</a>
          <a href="#services" className="opacity-50 hover:opacity-100 transition-opacity">Услуги</a>
          <a href="#culture" className="opacity-50 hover:opacity-100 transition-opacity">Философия</a>
          <span className="text-luxury-gold">Москва, РФ</span>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => openWizard(1)}
            className="luxury-button-outline px-6 py-3 text-[10px] hidden md:block"
          >
            Консультация
          </button>
          
          {/* Mobile Menu Trigger */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-luxury-charcoal"
          >
            {isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-luxury-cream z-[90] lg:hidden pt-32 px-12"
          >
            <nav className="flex flex-col gap-10 text-xl uppercase tracking-[0.2em] font-bold text-luxury-charcoal">
              <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)}>Статистика</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Услуги</a>
              <a href="#culture" onClick={() => setIsMobileMenuOpen(false)}>Философия</a>
              <button 
                onClick={() => openWizard(1)}
                className="luxury-button w-full mt-10"
              >
                Консультация
              </button>
            </nav>
            <div className="absolute bottom-12 left-12">
              <span className="text-luxury-gold text-xs uppercase tracking-widest">Москва, РФ</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40">
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
          <ContactForm 
            onContactClick={() => openWizard(4)} 
          />
        </div>
      </main>

      {/* Footer Details */}
      <footer className="max-w-7xl mx-auto px-12 mt-40 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.3em] opacity-50 border-t border-luxury-stone pt-12 pb-20">
        <span>© 2026 Юлия Шведова. Недвижимость Москвы</span>
      </footer>

      {/* Consultation Wizard Sidebar */}
      <ConsultationWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        initialStep={wizardStep}
      />
    </div>
  );
}
