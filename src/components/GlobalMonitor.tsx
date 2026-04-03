import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Truck, AlertTriangle, Fuel, Gauge, Activity } from "lucide-react";

const kpiData = [
  { id: "rotas", label: "Veículos em Rota", value: 8432, icon: Truck, color: "#39ff14" },
  { id: "fadiga", label: "Alertas de Fadiga", value: 12, icon: AlertTriangle, color: "#f59e0b" },
  { id: "consumo", label: "Consumo Médio", value: 2.4, suffix: "km/L", icon: Fuel, color: "#06b6d4" },
  { id: "velocidade", label: "Velocidade Crítica", value: 0, icon: Gauge, color: "#ef4444" },
];

const generateRealtimeData = () => {
  const data = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      veiculos: Math.floor(7800 + Math.random() * 800 + Math.sin(i / 3) * 200),
      consumo: (2.2 + Math.random() * 0.4 + Math.sin(i / 5) * 0.1).toFixed(2),
      alertas: Math.floor(Math.random() * 15),
      velocidade: Math.floor(45 + Math.random() * 20 + Math.sin(i / 4) * 10),
    });
  }
  return data;
};

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {displayValue.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
};

const KPICard = ({ data, index }: { data: typeof kpiData[0]; index: number }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      <div
        className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ backgroundColor: data.color }}
      />

      <div className="relative glass-card border-2 p-6 rounded-2xl overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.color}, transparent)`,
            boxShadow: `0 0 20px ${data.color}`,
          }}
        />

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-2 font-medium">{data.label}</p>
            <p className="text-3xl font-bold text-white">
              <AnimatedCounter value={data.value} suffix={data.suffix} />
            </p>
          </div>

          <div
            className="p-3 rounded-xl border-2"
            style={{
              borderColor: data.color,
              boxShadow: `0 0 15px ${data.color}40`,
              backgroundColor: `${data.color}10`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: data.color }} />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

const GlobalMonitor = () => {
  const [chartData, setChartData] = useState(generateRealtimeData());

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          veiculos: Math.floor(7800 + Math.random() * 800),
          consumo: (2.2 + Math.random() * 0.4).toFixed(2),
          alertas: Math.floor(Math.random() * 15),
          velocidade: Math.floor(45 + Math.random() * 20),
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "#0a0f1e" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50">
            <Activity className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Global Monitor</h1>
            <p className="text-slate-400">Sistema de Telemetria em Tempo Real</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard key={kpi.id} data={kpi} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card border border-emerald-500/30 rounded-2xl p-6"
          style={{ boxShadow: "0 0 40px rgba(57, 255, 20, 0.1)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Fluxo de Dados em Tempo Real</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400">Veículos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Velocidade</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-slate-400">Alertas</span>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="veiculosGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#39ff14" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#39ff14" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="velocidadeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="alertasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={{ stroke: "#334155" }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={{ stroke: "#334155" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #39ff14",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px rgba(57, 255, 20, 0.3)",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="veiculos"
                  stroke="#39ff14"
                  strokeWidth={2}
                  fill="url(#veiculosGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="velocidade"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#velocidadeGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="alertas"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#alertasGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlobalMonitor;
