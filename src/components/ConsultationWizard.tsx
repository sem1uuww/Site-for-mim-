import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Check, Send, Phone } from "lucide-react";

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
}

const services = [
  "Вторичная недвижимость в Москве",
  "Новостройки Москвы",
  "Недвижимость СПб",
  "Недвижимость Краснодарского края",
  "Недвижимость в Турции",
  "Аренда жилых помещений в Москве",
  "Коммерческая недвижимость",
  "Частные дома и загородная недвижимость",
  "Инвестиционный консалтинг"
];

export const ConsultationWizard = ({ isOpen, onClose, initialStep = 1 }: WizardProps) => {
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  const [formData, setFormData] = useState({
    service: "",
    propertyType: "", // Will be used for "Apartment" or "House"
    city: "",
    district: "",
    rooms: "",
    budget: "",
    name: "",
    phone: "",
    telegram: "",
    email: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const [telegramError, setTelegramError] = useState("");

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // If empty or just +7, return formatted prefix
    if (digits === "") return "";
    
    // Normalize prefix
    let normalized = digits;
    if (digits.startsWith("7")) {
      normalized = digits.substring(1);
    } else if (digits.startsWith("8")) {
      normalized = digits.substring(1);
    }
    
    // Build the format: +7 (9XX) XXX-XX-XX
    let result = "+7";
    if (normalized.length > 0) {
      result += " (" + normalized.substring(0, 3);
    }
    if (normalized.length >= 4) {
      result += ") " + normalized.substring(3, 6);
    }
    if (normalized.length >= 7) {
      result += "-" + normalized.substring(6, 8);
    }
    if (normalized.length >= 9) {
      result += "-" + normalized.substring(8, 10);
    }
    
    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // If user deleted everything, allow empty
    if (value.length < 3 && (value.includes("+7") || value.includes("7") || value.includes("8"))) {
      if (value.length === 0) {
        setFormData(prev => ({ ...prev, phone: "" }));
        return;
      }
    }

    const formatted = formatPhoneNumber(value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove @ if user typed it, we'll show it as a prefix in UI
    if (value.startsWith("@")) {
      value = value.substring(1);
    }

    // Check for Russian characters
    const russianChars = /[а-яА-ЯёЁ]/;
    if (russianChars.test(value)) {
      setTelegramError("Username в Telegram может содержать только английские буквы");
      // Still don't allow Russian chars in state? User said "can only write in English"
      return; 
    } else {
      setTelegramError("");
    }

    // Only allow Alphanumeric and underscores for telegram username
    const validChars = /^[a-zA-Z0-9_]*$/;
    if (validChars.test(value)) {
      setFormData(prev => ({ ...prev, telegram: value }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
    nextStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send request");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Form submission error:", error);
      alert(error instanceof Error ? error.message : "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setFormData({
      service: "",
      propertyType: "",
      city: "",
      district: "",
      rooms: "",
      budget: "",
      name: "",
      phone: "",
      telegram: "",
      email: ""
    });
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetWizard}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[201] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-luxury-stone flex items-center justify-between bg-luxury-cream/30">
              <div className="flex flex-col">
                <span className="font-serif italic text-2xl text-luxury-charcoal leading-none">Юлия Шведова</span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mt-2">Консультация</span>
              </div>
              <button 
                onClick={resetWizard}
                className="p-3 hover:bg-luxury-stone/50 transition-colors rounded-full text-luxury-charcoal"
              >
                <X size={24} />
              </button>
            </div>

            {!isSuccess && initialStep !== 3 && (
              <div className="h-1 bg-luxury-stone w-full flex">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  className="h-full bg-luxury-gold"
                />
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col bg-[#FAFAFA]">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mb-8 shadow-inner">
                      <Check size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-serif mb-4 text-luxury-charcoal">Запрос принят</h2>
                    <p className="text-luxury-charcoal/60 leading-relaxed mb-10 max-w-sm">
                      Юлия изучит ваши пожелания и свяжется с вами в течение 30 минут.
                    </p>
                    <button onClick={resetWizard} className="luxury-button w-full">Закрыть окно</button>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <h2 className="text-3xl font-serif text-luxury-charcoal">Выберите категорию интереса</h2>
                        <div className="grid grid-cols-1 gap-4">
                          {services.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleServiceSelect(s)}
                              className="w-full text-left p-6 border border-luxury-stone bg-white hover:border-luxury-gold hover:bg-luxury-cream/10 transition-all group flex justify-between items-center rounded-sm"
                            >
                              <span className="text-luxury-charcoal font-medium">{s}</span>
                              <ChevronRight size={18} className="text-luxury-stone group-hover:text-luxury-gold group-hover:translate-x-1 transition-all" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-3xl font-serif text-luxury-charcoal">
                          {initialStep === 3 ? "Связаться со мной" : "Детали запроса"}
                        </h2>
                        {formData.service && (
                          <p className="text-luxury-gold font-bold text-xs uppercase tracking-widest">{formData.service}</p>
                        )}
                        
                        <div className="space-y-6">
                          <div className="group">
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-3">Тип недвижимости</label>
                            <div className="flex gap-2">
                              {["Квартира", "Частный дом", "Коммерция"].map(type => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                                  className={`flex-1 py-3 border text-xs tracking-widest uppercase transition-all ${formData.propertyType === type ? 'bg-luxury-gold border-luxury-gold text-white' : 'border-luxury-stone text-luxury-charcoal hover:border-luxury-gold'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="group">
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-3">Город</label>
                            <input 
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Например: Анталия или Стамбул"
                              className="w-full bg-transparent border-b border-luxury-stone py-2 text-base outline-none focus:border-luxury-gold transition-colors"
                            />
                          </div>

                          <div className="group">
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-3">Район или ЖК</label>
                            <input 
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              placeholder="Например: Муратпаша"
                              className="w-full bg-transparent border-b border-luxury-stone py-2 text-base outline-none focus:border-luxury-gold transition-colors"
                            />
                          </div>

                          {formData.propertyType === "Квартира" && (
                            <div className="group">
                              <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-3">Кол-во комнат</label>
                              <div className="flex flex-wrap gap-2">
                                {["Студия", "1", "2", "3", "4", "5+"].map(num => (
                                  <button
                                    key={num}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, rooms: num }))}
                                    className={`w-12 h-10 border text-[10px] tracking-widest uppercase transition-all flex items-center justify-center ${formData.rooms === num ? 'bg-luxury-gold border-luxury-gold text-white' : 'border-luxury-stone text-luxury-charcoal hover:border-luxury-gold'}`}
                                  >
                                    {num}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="group">
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-3">Планируемый бюджет (₽)</label>
                            <input 
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              placeholder="Например: 50 - 80 млн"
                              className="w-full bg-transparent border-b border-luxury-stone py-2 text-base outline-none focus:border-luxury-gold transition-colors"
                            />
                          </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                          <button onClick={prevStep} className="p-4 border border-luxury-stone uppercase text-[10px] tracking-widest font-bold flex items-center gap-2 hover:bg-luxury-stone transition-colors">
                            <ChevronLeft size={16} /> Назад
                          </button>
                          <button onClick={nextStep} className="flex-1 bg-luxury-charcoal text-white uppercase text-[10px] tracking-widest font-bold py-4 flex items-center justify-center gap-2 hover:bg-luxury-gold hover:text-luxury-charcoal transition-all">
                            Продолжить <ChevronRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <h2 className="text-3xl font-serif text-luxury-charcoal">Как с вами связаться?</h2>
                        
                        <div className="space-y-8">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-4">Имя</label>
                            <input 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Ваше имя"
                              className="w-full bg-transparent border-b border-luxury-stone py-3 text-lg outline-none focus:border-luxury-gold transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-4 flex items-center gap-2">
                              <Phone size={12} className="text-luxury-gold" /> Телефон
                            </label>
                            <input 
                              name="phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              placeholder="+7 (___) ___-__-__"
                              className="w-full bg-transparent border-b border-luxury-stone py-3 text-lg outline-none focus:border-luxury-gold transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-4 flex items-center gap-2">
                               <Send size={12} className="text-luxury-gold" /> Telegram
                            </label>
                            <div className="relative group">
                              <span className="absolute left-0 top-3 text-lg text-luxury-gold font-medium">@</span>
                              <input 
                                name="telegram"
                                value={formData.telegram}
                                onChange={handleTelegramChange}
                                placeholder="username"
                                className="w-full bg-transparent border-b border-luxury-stone py-3 pl-6 text-lg outline-none focus:border-luxury-gold transition-colors"
                              />
                            </div>
                            {telegramError && (
                              <p className="text-[10px] text-red-500 mt-2 tracking-wide font-medium uppercase">{telegramError}</p>
                            )}
                          </div>
                        </div>

                        <div className="pt-8 flex gap-4">
                          {initialStep !== 3 && (
                            <button onClick={prevStep} className="p-5 border border-luxury-stone hover:bg-luxury-stone transition-colors group">
                              <ChevronLeft size={16} className="text-luxury-charcoal" />
                            </button>
                          )}
                          <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting || !!telegramError || !formData.phone || formData.phone.length < 18}
                            className="flex-1 bg-luxury-gold text-luxury-charcoal uppercase text-[10px] tracking-widest font-bold py-5 hover:bg-luxury-charcoal hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                          >
                            {isSubmitting ? "Отправка..." : "Отправить запрос"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 border-t border-luxury-stone bg-white text-[9px] uppercase tracking-widest opacity-40 flex justify-between items-center">
              <span>Конфиденциальность 100%</span>
              <span>Shvedova Private Estate</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
