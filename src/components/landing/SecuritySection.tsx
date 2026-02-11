import { Shield, Globe, Key, Timer, Server, Lock } from "lucide-react";

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
    <section id="security" className="py-24 bg-sidebar text-sidebar-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-sphere-family/5 rounded-full blur-[80px]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--sidebar-foreground)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--sidebar-foreground)/0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium mb-6 border border-sidebar-border">
            <Lock className="w-4 h-4 text-primary" />
            <span>Sécurité de niveau bancaire</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            La sécurité n'est pas une option,
            <br />
            c'est notre <span className="text-primary">fondation</span>
          </h2>
          <p className="text-sidebar-foreground/70 max-w-2xl mx-auto text-lg">
            Chez DocuSphere, nous avons conçu chaque fonctionnalité avec la sécurité comme priorité absolue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group bg-sidebar-accent/30 rounded-2xl p-6 border border-sidebar-border hover:border-primary/30 transition-all duration-300 hover-lift backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sidebar-foreground">{feature.title}</h3>
              <p className="text-sm text-sidebar-foreground/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-12 border-t border-sidebar-border">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3 text-sidebar-foreground/70">
                <span className="text-2xl">{cert.icon}</span>
                <span className="font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Security visual */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
              <Server className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-success-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
