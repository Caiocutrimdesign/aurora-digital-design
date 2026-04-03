import { useEffect, useRef, useState } from "react";
import { AlertTriangle, MapPin, TrendingUp } from "lucide-react";

const useCountUp = (end: number, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
};

const StatsSection = () => {
  const stat1 = useCountUp(4);
  const stat2 = useCountUp(40);
  const stat3 = useCountUp(1460);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-tight relative">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">A realidade</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            São Luís virou <span className="gradient-text">alvo fácil</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Os números não mentem. O risco de perder seu veículo e sair no prejuízo é real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              ref: stat1.ref,
              icon: AlertTriangle,
              value: `+${stat1.count}`,
              suffix: "/dia",
              label: "Veículos roubados ou furtados por dia em São Luís",
            },
            {
              ref: stat2.ref,
              icon: TrendingUp,
              value: `${stat2.count}%`,
              suffix: "",
              label: "Dos veículos roubados nunca são recuperados",
            },
            {
              ref: stat3.ref,
              icon: MapPin,
              value: `+${stat3.count}`,
              suffix: "/ano",
              label: "Casos de roubo e furto de veículos por ano",
            },
          ].map((stat, i) => (
            <div
              key={i}
              ref={stat.ref}
              className="glass-card-hover p-8 text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {stat.value}
                <span className="text-primary text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
