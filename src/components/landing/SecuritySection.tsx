export function SecuritySection() {
  const securityFeatures = [
    {
      icon: "🔐",
      title: "Chiffrement AES-256-GCM",
      description: "Le même standard utilisé par les banques et les gouvernements.",
    },
    {
      icon: "🇪🇺",
      title: "Hébergé en Europe",
      description: "Vos données restent sur des serveurs européens, conformes au RGPD.",
    },
    {
      icon: "🔑",
      title: "Zero-Knowledge",
      description: "Vos mots de passe sont chiffrés localement. Même nous n'y avons pas accès.",
    },
    {
      icon: "⏱️",
      title: "URLs temporaires",
      description: "Les liens de téléchargement expirent après 5 minutes.",
    },
  ];

  return (
    <section id="security" className="py-20 bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium mb-6">
            <span>🛡️</span>
            <span>Sécurité de niveau bancaire</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            La sécurité n'est pas une option,
            <br />
            c'est notre <span className="text-primary">fondation</span>
          </h2>
          <p className="text-sidebar-foreground/70 max-w-2xl mx-auto">
            Chez DocuSafe, nous avons conçu chaque fonctionnalité avec la sécurité comme priorité absolue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-sidebar-accent/50 rounded-xl p-6 border border-sidebar-border hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-sidebar-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-sidebar-foreground/60">
            <span className="flex items-center gap-2">
              <span>✓</span> SOC 2 Type II
            </span>
            <span className="flex items-center gap-2">
              <span>✓</span> ISO 27001
            </span>
            <span className="flex items-center gap-2">
              <span>✓</span> RGPD Compliant
            </span>
            <span className="flex items-center gap-2">
              <span>✓</span> Audits de sécurité réguliers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
