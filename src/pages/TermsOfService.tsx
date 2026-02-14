import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Conditions Générales d'Utilisation" lastUpdated="14 février 2026">
      <section>
        <h2 className="text-xl font-semibold mb-3">1. Objet</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme Koffr,
          un service de coffre-fort numérique intelligent édité par Koffr SAS. En créant un compte, vous acceptez sans réserve
          l'intégralité des présentes conditions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">2. Description du service</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">Koffr propose les services suivants :</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Stockage sécurisé de documents avec chiffrement AES-256</li>
          <li>Gestionnaire de mots de passe chiffré de bout en bout</li>
          <li>Classification intelligente par IA des documents</li>
          <li>Organisation par Sphères thématiques (famille, santé, logement, etc.)</li>
          <li>Recherche avancée et assistant IA</li>
          <li>Partage sécurisé de documents</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">3. Inscription et compte</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>L'utilisateur doit être âgé d'au moins 16 ans pour créer un compte</li>
          <li>Les informations fournies doivent être exactes et à jour</li>
          <li>Chaque personne ne peut détenir qu'un seul compte</li>
          <li>L'utilisateur est responsable de la confidentialité de ses identifiants</li>
          <li>Toute activité sur le compte est réputée effectuée par le titulaire</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">4. Formules et tarification</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Gratuit</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>500 Mo de stockage</li>
              <li>3 Sphères maximum</li>
              <li>10 mots de passe</li>
              <li>Support par e-mail</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Premium - 9,99 EUR/mois</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>50 Go de stockage</li>
              <li>Sphères illimitées</li>
              <li>Mots de passe illimités</li>
              <li>Assistant IA avancé</li>
              <li>Support prioritaire</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Famille - 14,99 EUR/mois</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>200 Go de stockage partagé</li>
              <li>Jusqu'à 6 membres</li>
              <li>Toutes les fonctionnalités Premium</li>
              <li>Coffre-fort familial partagé</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">5. Obligations de l'utilisateur</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">L'utilisateur s'engage à :</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Ne pas utiliser le service à des fins illégales</li>
          <li>Ne pas stocker de contenus illicites (contrefaçons, contenus pédopornographiques, etc.)</li>
          <li>Ne pas tenter de contourner les mesures de sécurité</li>
          <li>Ne pas partager ses identifiants avec des tiers</li>
          <li>Respecter les droits de propriété intellectuelle de Koffr et des tiers</li>
          <li>Signaler toute faille de sécurité découverte</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">6. Propriété intellectuelle</h2>
        <p className="text-muted-foreground leading-relaxed">
          La plateforme Koffr, son interface, son code source, ses algorithmes et son contenu éditorial
          sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle,
          est interdite sans autorisation préalable. Les documents stockés par l'utilisateur restent sa propriété exclusive.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">7. Disponibilité du service</h2>
        <p className="text-muted-foreground leading-relaxed">
          Koffr s'efforce d'assurer une disponibilité de 99,9% du service. Des interruptions planifiées
          pour maintenance seront communiquées 48h à l'avance. Koffr ne saurait être tenu responsable
          des interruptions dues à des cas de force majeure, des pannes de réseau ou des attaques informatiques.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">8. Résiliation</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>L'utilisateur peut supprimer son compte à tout moment depuis les paramètres</li>
          <li>Les données seront définitivement supprimées 30 jours après la demande</li>
          <li>L'export des données est possible avant la suppression (droit à la portabilité)</li>
          <li>Koffr peut suspendre un compte en cas de violation des CGU</li>
          <li>Les abonnements en cours seront remboursés au prorata</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">9. Limitation de responsabilité</h2>
        <p className="text-muted-foreground leading-relaxed">
          Koffr ne saurait être tenu responsable des dommages indirects résultant de l'utilisation du service.
          La responsabilité totale de Koffr est limitée au montant des sommes versées par l'utilisateur
          au cours des 12 derniers mois. Koffr ne peut garantir la récupération des données
          en cas de perte du mot de passe maître (architecture zero-knowledge).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">10. Droit applicable et juridiction</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de résolution amiable,
          les tribunaux de Paris seront seuls compétents. L'utilisateur peut également recourir à un médiateur de la consommation
          conformément aux articles L.611-1 et suivants du Code de la consommation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pour toute question relative aux présentes conditions :<br />
          <strong className="text-foreground">Koffr SAS</strong><br />
          E-mail : <a href="mailto:contact@koffr.app" className="text-primary hover:underline">contact@koffr.app</a>
        </p>
      </section>
    </LegalPageLayout>
  );
}
