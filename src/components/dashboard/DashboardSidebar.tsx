import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardSidebarProps {
  storageUsed: number;
  storageLimit: number;
}

export function DashboardSidebar({ storageUsed, storageLimit }: DashboardSidebarProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Hide sidebar on mobile - use bottom nav instead
  if (isMobile) return null;

  const storagePercentage = storageLimit > 0 ? (storageUsed / storageLimit) * 100 : 0;
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Mo';
    const mb = bytes / (1024 * 1024);
    if (mb < 1000) return `${mb.toFixed(1)} Mo`;
    return `${(mb / 1024).toFixed(1)} Go`;
  };

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Tableau de bord' },
    { path: '/dashboard/passwords', icon: '🔑', label: 'Mots de passe' },
    { path: '/dashboard/assistant', icon: '🤖', label: 'Assistant IA' },
    { path: '/dashboard/settings', icon: '⚙️', label: 'Paramètres' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">🔐</span>
          <span className="text-gradient">DocuSphere</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
            {user?.email?.charAt(0).toUpperCase() || '👤'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-sidebar-foreground">
              {user?.email?.split('@')[0] || 'Utilisateur'}
            </p>
            <p className="text-xs text-sidebar-foreground/60">Plan Gratuit</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Storage Meter */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="mb-2 flex justify-between text-xs text-sidebar-foreground/70">
          <span>Stockage</span>
          <span>{formatBytes(storageUsed)} / {formatBytes(storageLimit)}</span>
        </div>
        <Progress value={storagePercentage} className="h-2" />
        {storagePercentage > 80 && (
          <p className="text-xs text-warning mt-2">
            ⚠️ Stockage presque plein
          </p>
        )}
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
          onClick={signOut}
        >
          <span className="mr-2">🚪</span>
          Se déconnecter
        </Button>
      </div>
    </aside>
  );
}
