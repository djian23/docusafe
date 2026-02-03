export function FeaturesSection() {
  const features = [
    {
      icon: "🔒",
      title: "Sécurité maximale",
      description: "Chiffrement AES-256 de bout en bout. Vos données sont protégées par les standards bancaires. Conforme RGPD.",
      highlights: ["Chiffrement AES-256", "Hébergé en Europe", "RGPD compliant"],
    },
    {
      icon: "🤖",
      title: "Assistant IA",
      description: "Retrouvez n'importe quel document en quelques secondes. Demandez simplement \"Donne-moi mon RIB\" à l'assistant.",
      highlights: ["Recherche intelligente", "Langage naturel", "Accès instantané"],
    },
    {
      icon: "🔑",
      title: "Gestionnaire de mots de passe",
      description: "Stockez et générez des mots de passe ultra-sécurisés. Chiffrement client-side, même nous n'y avons pas accès.",
      highlights: ["Générateur intégré", "Chiffrement local", "Score de sécurité"],
    },
  ];

  return (
    <section id="features" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin,
            <br />
            <span className="text-gradient">en un seul endroit</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            DocuSafe combine gestion documentaire, sécurité avancée et intelligence artificielle 
            pour vous offrir la meilleure expérience de coffre-fort numérique.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-background rounded-xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
