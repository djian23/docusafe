import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { Tilt3DCard } from "@/components/animations/Tilt3DCard";
import { TextReveal3D } from "@/components/animations/TextReveal3D";
import { Suspense, lazy } from "react";

const WaveMesh3D = lazy(() => import('@/components/animations/WaveMesh3D').then(m => ({ default: m.WaveMesh3D })));

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

      {/* 3D wave background */}
      <Suspense fallback={null}>
        <WaveMesh3D className="opacity-20 -z-5" variant="pricing" />
      </Suspense>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full border border-primary/10"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 rounded-full border border-sphere-family/10"
        animate={{ rotate: -360, scale: [1, 0.8, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <TextReveal3D>
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4"
              whileHover={{ scale: 1.1, rotateZ: 3 }}
            >
              Tarifs
            </motion.span>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              Des tarifs <span className="text-gradient">transparents</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Choisissez le plan qui correspond à vos besoins.
            </p>
          </div>
        </TextReveal3D>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <Tilt3DCard intensity={plan.popular ? 8 : 12} scale={plan.popular ? 1.02 : 1.04}>
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                  className={cn(
                    "relative rounded-2xl p-6 md:p-8 transition-all duration-500",
                    plan.popular
                      ? "bg-card border-2 border-primary shadow-glow md:scale-105"
                      : "bg-card border border-border hover:border-primary/30"
                  )}
                >
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="inline-flex items-center gap-1.5 gradient-hero text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-soft">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        Le plus populaire
                      </span>
                    </motion.div>
                  )}

                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6 md:mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <motion.span
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 150 }}
                        style={{ perspective: 600 }}
                      >
                        {plan.price}
                      </motion.span>
                      <span className="text-muted-foreground text-base md:text-lg">{plan.period}</span>
                    </div>
                    <motion.div
                      className="mt-3 md:mt-4 inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-accent/50 text-accent-foreground text-xs md:text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span aria-hidden="true">💾</span>
                      <span>{plan.storage} de stockage</span>
                    </motion.div>
                  </div>

                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8" role="list">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                      >
                        <motion.span
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            plan.popular ? "gradient-hero" : "bg-primary/10"
                          )}
                          aria-hidden="true"
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Check className={cn(
                            "w-3 h-3",
                            plan.popular ? "text-primary-foreground" : "text-primary"
                          )} />
                        </motion.span>
                        <span className="text-foreground/80">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link to="/signup" className="block">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
                    </motion.div>
                  </Link>
                </motion.div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>

        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs md:text-sm text-muted-foreground">
            🔒 Paiement sécurisé • Annulation à tout moment • Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  );
}
