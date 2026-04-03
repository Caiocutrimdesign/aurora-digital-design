import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { Menu, X, Shield, Zap, Clock, Phone, Heart, Truck, DollarSign, Eye, AlertTriangle, MapPin, TrendingUp, ChevronDown, Check, Star, ArrowRight, ShieldCheck, Car, Users, Award, Zap as ZapIcon, Timer, Phone as PhoneIcon } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const MagneticBackground = () => (
  <div className="fixed inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-black to-cyan-950" />
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" }}
      animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full right-0 bottom-0"
      style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }}
      animate={{ x: ["10%", "-10%", "10%"], y: ["10%", "-10%", "10%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16,185,129,0.15) 1px, transparent 0)`,
      backgroundSize: "50px 50px"
    }} />
  </div>
);

const GlowingLine = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent ${className}`}
    animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1, 0.8] }}
    transition={{ duration: 3, repeat: Infinity }}
  />
);

const CyberCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 via-transparent to-cyan-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative h-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500" />
      {children}
    </div>
  </motion.div>
);

const FloatingOrb = ({ color = "#10b981", size = 100, duration = 10 }: { color?: string; size?: number; duration?: number }) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    style={{ width: size, height: size, background: color }}
    animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
  />
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
      <MagneticBackground />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-black/90 backdrop-blur-2xl border-b border-emerald-500/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-5">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-emerald-500/30 rounded-xl blur-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <img src={logo} alt="TopyPro" className="relative h-12 w-12" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">TopyPro</span>
                <p className="text-xs text-gray-500">Proteção Veicular</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["Benefícios", "Comparativo", "Promoção"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-400 hover:text-white transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ))}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                className="relative px-6 py-3 rounded-xl font-bold overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-50" />
                <span className="relative text-black flex items-center gap-2">
                  WhatsApp <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            </div>

            <motion.button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white" whileTap={{ scale: 0.9 }}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
        <GlowingLine />
      </motion.nav>
    </>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
    <FloatingOrb color="rgba(16,185,129,0.2)" size={400} duration={15} />
    <FloatingOrb color="rgba(6,182,212,0.15)" size={300} duration={12} />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-emerald-400 text-sm font-medium">Sistema de Proteção Ativo</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Se seu veículo for </span>
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">roubado</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">garantimos 100% da FIPE</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-lg">
            A <span className="text-white font-semibold">única empresa</span> que paga em até <span className="text-emerald-400 font-bold">30 dias</span>. Sem burocracia, sem franquia.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              className="relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative text-black flex items-center gap-3">
                Falar com Especialista
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.a>
            <motion.a
              href="#beneficios"
              className="px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
              whileHover={{ y: -2 }}
            >
              Conhecer Planos
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <CyberCard className="p-10">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, value: "100%", label: "Cobertura FIPE", color: "#10b981" },
                { icon: Timer, value: "30 dias", label: "Indenização", color: "#06b6d4" },
                { icon: PhoneIcon, value: "24/7", label: "Suporte", color: "#8b5cf6" },
                { icon: DollarSign, value: "R$99", label: "Por mês", color: "#f59e0b" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2" style={{ color: stat.color }} />
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </CyberCard>

          <motion.div
            className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold">Proteção Ativa</p>
                <p className="text-emerald-400 text-sm">Monitoramento 24h</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const StatsSection = () => {
  const stats = [
    { value: "4", label: "Veículos roubados/dia", sublabel: "em São Luís", icon: AlertTriangle, color: "#ef4444" },
    { value: "40%", label: "Nunca recuperados", sublabel: "dos casos", icon: MapPin, color: "#f59e0b" },
    { value: "1460+", label: "Casos por ano", sublabel: "no estado", icon: TrendingUp, color: "#06b6d4" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-semibold">DADOS OFICIAIS</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">São Luís:</span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Alvo Fácil</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Os números assustam. A proteção é essencial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <CyberCard key={stat.label} delay={i * 0.15} className="p-8 text-center group">
              <motion.div
                className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2"
                style={{ borderColor: `${stat.color}50`, backgroundColor: `${stat.color}10` }}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              </motion.div>

              <motion.div
                className="text-5xl md:text-6xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </motion.div>

              <p className="text-white font-medium">{stat.label}</p>
              <p className="text-gray-500 text-sm">{stat.sublabel}</p>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const benefits = [
  { icon: ShieldCheck, title: "Proteção Total", description: "Cobertura contra roubo, furto e danos.", price: "100% FIPE" },
  { icon: DollarSign, title: "Economia", description: "Até 50% menos que seguro tradicional.", price: "R$ 99/mês" },
  { icon: Clock, title: "Indenização Rápida", description: "30 dias ou devolvemos o veículo.", price: "Garantido" },
  { icon: PhoneIcon, title: "Suporte 24h", description: "Equipe sempre pronta para ajudar.", price: "Always" },
  { icon: Heart, title: "Atendimento", description: "Suporte humano e personalizado.", price: "VIP" },
  { icon: Truck, title: "Assistência", description: "Guincho 24h em todo Brasil.", price: "Grátis" },
];

const BenefitsSection = () => (
  <section id="beneficios" className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-6">
          NOSSAS VANTAGENS
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white">Proteção </span>
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Completa</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Tudo que você precisa para dormir tranquilo
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
          <CyberCard key={benefit.title} delay={i * 0.1} className="p-8 group">
            <div className="flex items-start gap-5">
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 shrink-0"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <benefit.icon className="w-7 h-7 text-emerald-400" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{benefit.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{benefit.description}</p>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                  {benefit.price}
                </div>
              </div>
            </div>
          </CyberCard>
        ))}
      </div>
    </div>
  </section>
);

const comparisonData = [
  { feature: "Indenização FIPE", traditional: "Parcial c/ franquia", topypro: "100% garantido", highlight: true },
  { feature: "Rastreamento", traditional: "Cobrado separado", topypro: "Incluso", highlight: false },
  { feature: "Análise CPF", traditional: "Obrigatória", topypro: "Não exigimos", highlight: false },
  { feature: "Tempo reembolso", traditional: "30-90 dias", topypro: "Máx 30 dias", highlight: true },
  { feature: "Atendimento", traditional: "Terceirizado", topypro: "Central própria", highlight: false },
  { feature: "Mensalidade", traditional: "R$250-R$500", topypro: "R$ 99", highlight: true },
  { feature: "Ativação", traditional: "5+ dias", topypro: "Em minutos", highlight: false },
];

const ComparisonSection = () => (
  <section id="comparativo" className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-semibold mb-6">
          COMPARATIVO
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white">TopyPro vs </span>
          <span className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">Tradicional</span>
        </h2>
      </motion.div>

      <CyberCard className="overflow-hidden" delay={0.2}>
        <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-emerald-500/10 to-violet-500/10">
          <div className="text-gray-400 font-medium">Característica</div>
          <div className="text-gray-400 font-medium text-center">Seguro</div>
          <div className="text-emerald-400 font-bold text-center">TopyPro ✓</div>
        </div>
        <GlowingLine />
        {comparisonData.map((row, i) => (
          <motion.div
            key={i}
            className={`grid grid-cols-3 gap-4 p-6 border-b border-white/5 last:border-0 ${
              row.highlight ? "bg-emerald-500/5" : ""
            } hover:bg-white/5 transition-colors`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="text-white font-medium">{row.feature}</div>
            <div className="text-gray-500 text-center">{row.traditional}</div>
            <div className="text-emerald-400 font-bold text-center">{row.topypro}</div>
          </motion.div>
        ))}
      </CyberCard>
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
    <section id="promoção" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <CyberCard className="p-12 text-center" delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
            <ZapIcon className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold">PROMOÇÃO ESPECIAL</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Primeira mensalidade por </span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">R$ 1,00</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Condição exclusiva para os primeiros 30 clientes. Não deixe para depois.
          </p>

          <div className="flex justify-center gap-4 mb-10">
            {[
              { value: pad(time.hours), label: "Horas" },
              { value: pad(time.minutes), label: "Min" },
              { value: pad(time.seconds), label: "Seg" },
            ].map((unit) => (
              <div key={unit.label} className="relative">
                <div className="absolute -inset-1 bg-amber-500/20 rounded-2xl blur" />
                <div className="relative bg-black/80 border border-amber-500/30 rounded-2xl p-5 min-w-[90px]">
                  <div className="text-4xl font-bold text-amber-400 font-mono">{unit.value}</div>
                  <div className="text-gray-500 text-sm">{unit.label}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-xl opacity-50" />
            <span className="relative text-black flex items-center gap-3">
              <ZapIcon className="w-6 h-6" />
              Garantir Minha Vaga
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.a>
        </CyberCard>
      </div>
    </section>
  );
};

const FooterSection = () => (
  <footer className="relative py-16 border-t border-white/10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="TopyPro" className="h-12 w-12" />
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">TopyPro</span>
            <p className="text-gray-500 text-sm">Proteção Veicular Inteligente</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Shield className="w-5 h-5 text-emerald-500" />
          <span>© {new Date().getFullYear()} TopyPro. Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
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
    <StatsSection />
    <BenefitsSection />
    <ComparisonSection />
    <PromoSection />
    <FooterSection />
    <WhatsAppFloat />
  </div>
);

export default Site;
