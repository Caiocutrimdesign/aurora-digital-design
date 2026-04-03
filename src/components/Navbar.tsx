import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5598985992136?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20no%20plano%20da%20TopyPro.";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between py-4 px-4 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="TopyPro" className="h-10 w-10" />
          <span className="font-display font-bold text-xl text-foreground">
            Topy<span className="text-primary">Pro</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#beneficios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Benefícios
          </a>
          <a href="#comparativo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Comparativo
          </a>
          <a href="#promo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Promoção
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Fale Conosco
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 pb-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <a href="#beneficios" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2">Benefícios</a>
            <a href="#comparativo" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2">Comparativo</a>
            <a href="#promo" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors py-2">Promoção</a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold text-center"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
