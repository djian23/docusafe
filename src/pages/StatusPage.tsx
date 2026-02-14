import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function StatusPage() {
  const services = [
    { name: "Application web", status: "operational", uptime: "99,98%" },
    { name: "API & Authentification", status: "operational", uptime: "99,99%" },
    { name: "Stockage de fichiers", status: "operational", uptime: "99,97%" },
    { name: "Chiffrement & Sécurité", status: "operational", uptime: "100%" },
    { name: "Assistant IA", status: "operational", uptime: "99,95%" },
    { name: "Gestionnaire de mots de passe", status: "operational", uptime: "99,99%" },
  ];

  const statusConfig = {
    operational: { label: "Opérationnel", color: "text-green-500", bg: "bg-green-500/10", icon: CheckCircle },
    degraded: { label: "Dégradé", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: AlertTriangle },
    maintenance: { label: "Maintenance", color: "text-blue-500", bg: "bg-blue-500/10", icon: Clock },
  };

  const incidents = [
    {
      date: "10 février 2026",
      title: "Maintenance planifiée - Mise à jour infrastructure",
      description: "Mise à jour des serveurs de base de données pour améliorer les performances. Interruption de 15 minutes entre 3h et 4h du matin (heure de Paris).",
      status: "resolved" as const,
    },
    {
      date: "28 janvier 2026",
      title: "Latence accrue sur l'upload de fichiers",
      description: "Temps de chargement plus longs que d'habitude pour l'upload de fichiers volumineux. Résolu après optimisation du CDN.",
      status: "resolved" as const,
    },
  ];

  return (
    <LegalPageLayout title="Status des services" lastUpdated="14 février 2026">
      {/* Global status */}
      <section>
        <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-4">
          <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-green-500">Tous les systèmes sont opérationnels</h2>
            <p className="text-sm text-muted-foreground mt-1">Dernière vérification il y a 2 minutes</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <div className="space-y-2">
          {services.map((service, i) => {
            const config = statusConfig[service.status as keyof typeof statusConfig];
            const Icon = config.icon;
            return (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <span className="font-medium text-sm">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground hidden sm:block">Uptime : {service.uptime}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Uptime */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Disponibilité (30 derniers jours)</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <p className="text-2xl font-bold text-green-500">99,98%</p>
            <p className="text-xs text-muted-foreground mt-1">Uptime global</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <p className="text-2xl font-bold text-foreground">45ms</p>
            <p className="text-xs text-muted-foreground mt-1">Latence moyenne</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">Incidents majeurs</p>
          </div>
        </div>
      </section>

      {/* Incidents */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Historique des incidents</h2>
        <div className="space-y-4">
          {incidents.map((incident, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{incident.title}</h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
                  Résolu
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
              <p className="text-xs text-muted-foreground">{incident.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Notifications</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pour être informé en temps réel des incidents et maintenances, suivez-nous sur nos canaux de communication
          ou contactez <a href="mailto:support@koffr.app" className="text-primary hover:underline">support@koffr.app</a> pour
          vous inscrire aux alertes par e-mail.
        </p>
      </section>
    </LegalPageLayout>
  );
}
