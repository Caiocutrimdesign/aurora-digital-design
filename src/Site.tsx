import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import logo from "@/assets/logo.png";
import { Menu, X, Shield, Zap, Clock, Phone, Heart, Truck, DollarSign, Eye, AlertTriangle, MapPin, TrendingUp, ChevronDown, Check, Star } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "TOPYPRO01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />;
};

const HolographicText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.span
    className={`relative inline-block ${className}`}
    animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
    style={{
      background: "linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6, #ec4899, #10b981)",
      backgroundSize: "400% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  >
    {children}
  </motion.span>
);

const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setGlitch(true);
      else setGlitch(false);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={glitch ? { x: [0, -3, 3, -2, 0], skewX: [0, -5, 5, 0] } : {}}
      transition={{ duration: 0.1 }}
    >
      <span className="absolute inset-0 opacity-70 -translate-x-1 -translate-y-1" style={{ color: "#06b6d4" }}>{children}</span>
      <span className="absolute inset-0 opacity-70 translate-x-1 translate-y-1" style={{ color: "#f43f5e" }}>{children}</span>
      <span className="relative">{children}</span>
    </motion.span>
  );
};

const NeonGlow = ({ children, color = "#10b981", className = "" }: { children: React.ReactNode; color?: string; className?: string }) => (
  <motion.span
    className={`relative inline-block ${className}`}
    animate={{
      textShadow: [
        `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
        `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`,
        `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      ],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {children}
  </motion.span>
);

const CyberButton = ({ children, href, primary = true }: { children: React.ReactNode; href: string; primary?: boolean }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`relative overflow-hidden ${primary ? "bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500" : "bg-transparent border-2 border-emerald-500"} px-10 py-4 rounded-2xl font-bold text-lg`}
    whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(16, 185, 129, 0.6)" }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "200%" }}
      transition={{ duration: 0.6 }}
    />
    <span className="relative z-10 flex items-center justify-center gap-3 text-white">
      {children}
    </span>
  </motion.a>
);

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-emerald-500/50"
        initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, scale: Math.random() + 0.5 }}
        animate={{ y: [`${Math.random() * 100}%`, "-20%"], opacity: [0.3, 0, 0.3], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
      />
    ))}
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MatrixRain />
      <FloatingParticles />
      
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-black/95 backdrop-blur-2xl border-b border-emerald-500/30 shadow-[0_0_100px_rgba(16,185,129,0.2)]" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <motion.a href="#" className="relative group" whileHover={{ scale: 1.1, rotate: 5 }}>
              <div className="absolute -inset-6 bg-emerald-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.img
                src={logo}
                alt="TopyPro"
                className="h-12 w-12 md:h-14 md:w-14 relative z-10"
                animate={{ filter: ["drop-shadow(0 0 15px rgba(16, 185, 129, 0.7))", "drop-shadow(0 0 35px rgba(6, 182, 212, 0.9))", "drop-shadow(0 0 15px rgba(139, 92, 246, 0.7))", "drop-shadow(0 0 15px rgba(16, 185, 129, 0.7))"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.a>

            <div className="hidden md:flex items-center gap-10">
              {[{ href: "#beneficios", label: "Benefícios" }, { href: "#comparativo", label: "Comparativo" }, { href: "#promo", label: "Promoção" }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors group py-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500" initial={{ width: 0 }} whileHover={{ width: "100%" }} />
                </motion.a>
              ))}

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-xl opacity-75 blur" />
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-xl animate-pulse opacity-50" />
                <span className="relative block bg-black px-8 py-3 rounded-xl text-emerald-400 font-bold">Fale Conosco</span>
              </motion.a>
            </div>

            <motion.button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2" whileTap={{ scale: 0.9, rotate: 90 }}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-emerald-500/20"
              >
                <div className="flex flex-col gap-6 py-8 px-4">
                  {[{ href: "#beneficios", label: "Benefícios" }, { href: "#comparativo", label: "Comparativo" }, { href: "#promo", label: "Promoção" }].map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 hover:text-emerald-400 py-3 text-xl font-medium border-b border-emerald-500/10"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 10, color: "#10b981" }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <CyberButton href={WHATSAPP_URL}>Fale Conosco</CyberButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} />
      </motion.nav>
    </>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/50 to-black" />
        <motion.div
          className="absolute inset-0"
          animate={{ background: ["radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)", "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)", "radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)", "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.7)_70%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm"
            animate={{ boxShadow: ["0 0 30px rgba(16, 185, 129, 0.2)", "0 0 60px rgba(16, 185, 129, 0.4)", "0 0 30px rgba(16, 185, 129, 0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <Shield className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <span className="text-emerald-400 font-semibold">PROTEÇÃO VEICULAR INTELIGENTE</span>
          </motion.div>
        </motion.div>

        <motion.h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 leading-tight" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
          <GlitchText>Se seu veículo for roubado</GlitchText>
          <br />
          <HolographicText className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">pagamos 100% da FIPE</HolographicText>
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          A <NeonGlow color="#10b981">única empresa do mercado</NeonGlow> que quita seu veículo em até{" "}
          <motion.span className="text-emerald-400 font-bold" whileHover={{ scale: 1.1 }}>30 dias</motion.span>. Rastreamento + reembolso integral.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
          <CyberButton href={WHATSAPP_URL}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.682-1.228A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.828l-.424-.282-3.114.817.832-3.042-.31-.447A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            Fale com um Especialista
          </CyberButton>

          <motion.a href="#beneficios" className="border-2 border-emerald-500/50 text-emerald-400 px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3" whileHover={{ scale: 1.08, borderColor: "#10b981", boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }} whileTap={{ scale: 0.95 }}>
            Saiba Mais
            <ChevronDown className="w-6 h-6" />
          </motion.a>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-12 mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          {[{ icon: Shield, value: "100%", label: "Tabela FIPE" }, { icon: Clock, value: "30 dias", label: "Para indenização" }, { icon: Phone, value: "24h", label: "Assistência" }].map((badge, i) => (
            <motion.div key={badge.label} className="flex items-center gap-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.2 }} whileHover={{ scale: 1.1, y: -5 }}>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
              <div className="text-left">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-2xl"><badge.icon className="w-6 h-6" /><NeonGlow>{badge.value}</NeonGlow></div>
                <div className="text-gray-500 text-sm">{badge.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        <ChevronDown className="w-10 h-10 text-emerald-500/50" />
      </motion.div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef(null);

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-6" whileHover={{ scale: 1.05 }}>
            <AlertTriangle className="w-4 h-4" />ALERTA
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GlitchText>São Luís virou</GlitchText><br />
            <HolographicText className="text-5xl md:text-6xl lg:text-7xl">Alvo fácil</HolographicText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Em São Luís, mais de <NeonGlow color="#ef4444">4 veículos</NeonGlow> são roubados ou furtados por dia, e cerca de <NeonGlow color="#f59e0b">40% nunca são recuperados</NeonGlow>…</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[{ icon: AlertTriangle, value: 4, suffix: "/dia", label: "Veículos roubados por dia", color: "#ef4444" }, { icon: TrendingUp, value: 40, suffix: "%", label: "Nunca são recuperados", color: "#f59e0b" }, { icon: MapPin, value: 1460, suffix: "/ano", label: "Casos por ano", color: "#06b6d4" }].map((stat, i) => (
            <motion.div key={i} className="relative group" initial={{ opacity: 0, y: 50, scale: 0.8 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} whileHover={{ y: -10, scale: 1.05 }}>
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" style={{ backgroundColor: stat.color }} />
              <div className="relative p-10 rounded-3xl border bg-black/50 backdrop-blur-xl overflow-hidden" style={{ borderColor: `${stat.color}40` }}>
                <motion.div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2" style={{ borderColor: `${stat.color}50`, backgroundColor: `${stat.color}10` }} animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
                </motion.div>
                <motion.div className="text-6xl md:text-7xl font-bold text-center mb-4" style={{ color: stat.color }}><NeonGlow color={stat.color}>+{stat.value}{stat.suffix}</NeonGlow></motion.div>
                <p className="text-gray-400 text-center text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl border border-emerald-500/30 bg-black/50 backdrop-blur-xl"><Shield className="w-8 h-8 text-emerald-400" /><p className="text-xl font-medium">Proteja-se antes que seja tarde. <NeonGlow color="#10b981">Seu veículo pode ser o próximo.</NeonGlow></p></div>
        </motion.div>
      </div>
    </section>
  );
};

const benefits = [
  { icon: Shield, title: "Proteção Total", description: "Cobertura completa contra roubo e furto do seu veículo.", color: "#10b981" },
  { icon: DollarSign, title: "Economia Inteligente", description: "Pague até 50% menos. A partir de R$ 99/mês.", color: "#f59e0b" },
  { icon: Clock, title: "Indenização em 30 dias", description: "100% da FIPE em até 30 dias ou devolvemos o veículo.", color: "#06b6d4" },
  { icon: Phone, title: "Suporte 24/7", description: "Equipe de apoio 24 horas, 7 dias por semana.", color: "#8b5cf6" },
  { icon: Heart, title: "Atendimento Humano", description: "Suporte especializado focado na sua conveniência.", color: "#ec4899" },
  { icon: Truck, title: "Assistência 24h", description: "Guincho 24h para te socorrer a qualquer hora.", color: "#14b8a6" },
];

const BenefitsSection = () => (
  <section id="beneficios" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />

    <div className="relative z-10 container mx-auto px-4">
      <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-6" whileHover={{ scale: 1.05 }}><Zap className="w-4 h-4" />VANTAGENS</motion.div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Mais que proteção: <HolographicText className="text-5xl md:text-6xl lg:text-7xl">um serviço completo</HolographicText></h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Um rastreador comum não te paga a FIPE. Com a gente, você tem rastreamento + reembolso integral.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
          <motion.div key={i} className="relative group" initial={{ opacity: 0, y: 50, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10, scale: 1.03 }}>
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" style={{ backgroundColor: benefit.color }} />
            <div className="relative p-8 rounded-2xl border bg-black/50 backdrop-blur-xl overflow-hidden" style={{ borderColor: `${benefit.color}30` }}>
              <motion.div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${benefit.color}, transparent)` }} initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} />
              <div className="flex items-start gap-5">
                <motion.div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 shrink-0" style={{ borderColor: `${benefit.color}50`, backgroundColor: `${benefit.color}10` }} whileHover={{ rotate: 10, scale: 1.1 }}>
                  <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
                </motion.div>
                <div><h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{benefit.title}</h3><p className="text-gray-400">{benefit.description}</p></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <CyberButton href={WHATSAPP_URL}>Quero Fazer uma Cotação</CyberButton>
      </motion.div>
    </div>
  </section>
);

const comparisonData = [
  { feature: "Indenização por roubo/furto", traditional: "Parcial, com franquia", topypro: "100% da FIPE", highlight: true },
  { feature: "Rastreamento em tempo real", traditional: "Cobrado à parte", topypro: "Incluso no plano", highlight: false },
  { feature: "Consulta ao CPF / perfil", traditional: "Obrigatória", topypro: "Não exigimos nome limpo", highlight: false },
  { feature: "Tempo para indenização", traditional: "30 a 90 dias úteis", topypro: "Até 30 dias", highlight: true },
  { feature: "Atendimento 24h", traditional: "Limitado / terceirizado", topypro: "Central própria", highlight: false },
  { feature: "Mensalidade", traditional: "R$ 250 a R$ 500", topypro: "A partir de R$ 99", highlight: true },
  { feature: "Burocracia na adesão", traditional: "Alta, com vistoria", topypro: "Ativação em minutos", highlight: false },
];

const ComparisonSection = () => {
  const ref = useRef(null);
  return (
    <section id="comparativo" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black" />
      <div className="relative z-10 container mx-auto px-4">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-semibold mb-6" whileHover={{ scale: 1.05 }}><Eye className="w-4 h-4" />COMPARATIVO</motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Veja o que <HolographicText className="text-5xl md:text-6xl lg:text-7xl">realmente vale</HolographicText></h2>
        </motion.div>

        <motion.div className="rounded-3xl border border-emerald-500/20 bg-black/60 backdrop-blur-2xl overflow-hidden" initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}>
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-violet-500/10">
            <div className="text-sm font-semibold text-gray-400">Características</div>
            <div className="text-sm font-semibold text-gray-400 text-center">Seguro Tradicional</div>
            <div className="text-sm font-bold text-emerald-400 text-center flex items-center justify-center gap-2"><Star className="w-4 h-4" /> TopyPro</div>
          </div>
          {comparisonData.map((row, i) => (
            <motion.div key={i} className={`grid grid-cols-3 gap-4 p-6 items-center border-b border-emerald-500/10 last:border-0 ${row.highlight ? "bg-emerald-500/5" : "hover:bg-emerald-500/5 transition-colors"}`} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ x: 5, backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
              <div className="text-sm text-white font-medium">{row.feature}</div>
              <div className="text-sm text-gray-500 text-center flex items-center justify-center gap-2"><span className="hidden md:inline">{row.traditional}</span><span className="md:hidden text-red-400">✗</span></div>
              <div className="text-sm text-emerald-400 font-bold text-center flex items-center justify-center gap-2"><Check className="w-4 h-4 hidden md:block" /><span>{row.topypro}</span></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-6 mt-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {[{ icon: Zap, label: "Ativação Rápida" }, { icon: TrendingUp, label: "Melhor Custo-Benefício" }, { icon: Check, label: "Zero Burocracia" }].map((item, i) => (
            <motion.div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium" whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}>
              <item.icon className="w-5 h-5" />{item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PromoSection = () => {
  const [time, setTime] = useState({ hours: 7, minutes: 59, seconds: 59 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
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
    <section id="promo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black" />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div className="max-w-4xl mx-auto rounded-3xl border border-amber-500/30 bg-black/60 backdrop-blur-2xl p-10 md:p-16 text-center relative overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/20 to-transparent" />
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-semibold mb-8" whileHover={{ scale: 1.05 }}><Zap className="w-4 h-4" />PROMOÇÃO EXCLUSIVA DA SEMANA</motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Primeira mensalidade por <HolographicText className="text-5xl md:text-6xl lg:text-7xl">R$ 1,00</HolographicText></h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">Ative seu rastreador agora. Condição válida para os primeiros 30 clientes da semana.</p>

          <div className="flex justify-center gap-4 mb-12">
            {[{ value: pad(time.hours), label: "Horas" }, { value: pad(time.minutes), label: "Min" }, { value: pad(time.seconds), label: "Seg" }].map((unit) => (
              <motion.div key={unit.label} className="relative" whileHover={{ scale: 1.1 }}>
                <div className="absolute -inset-1 bg-amber-500/20 rounded-2xl blur" />
                <div className="relative bg-black/80 border border-amber-500/30 rounded-2xl p-5 min-w-[90px]">
                  <div className="text-4xl md:text-5xl font-bold text-amber-400 font-mono">{unit.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{unit.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <CyberButton href={WHATSAPP_URL}><Zap className="w-6 h-6" />Quero Essa Oferta</CyberButton>
          <p className="text-gray-500 text-sm mt-8">Cada minuto sem proteção é um risco a mais.</p>
        </motion.div>
      </div>
    </section>
  );
};

const FooterSection = () => (
  <footer className="relative py-16 border-t border-emerald-500/20">
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    <div className="relative z-10 container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.05 }}>
          <motion.img src={logo} alt="TopyPro" className="h-10 w-10" animate={{ filter: ["drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))", "drop-shadow(0 0 20px rgba(16, 185, 129, 0.7))", "drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))"] }} transition={{ duration: 2, repeat: Infinity }} />
          <div><div className="font-bold text-xl"><HolographicText>TopyPro</HolographicText></div><div className="text-gray-500 text-sm">Proteção Veicular Inteligente</div></div>
        </motion.div>
        <div className="flex items-center gap-2 text-gray-500"><Shield className="w-5 h-5 text-emerald-500" /><span>© {new Date().getFullYear()} TopyPro. Todos os direitos reservados.</span></div>
      </div>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
  <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2 }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
    <motion.div className="relative" animate={{ boxShadow: ["0 0 0 0 rgba(37, 211, 102, 0.4)", "0 0 0 20px rgba(37, 211, 102, 0)"] }} transition={{ duration: 1.5, repeat: Infinity }}>
      <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.682-1.228A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.828l-.424-.282-3.114.817.832-3.042-.31-.447A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
      </div>
    </motion.div>
  </motion.a>
);

const Site = () => (
  <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <StatsSection />
    <BenefitsSection />
    <ComparisonSection />
    <PromoSection />
    <FooterSection />
    <WhatsAppFloat />
  </div>
);

export default Site;
