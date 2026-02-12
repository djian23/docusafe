import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";

export function PricingSection() {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "pour toujours",
      description: "Parfait pour commencer",
      storage: "500 MB",
      features: [
        "11 Sphères pré-configurées",
        "Gestionnaire de mots de passe",
        "Chiffrement AES-256",
        "Assistant IA (10 requêtes/mois)",
      ],
      cta: "Commencer gratuitement",
      popular: false,
    },
    {
      name: "Starter",
      price: "9€",
      period: "/mois",
      description: "Pour les particuliers",
      storage: "5 GB",
      features: [
        "Tout du plan Gratuit",
        "5 GB de stockage",
        "Sphères personnalisées illimitées",
        "Assistant IA illimité",
        "Export RGPD",
        "Support prioritaire",
      ],
      cta: "Essai gratuit 14 jours",
      popular: true,
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mois",
      description: "Pour les professionnels",
      storage: "50 GB",
      features: [
        "Tout du plan Starter",
        "50 GB de stockage",
        "Partage sécurisé de documents",
        "Historique des versions",
        "API access",
        "Support dédié",
      ],
      cta: "Essai gratuit 14 jours",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle -z-10" />
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Tarifs
            </span>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              Des tarifs <span className="text-gradient">transparents</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Choisissez le plan qui correspond à vos besoins.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                className={cn(
                  "relative rounded-2xl p-6 md:p-8 transition-all duration-500",
                  plan.popular 
                    ? "bg-card border-2 border-primary shadow-glow md:scale-105" 
                    : "bg-card border border-border hover:border-primary/30"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 gradient-hero text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-soft">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      Le plus populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground text-base md:text-lg">{plan.period}</span>
                  </div>
                  <div className="mt-3 md:mt-4 inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-accent/50 text-accent-foreground text-xs md:text-sm font-medium">
                    <span aria-hidden="true">💾</span>
                    <span>{plan.storage} de stockage</span>
                  </div>
                </div>
                
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8" role="list">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        plan.popular ? "gradient-hero" : "bg-primary/10"
                      )} aria-hidden="true">
                        <Check className={cn(
                          "w-3 h-3",
                          plan.popular ? "text-primary-foreground" : "text-primary"
                        )} />
                      </span>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup" className="block">
                  <Button 
                    className={cn(
                      "w-full h-11 md:h-12 rounded-xl font-medium transition-all",
                      plan.popular 
                        ? "gradient-hero text-primary-foreground hover:opacity-90 shadow-soft" 
                        : "hover:bg-accent"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <p className="text-xs md:text-sm text-muted-foreground">
            🔒 Paiement sécurisé • Annulation à tout moment • Sans engagement
          </p>
        </div>
      </div>
    </section>
  );
}
