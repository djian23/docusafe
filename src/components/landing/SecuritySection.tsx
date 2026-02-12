import { Shield, Globe, Key, Timer, Server, Lock } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";

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
      
      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium mb-6 border border-sidebar-border">
              <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Sécurité de niveau bancaire</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              La sécurité n'est pas une option,
              <br />
              c'est notre <span className="text-primary">fondation</span>
            </h2>
            <p className="text-sidebar-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
              Chez DocuSphere, chaque fonctionnalité est conçue avec la sécurité comme priorité.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {securityFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-sidebar-accent/30 rounded-2xl p-4 md:p-6 border border-sidebar-border hover:border-primary/30 transition-all duration-300 backdrop-blur-sm h-full"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-1 md:mb-2 text-sidebar-foreground text-sm md:text-base">{feature.title}</h3>
                <p className="text-xs md:text-sm text-sidebar-foreground/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-sidebar-border">
            <div className="flex flex-wrap justify-center gap-4 md:gap-12">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3 text-sidebar-foreground/70">
                  <span className="text-xl md:text-2xl" aria-hidden="true">{cert.icon}</span>
                  <span className="font-medium text-xs md:text-base">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <div className="mt-12 md:mt-16 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
                <Server className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-success flex items-center justify-center shadow-lg">
                <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-success-foreground" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
