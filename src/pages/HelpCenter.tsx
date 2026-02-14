import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { useState } from "react";
import { ChevronDown, Shield, Upload, Key, Search, Settings, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
      >
        <span className="font-medium text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpCenter() {
  const categories = [
    {
      icon: Shield,
      title: "Sécurité",
      faqs: [
        { question: "Comment mes données sont-elles protégées ?", answer: "Toutes vos données sont chiffrées avec l'algorithme AES-256, le même standard utilisé par les banques et les gouvernements. Notre architecture zero-knowledge signifie que même notre équipe ne peut pas lire vos documents." },
        { question: "Qu'est-ce que le chiffrement zero-knowledge ?", answer: "Le chiffrement zero-knowledge signifie que vos données sont chiffrées sur votre appareil avant d'être envoyées à nos serveurs. Seul vous possédez la clé de déchiffrement. Si vous perdez votre mot de passe maître, nous ne pouvons pas récupérer vos données." },
        { question: "L'authentification à deux facteurs est-elle disponible ?", answer: "Oui, vous pouvez activer la 2FA depuis Paramètres > Sécurité. Nous supportons les applications d'authentification (Google Authenticator, Authy) et les clés de sécurité physiques (YubiKey)." },
      ],
    },
    {
      icon: Upload,
      title: "Documents",
      faqs: [
        { question: "Quels formats de fichiers sont acceptés ?", answer: "Koffr accepte tous les formats courants : PDF, images (JPG, PNG, HEIC), documents Office (DOCX, XLSX), et bien d'autres. La taille maximale par fichier est de 50 Mo pour le plan gratuit et 500 Mo pour Premium." },
        { question: "Comment fonctionne la classification IA ?", answer: "Notre IA analyse le contenu de vos documents pour les classer automatiquement dans la bonne Sphère (santé, logement, finances, etc.). Vous pouvez toujours modifier la classification manuellement." },
        { question: "Puis-je partager un document ?", answer: "Oui, depuis la fiche d'un document, cliquez sur 'Partager' pour générer un lien sécurisé avec une date d'expiration. Vous pouvez définir des permissions (lecture seule, téléchargement) et révoquer l'accès à tout moment." },
      ],
    },
    {
      icon: Key,
      title: "Mots de passe",
      faqs: [
        { question: "Comment fonctionne le gestionnaire de mots de passe ?", answer: "Le gestionnaire stocke vos identifiants de manière chiffrée de bout en bout. Vous pouvez y accéder depuis l'onglet 'Mots de passe' du dashboard. Un générateur de mots de passe forts est intégré." },
        { question: "Mes mots de passe sont-ils synchronisés ?", answer: "Oui, vos mots de passe sont synchronisés de manière sécurisée sur tous vos appareils connectés à votre compte Koffr." },
        { question: "Puis-je importer mes mots de passe depuis un autre gestionnaire ?", answer: "Oui, nous supportons l'import depuis les formats CSV standard, ainsi que les exports de LastPass, 1Password, Bitwarden et Dashlane. Rendez-vous dans Paramètres > Import de données." },
      ],
    },
    {
      icon: Search,
      title: "Recherche et IA",
      faqs: [
        { question: "Comment fonctionne l'assistant IA ?", answer: "L'assistant IA peut répondre à vos questions sur vos documents. Par exemple : 'Quand expire mon assurance ?' ou 'Quel est le montant de mon dernier loyer ?'. Il analyse vos documents localement sans envoyer vos données à des tiers." },
        { question: "La recherche fonctionne-t-elle dans le contenu des PDF ?", answer: "Oui, Koffr effectue une reconnaissance optique de caractères (OCR) sur vos documents scannés et PDFs pour permettre la recherche plein texte dans leur contenu." },
      ],
    },
    {
      icon: Settings,
      title: "Compte et facturation",
      faqs: [
        { question: "Comment changer de formule ?", answer: "Rendez-vous dans Paramètres > Abonnement pour passer à une formule supérieure ou inférieure. Le changement prend effet immédiatement avec un calcul au prorata." },
        { question: "Comment supprimer mon compte ?", answer: "Depuis Paramètres > Compte > Supprimer mon compte. Vos données seront définitivement effacées sous 30 jours. Vous pouvez exporter toutes vos données avant la suppression." },
        { question: "Quels moyens de paiement acceptez-vous ?", answer: "Nous acceptons les cartes Visa, Mastercard et American Express via notre partenaire Stripe. Tous les paiements sont sécurisés et conformes PCI DSS." },
      ],
    },
    {
      icon: Users,
      title: "Formule Famille",
      faqs: [
        { question: "Comment ajouter un membre à ma formule Famille ?", answer: "Depuis Paramètres > Famille > Inviter un membre. Envoyez une invitation par e-mail. Chaque membre dispose de son propre espace privé tout en ayant accès au coffre familial partagé." },
        { question: "Les membres de la famille peuvent-ils voir mes documents ?", answer: "Non, chaque membre a son propre espace privé. Seuls les documents placés dans le Coffre familial partagé sont visibles par tous les membres. Vous gardez le contrôle total sur ce que vous partagez." },
      ],
    },
  ];

  return (
    <LegalPageLayout title="Centre d'aide" lastUpdated="14 février 2026">
      <section>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Retrouvez ici les réponses aux questions les plus fréquentes. Si vous ne trouvez pas la réponse à votre question,
          contactez-nous à <a href="mailto:support@koffr.app" className="text-primary hover:underline">support@koffr.app</a>.
        </p>

        <div className="space-y-8">
          {categories.map((cat, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{cat.title}</h2>
              </div>
              <div className="space-y-2">
                {cat.faqs.map((faq, j) => (
                  <FAQItem key={j} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Vous ne trouvez pas votre réponse ?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Support par e-mail</h3>
            <p className="text-sm text-muted-foreground mb-2">Réponse sous 24h en jours ouvrés.</p>
            <a href="mailto:support@koffr.app" className="text-sm text-primary hover:underline">support@koffr.app</a>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Support prioritaire</h3>
            <p className="text-sm text-muted-foreground mb-2">Disponible pour les abonnés Premium et Famille.</p>
            <p className="text-sm text-muted-foreground">Réponse sous 4h en jours ouvrés.</p>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
