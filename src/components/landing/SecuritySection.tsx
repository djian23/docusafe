import { Shield, Globe, Key, Timer, Server, Lock } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { Tilt3DCard } from "@/components/animations/Tilt3DCard";
import { TextReveal3D } from "@/components/animations/TextReveal3D";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Suspense, lazy } from "react";

const Shield3D = lazy(() => import('@/components/animations/Shield3D').then(m => ({ default: m.Shield3D })));
const WaveMesh3D = lazy(() => import('@/components/animations/WaveMesh3D').then(m => ({ default: m.WaveMesh3D })));

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Chiffrement AES-256-GCM",
      description: "Le même standard utilisé par les banques et les gouvernements.",
    },
    {
      icon: Globe,
      title: "Hébergé en Europe",
      description: "Vos données restent sur des serveurs européens, conformes au RGPD.",
    },
    {
      icon: Key,
      title: "Zero-Knowledge",
      description: "Vos mots de passe sont chiffrés localement. Même nous n'y avons pas accès.",
    },
    {
      icon: Timer,
      title: "URLs temporaires",
      description: "Les liens de téléchargement expirent après 5 minutes.",
    },
  ];

  const certifications = [
    { name: "SOC 2 Type II", icon: "🛡️" },
    { name: "ISO 27001", icon: "📋" },
    { name: "RGPD Compliant", icon: "🇪🇺" },
    { name: "Audits réguliers", icon: "🔍" },
  ];

  return (
    <section id="security" className="py-16 md:py-24 bg-sidebar text-sidebar-foreground relative overflow-hidden">
      <div className="absolute top-20 right-10 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-sphere-family/5 rounded-full blur-[80px]" />

      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--sidebar-foreground)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--sidebar-foreground)/0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 3D Wave mesh background */}
      <Suspense fallback={null}>
        <WaveMesh3D className="opacity-30" variant="security" />
      </Suspense>

      <div className="container mx-auto px-4 relative">
        <TextReveal3D>
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium mb-6 border border-sidebar-border"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Sécurité de niveau bancaire</span>
            </motion.div>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              La sécurité n'est pas une option,
              <br />
              c'est notre <span className="text-primary">fondation</span>
            </h2>
            <p className="text-sidebar-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
              Chez DocuSphere, chaque fonctionnalité est conçue avec la sécurité comme priorité.
            </p>
          </div>
        </TextReveal3D>

        {/* Animated security stats */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-10 md:mb-14">
            {[
              { value: 256, suffix: " bits", label: "Chiffrement" },
              { value: 100, suffix: "%", label: "RGPD compliant" },
              { value: 0, suffix: " accès", label: "Zero-Knowledge" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5, rotateX: 45 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 120 }}
                style={{ perspective: 600 }}
              >
                <div className="text-2xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-xs md:text-sm text-sidebar-foreground/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {securityFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Tilt3DCard intensity={10} scale={1.04}>
                <div className="group bg-sidebar-accent/30 rounded-2xl p-4 md:p-6 border border-sidebar-border hover:border-primary/30 transition-all duration-300 backdrop-blur-sm h-full">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4"
                    whileHover={{ rotateY: 360, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                  </motion.div>
                  <h3 className="font-semibold mb-1 md:mb-2 text-sidebar-foreground text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-sidebar-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>

        {/* 3D Shield in center */}
        <ScrollReveal delay={0.2}>
          <Suspense fallback={
            <div className="w-full h-[300px] flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-2xl gradient-hero opacity-30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          }>
            <Shield3D />
          </Suspense>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-sidebar-border">
            <div className="flex flex-wrap justify-center gap-4 md:gap-12">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 md:gap-3 text-sidebar-foreground/70"
                  whileHover={{ scale: 1.1, rotateY: 15, y: -5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  style={{ perspective: 600 }}
                >
                  <span className="text-xl md:text-2xl" aria-hidden="true">{cert.icon}</span>
                  <span className="font-medium text-xs md:text-base">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
