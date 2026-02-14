import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/animations/PageTransition";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const PAGE_META: Record<string, { description: string }> = {
  "/privacy": { description: "Politique de confidentialité de Koffr. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles. RGPD compliant, hébergé en Europe." },
  "/terms": { description: "Conditions Générales d'Utilisation de Koffr. Consultez les règles d'accès et d'utilisation de notre coffre-fort numérique intelligent." },
  "/legal": { description: "Mentions légales de Koffr SAS. Informations sur l'éditeur, l'hébergement, la propriété intellectuelle et les données personnelles." },
  "/gdpr": { description: "Conformité RGPD de Koffr. Vos droits (accès, rectification, effacement, portabilité), registre des traitements et contact DPO." },
  "/help": { description: "Centre d'aide Koffr. Trouvez des réponses sur la sécurité, les documents, les mots de passe, l'assistant IA et la facturation." },
  "/status": { description: "Status des services Koffr en temps réel. Disponibilité, latence et historique des incidents de notre infrastructure." },
};

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://koffr.app" },
      { "@type": "ListItem", "position": 2, "name": title, "item": `https://koffr.app${pathname}` },
    ],
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
        <Helmet>
          <title>{title} - Koffr</title>
          {meta && <meta name="description" content={meta.description} />}
          <link rel="canonical" href={`https://koffr.app${pathname}`} />
          <meta property="og:title" content={`${title} - Koffr`} />
          {meta && <meta property="og:description" content={meta.description} />}
          <meta property="og:url" content={`https://koffr.app${pathname}`} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Koffr" />
          <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        </Helmet>
        {/* Header */}
        <header className="border-b border-border/50 glass sticky top-0 z-50">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg group">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden">
                <LogoIcon size={32} />
              </div>
              <span className="text-gradient font-semibold">Koffr</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
            <p className="text-sm text-muted-foreground mb-10">Dernière mise à jour : {lastUpdated}</p>

            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-8">
              {children}
            </div>
          </motion.div>

          {/* Back to top */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
