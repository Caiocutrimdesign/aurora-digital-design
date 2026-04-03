import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Trophy, Zap, Target, TrendingUp } from "lucide-react";

const rows = [
  {
    feature: "Indenização por roubo/furto",
    traditional: "Parcial, com franquia",
    topypro: "100% da Tabela FIPE",
    highlight: true,
  },
  {
    feature: "Rastreamento em tempo real",
    traditional: "Cobrado à parte",
    topypro: "Incluso no plano",
    highlight: false,
  },
  {
    feature: "Consulta ao CPF / perfil",
    traditional: "Obrigatória",
    topypro: "Não exigimos nome limpo",
    highlight: false,
  },
  {
    feature: "Tempo para indenização",
    traditional: "30 a 90 dias úteis",
    topypro: "Até 30 dias",
    highlight: true,
  },
  {
    feature: "Atendimento 24h",
    traditional: "Limitado / terceirizado",
    topypro: "Central própria",
    highlight: false,
  },
  {
    feature: "Mensalidade",
    traditional: "R$ 250 a R$ 500",
    topypro: "A partir de R$ 99",
    highlight: true,
  },
  {
    feature: "Burocracia na adesão",
    traditional: "Alta, com vistoria",
    topypro: "Ativação em minutos",
    highlight: false,
  },
];

const ComparisonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comparativo" className="section-padding relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 text-highlight text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Target className="w-4 h-4" />
            Comparativo
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Veja o que{" "}
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
              realmente vale
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-3 gap-4 p-6 border-b border-border bg-secondary/30"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm font-semibold text-muted-foreground">Características</div>
            <div className="text-sm font-semibold text-muted-foreground text-center flex items-center justify-center gap-2">
              <span className="hidden md:inline">Seguro</span> Tradicional
            </div>
            <div className="text-sm font-semibold text-primary text-center flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4" /> TopyPro
            </div>
          </motion.div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              className={`grid grid-cols-3 gap-4 p-5 md:p-6 items-center border-b border-border/50 last:border-0 transition-colors ${
                row.highlight ? "bg-primary/[0.03]" : "hover:bg-secondary/10"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <div className="text-sm text-foreground font-medium">{row.feature}</div>

              <div className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <X className="w-4 h-4 text-destructive shrink-0 hidden md:block" />
                </motion.div>
                <span className="hidden md:inline">{row.traditional}</span>
              </div>

              <motion.div
                className="text-sm text-primary text-center font-semibold flex items-center justify-center gap-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                <Check className="w-4 h-4 text-primary shrink-0 hidden md:block" />
                <span className="hidden md:inline">{row.topypro}</span>
                {row.highlight && (
                  <motion.span
                    className="md:hidden px-2 py-0.5 bg-primary/20 rounded-full text-xs"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          {[
            { icon: Zap, label: "Ativação Rápida" },
            { icon: TrendingUp, label: "Melhor Custo-Benefício" },
            { icon: Check, label: "Zero Burocracia" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
