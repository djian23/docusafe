import { Link } from "react-router-dom";
import { Shield, Heart } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Fonctionnalités", href: "#features" },
      { label: "Tarifs", href: "#pricing" },
      { label: "Sécurité", href: "#security" },
      { label: "S'inscrire", href: "/signup", isRoute: true },
    ],
    legal: [
      { label: "Conditions d'utilisation", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Mentions légales", href: "#" },
      { label: "RGPD", href: "#" },
    ],
    contact: [
      { label: "support@docusphere.app", href: "mailto:support@docusphere.app" },
      { label: "Centre d'aide", href: "#" },
      { label: "Status", href: "#" },
    ],
  };

  return (
    <footer className="py-16 border-t border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl mb-5 group">
              <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-gradient font-semibold">DocuSphere</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre coffre-fort numérique intelligent pour organiser, sécuriser et retrouver tous vos documents importants.
            </p>
          </div>
          
          {/* Product links */}
          <div>
            <h4 className="font-semibold mb-5">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h4 className="font-semibold mb-5">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocuSphere. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-lg">🇫🇷</span>
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              <span>en France</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🇪🇺</span>
              <span>Hébergé en Europe</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
