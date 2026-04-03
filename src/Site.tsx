import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.png";
import { Shield, Zap, Clock, Phone, Heart, Truck, DollarSign, AlertTriangle, MapPin, TrendingUp, Check, Star, ArrowRight, ChevronDown, Eye, Activity, Bell, Settings, Wifi, Gauge, Fuel, Star as StarIcon, Users, Award, Target } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const HolographicBadge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.05 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-full blur opacity-50" />
    <div className="relative px-4 py-2 rounded-full bg-black border border-emerald-500/50">
      {children}
    </div>
  </motion.div>
);

const CyberButton = ({ children, href, variant = "primary" }: { children: React.ReactNode; href: string; variant?: "primary" | "secondary" | "outline" }) => {
  const baseClass = "relative px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all";
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]",
    secondary: "bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]",
    outline: "border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      className={`${baseClass} ${variants[variant]}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
};

const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) setIsGlitching(true);
      else setIsGlitching(false);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={isGlitching ? { x: [0, -3, 3, 0], skewX: [0, -2, 2, 0] } : {}}
    >
      <span className="absolute inset-0 text-cyan-400 -translate-x-1 -translate-y-1 opacity-70">{children}</span>
      <span className="absolute inset-0 text-pink-400 translate-x-1 translate-y-1 opacity-70">{children}</span>
      <span className="relative">{children}</span>
    </motion.span>
  );
};

const PulseIndicator = ({ color = "#10b981" }: { color?: string }) => (
  <motion.div
    className="w-3 h-3 rounded-full"
    style={{ backgroundColor: color }}
    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

const NeonCard = ({ children, className = "", glowColor = "#10b981" }: { children: React.ReactNode; className?: string; glowColor?: string }) => (
  <motion.div
    className={`relative group ${className}`}
    whileHover={{ y: -5 }}
  >
    <div
      className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, ${glowColor}20, transparent, ${glowColor}20)`,
        filter: "blur(20px)"
      }}
    />
    <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: glowColor }} />
      {children}
    </div>
  </motion.div>
);

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const MatrixRain = () => {
  const canvasRef = useState(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.1;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "TOPYPRO01アイウエオカキクケコ";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MatrixRain />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-black/95 backdrop-blur-2xl border-b border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-2 bg-emerald-500/30 rounded-xl blur-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <img src={logo} alt="TopyPro" className="relative h-12 w-12" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight">
                  <span className="text-white">TOPY</span>
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">PRO</span>
                </span>
                <p className="text-[10px] text-gray-500 tracking-[0.3em]">PROTEÇÃO VEICULAR</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-10">
              {[
                { href: "#home", label: "Início" },
                { href: "#problema", label: "O Problema" },
                { href: "#solucao", label: "Solução" },
                { href: "#comparativo", label: "Comparativo" },
                { href: "#promo", label: "Promoção" },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ))}
              <CyberButton href={WHATSAPP_URL}>
                <Phone className="w-5 h-5" />
                WhatsApp
              </CyberButton>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
              {menuOpen ? <motion.div whileTap={{ rotate: 90 }}><ChevronDown className="w-8 h-8" /></motion.div> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
        />
      </motion.div>
    </>
  );
};

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/30 to-black" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8">
            <PulseIndicator />
            <span className="text-xs font-medium text-emerald-400 tracking-widest">SISTEMA DE PROTEÇÃO ATIVO</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8">
            <GlitchText className="text-white block">SEU VEÍCULO</GlitchText>
            <GlitchText className="text-red-500 block">FOR ROUBADO?</GlitchText>
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              A GENTE PAGA.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            A <span className="text-white font-bold">única empresa</span> que paga <span className="text-emerald-400 font-bold">100% da FIPE</span> em até <span className="text-cyan-400 font-bold">30 dias</span>. Sem franquia, sem burocracia.
          </p>

          <div className="flex flex-wrap gap-4">
            <CyberButton href={WHATSAPP_URL}>
              <Phone className="w-6 h-6" />
              Falar com Especialista
            </CyberButton>
            <CyberButton href="#problema" variant="outline">
              Entender o Problema
            </CyberButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative"
        >
          <NeonCard glowColor="#10b981" className="p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">VALE MONITOR</h3>
                  <p className="text-xs text-gray-500">Monitoramento Global em Tempo Real</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PulseIndicator />
                <span className="text-xs text-emerald-400 font-medium">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Shield, value: "8.432", label: "Veículos", color: "#10b981" },
                { icon: AlertTriangle, value: "127", label: "Alertas", color: "#f59e0b" },
                { icon: Fuel, value: "2.4", label: "km/L média", color: "#06b6d4" },
                { icon: Gauge, value: "62", label: "km/h média", color: "#8b5cf6" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-white/5">
                  <stat.icon className="w-6 h-6 mb-2" style={{ color: stat.color }} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Shield className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="font-bold text-white">Proteção Ativa</div>
                <div className="text-sm text-emerald-400">Monitoramento 24h ativado</div>
              </div>
            </div>
          </NeonCard>

          <motion.div
            className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <div className="font-bold text-white">100% FIPE</div>
                <div className="text-xs text-gray-500">Garantido</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section id="problema" className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 mb-8">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-xs font-medium text-red-400 tracking-widest">DADOS OFICIAIS - SÃO LUÍS/MA</span>
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
          <span className="text-white">SÃO LUÍS SE TORNOU</span>
          <br />
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            ALVO FÁCIL
          </span>
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Os números assustam. Mais de <span className="text-red-400 font-bold">4 veículos</span> roubados por dia, e <span className="text-amber-400 font-bold">40% nunca são recuperados</span>.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: AlertTriangle, value: 4, suffix: "/dia", label: "Veículos roubados", desc: "em São Luís por dia", color: "#ef4444" },
          { icon: TrendingUp, value: 40, suffix: "%", label: "Nunca recuperados", desc: "dos casos", color: "#f59e0b" },
          { icon: MapPin, value: 1460, suffix: "+", label: "Casos por ano", desc: "no Maranhão", color: "#06b6d4" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <NeonCard glowColor={stat.color} className="p-10 text-center group">
              <motion.div
                className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2"
                style={{ borderColor: `${stat.color}50`, backgroundColor: `${stat.color}10` }}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
              </motion.div>

              <div className="text-6xl md:text-7xl font-black mb-2" style={{ color: stat.color }}>
                <AnimatedCounter target={stat.value} />
                <span className="text-3xl">{stat.suffix}</span>
              </div>

              <p className="text-lg font-bold text-white mb-1">{stat.label}</p>
              <p className="text-gray-500">{stat.desc}</p>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-20 p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-red-500/20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-xl text-white font-bold mb-2">
          Sem proteção, o prejuízo é seu.
        </p>
        <p className="text-gray-400">
          Com a TopyPro, você tem <span className="text-emerald-400 font-bold">segurança + rastreamento + indenização</span>.
        </p>
      </motion.div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section id="solucao" className="relative py-32 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-medium text-emerald-400 tracking-widest mb-6">
          <Zap className="w-4 h-4" />
          NOSSA SOLUÇÃO
        </span>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
          <span className="text-white">MAIS QUE PROTEÇÃO:</span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            SERVIÇO COMPLETO
          </span>
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Um rastreador comum não te paga a FIPE. Com a gente, você tem <span className="text-white font-bold">rastreamento + reembolso integral</span>.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "Proteção Total", desc: "Cobertura completa contra roubo e furto do seu veículo.", price: "100% FIPE", color: "#10b981" },
          { icon: DollarSign, title: "Economia Inteligente", desc: "Pague até 50% menos que seguro convencional.", price: "R$ 99/mês", color: "#f59e0b" },
          { icon: Clock, title: "Indenização em 30 dias", desc: "100% da FIPE em até 30 dias ou devolvemos.", price: "Garantido", color: "#06b6d4" },
          { icon: Phone, title: "Suporte 24/7", desc: "Equipe de apoio 24 horas por dia, 7 dias por semana.", price: "Always", color: "#8b5cf6" },
          { icon: Heart, title: "Atendimento Humano", desc: "Suporte especializado focado na sua conveniência.", price: "VIP", color: "#ec4899" },
          { icon: Truck, title: "Assistência 24h", desc: "Guincho 24h para te socorrer a qualquer hora.", price: "Grátis", color: "#14b8a6" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <NeonCard glowColor={item.color} className="p-8 h-full group">
              <div className="flex items-start gap-5">
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40` }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    {item.price}
                  </span>
                </div>
              </div>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <CyberButton href={WHATSAPP_URL}>
          <Target className="w-5 h-5" />
          Quero Fazer uma Cotação
        </CyberButton>
      </motion.div>

      <motion.div
        className="mt-20 grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[
          { icon: Users, value: "2.500+", label: "Clientes Protegidos" },
          { icon: StarIcon, value: "4.9", label: "Avaliação Média" },
          { icon: Award, value: "98%", label: "Satisfação" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
            <stat.icon className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
            <div className="text-gray-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section id="comparativo" className="relative py-32 overflow-hidden bg-gradient-to-b from-black to-violet-950/20">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-medium text-violet-400 tracking-widest mb-6">
          <Eye className="w-4 h-4" />
          COMPARATIVO
        </span>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black">
          <span className="text-white">VEJA O QUE</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            REALMENTE VALE
          </span>
        </h2>
      </motion.div>

      <motion.div
        className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-emerald-500/10 to-violet-500/10 border-b border-white/10">
          <div className="text-sm font-semibold text-gray-400">CARACTERÍSTICA</div>
          <div className="text-sm font-semibold text-gray-400 text-center">SEGURO TRADICIONAL</div>
          <div className="text-sm font-bold text-emerald-400 text-center flex items-center justify-center gap-2">
            <StarIcon className="w-4 h-4" fill="currentColor" /> TOPYPRO
          </div>
        </div>

        {[
          { feature: "Indenização por roubo/furto", traditional: "Parcial, com franquia", topypro: "100% da FIPE", highlight: true },
          { feature: "Rastreamento em tempo real", traditional: "Cobrado à parte", topypro: "Grátis incluso", highlight: false },
          { feature: "Consulta ao CPF / perfil", traditional: "Obrigatória", topypro: "Não exigimos", highlight: false },
          { feature: "Tempo para indenização", traditional: "30 a 90 dias úteis", topypro: "Máximo 30 dias", highlight: true },
          { feature: "Atendimento 24h", traditional: "Limitado / terceirizado", topypro: "Central própria", highlight: false },
          { feature: "Mensalidade", traditional: "R$ 250 a R$ 500", topypro: "A partir de R$ 99", highlight: true },
          { feature: "Burocracia na adesão", traditional: "Alta, com vistoria", topypro: "Ativação em minutos", highlight: false },
        ].map((row, i) => (
          <motion.div
            key={i}
            className={`grid grid-cols-3 gap-4 p-6 items-center border-b border-white/5 last:border-0 transition-colors ${
              row.highlight ? "bg-emerald-500/5" : "hover:bg-white/5"
            }`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 5 }}
          >
            <div className="text-sm text-white font-medium">{row.feature}</div>
            <div className="text-sm text-gray-500 text-center">{row.traditional}</div>
            <div className="text-sm text-emerald-400 font-bold text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              {row.topypro}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[
          { icon: Zap, label: "Ativação Rápida" },
          { icon: TrendingUp, label: "Melhor Custo-Benefício" },
          { icon: Check, label: "Zero Burocracia" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
            <item.icon className="w-5 h-5" />
            {item.label}
          </div>
        ))}
      </motion.div>
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
    <section id="promo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <NeonCard glowColor="#f59e0b" className="p-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400 tracking-widest">PROMOÇÃO EXCLUSIVA DA SEMANA</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              PRIMEIRA MENSALIDADE POR
            </h2>

            <div className="text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent leading-none mb-8">
              R$1,00
            </div>

            <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
              Ative seu rastreador agora. Condição válida para os <span className="text-white font-bold">primeiros 30 clientes</span> da semana.
            </p>

            <div className="flex justify-center gap-4 mb-12">
              {[
                { value: pad(time.hours), label: "Horas" },
                { value: pad(time.minutes), label: "Min" },
                { value: pad(time.seconds), label: "Seg" },
              ].map((unit) => (
                <div key={unit.label} className="relative">
                  <div className="absolute -inset-1 bg-amber-500/20 rounded-2xl blur" />
                  <div className="relative p-6 bg-black/80 border border-amber-500/30 rounded-2xl min-w-[100px]">
                    <div className="text-4xl font-black text-amber-400 font-mono">{unit.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{unit.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <CyberButton href={WHATSAPP_URL} variant="secondary">
              <Zap className="w-6 h-6" />
              Garantir Minha Vaga
            </CyberButton>

            <p className="text-gray-500 text-sm mt-8">
              Cada minuto sem proteção é um risco a mais.
            </p>
          </NeonCard>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 border-t border-white/10 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="TopyPro" className="h-12 w-12" />
          <div>
            <span className="text-xl font-black">
              <span className="text-white">TOPY</span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">PRO</span>
            </span>
            <p className="text-xs text-gray-500">Proteção Veicular Inteligente</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Shield className="w-5 h-5 text-emerald-500" />
          <span>© {new Date().getFullYear()} TopyPro. Todos os direitos reservados.</span>
        </div>

        <CyberButton href={WHATSAPP_URL}>
          <Phone className="w-5 h-5" />
          Fale Conosco
        </CyberButton>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <motion.a
    href={WHATSAPP_URL}
    target="_blank"
    className="fixed bottom-8 right-8 z-50"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500"
        animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.4)", "0 0 0 20px rgba(37,211,102,0)"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.682-1.228A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.828l-.424-.282-3.114.817.832-3.042-.31-.447A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
        </svg>
      </div>
    </div>
  </motion.a>
);

const Site = () => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <ComparisonSection />
    <PromoSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Site;
