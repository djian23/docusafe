import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const FloatingGlobe = lazy(() => import('./FloatingGlobe').then(m => ({ default: m.FloatingGlobe })));

export function HeroSection() {
  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background -z-10" />
      
      {/* Floating orbs with glow */}
      <div className="absolute top-20 left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-soft -z-10" />
      <div className="absolute top-40 right-[5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-sphere-family/20 rounded-full blur-[80px] animate-pulse-soft -z-10" style={{ animationDelay: "-2s" }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:60px_60px] -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 text-sm font-medium mb-8 shadow-soft"
        >
          <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-foreground">100% hébergé en Europe</span>
          <span className="w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-muted-foreground">RGPD compliant</span>
        </motion.div>
        
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          Votre coffre-fort
          <br />
          <span className="text-gradient">numérique intelligent</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
        >
          Organisez vos documents importants, gérez vos mots de passe en toute sécurité, 
          et retrouvez n'importe quel fichier instantanément grâce à l'IA.
        </motion.p>
        
        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup">
            <Button size="lg" className="gradient-hero text-primary-foreground hover:opacity-90 transition-all h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-xl shadow-glow hover:shadow-soft group w-full sm:w-auto">
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-xl border-2 hover:bg-accent/50 transition-all w-full sm:w-auto">
              Découvrir
            </Button>
          </a>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8"
        >
          {[
            { icon: "✓", text: "Gratuit jusqu'à 500 MB" },
            { icon: "✓", text: "Sans carte bancaire" },
            { icon: "✓", text: "Annulation à tout moment" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <span className="text-primary font-bold">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </motion.div>
        
        {/* 3D Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 md:mt-12"
        >
          <Suspense fallback={
            <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center">
              <div className="w-32 h-32 rounded-full gradient-hero opacity-20 animate-pulse-soft" />
            </div>
          }>
            <FloatingGlobe />
          </Suspense>
        </motion.div>
        
        {/* Mini preview under globe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="-mt-8 md:-mt-16"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 gradient-hero opacity-10 blur-3xl rounded-3xl" />
            <div className="relative glass-card rounded-2xl shadow-2xl overflow-hidden border-gradient">
              <div className="bg-sidebar/90 backdrop-blur-sm p-3 md:p-4 flex items-center gap-3 border-b border-sidebar-border">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-warning/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-lg bg-sidebar-accent/50">
                    <Lock className="w-3 h-3 text-success" />
                    <span className="text-[10px] md:text-xs text-sidebar-foreground/70 font-medium">docusphere.app</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 md:p-8 bg-gradient-to-br from-background via-background to-accent/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  {[
                    { icon: "🆔", name: "Identité", count: "3/4", color: "from-primary/20 to-primary/5" },
                    { icon: "👨‍👩‍👧", name: "Famille", count: "5/5", color: "from-sphere-family/20 to-sphere-family/5" },
                    { icon: "🏠", name: "Logement", count: "2/4", color: "from-sphere-housing/20 to-sphere-housing/5" },
                    { icon: "💼", name: "Travail", count: "8/12", color: "from-sphere-work/20 to-sphere-work/5" },
                  ].map((sphere, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className={`group bg-gradient-to-br ${sphere.color} rounded-xl p-3 md:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift cursor-pointer`}
                    >
                      <div className="text-2xl md:text-4xl mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300">{sphere.icon}</div>
                      <div className="font-semibold text-xs md:text-sm mb-1">{sphere.name}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{sphere.count} docs</div>
                      <div className="mt-2 md:mt-3 h-1 md:h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-hero rounded-full transition-all duration-500"
                          style={{ width: `${(parseInt(sphere.count.split('/')[0]) / parseInt(sphere.count.split('/')[1])) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl bg-sidebar/5 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs md:text-sm font-medium">Assistant IA</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">"Trouve mon RIB" → Document trouvé en 0.3s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
