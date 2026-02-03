import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Des tarifs <span className="text-gradient">transparents</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. 
            Tous les plans incluent notre sécurité de niveau bancaire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={cn(
                "relative rounded-2xl p-8 transition-all duration-300",
                plan.popular 
                  ? "bg-gradient-to-b from-primary/10 to-background border-2 border-primary shadow-soft scale-105" 
                  : "bg-card border border-border hover:border-primary/30"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm">
                  <span>💾</span>
                  <span>{plan.storage}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/signup" className="block">
                <Button 
                  className={cn(
                    "w-full",
                    plan.popular 
                      ? "gradient-hero text-primary-foreground hover:opacity-90" 
                      : ""
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
