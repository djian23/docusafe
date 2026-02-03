import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">🔐</span>
          <span className="text-gradient">DocuSafe</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Tarifs
          </a>
          <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
            Sécurité
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Se connecter</Button>
          </Link>
          <Link to="/signup">
            <Button className="gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">
              Essayer gratuitement
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
