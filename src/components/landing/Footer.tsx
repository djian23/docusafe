import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Fonctionnalités", href: "#features" },
      { label: "Tarifs", href: "#pricing" },
      { label: "Sécurité", href: "#security" },
      { label: "FAQ", href: "#faq" },
      { label: "S'inscrire", href: "/signup", isRoute: true },
    ],
    legal: [
      { label: "Conditions d'utilisation", href: "/terms", isRoute: true },
      { label: "Politique de confidentialité", href: "/privacy", isRoute: true },
      { label: "Mentions légales", href: "/legal", isRoute: true },
      { label: "RGPD", href: "/gdpr", isRoute: true },
    ],
    contact: [
      { label: "support@koffr.app", href: "mailto:support@koffr.app" },
      { label: "Centre d'aide", href: "/help", isRoute: true },
      { label: "Status", href: "/status", isRoute: true },
    ],
  };

  return (
    <footer className="py-16 border-t border-border bg-card/50" role="contentinfo">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2.5 font-bold text-xl mb-5 group">
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-soft overflow-hidden"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <LogoIcon size={36} />
                </motion.div>
                <span className="text-gradient font-semibold">Koffr</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Votre coffre-fort numérique intelligent pour organiser, sécuriser et retrouver tous vos documents importants. Solution française hébergée en Europe.
              </p>
            </div>

            {/* Product links */}
            <nav aria-label="Liens produit">
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
            </nav>

            {/* Legal links */}
            <nav aria-label="Liens légaux">
              <h4 className="font-semibold mb-5">Légal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, i) => (
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
            </nav>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-5">Contact</h4>
              <ul className="space-y-3">
                {footerLinks.contact.map((link, i) => (
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
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Koffr. Tous droits réservés.
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
