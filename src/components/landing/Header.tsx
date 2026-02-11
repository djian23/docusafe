import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl group">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-gradient font-semibold">DocuSphere</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Tarifs
          </a>
          <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Sécurité
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-sm font-medium">Se connecter</Button>
          </Link>
          <Link to="/signup">
            <Button className="gradient-hero text-primary-foreground hover:opacity-90 transition-all rounded-xl shadow-soft group">
              Essayer gratuitement
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
