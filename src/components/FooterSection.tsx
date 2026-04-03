import logo from "@/assets/logo.png";
import { Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 px-4 md:px-8">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TopyPro" className="h-8 w-8" />
            <span className="font-display font-bold text-foreground">
              Topy<span className="text-primary">Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span>Proteção Veicular Inteligente</span>
          </div>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TopyPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
