import { Check, X } from "lucide-react";

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
  return (
    <section id="comparativo" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-tight relative">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Comparativo</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Veja o que <span className="gradient-text">realmente vale</span>
          </h2>
        </div>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-border bg-secondary/30">
            <div className="text-sm font-semibold text-muted-foreground">Características</div>
            <div className="text-sm font-semibold text-muted-foreground text-center">Seguro Tradicional</div>
            <div className="text-sm font-semibold text-primary text-center">TopyPro</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 gap-4 p-5 md:p-6 items-center border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/20 ${
                row.highlight ? "bg-primary/[0.03]" : ""
              }`}
            >
              <div className="text-sm text-foreground font-medium">{row.feature}</div>
              <div className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-destructive shrink-0 hidden md:block" />
                <span>{row.traditional}</span>
              </div>
              <div className="text-sm text-primary text-center font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 hidden md:block" />
                <span>{row.topypro}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
