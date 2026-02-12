import { Shield, Bot, KeyRound, Zap, Cloud, Search } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { Tilt3DCard } from "@/components/animations/Tilt3DCard";
import { TextReveal3D } from "@/components/animations/TextReveal3D";
import { Suspense, lazy } from "react";

const GlowingOrb3D = lazy(() => import('@/components/animations/GlowingOrb3D').then(m => ({ default: m.GlowingOrb3D })));

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Sécurité maximale",
      description: "Chiffrement AES-256 de bout en bout. Vos données sont protégées par les standards bancaires.",
      highlights: ["Chiffrement AES-256", "Hébergé en Europe", "RGPD compliant"],
      gradient: "from-primary to-blue-400",
      orbColor: "#3B82F6",
    },
    {
      icon: Bot,
      title: "Assistant IA",
      description: "Retrouvez n'importe quel document en quelques secondes grâce au langage naturel.",
      highlights: ["Recherche intelligente", "Langage naturel", "Accès instantané"],
      gradient: "from-sphere-family to-purple-400",
      orbColor: "#8B5CF6",
    },
    {
      icon: KeyRound,
      title: "Gestionnaire de mots de passe",
      description: "Stockez et générez des mots de passe ultra-sécurisés avec chiffrement local.",
      highlights: ["Générateur intégré", "Chiffrement local", "Score de sécurité"],
      gradient: "from-sphere-housing to-emerald-400",
      orbColor: "#10B981",
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

      {/* Subtle background floating particles */}
      <motion.div
        className="absolute top-20 right-10 w-3 h-3 rounded-full bg-primary/30"
        animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-2 h-2 rounded-full bg-sphere-family/30"
        animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-sphere-housing/20"
        animate={{ y: [0, -40, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4">
        <TextReveal3D>
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4"
              whileHover={{ scale: 1.1, rotateZ: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Fonctionnalités
            </motion.span>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              Tout ce dont vous avez besoin,
              <br />
              <span className="text-gradient">en un seul endroit</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              DocuSphere combine gestion documentaire, sécurité avancée et intelligence artificielle.
            </p>
          </div>
        </TextReveal3D>

        {/* Main features with 3D tilt cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <Tilt3DCard intensity={12} scale={1.03}>
                <div className="group relative bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />

                  {/* 3D rotating icon */}
                  <motion.div
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 md:mb-6 shadow-soft`}
                    whileHover={{ rotateY: 180, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" aria-hidden="true" />
                  </motion.div>

                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 relative">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4 md:mb-6 relative leading-relaxed text-sm md:text-base">{feature.description}</p>

                  <ul className="space-y-2 md:space-y-2.5 relative" role="list">
                    {feature.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <motion.span
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                          aria-hidden="true"
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <span className="text-primary-foreground text-xs">✓</span>
                        </motion.span>
                        <span className="text-foreground/80">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Subtle 3D orb in corner */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-20 pointer-events-none">
                    <Suspense fallback={null}>
                      <GlowingOrb3D color={feature.orbColor} size="sm" />
                    </Suspense>
                  </div>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional features row with 3D hover */}
        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-3xl mx-auto">
          {additionalFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="text-center group">
                <motion.div
                  whileHover={{ scale: 1.2, rotateY: 180, rotateZ: 10 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  style={{ perspective: 600, transformStyle: 'preserve-3d' }}
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
