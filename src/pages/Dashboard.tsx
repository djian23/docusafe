import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SphereCard } from '@/components/dashboard/SphereCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSpheres } from '@/hooks/useSpheres';
import { useProfile } from '@/hooks/useProfile';
import { Search, Plus } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: spheres, isLoading: spheresLoading } = useSpheres();
  const { data: profile, isLoading: profileLoading } = useProfile();

  const filteredSpheres = spheres?.filter(sphere =>
    sphere.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const storageUsed = profile?.storage_used_bytes || 0;
  const storageLimit = profile?.storage_limit_bytes || 500 * 1024 * 1024; // 500MB default

  // Calculate alerts
  const alerts = [];
  const incompleteSpheres = spheres?.filter(s => s.filledTemplates < s.totalTemplates) || [];
  if (incompleteSpheres.length > 0) {
    alerts.push({
      type: 'info' as const,
      icon: '📋',
      title: 'Documents manquants',
      description: `${incompleteSpheres.length} sphère(s) ont des documents à compléter`,
    });
  }

  const storagePercentage = storageLimit > 0 ? (storageUsed / storageLimit) * 100 : 0;
  if (storagePercentage > 80) {
    alerts.push({
      type: 'warning' as const,
      icon: '💾',
      title: 'Stockage limité',
      description: 'Passez à un plan supérieur pour plus d\'espace',
    });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar 
        storageUsed={storageUsed} 
        storageLimit={storageLimit} 
      />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Bonjour, {profile?.full_name || 'Utilisateur'} 👋
            </h1>
            <p className="text-muted-foreground">
              Gérez vos documents en toute sécurité
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button className="gradient-hero text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau document
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3 mb-8">
            {alerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
        )}

        {/* Spheres Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Vos sphères</h2>
          
          {spheresLoading || profileLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-32 bg-muted animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : filteredSpheres.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSpheres.map((sphere) => (
                <SphereCard
                  key={sphere.id}
                  id={sphere.id}
                  name={sphere.name}
                  icon={sphere.icon || '📁'}
                  color={sphere.color || '#3B82F6'}
                  totalTemplates={sphere.totalTemplates}
                  filledTemplates={sphere.filledTemplates}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-4xl mb-4">📭</p>
              <p>Aucune sphère trouvée</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
