import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-2xl">🔐</span>
              <span className="text-gradient">DocuSafe</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre coffre-fort numérique intelligent pour organiser, sécuriser et retrouver 
              tous vos documents importants.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Tarifs</a></li>
              <li><a href="#security" className="hover:text-foreground transition-colors">Sécurité</a></li>
              <li><Link to="/signup" className="hover:text-foreground transition-colors">S'inscrire</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">RGPD</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:support@docusafe.app" className="hover:text-foreground transition-colors">support@docusafe.app</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocuSafe. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>🇫🇷</span>
              <span>Fait avec ❤️ en France</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🇪🇺</span>
              <span>Hébergé en Europe</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
