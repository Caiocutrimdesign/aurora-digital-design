import heroBg from "@/assets/hero-bg.jpg";
import { Shield, ChevronDown } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Proteção veicular futurista"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-tight px-4 md:px-8 pt-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-slide-up">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">Proteção Veicular Inteligente</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Se seu veículo for roubado,{" "}
            <span className="gradient-text">pagamos 100% da FIPE</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            A única empresa do mercado que quita seu veículo em até{" "}
            <span className="text-primary font-semibold">30 dias</span>. Rastreamento + reembolso integral. Proteção real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              Fale com um Especialista
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.682-1.228A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.828l-.424-.282-3.114.817.832-3.042-.31-.447A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
            </a>
            <a
              href="#beneficios"
              className="border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
            >
              Saiba Mais
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "100%", label: "Tabela FIPE" },
              { value: "30 dias", label: "Para indenização" },
              { value: "24h", label: "Assistência" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="w-px h-8 bg-primary/30" />
                <div>
                  <div className="text-primary font-display font-bold text-lg">{badge.value}</div>
                  <div className="text-muted-foreground text-xs">{badge.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
