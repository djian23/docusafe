import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, User, Mail, Save, LogOut } from 'lucide-react';

export default function Settings() {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState(profile?.full_name || '');

  const storageUsed = profile?.storage_used_bytes || 0;
  const storageLimit = profile?.storage_limit_bytes || 500 * 1024 * 1024;

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('user_id', user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({ title: 'Profil mis à jour' });
    },
    onError: () => {
      toast({ title: 'Erreur', variant: 'destructive' });
    },
  });

  // Sync form when profile loads
  useState(() => {
    if (profile?.full_name && !fullName) setFullName(profile.full_name);
  });

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" /> Paramètres
          </h1>
          <p className="text-muted-foreground">Gérez votre profil et vos préférences</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Profile */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Profil
            </h2>
            <form
              onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(); }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-foreground">Nom complet</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <Input value={user?.email || ''} disabled className="opacity-60" />
                <p className="text-xs text-muted-foreground mt-1">L'email ne peut pas être modifié</p>
              </div>
              <Button type="submit" disabled={updateMutation.isPending} className="gradient-hero text-primary-foreground">
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? 'Enregistrement...' : 'Sauvegarder'}
              </Button>
            </form>
          </div>

          {/* Plan */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Abonnement</h2>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
                {profile?.plan || 'Gratuit'}
              </span>
              <span className="text-sm text-muted-foreground">
                {((storageUsed / (1024 * 1024))).toFixed(1)} Mo / {((storageLimit / (1024 * 1024))).toFixed(0)} Mo utilisés
              </span>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-card rounded-xl p-6 border-destructive/30">
            <h2 className="text-lg font-semibold text-destructive mb-4">Zone dangereuse</h2>
            <Button variant="destructive" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
