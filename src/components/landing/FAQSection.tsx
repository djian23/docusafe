import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { TextReveal3D } from "@/components/animations/TextReveal3D";

const faqs = [
  {
    question: "Qu'est-ce que Koffr ?",
    answer: "Koffr est un coffre-fort numérique intelligent qui vous permet d'organiser tous vos documents importants (identité, famille, logement, travail, finances, santé...) de manière sécurisée. Il intègre un gestionnaire de mots de passe chiffré et un assistant IA pour retrouver vos fichiers instantanément.",
  },
  {
    question: "Comment Koffr protège-t-il mes données ?",
    answer: "Koffr utilise un chiffrement AES-256-GCM de bout en bout, le même standard que les banques et les gouvernements. Vos mots de passe sont chiffrés localement avec une architecture Zero-Knowledge : même nos équipes n'y ont pas accès. Toutes les données sont hébergées en Europe, en conformité avec le RGPD.",
  },
  {
    question: "Koffr est-il gratuit ?",
    answer: "Oui ! Koffr propose un plan gratuit permanent avec 500 MB de stockage, 11 sphères pré-configurées, un gestionnaire de mots de passe complet et 10 requêtes IA par mois. Aucune carte bancaire n'est requise. Des plans Starter (9€/mois) et Pro (29€/mois) sont disponibles pour plus de stockage et de fonctionnalités.",
  },
  {
    question: "Où sont hébergées mes données ?",
    answer: "Toutes vos données sont hébergées sur des serveurs européens, en conformité totale avec le Règlement Général sur la Protection des Données (RGPD). Koffr est une solution française qui respecte les standards les plus stricts en matière de protection des données personnelles.",
  },
  {
    question: "Comment fonctionne l'assistant IA de Koffr ?",
    answer: "L'assistant IA de Koffr vous permet de retrouver n'importe quel document en langage naturel. Il suffit de taper une requête comme \"Trouve mon RIB\" ou \"Où est mon attestation d'assurance ?\" pour que l'IA identifie et affiche le document en quelques secondes, sans avoir à naviguer dans vos dossiers.",
  },
  {
    question: "Puis-je accéder à mes documents depuis plusieurs appareils ?",
    answer: "Oui, Koffr est accessible depuis n'importe quel appareil (ordinateur, tablette, smartphone) via votre navigateur web. Vos documents sont synchronisés en temps réel et disponibles partout, tout en restant protégés par le chiffrement de bout en bout.",
  },
  {
    question: "Quelle est la différence entre Koffr et un simple cloud comme Google Drive ?",
    answer: "Contrairement à un cloud généraliste, Koffr est spécialement conçu pour organiser vos documents importants par catégories (sphères). Il intègre un gestionnaire de mots de passe chiffré, un assistant IA de recherche, et offre un chiffrement de niveau bancaire. De plus, vos données sont hébergées en Europe et soumises au RGPD, contrairement à de nombreux services américains.",
  },
  {
    question: "Comment annuler mon abonnement Koffr ?",
    answer: "Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte, sans engagement ni frais d'annulation. Si vous passez d'un plan payant au plan gratuit, vous conservez l'accès à vos documents dans la limite du stockage gratuit (500 MB).",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 120 }}
      style={{ perspective: 600 }}
    >
      <motion.button
        className="w-full flex items-center justify-between p-4 md:p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'hsl(var(--accent) / 0.3)' }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-[15%] w-3 h-3 rounded-full bg-primary/20"
        animate={{ y: [0, -20, 0], rotate: [0, 360] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-4 h-4 rounded-full bg-sphere-family/20"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="container mx-auto px-4">
        <TextReveal3D>
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4"
              whileHover={{ scale: 1.1, rotateZ: 3 }}
            >
              FAQ
            </motion.span>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">
              Questions <span className="text-gradient">fréquentes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Tout ce que vous devez savoir sur Koffr.
            </p>
          </div>
        </TextReveal3D>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** JSON-LD FAQ structured data for SEO/GEO */
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};
