import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, DollarSign, Clock, Phone, Heart, Truck, Zap, Eye, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Proteção Total",
    description: "Cobertura completa contra roubo e furto do seu veículo, pra você dirigir sem preocupação.",
    color: "#10b981",
  },
  {
    icon: DollarSign,
    title: "Economia Inteligente",
    description: "Pague até 50% menos do que um seguro convencional. A partir de R$ 99/mês.",
    color: "#f59e0b",
  },
  {
    icon: Clock,
    title: "Indenização em 30 dias",
    description: "Recuperação garantida do veículo ou indenização de 100% da FIPE em até 30 dias.",
    color: "#06b6d4",
  },
  {
    icon: Phone,
    title: "Suporte 24/7",
    description: "Equipe de apoio 24 horas por dia, 7 dias por semana, em todo o território nacional.",
    color: "#8b5cf6",
  },
  {
    icon: Heart,
    title: "Atendimento Humano",
    description: "Suporte especializado que descomplica tudo. Foco na sua conveniência e resolução rápida.",
    color: "#ec4899",
  },
  {
    icon: Truck,
    title: "Assistência 24h",
    description: "Pane ou acidente? Conte com nosso guincho 24h pra te socorrer a qualquer hora.",
    color: "#14b8a6",
  },
];

const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    }}
  >
    {children}
  </motion.div>
);

const BenefitCard = ({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: benefit.color }}
      />

      <div
        className="relative p-8 rounded-2xl border bg-card/40 backdrop-blur-xl overflow-hidden"
        style={{
          borderColor: `${benefit.color}30`,
        }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${benefit.color}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />

        <div className="flex items-start gap-5">
          <motion.div
            className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: `${benefit.color}15`,
              borderColor: `${benefit.color}40`,
            }}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
          </motion.div>

          <div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {benefit.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${benefit.color}50, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="section-padding relative">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            Vantagens
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Mais que proteção:{" "}
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
              um serviço completo
            </motion.span>
          </h2>

          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Um rastreador comum não te paga a FIPE. Com a gente, você tem
            rastreamento + reembolso integral.
          </p>
        </motion.div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <BenefitCard key={i} benefit={benefit} index={i} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default BenefitsSection;
