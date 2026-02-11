import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Lock, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background -z-10" />
      
      {/* Floating orbs with glow */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-soft -z-10" />
      <div className="absolute top-40 right-[5%] w-[400px] h-[400px] bg-sphere-family/20 rounded-full blur-[80px] animate-pulse-soft -z-10" style={{ animationDelay: "-2s" }} />
      <div className="absolute bottom-0 left-[30%] w-[600px] h-[400px] bg-sphere-housing/10 rounded-full blur-[120px] animate-pulse-soft -z-10" style={{ animationDelay: "-4s" }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:60px_60px] -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 text-sm font-medium mb-8 animate-fade-in shadow-soft">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-foreground">100% hébergé en Europe</span>
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span className="text-muted-foreground">RGPD compliant</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in tracking-tight" style={{ animationDelay: "0.1s" }}>
          Votre coffre-fort
          <br />
          <span className="text-gradient">numérique intelligent</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Organisez vos documents importants, gérez vos mots de passe en toute sécurité, 
          et retrouvez n'importe quel fichier instantanément grâce à l'IA.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link to="/signup">
            <Button size="lg" className="gradient-hero text-primary-foreground hover:opacity-90 transition-all h-14 px-8 text-lg rounded-xl shadow-glow hover:shadow-soft group">
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-accent/50 transition-all">
              Découvrir les fonctionnalités
            </Button>
          </a>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { icon: "✓", text: "Gratuit jusqu'à 500 MB" },
            { icon: "✓", text: "Sans carte bancaire" },
            { icon: "✓", text: "Annulation à tout moment" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
        
        {/* Preview mockup */}
        <div className="mt-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative mx-auto max-w-5xl">
            {/* Glow behind mockup */}
            <div className="absolute inset-0 gradient-hero opacity-20 blur-3xl rounded-3xl" />
            
            <div className="relative glass-card rounded-2xl shadow-2xl overflow-hidden border-gradient">
              {/* Browser chrome */}
              <div className="bg-sidebar/90 backdrop-blur-sm p-4 flex items-center gap-3 border-b border-sidebar-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-warning/80 hover:bg-warning transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-success/80 hover:bg-success transition-colors" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-sidebar-accent/50">
                    <Lock className="w-3 h-3 text-success" />
                    <span className="text-xs text-sidebar-foreground/70 font-medium">docusphere.app</span>
                  </div>
                </div>
              </div>
              
              {/* App preview content */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-background via-background to-accent/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { icon: "🆔", name: "Identité", count: "3/4", color: "from-primary/20 to-primary/5" },
                    { icon: "👨‍👩‍👧", name: "Famille", count: "5/5", color: "from-sphere-family/20 to-sphere-family/5" },
                    { icon: "🏠", name: "Logement", count: "2/4", color: "from-sphere-housing/20 to-sphere-housing/5" },
                    { icon: "💼", name: "Travail", count: "8/12", color: "from-sphere-work/20 to-sphere-work/5" },
                  ].map((sphere, i) => (
                    <div 
                      key={i} 
                      className={`group bg-gradient-to-br ${sphere.color} rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift cursor-pointer`}
                    >
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{sphere.icon}</div>
                      <div className="font-semibold text-sm mb-1">{sphere.name}</div>
                      <div className="text-xs text-muted-foreground">{sphere.count} documents</div>
                      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-hero rounded-full transition-all duration-500"
                          style={{ width: `${(parseInt(sphere.count.split('/')[0]) / parseInt(sphere.count.split('/')[1])) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* AI Assistant preview */}
                <div className="mt-6 p-4 rounded-xl bg-sidebar/5 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Assistant IA</div>
                      <div className="text-xs text-muted-foreground">"Trouve mon RIB" → Document trouvé en 0.3s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
