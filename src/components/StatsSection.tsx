import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, MapPin, TrendingUp, Shield, Eye, Zap } from "lucide-react";

const useCountUp = (end: number, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!startOnView || !isInView) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [end, duration, startOnView, isInView]);

  return { count, ref };
};

const AnimatedNumber = ({ value, suffix = "", color = "#10b981" }: { value: number; suffix?: string; color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.span
        animate={{
          textShadow: [
            `0 0 20px ${color}40`,
            `0 0 40px ${color}60`,
            `0 0 20px ${color}40`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        +{value.toLocaleString("pt-BR")}
      </motion.span>
      <span className="text-primary text-2xl md:text-3xl ml-1">{suffix}</span>
    </motion.div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -150]);

  const stats = [
    {
      icon: AlertTriangle,
      value: 4,
      suffix: "/dia",
      label: "Veículos roubados ou furtados por dia em São Luís",
      color: "#ef4444",
      y: y1,
    },
    {
      icon: TrendingUp,
      value: 40,
      suffix: "%",
      label: "Dos veículos roubados nunca são recuperados",
      color: "#f59e0b",
      y: y2,
    },
    {
      icon: MapPin,
      value: 1460,
      suffix: "/ano",
      label: "Casos de roubo e furto de veículos por ano",
      color: "#06b6d4",
      y: y3,
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-destructive/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ y: y1 }}
      />

      <motion.div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ y: y2 }}
      />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Eye className="w-4 h-4" />
            A Realidade
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            São Luís virou{" "}
            <motion.span
              className="gradient-text"
              animate={{
                textShadow: [
                  "0 0 20px rgba(16, 185, 129, 0.3)",
                  "0 0 40px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              alvo fácil
            </motion.span>
          </h2>

          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Os números não mentem. O risco de perder seu veículo e sair no
            prejuízo é real.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
              style={{ y: stat.y }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: stat.color }}
              />

              <div
                className="relative p-8 rounded-2xl border bg-card/40 backdrop-blur-xl text-center overflow-hidden"
                style={{ borderColor: `${stat.color}30` }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  }}
                />

                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    borderColor: `${stat.color}40`,
                  }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </motion.div>

                <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color} />

                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {stat.label}
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}50, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card"
            animate={{
              boxShadow: [
                "0 0 30px rgba(16, 185, 129, 0.2)",
                "0 0 50px rgba(16, 185, 129, 0.4)",
                "0 0 30px rgba(16, 185, 129, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-6 h-6 text-primary" />
            <p className="text-foreground font-medium">
              Proteja-se antes que seja tarde. Seu veículo pode ser o próximo.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
