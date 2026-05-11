import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, User, Sparkles, MessageSquare } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { 
      role: "assistant", 
      content: "Здравствуйте! Я ваш интеллектуальный помощник Юлии Шведовой. Я помогу вам сориентироваться в рынке недвижимости Москвы, подобрать лучшие ЖК или ответить на вопросы по услугам Юлии. О чем вы хотели бы узнать?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const prompt = `Вы — ИИ-помощник Юлии Шведовой, ведущего эксперта по люксовой недвижимости Москвы. 
      Отвечайте в изысканном, профессиональном и лаконичном стиле. 
      Ваша задача: консультировать клиентов Юлии по вопросам покупки, продажи и аренды жилья в Москве.
      Упоминайте, что Юлия специализируется на премиальных объектах (Остоженка, Хамовники, Москва-Сити).
      Если пользователь хочет оставить заявку, предложите ему заполнить форму консультации (Юлия свяжется лично).
      
      История диалога: ${messages.map(m => `${m.role}: ${m.content}`).join("\n")}
      Пользователь: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const text = response.text || "Извините, я не смог сформировать ответ.";

      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Прошу прощения, возникла техническая заминка. Пожалуйста, попробуйте позже или свяжитесь с Юлией напрямую через форму." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-luxury-charcoal z-[201] shadow-2xl flex flex-col overflow-hidden text-white"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-charcoal">
                    <Sparkles size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif italic text-xl leading-none">AI Assistant</span>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mt-1">Shvedova Private Estate</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/10 transition-colors rounded-full text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-sm ${
                    msg.role === "user" 
                      ? "bg-luxury-gold text-luxury-charcoal" 
                      : "bg-white/5 border border-white/10 text-white/90"
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-sm flex gap-2">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-black/20 border-t border-white/10">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ваш вопрос..."
                  className="w-full bg-white/5 border border-white/20 px-6 py-5 pr-16 text-sm rounded-sm focus:border-luxury-gold outline-none transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-4 p-2 text-luxury-gold hover:text-white transition-colors disabled:opacity-30"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[10px] text-white/30 text-center mt-6 uppercase tracking-widest">
                Сгенерировано ИИ для Юлии Шведовой
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
