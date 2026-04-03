import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { Menu, X, Shield, Zap, Clock, Phone, Heart, Truck, DollarSign, AlertTriangle, MapPin, TrendingUp, Check, Star, ArrowRight, ChevronDown, Eye, Activity, Bell, Settings, Wifi, Gauge, Fuel } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const NeonText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.span
    className={className}
    animate={{ textShadow: ["0 0 10px #10b981, 0 0 20px #10b981", "0 0 20px #10b981, 0 0 40px #10b981", "0 0 10px #10b981, 0 0 20px #10b981"] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {children}
  </motion.span>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const PulseRing = () => (
  <motion.div
    className="absolute inset-0 border-2 border-emerald-500/50 rounded-full"
    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
    transition={{ duration: 3, repeat: Infinity }}
  />
);

const FloatingIcon = ({ icon: Icon, color = "#10b981" }: { icon: any; color?: string }) => (
  <motion.div
    className="absolute"
    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="w-16 h-16 rounded-2xl bg-black/50 backdrop-blur flex items-center justify-center border border-white/10">
      <Icon className="w-8 h-8" style={{ color }} />
    </div>
  </motion.div>
);

const AnimatedNumber = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const ProgressBar = ({ value, color = "#10b981" }: { value: number; color?: string }) => (
  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-emerald-500/30 rounded-xl blur-lg"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <img src={logo} alt="TopyPro" className="relative h-12 w-12" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight">TOPY<span className="text-emerald-400">PRO</span></span>
              <p className="text-[10px] text-gray-500 tracking-widest">PROTEÇÃO VEICULAR</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm text-gray-400 hover:text-white transition-colors">Início</a>
            <a href="#sistema" className="text-sm text-gray-400 hover:text-white transition-colors">Sistema</a>
            <a href="#cobertura" className="text-sm text-gray-400 hover:text-white transition-colors">Cobertura</a>
            <a href={WHATSAPP_URL} target="_blank" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-full hover:scale-105 transition-transform">
              WhatsApp
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10"
          >
            <div className="p-6 flex flex-col gap-4">
              <a href="#home" className="text-gray-400 py-2">Início</a>
              <a href="#sistema" className="text-gray-400 py-2">Sistema</a>
              <a href="#cobertura" className="text-gray-400 py-2">Cobertura</a>
              <a href={WHATSAPP_URL} target="_blank" className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-full text-center">
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => (
  <section id="home" className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-gradient-to-b from-black via-emerald-950/20 to-black">
    <div className="absolute inset-0">
      <FloatingIcon icon={Shield} color="#10b981" style={{ top: "10%", left: "5%" }} />
      <FloatingIcon icon={Zap} color="#06b6d4" style={{ top: "20%", right: "10%" }} delay={1} />
      <FloatingIcon icon={Clock} color="#8b5cf6" style={{ bottom: "30%", left: "15%" }} delay={2} />
      <FloatingIcon icon={Phone} color="#f59e0b" style={{ bottom: "20%", right: "5%" }} delay={3} />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8">
            <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-xs font-medium text-emerald-400 tracking-widest">SISTEMA ATIVO</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
            <span className="text-white">PROTEÇÃO</span>
            <br />
            <NeonText className="text-emerald-400">INTELIGENTE</NeonText>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-lg">
            Se seu veículo for roubado, <span className="text-white font-bold">pagamos 100% da FIPE</span> em até 30 dias. Sem franquia, sem burocracia.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Falar com Especialista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="#sistema"
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Ver Sistema
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1 }}>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl" />
            <GlassCard className="p-8 relative">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400">ONLINE</span>
              </div>

              <div className="text-center mb-8">
                <Activity className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">VALE</h3>
                <p className="text-gray-500 text-sm">Monitoramento Global</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Veículos Protegidos</span>
                    <span className="text-emerald-400 font-bold">8.432</span>
                  </div>
                  <ProgressBar value={85} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Alertas Ativos</span>
                    <span className="text-amber-400 font-bold">127</span>
                  </div>
                  <ProgressBar value={30} color="#f59e0b" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Taxa de Recuperação</span>
                    <span className="text-cyan-400 font-bold">98.5%</span>
                  </div>
                  <ProgressBar value={98} color="#06b6d4" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, value: "8.4K", label: "Veículos" },
                  { icon: Shield, value: "100%", label: "FIPE" },
                  { icon: Clock, value: "30d", label: "Indenização" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5">
                    <stat.icon className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-8 h-8 text-gray-500" />
    </div>
  </section>
);

const AlertSection = () => (
  <section id="sistema" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 mb-6">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-medium text-red-400 tracking-widest">DADOS OFICIAIS</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
          SÃO LUÍS:
          <span className="text-red-400"> ALVO FÁCIL</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: AlertTriangle, num: 4, label: "Veículos/dia", sub: "roubados em São Luís", color: "#ef4444" },
          { icon: TrendingUp, num: 40, label: "%", sub: "nunca recuperados", color: "#f59e0b" },
          { icon: MapPin, num: 1460, label: "+", sub: "casos por ano", color: "#06b6d4" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <GlassCard className="p-10 text-center group hover:border-red-500/30 transition-colors">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
              >
                <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
              </div>
              <div className="text-6xl font-black mb-2" style={{ color: stat.color }}>
                +{stat.num}{stat.label}
              </div>
              <p className="text-gray-400">{stat.sub}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section id="cobertura" className="py-32 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-medium text-emerald-400 tracking-widest mb-6">
          COBERTURA COMPLETA
        </span>
        <h2 className="text-5xl md:text-6xl font-black text-white">
          PROTEÇÃO <span className="text-emerald-400">TOTAL</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "Roubo e Furto", desc: "Cobertura completa contra roubo e furto do veículo.", price: "100% FIPE" },
          { icon: Clock, title: "30 Dias", desc: "Indenização em até 30 dias ou devolvemos.", price: "Garantido" },
          { icon: Truck, title: "Guincho 24h", desc: "Assistência em todo território nacional.", price: "Grátis" },
          { icon: Phone, title: "Suporte 24/7", desc: "Equipe pronta para ajudar a qualquer hora.", price: "Always" },
          { icon: DollarSign, title: "Economia", desc: "Até 50% menos que seguro tradicional.", price: "R$ 99/mês" },
          { icon: Check, title: "Sem Análise", desc: "Não exigimos nome limpo ou histórico.", price: "Imediato" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <GlassCard className="p-8 group hover:border-emerald-500/30 transition-all cursor-pointer">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                    {item.price}
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-violet-950/10">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-medium text-violet-400 tracking-widest mb-6">
          COMPARATIVO
        </span>
        <h2 className="text-5xl md:text-6xl font-black text-white">
          TOPYPRO <span className="text-violet-400">VS</span> TRADICIONAL
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 h-full">
            <h3 className="text-sm font-medium text-gray-500 tracking-widest mb-8">SEGURO TRADICIONAL</h3>
            <div className="space-y-4">
              {[
                { label: "Indenização", value: "Parcial c/ franquia" },
                { label: "Rastreamento", value: "Cobrado à parte" },
                { label: "Análise CPF", value: "Obrigatória" },
                { label: "Tempo reembolso", value: "30-90 dias" },
                { label: "Mensalidade", value: "R$ 250-500" },
                { label: "Ativação", value: "5+ dias" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="text-gray-400">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 h-full border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
            <div className="absolute top-4 right-4">
              <Star className="w-6 h-6 text-amber-400" fill="#f59e0b" />
            </div>
            <h3 className="text-sm font-medium text-emerald-400 tracking-widest mb-8">TOPYPRO</h3>
            <div className="space-y-4">
              {[
                { label: "Indenização", value: "100% FIPE" },
                { label: "Rastreamento", value: "Grátis incluso" },
                { label: "Análise CPF", value: "Não exigimos" },
                { label: "Tempo reembolso", value: "Máx 30 dias" },
                { label: "Mensalidade", value: "R$ 99" },
                { label: "Ativação", value: "Em minutos" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="text-emerald-400 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
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
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400 tracking-widest">PROMOÇÃO ESPECIAL</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              PRIMEIRA MENSALIDADE
            </h2>
            <div className="text-7xl md:text-8xl font-black text-amber-400 mb-8">
              R$ <span className="text-8xl md:text-9xl">1,00</span>
            </div>
            <p className="text-gray-400 mb-10">Válido para os primeiros 30 clientes da semana.</p>

            <div className="flex justify-center gap-4 mb-10">
              {[
                { value: pad(time.hours), label: "Horas" },
                { value: pad(time.minutes), label: "Min" },
                { value: pad(time.seconds), label: "Seg" },
              ].map((unit) => (
                <div key={unit.label} className="p-5 bg-black/50 border border-amber-500/30 rounded-xl min-w-[90px]">
                  <div className="text-3xl font-black text-amber-400 font-mono">{unit.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{unit.label}</div>
                </div>
              ))}
            </div>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-lg rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-6 h-6" />
              Garantir Minha Vaga
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/10 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="TopyPro" className="h-10 w-10" />
          <div>
            <span className="text-lg font-bold">TOPY<span className="text-emerald-400">PRO</span></span>
            <p className="text-xs text-gray-500">Proteção Veicular Inteligente</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>© {new Date().getFullYear()} TopyPro. Todos os direitos reservados.</span>
        </div>
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
    <AlertSection />
    <BenefitsSection />
    <ComparisonSection />
    <PromoSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Site;
