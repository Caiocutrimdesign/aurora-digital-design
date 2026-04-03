import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Shield, ChevronDown, Star, Award, Users, Clock } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        initial={{
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 100}%`],
          opacity: [0.3, 0],
          scale: [0.5, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

const AnimatedGradient = () => (
  <motion.div
    className="absolute inset-0 opacity-30"
    animate={{
      background: [
        "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
        "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
      ],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
      },
    }}
  >
    {children}
  </motion.div>
);

const FadeInUp = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
      },
    }}
  >
    {children}
  </motion.div>
);

const PulseGlow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    animate={{
      boxShadow: [
        "0 0 20px rgba(16, 185, 129, 0.3)",
        "0 0 40px rgba(16, 185, 129, 0.5)",
        "0 0 20px rgba(16, 185, 129, 0.3)",
      ],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroBg}
          alt="Proteção veicular futurista"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/50" />
      </motion.div>

      <AnimatedGradient />
      <FloatingParticles />

      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div style={{ opacity }} className="relative z-10 container-tight px-4 md:px-8 pt-24">
        <StaggerContainer className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium">Proteção Veicular Inteligente</span>
            </motion.div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Se seu veículo for roubado,{" "}
              <motion.span
                className="gradient-text"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.5)",
                    "0 0 40px rgba(16, 185, 129, 0.8)",
                    "0 0 20px rgba(16, 185, 129, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                pagamos 100% da FIPE
              </motion.span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A única empresa do mercado que quita seu veículo em até{" "}
              <motion.span
                className="text-primary font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                30 dias
              </motion.span>
              . Rastreamento + reembolso integral. Proteção real.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <PulseGlow>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Fale com um Especialista</span>
                  <motion.svg
                    className="w-5 h-5 relative z-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    whileHover={{ x: 5 }}
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.682-1.228A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.828l-.424-.282-3.114.817.832-3.042-.31-.447A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </motion.svg>
                </motion.a>
              </PulseGlow>

              <motion.a
                href="#beneficios"
                className="border-2 border-border text-foreground px-10 py-4 rounded-xl font-semibold text-lg hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Saiba Mais
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ y: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </motion.a>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Award, value: "100%", label: "Tabela FIPE" },
                { icon: Clock, value: "30 dias", label: "Para indenização" },
                { icon: Users, value: "24h", label: "Assistência" },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                  <div className="text-left">
                    <motion.div
                      className="text-primary font-display font-bold text-xl flex items-center gap-2"
                      animate={{ textShadow: ["0 0 10px rgba(16, 185, 129, 0.3)", "0 0 20px rgba(16, 185, 129, 0.5)", "0 0 10px rgba(16, 185, 129, 0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <badge.icon className="w-5 h-5" />
                      {badge.value}
                    </motion.div>
                    <div className="text-muted-foreground text-xs">{badge.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInUp>
        </StaggerContainer>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
