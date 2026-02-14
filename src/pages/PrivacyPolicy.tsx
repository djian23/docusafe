import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Politique de confidentialité" lastUpdated="14 février 2026">
      <section>
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          DocuSphere (ci-après "nous", "notre" ou "la Plateforme") s'engage à protéger la vie privée de ses utilisateurs.
          Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données personnelles
          conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">2. Données collectées</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">Nous collectons les données suivantes :</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Données d'inscription :</strong> adresse e-mail, mot de passe (hashé avec bcrypt)</li>
          <li><strong className="text-foreground">Données de profil :</strong> nom, prénom, photo de profil (optionnel)</li>
          <li><strong className="text-foreground">Documents :</strong> fichiers que vous choisissez de stocker, chiffrés en AES-256</li>
          <li><strong className="text-foreground">Mots de passe :</strong> identifiants stockés dans le gestionnaire, chiffrés de bout en bout</li>
          <li><strong className="text-foreground">Données d'utilisation :</strong> logs de connexion, pages visitées, actions effectuées</li>
          <li><strong className="text-foreground">Données techniques :</strong> adresse IP, type de navigateur, système d'exploitation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">3. Finalités du traitement</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Fournir et améliorer nos services de coffre-fort numérique</li>
          <li>Gérer votre compte et authentification</li>
          <li>Assurer la sécurité de la plateforme et détecter les activités frauduleuses</li>
          <li>Vous envoyer des notifications de sécurité (connexions suspectes, etc.)</li>
          <li>Respecter nos obligations légales</li>
          <li>Alimenter notre assistant IA pour la classification de documents (traitement local uniquement)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">4. Base légale du traitement</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Exécution du contrat :</strong> traitement nécessaire pour fournir nos services</li>
          <li><strong className="text-foreground">Consentement :</strong> pour les communications marketing et cookies non essentiels</li>
          <li><strong className="text-foreground">Intérêt légitime :</strong> pour la sécurité et l'amélioration de nos services</li>
          <li><strong className="text-foreground">Obligation légale :</strong> pour la conformité fiscale et réglementaire</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">5. Stockage et sécurité</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Vos données sont stockées sur des serveurs sécurisés situés exclusivement en Union Européenne.
          Nous utilisons les mesures de sécurité suivantes :
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Chiffrement AES-256 pour tous les documents et mots de passe</li>
          <li>Architecture zero-knowledge : nous ne pouvons pas lire vos données chiffrées</li>
          <li>Connexions HTTPS/TLS 1.3 obligatoires</li>
          <li>Authentification à deux facteurs disponible</li>
          <li>Sauvegardes chiffrées quotidiennes avec redondance géographique</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">6. Durée de conservation</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Données de compte :</strong> conservées pendant la durée de votre abonnement + 30 jours après suppression</li>
          <li><strong className="text-foreground">Documents :</strong> conservés tant que votre compte est actif</li>
          <li><strong className="text-foreground">Logs de sécurité :</strong> 12 mois</li>
          <li><strong className="text-foreground">Données de facturation :</strong> 10 ans (obligation légale)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">7. Partage des données</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nous ne vendons jamais vos données. Nous partageons vos données uniquement avec :
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Supabase :</strong> hébergement et base de données (serveurs EU)</li>
          <li><strong className="text-foreground">Stripe :</strong> traitement des paiements (certifié PCI DSS)</li>
          <li><strong className="text-foreground">Autorités :</strong> uniquement sur demande judiciaire valide</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">8. Vos droits</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données</li>
          <li><strong className="text-foreground">Droit de rectification :</strong> corriger vos données inexactes</li>
          <li><strong className="text-foreground">Droit à l'effacement :</strong> demander la suppression de vos données</li>
          <li><strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
          <li><strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
          <li><strong className="text-foreground">Droit à la limitation :</strong> restreindre le traitement de vos données</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@docusphere.app" className="text-primary hover:underline">privacy@docusphere.app</a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">9. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous utilisons uniquement des cookies essentiels au fonctionnement du service (session d'authentification).
          Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
          Pour plus de détails, consultez notre bannière de cookies lors de votre première visite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pour toute question concernant cette politique de confidentialité :<br />
          <strong className="text-foreground">DocuSphere SAS</strong><br />
          E-mail : <a href="mailto:privacy@docusphere.app" className="text-primary hover:underline">privacy@docusphere.app</a><br />
          Délégué à la protection des données (DPO) : <a href="mailto:dpo@docusphere.app" className="text-primary hover:underline">dpo@docusphere.app</a><br />
          Vous pouvez également adresser une réclamation à la <strong className="text-foreground">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés).
        </p>
      </section>
    </LegalPageLayout>
  );
}
