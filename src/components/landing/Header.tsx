import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl group" aria-label="Koffr - Accueil">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform overflow-hidden">
            <LogoIcon size={36} />
          </div>
          <span className="text-gradient font-semibold">Koffr</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navigation principale">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Tarifs
          </a>
          <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Sécurité
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            FAQ
          </a>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-sm font-medium hidden md:inline-flex">Se connecter</Button>
          </Link>
          <Link to="/signup" className="hidden md:block">
            <Button className="gradient-hero text-primary-foreground hover:opacity-90 transition-all rounded-xl shadow-soft group">
              Essayer gratuitement
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/50 glass overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <a href="#features" onClick={() => setMenuOpen(false)} className="text-foreground font-medium py-2">Fonctionnalités</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-foreground font-medium py-2">Tarifs</a>
              <a href="#security" onClick={() => setMenuOpen(false)} className="text-foreground font-medium py-2">Sécurité</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="text-foreground font-medium py-2">FAQ</a>
              <div className="flex gap-2 pt-2 border-t border-border/50">
                <Link to="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Se connecter</Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full gradient-hero text-primary-foreground">S'inscrire</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
