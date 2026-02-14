import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { Shield, Lock, Eye, Trash2, Download, UserCheck } from "lucide-react";

export default function GDPR() {
  const rights = [
    { icon: Eye, title: "Droit d'accès", description: "Vous pouvez demander une copie complète de toutes les données personnelles que nous détenons à votre sujet." },
    { icon: UserCheck, title: "Droit de rectification", description: "Vous pouvez corriger ou mettre à jour vos données personnelles à tout moment depuis votre espace personnel." },
    { icon: Trash2, title: "Droit à l'effacement", description: "Vous pouvez demander la suppression définitive de toutes vos données. L'opération est irréversible." },
    { icon: Download, title: "Droit à la portabilité", description: "Vous pouvez exporter l'intégralité de vos données dans un format structuré et lisible (JSON/CSV)." },
    { icon: Shield, title: "Droit d'opposition", description: "Vous pouvez vous opposer au traitement de vos données pour des motifs légitimes." },
    { icon: Lock, title: "Droit à la limitation", description: "Vous pouvez demander la restriction temporaire du traitement de vos données." },
  ];

  return (
    <LegalPageLayout title="Conformité RGPD" lastUpdated="14 février 2026">
      <section>
        <h2 className="text-xl font-semibold mb-3">Notre engagement</h2>
        <p className="text-muted-foreground leading-relaxed">
          DocuSphere est conçu dès sa conception pour respecter le Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679).
          Nous appliquons les principes de <strong className="text-foreground">Privacy by Design</strong> et <strong className="text-foreground">Privacy by Default</strong>
          dans toutes les fonctionnalités de notre plateforme.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Vos droits</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {rights.map((right, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <right.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{right.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{right.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Comment exercer vos droits</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Option 1 : Depuis votre compte</h3>
            <p className="text-sm text-muted-foreground">
              Rendez-vous dans <strong className="text-foreground">Paramètres &gt; Confidentialité &gt; Mes données</strong> pour
              accéder, exporter ou supprimer vos données en quelques clics.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Option 2 : Par e-mail</h3>
            <p className="text-sm text-muted-foreground">
              Envoyez votre demande à <a href="mailto:dpo@docusphere.app" className="text-primary hover:underline">dpo@docusphere.app</a> avec
              l'objet "Exercice de droits RGPD". Nous traiterons votre demande sous 30 jours maximum.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Registre des traitements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Traitement</th>
                <th className="text-left py-3 px-4 font-semibold">Finalité</th>
                <th className="text-left py-3 px-4 font-semibold">Base légale</th>
                <th className="text-left py-3 px-4 font-semibold">Durée</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Authentification</td>
                <td className="py-3 px-4">Accès au service</td>
                <td className="py-3 px-4">Contrat</td>
                <td className="py-3 px-4">Durée du compte</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Stockage documents</td>
                <td className="py-3 px-4">Service principal</td>
                <td className="py-3 px-4">Contrat</td>
                <td className="py-3 px-4">Durée du compte</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Classification IA</td>
                <td className="py-3 px-4">Organisation auto.</td>
                <td className="py-3 px-4">Consentement</td>
                <td className="py-3 px-4">Temps réel</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Logs sécurité</td>
                <td className="py-3 px-4">Protection</td>
                <td className="py-3 px-4">Intérêt légitime</td>
                <td className="py-3 px-4">12 mois</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Facturation</td>
                <td className="py-3 px-4">Obligation légale</td>
                <td className="py-3 px-4">Légale</td>
                <td className="py-3 px-4">10 ans</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Sous-traitants</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Sous-traitant</th>
                <th className="text-left py-3 px-4 font-semibold">Service</th>
                <th className="text-left py-3 px-4 font-semibold">Localisation</th>
                <th className="text-left py-3 px-4 font-semibold">Garanties</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Supabase</td>
                <td className="py-3 px-4">Base de données & Auth</td>
                <td className="py-3 px-4">EU (Frankfurt)</td>
                <td className="py-3 px-4">SOC 2 Type II</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Stripe</td>
                <td className="py-3 px-4">Paiements</td>
                <td className="py-3 px-4">EU</td>
                <td className="py-3 px-4">PCI DSS Level 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Notification de violation</h2>
        <p className="text-muted-foreground leading-relaxed">
          En cas de violation de données personnelles, DocuSphere s'engage à :
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
          <li>Notifier la <strong className="text-foreground">CNIL</strong> dans les 72 heures suivant la découverte de la violation</li>
          <li>Informer les utilisateurs concernés dans les meilleurs délais si la violation présente un risque élevé</li>
          <li>Documenter l'incident et les mesures correctives dans un registre dédié</li>
          <li>Mettre en place des mesures pour prévenir la récurrence</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Contact DPO</h2>
        <p className="text-muted-foreground leading-relaxed">
          Notre Délégué à la Protection des Données est joignable à tout moment :<br />
          E-mail : <a href="mailto:dpo@docusphere.app" className="text-primary hover:underline">dpo@docusphere.app</a><br /><br />
          Vous pouvez également adresser une réclamation à l'autorité de contrôle compétente :<br />
          <strong className="text-foreground">CNIL</strong> - 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07<br />
          Site web : cnil.fr
        </p>
      </section>
    </LegalPageLayout>
  );
}
