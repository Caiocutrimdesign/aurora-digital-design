import { Shield, DollarSign, Clock, Phone, Heart, Truck } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Proteção Total",
    description: "Cobertura completa contra roubo e furto do seu veículo, pra você dirigir sem preocupação.",
  },
  {
    icon: DollarSign,
    title: "Economia Inteligente",
    description: "Pague até 50% menos do que um seguro convencional. A partir de R$ 99/mês.",
  },
  {
    icon: Clock,
    title: "Indenização em 30 dias",
    description: "Recuperação garantida do veículo ou indenização de 100% da FIPE em até 30 dias.",
  },
  {
    icon: Phone,
    title: "Suporte 24/7",
    description: "Equipe de apoio 24 horas por dia, 7 dias por semana, em todo o território nacional.",
  },
  {
    icon: Heart,
    title: "Atendimento Humano",
    description: "Suporte especializado que descomplica tudo. Foco na sua conveniência e resolução rápida.",
  },
  {
    icon: Truck,
    title: "Assistência 24h",
    description: "Pane ou acidente? Conte com nosso guincho 24h pra te socorrer a qualquer hora.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="section-padding relative">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Vantagens</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Mais que proteção: <span className="gradient-text">um serviço completo</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Um rastreador comum não te paga a FIPE. Com a gente, você tem rastreamento + reembolso integral.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="glass-card-hover p-8 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
