import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/animations/PageTransition";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { motion } from "framer-motion";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
        {/* Header */}
        <header className="border-b border-border/50 glass sticky top-0 z-50">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg group">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden">
                <LogoIcon size={32} />
              </div>
              <span className="text-gradient font-semibold">DocuSphere</span>
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
