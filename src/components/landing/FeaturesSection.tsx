import { Shield, Bot, KeyRound, Zap, Cloud, Search } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Sécurité maximale",
      description: "Chiffrement AES-256 de bout en bout. Vos données sont protégées par les standards bancaires.",
      highlights: ["Chiffrement AES-256", "Hébergé en Europe", "RGPD compliant"],
      gradient: "from-primary to-blue-400",
    },
    {
      icon: Bot,
      title: "Assistant IA",
      description: "Retrouvez n'importe quel document en quelques secondes grâce au langage naturel.",
      highlights: ["Recherche intelligente", "Langage naturel", "Accès instantané"],
      gradient: "from-sphere-family to-purple-400",
    },
    {
      icon: KeyRound,
      title: "Gestionnaire de mots de passe",
      description: "Stockez et générez des mots de passe ultra-sécurisés avec chiffrement local.",
      highlights: ["Générateur intégré", "Chiffrement local", "Score de sécurité"],
      gradient: "from-sphere-housing to-emerald-400",
    },
  ];

  const additionalFeatures = [
    { icon: Zap, title: "Ultra rapide", description: "Accès instantané à tous vos documents" },
    { icon: Cloud, title: "Synchronisé", description: "Disponible sur tous vos appareils" },
    { icon: Search, title: "Recherche puissante", description: "Trouvez n'importe quoi en secondes" },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Fonctionnalités
            </span>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              Tout ce dont vous avez besoin,
              <br />
              <span className="text-gradient">en un seul endroit</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              DocuSphere combine gestion documentaire, sécurité avancée et intelligence artificielle.
            </p>
          </div>
        </ScrollReveal>

        {/* Main features */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                
                <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 md:mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" aria-hidden="true" />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 relative">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 md:mb-6 relative leading-relaxed text-sm md:text-base">{feature.description}</p>
                
                <ul className="space-y-2 md:space-y-2.5 relative" role="list">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`} aria-hidden="true">
                        <span className="text-primary-foreground text-xs">✓</span>
                      </span>
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional features row */}
        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-3xl mx-auto">
          {additionalFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="text-center group">
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-2 md:mb-3"
                >
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" aria-hidden="true" />
                </motion.div>
                <h4 className="font-medium text-xs md:text-base mb-1">{feature.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground hidden md:block">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
