import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.png";
import { Shield, ChevronRight, Zap, Phone, Clock, Star, Check, Menu, X, AlertTriangle, Car, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const ScrollReveal = ({ children, direction = "up", delay = 0 }: { children: React.ReactNode; direction?: "up" | "left" | "right"; delay?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const getInitial = () => {
    switch (direction) {
      case "left": return { opacity: 0, x: -100 };
      case "right": return { opacity: 0, x: 100 };
      default: return { opacity: 0, y: 100 };
    }
  };
  
  const getFinal = () => ({ opacity: 1, x: 0, y: 0 });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  
  return (
    <motion.div ref={ref} style={{ opacity, scale }} initial={getInitial()} whileInView={getFinal()} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
};

const PulseDot = () => (
  <motion.div className="w-3 h-3 rounded-full bg-emerald-400" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
);

const GradientBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500" />
    <div className="absolute inset-[1px] rounded-2xl bg-black" />
    <div className="relative p-[1px] rounded-2xl overflow-hidden">{children}</div>
  </div>
);

const GiantText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`block text-[15vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] font-black leading-[0.85] tracking-tighter ${className}`}>
    {children}
  </span>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="TopyPro" className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight">TOPY<span className="text-emerald-400">PRO</span></span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#protecao" className="text-sm text-gray-400 hover:text-white transition-colors">Proteção</a>
          <a href="#planos" className="text-sm text-gray-400 hover:text-white transition-colors">Planos</a>
          <a href="#contato" className="text-sm text-gray-400 hover:text-white transition-colors">Contato</a>
          <a href={WHATSAPP_URL} target="_blank" className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-full transition-colors">
            WhatsApp
          </a>
        </div>
        
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4">
          <a href="#protecao" className="text-gray-400">Proteção</a>
          <a href="#planos" className="text-gray-400">Planos</a>
          <a href="#contato" className="text-gray-400">Contato</a>
          <a href={WHATSAPP_URL} target="_blank" className="px-5 py-3 bg-emerald-500 text-black font-bold rounded-full text-center">
            WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen bg-black pt-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <motion.div className="flex items-center gap-3 mb-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <PulseDot />
            <span className="text-xs font-medium tracking-widest text-emerald-400 uppercase">Proteção Veicular</span>
          </motion.div>
          
          <GiantText className="text-white mb-4">SEU</GiantText>
          <GiantText className="text-emerald-400 mb-6">CARRO</GiantText>
          <GiantText className="text-white/20 mb-8">ROUBADO?</GiantText>
          
          <motion.p className="text-xl text-gray-400 max-w-md mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            E se a gente te pagar <span className="text-white font-bold">100% da FIPE</span> em até 30 dias? Isso é o que fazemos.
          </motion.p>
          
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <a href={WHATSAPP_URL} target="_blank" className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all">
              Quero Proteção
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#protecao" className="flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-full transition-colors">
              Saiba Mais
            </a>
          </motion.div>
        </div>
        
        <div className="lg:col-span-5 relative">
          <motion.div
            className="absolute -inset-10 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <GradientBorder className="p-8 bg-black/90 backdrop-blur">
            <div className="space-y-6">
              {[
                { icon: Shield, label: "Cobertura", value: "100% FIPE", color: "emerald" },
                { icon: Clock, label: "Tempo", value: "30 dias", color: "cyan" },
                { icon: Phone, label: "Suporte", value: "24/7", color: "purple" },
                { icon: Star, label: "Avaliação", value: "4.9/5", color: "amber" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stat.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                      stat.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                      stat.color === "purple" ? "bg-purple-500/20 text-purple-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </div>
                  <span className={`font-bold ${
                    stat.color === "emerald" ? "text-emerald-400" :
                    stat.color === "cyan" ? "text-cyan-400" :
                    stat.color === "purple" ? "text-purple-400" :
                    "text-amber-400"
                  }`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </GradientBorder>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { num: "100%", label: "FIPE" },
          { num: "R$99", label: "/mês" },
          { num: "30", label: "dias máx" },
          { num: "0", label: "franquia" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="p-6 border border-white/10 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <div className="text-3xl md:text-4xl font-black text-white">{item.num}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AlertSection = () => (
  <section className="py-32 bg-gradient-to-b from-black via-red-950/30 to-black relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239,68,68,0.1) 10px, rgba(239,68,68,0.1) 20px)` }} />
    
    <div className="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium tracking-widest rounded-full mb-6">
            DADOS REAIS
          </span>
          <GiantText className="text-red-500/80">ALERTA</GiantText>
        </div>
      </ScrollReveal>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { num: "4", label: "Carros roubados", sublabel: "por dia em São Luís" },
          { num: "40%", label: "Nunca são", sublabel: "recuperados" },
          { num: "1460+", label: "Casos por", sublabel: "ano no Maranhão" },
        ].map((stat, i) => (
          <ScrollReveal key={stat.label} direction={i % 2 === 0 ? "left" : "right"}>
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-10 border border-red-500/30 bg-black/50 backdrop-blur text-center">
                <div className="text-6xl md:text-7xl font-black text-red-400 mb-2">{stat.num}</div>
                <div className="text-white font-medium">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.sublabel}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      
      <ScrollReveal>
        <div className="mt-20 text-center p-8 border border-white/10 bg-white/5 backdrop-blur">
          <p className="text-xl text-gray-300 mb-4">
            Sem proteção, <span className="text-white font-bold">você perde</span>.
          </p>
          <p className="text-gray-500">
            Com a TopyPro, você <span className="text-emerald-400 font-bold">recupera 100%</span> do valor.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section id="protecao" className="py-32 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-20">
          <span className="text-xs font-medium tracking-widest text-emerald-400 uppercase">Vantagens</span>
          <GiantText className="text-white mt-2">PROTEÇÃO</GiantText>
          <GiantText className="text-emerald-400">COMPLETA</GiantText>
        </div>
      </ScrollReveal>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        {[
          { icon: Shield, title: "Roubo e Furto", desc: "Cobertura total contra roubo e furto do seu veículo." },
          { icon: Clock, title: "30 Dias", desc: "Indenização em até 30 dias ou devolvemos o veículo." },
          { icon: Zap, title: "Ativação Rápida", desc: "Seu veículo protegido em poucos minutos." },
          { icon: Phone, title: "Suporte 24h", desc: "Equipe pronta para ajudar a qualquer momento." },
          { icon: Car, title: "Guincho Grátis", desc: "Assistência 24h em todo território nacional." },
          { icon: Check, title: "Sem Análise", desc: "Não exigimos nome limpo ou histórico." },
        ].map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1}>
            <div className="p-8 bg-black border border-white/5 hover:border-emerald-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section id="planos" className="py-32 bg-gradient-to-b from-black to-emerald-950/20">
    <div className="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-emerald-400 uppercase">Comparativo</span>
          <GiantText className="text-white mt-2">FICA</GiantText>
          <GiantText className="text-emerald-400">CLARO</GiantText>
        </div>
      </ScrollReveal>
      
      <div className="grid lg:grid-cols-2 gap-px bg-white/5">
        <ScrollReveal direction="left">
          <div className="p-10 bg-gray-900/50">
            <div className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">Seguro Tradicional</div>
            <div className="space-y-4">
              {[
                { label: "Indenização", value: "Parcial c/ franquia" },
                { label: "Rastreamento", value: "Cobrado à parte" },
                { label: "Análise CPF", value: "Obrigatória" },
                { label: "Tempo", value: "30-90 dias" },
                { label: "Mensalidade", value: "R$ 250-500" },
                { label: "Ativação", value: "5+ dias" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="text-gray-400">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <GradientBorder>
            <div className="p-10 bg-black">
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-emerald-400 uppercase mb-6">
                <Star className="w-4 h-4" fill="currentColor" /> TopyPro
              </div>
              <div className="space-y-4">
                {[
                  { label: "Indenização", value: "100% FIPE" },
                  { label: "Rastreamento", value: "Grátis incluso" },
                  { label: "Análise CPF", value: "Não exigimos" },
                  { label: "Tempo", value: "Máx 30 dias" },
                  { label: "Mensalidade", value: "R$ 99" },
                  { label: "Ativação", value: "Em minutos" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="text-emerald-400 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </GradientBorder>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const PromoSection = () => {
  const [time, setTime] = useState({ hours: 7, minutes: 59, seconds: 59 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const pad = (n: number) => String(n).padStart(2, "0");
  
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <ScrollReveal>
          <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium tracking-widest rounded-full mb-8">
            PROMOÇÃO ESPECIAL
          </span>
          
          <GiantText className="text-white mb-4">R$</GiantText>
          <GiantText className="text-amber-400 mb-8">1,00</GiantText>
          <p className="text-xl text-gray-400 mb-12">Primeira mensalidade. Válido para os primeiros 30 clientes.</p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-4 mb-12">
            {[
              { value: pad(time.hours), label: "Horas" },
              { value: pad(time.minutes), label: "Min" },
              { value: pad(time.seconds), label: "Seg" },
            ].map((unit) => (
              <div key={unit.label} className="p-6 border border-white/10 min-w-[100px]">
                <div className="text-4xl font-black text-white font-mono">{unit.value}</div>
                <div className="text-xs text-gray-500 uppercase mt-1">{unit.label}</div>
              </div>
            ))}
          </div>
          
          <a href={WHATSAPP_URL} target="_blank" className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg rounded-full hover:scale-105 transition-transform">
            Garantir Minha Vaga
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contato" className="py-16 border-t border-white/10 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="TopyPro" className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight">TOPY<span className="text-emerald-400">PRO</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>© {new Date().getFullYear()} TopyPro. Todos os direitos reservados.</span>
        </div>
        
        <a href={WHATSAPP_URL} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-colors">
          <Phone className="w-4 h-4" />
          Fale Conosco
        </a>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <motion.a
    href={WHATSAPP_URL}
    target="_blank"
    className="fixed bottom-8 right-8 z-50"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
  >
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500"
        animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.4)", "0 0 0 15px rgba(37,211,102,0)"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.682-1.228A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.828l-.424-.282-3.114.817.832-3.042-.31-.447A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
        </svg>
      </div>
    </div>
  </motion.a>
);

const Site = () => (
  <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <Navbar />
    <Hero />
    <AlertSection />
    <BenefitsSection />
    <ComparisonSection />
    <PromoSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Site;
