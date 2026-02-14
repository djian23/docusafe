import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export default function LegalNotice() {
  return (
    <LegalPageLayout title="Mentions légales" lastUpdated="14 février 2026">
      <section>
        <h2 className="text-xl font-semibold mb-3">1. Éditeur du site</h2>
        <div className="text-muted-foreground leading-relaxed space-y-1">
          <p><strong className="text-foreground">Raison sociale :</strong> DocuSphere SAS</p>
          <p><strong className="text-foreground">Forme juridique :</strong> Société par Actions Simplifiée</p>
          <p><strong className="text-foreground">Capital social :</strong> 10 000 EUR</p>
          <p><strong className="text-foreground">Siège social :</strong> 15 Rue de la Paix, 75002 Paris, France</p>
          <p><strong className="text-foreground">RCS :</strong> Paris B 123 456 789</p>
          <p><strong className="text-foreground">SIRET :</strong> 123 456 789 00001</p>
          <p><strong className="text-foreground">N° TVA intracommunautaire :</strong> FR 12 345678900</p>
          <p><strong className="text-foreground">Directeur de publication :</strong> Le Président de DocuSphere SAS</p>
          <p><strong className="text-foreground">E-mail :</strong> <a href="mailto:contact@docusphere.app" className="text-primary hover:underline">contact@docusphere.app</a></p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">2. Hébergement</h2>
        <div className="text-muted-foreground leading-relaxed space-y-1">
          <p><strong className="text-foreground">Hébergeur :</strong> Supabase Inc. (infrastructure EU)</p>
          <p><strong className="text-foreground">Localisation des serveurs :</strong> Union Européenne (Frankfurt, Allemagne)</p>
          <p><strong className="text-foreground">Site web :</strong> supabase.com</p>
          <p className="mt-2">Les données sont hébergées exclusivement sur des serveurs situés dans l'Union Européenne, conformément au RGPD.</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">3. Propriété intellectuelle</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'ensemble du contenu du site DocuSphere (textes, images, logos, icônes, logiciels, base de données)
          est protégé par le droit français et international de la propriété intellectuelle.
          Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle,
          de ces éléments est interdite sans l'autorisation écrite préalable de DocuSphere SAS.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          La marque "DocuSphere" et le logo associé sont des marques déposées.
          Toute utilisation non autorisée constitue une contrefaçon sanctionnée par les articles L.335-2
          et suivants du Code de la propriété intellectuelle.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">4. Données personnelles</h2>
        <p className="text-muted-foreground leading-relaxed">
          Conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés
          (modifiée par la loi n°2018-493 du 20 juin 2018) et au Règlement Européen 2016/679 (RGPD),
          vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Délégué à la protection des données (DPO) : <a href="mailto:dpo@docusphere.app" className="text-primary hover:underline">dpo@docusphere.app</a>
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Pour plus d'informations, consultez notre <a href="/privacy" className="text-primary hover:underline">Politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le site DocuSphere utilise uniquement des cookies strictement nécessaires au fonctionnement du service
          (cookies de session et d'authentification). Aucun cookie publicitaire ou de profilage n'est déposé.
          Ces cookies essentiels ne nécessitent pas de consentement préalable conformément à la directive ePrivacy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">6. Liens hypertextes</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le site DocuSphere peut contenir des liens vers des sites tiers. DocuSphere ne saurait être tenu
          responsable du contenu de ces sites ni des dommages résultant de leur consultation.
          La présence de ces liens ne constitue pas une approbation de leur contenu.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">7. Crédits</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Conception et développement :</strong> DocuSphere SAS</li>
          <li><strong className="text-foreground">Icônes :</strong> Lucide Icons (licence MIT)</li>
          <li><strong className="text-foreground">Typographies :</strong> Inter (licence OFL)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">8. Médiation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, DocuSphere propose un dispositif
          de médiation de la consommation. L'entité de médiation retenue est le Centre de Médiation et d'Arbitrage de Paris (CMAP).
          En cas de litige, le consommateur peut déposer sa réclamation sur le site de la plateforme européenne
          de règlement en ligne des litiges.
        </p>
      </section>
    </LegalPageLayout>
  );
}
