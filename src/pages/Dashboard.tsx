import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { SphereCard } from '@/components/dashboard/SphereCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSpheres } from '@/hooks/useSpheres';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { Search, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PageTransition } from '@/components/animations/PageTransition';
import { SlideIn } from '@/components/animations/SlideIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: spheres, isLoading: spheresLoading } = useSpheres();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [newSphereOpen, setNewSphereOpen] = useState(false);
  const [newSphereName, setNewSphereName] = useState('');
  const [newSphereIcon, setNewSphereIcon] = useState('📁');
  const [newSphereColor, setNewSphereColor] = useState('#3B82F6');

  const filteredSpheres = spheres?.filter(sphere =>
    sphere.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const storageUsed = profile?.storage_used_bytes || 0;
  const storageLimit = profile?.storage_limit_bytes || 500 * 1024 * 1024;

  const createSphereMutation = useMutation({
    mutationFn: async () => {
      if (!user || !newSphereName.trim()) throw new Error('Nom requis');
      const position = (spheres?.length || 0) + 1;
      const { error } = await supabase.from('spheres').insert({
        user_id: user.id,
        name: newSphereName.trim(),
        icon: newSphereIcon,
        color: newSphereColor,
        position,
        is_system: false,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spheres'] });
      setNewSphereOpen(false);
      setNewSphereName('');
      setNewSphereIcon('📁');
      toast({ title: 'Sphère créée ✅' });
    },
    onError: () => {
      toast({ title: 'Erreur', description: 'Impossible de créer la sphère', variant: 'destructive' });
    },
  });

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

  const iconOptions = ['📁', '🏠', '💼', '🎓', '🏥', '🚗', '💰', '⚖️', '🎮', '📸', '🌍', '🎵'];

  return (
    <PageTransition direction="right">
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />

      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        {/* Mobile Header */}
        <motion.div
          className="md:hidden flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔐</span>
            <span className="text-gradient font-bold text-lg">DocuSphere</span>
          </div>
        </motion.div>

        {/* Header */}
        <SlideIn direction="down" delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Bonjour, {profile?.full_name || 'Utilisateur'} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Gérez vos documents en toute sécurité
            </p>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>

            {/* Create sphere dialog */}
            <Dialog open={newSphereOpen} onOpenChange={setNewSphereOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-hero text-primary-foreground shrink-0" size="sm">
                  <Plus className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Nouvelle sphère</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle sphère</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); createSphereMutation.mutate(); }} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Nom *</label>
                    <Input value={newSphereName} onChange={e => setNewSphereName(e.target.value)} placeholder="Ex: Voyages, Animaux..." required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Icône</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {iconOptions.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setNewSphereIcon(icon)}
                          className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                            newSphereIcon === icon ? 'bg-primary/20 ring-2 ring-primary' : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Couleur</label>
                    <div className="flex gap-2 mt-1">
                      {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#14B8A6'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setNewSphereColor(c)}
                          className={`w-8 h-8 rounded-full transition-all ${newSphereColor === c ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full gradient-hero text-primary-foreground" disabled={createSphereMutation.isPending}>
                    {createSphereMutation.isPending ? 'Création...' : 'Créer la sphère'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        </SlideIn>

        {/* Alerts */}
        {alerts.length > 0 && (
          <StaggerContainer className="space-y-3 mb-6 md:mb-8" initialDelay={0.2}>
            {alerts.map((alert, index) => (
              <StaggerItem key={index}>
                <AlertCard {...alert} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Spheres Grid */}
        <SlideIn direction="up" delay={0.3}>
        <div>
          <h2 className="text-lg font-semibold mb-4">Vos sphères</h2>

          {spheresLoading || profileLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 md:h-32 bg-muted animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : filteredSpheres.length > 0 ? (
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" staggerDelay={0.06}>
              {filteredSpheres.map((sphere) => (
                <StaggerItem key={sphere.id}>
                  <SphereCard
                    id={sphere.id}
                    name={sphere.name}
                    icon={sphere.icon || '📁'}
                    color={sphere.color || '#3B82F6'}
                    totalTemplates={sphere.totalTemplates}
                    filledTemplates={sphere.filledTemplates}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <motion.div
              className="text-center py-12 text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-4xl mb-4">📭</p>
              <p>Aucune sphère trouvée</p>
            </motion.div>
          )}
        </div>
        </SlideIn>
      </main>

      <MobileBottomNav />
    </div>
    </PageTransition>
  );
}
