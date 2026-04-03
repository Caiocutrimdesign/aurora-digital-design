import { useEffect, useState } from "react";
import { Zap, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const PromoSection = () => {
  const [time, setTime] = useState({ hours: 7, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="promo" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.04] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container-tight relative">
        <div className="glass-card p-8 md:p-16 text-center relative overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-highlight/10 text-highlight px-4 py-2 rounded-full mb-8">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Promoção Exclusiva da Semana</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Primeira mensalidade por{" "}
              <span className="gradient-text">R$ 1,00</span>
            </h2>

            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg">
              Ative seu rastreador agora. Condição válida para os primeiros 30 clientes da semana.
            </p>

            {/* Countdown */}
            <div className="flex justify-center gap-4 mb-10">
              {[
                { value: pad(time.hours), label: "Horas" },
                { value: pad(time.minutes), label: "Min" },
                { value: pad(time.seconds), label: "Seg" },
              ].map((unit) => (
                <div key={unit.label} className="bg-secondary rounded-xl p-4 min-w-[80px]">
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                    {unit.value}
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">{unit.label}</div>
                </div>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all group"
            >
              Quero essa oferta
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-muted-foreground text-xs mt-6">
              Oferta por tempo limitado. Cada minuto sem proteção é um risco a mais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
