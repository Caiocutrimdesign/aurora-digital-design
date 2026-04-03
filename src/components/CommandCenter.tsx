import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Truck,
  MapPin,
  AlertTriangle,
  Fuel,
  Gauge,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Shield,
  Clock,
  TrendingUp,
  Eye,
  Zap
} from "lucide-react";

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count.toLocaleString("pt-BR")}</span>;
};

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-[#39ff14]/30"
        initial={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: Math.random() * 0.5 + 0.2
        }}
        animate={{
          y: [null, `${Math.random() * -100}%`],
          opacity: [null, 0],
          scale: [1, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          delay: Math.random() * 10
        }}
      />
    ))}
  </div>
);

const StaggerItem = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 24
    }}
  >
    {children}
  </motion.div>
);

const KPICard = ({
  icon: Icon,
  label,
  value,
  unit,
  color,
  index
}: {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
  index: number;
}) => (
  <StaggerItem index={index}>
    <div className="relative group">
      <div
        className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      <div
        className="relative rounded-xl p-5 border backdrop-blur-xl overflow-hidden"
        style={{
          backgroundColor: "rgba(5, 8, 16, 0.6)",
          borderColor: `${color}40`
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`
          }}
        />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-white">
              {value}
              {unit && <span className="text-sm text-slate-400 ml-1">{unit}</span>}
            </p>
          </div>
          <div
            className="p-2.5 rounded-lg border"
            style={{
              borderColor: `${color}50`,
              backgroundColor: `${color}10`
            }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>
      </div>
    </div>
  </StaggerItem>
);

const Sidebar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) => {
  const navItems = [
    { icon: Activity, label: "Dashboard", active: true },
    { icon: Truck, label: "Frotas" },
    { icon: MapPin, label: "Rastreamento" },
    { icon: AlertTriangle, label: "Alertas" },
    { icon: Fuel, label: "Combustível" },
    { icon: Gauge, label: "Velocidade" },
    { icon: Settings, label: "Configurações" }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      className="relative h-full"
    >
      <div
        className="h-full rounded-xl border backdrop-blur-xl flex flex-col"
        style={{
          backgroundColor: "rgba(5, 8, 16, 0.8)",
          borderColor: "rgba(57, 255, 20, 0.2)"
        }}
      >
        <div className="p-4 border-b border-white/5">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#39ff14]/20 border border-[#39ff14]/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#39ff14]" />
              </div>
              <div>
                <p className="text-xs text-slate-500">SEGURANÇA</p>
                <p className="text-sm font-semibold text-white">VALE</p>
              </div>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-2">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                item.active
                  ? "bg-[#39ff14]/10 border border-[#39ff14]/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${item.active ? "text-[#39ff14]" : "text-slate-400"}`}
              />
              {!collapsed && (
                <span
                  className={`text-sm ${
                    item.active ? "text-[#39ff14]" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CommandCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { icon: Truck, label: "Veículos Ativos", value: "8.432", color: "#39ff14" },
    { icon: AlertTriangle, label: "Alertas Hoje", value: "127", color: "#f59e0b" },
    { icon: Fuel, label: "Consumo Médio", value: "2.4", unit: "km/L", color: "#06b6d4" },
    { icon: Gauge, label: "Velocidade Média", value: "62", unit: "km/h", color: "#8b5cf6" }
  ];

  const alerts = [
    { id: 1, vehicle: "ABC-1234", type: "Fadiga", time: "2 min", severity: "high" },
    { id: 2, vehicle: "DEF-5678", type: "Excesso", time: "5 min", severity: "medium" },
    { id: 3, vehicle: "GHI-9012", type: "Rota", time: "8 min", severity: "low" }
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#050810" }}
    >
      <ParticleBackground />

      <div className="relative z-10 flex h-screen">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <main className="flex-1 p-6 overflow-auto">
          <header className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
                  <span className="text-xs text-[#39ff14] uppercase tracking-widest">
                    Sistema Online
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  VALE - MONITORAMENTO GLOBAL
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Centro de Comando de Telemetria
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase">Horário Local</p>
                  <p className="text-lg font-mono text-white">
                    {time.toLocaleTimeString("pt-BR")}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#39ff14]/30 bg-[#39ff14]/5">
                  <TrendingUp className="w-4 h-4 text-[#39ff14]" />
                  <span className="text-[#39ff14] font-bold">
                    <AnimatedCounter value={8432} duration={2500} />
                  </span>
                  <span className="text-slate-400 text-sm">veículos ativos</span>
                </div>
              </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi, index) => (
              <KPICard key={kpi.label} {...kpi} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 rounded-xl border backdrop-blur-xl overflow-hidden"
              style={{
                backgroundColor: "rgba(5, 8, 16, 0.6)",
                borderColor: "rgba(57, 255, 20, 0.2)"
              }}
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#39ff14]" />
                  <h2 className="text-white font-semibold">Mapa de Rastreamento</h2>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#39ff14]" /> Online
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500" /> Offline
                  </span>
                </div>
              </div>
              <div
                className="h-96 relative"
                style={{
                  background: `
                    radial-gradient(circle at 50% 50%, rgba(57, 255, 20, 0.05) 0%, transparent 50%),
                    linear-gradient(rgba(57, 255, 20, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(57, 255, 20, 0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 40px 40px, 40px 40px"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#39ff14]/10 blur-2xl" />
                    <div className="w-32 h-32 rounded-full border-2 border-[#39ff14]/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-[#39ff14]/20 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-[#39ff14]/50" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: i % 3 === 0 ? "#39ff14" : i % 3 === 1 ? "#f59e0b" : "#06b6d4",
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      boxShadow: `0 0 10px currentColor`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-xl border backdrop-blur-xl overflow-hidden"
              style={{
                backgroundColor: "rgba(5, 8, 16, 0.6)",
                borderColor: "rgba(57, 255, 20, 0.2)"
              }}
            >
              <div className="p-4 border-b border-white/5 flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#39ff14]" />
                <h2 className="text-white font-semibold">Alertas Recentes</h2>
              </div>
              <div className="divide-y divide-white/5">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          alert.severity === "high"
                            ? "bg-red-500 animate-pulse"
                            : alert.severity === "medium"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="text-white text-sm font-medium">{alert.vehicle}</p>
                        <p className="text-slate-500 text-xs">{alert.type}</p>
                      </div>
                    </div>
                    <span className="text-slate-500 text-xs">{alert.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex items-center justify-between text-xs text-slate-600"
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3" /> Conectado
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> Latência: 12ms
              </span>
            </div>
            <span>VALE Telemetria v2.0</span>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CommandCenter;
