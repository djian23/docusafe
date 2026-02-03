import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background -z-10" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sphere-family/10 rounded-full blur-3xl animate-float -z-10" style={{ animationDelay: "-3s" }} />
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
          <span>🇪🇺</span>
          <span>100% hébergé en Europe • RGPD compliant</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Votre coffre-fort
          <br />
          <span className="text-gradient">numérique intelligent</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Organisez vos documents importants, gérez vos mots de passe en toute sécurité, 
          et retrouvez n'importe quel fichier instantanément grâce à l'IA.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link to="/signup">
            <Button size="lg" className="gradient-hero text-primary-foreground hover:opacity-90 transition-opacity h-12 px-8 text-lg">
              Commencer gratuitement
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
              Découvrir les fonctionnalités
            </Button>
          </a>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          ✓ Gratuit jusqu'à 500 MB • ✓ Sans carte bancaire • ✓ Annulation à tout moment
        </p>
        
        {/* Preview mockup */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative mx-auto max-w-4xl">
            <div className="bg-card rounded-xl shadow-2xl border border-border overflow-hidden">
              <div className="bg-sidebar p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-sidebar-foreground/60">docusafe.app</span>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-background to-accent/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "🆔", name: "Identité", count: "3/4" },
                    { icon: "👨‍👩‍👧", name: "Famille", count: "5/5" },
                    { icon: "🏠", name: "Logement", count: "2/4" },
                    { icon: "💼", name: "Travail", count: "8/12" },
                  ].map((sphere, i) => (
                    <div key={i} className="bg-card rounded-lg p-4 shadow-card hover:shadow-soft transition-shadow cursor-pointer">
                      <div className="text-3xl mb-2">{sphere.icon}</div>
                      <div className="font-medium text-sm">{sphere.name}</div>
                      <div className="text-xs text-muted-foreground">{sphere.count} documents</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
