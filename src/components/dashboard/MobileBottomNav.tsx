import { Link, useLocation } from 'react-router-dom';
import { Home, Lock, Bot, Settings } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Accueil' },
  { path: '/dashboard/passwords', icon: Lock, label: 'Mots de passe' },
  { path: '/dashboard/assistant', icon: Bot, label: 'Assistant' },
  { path: '/dashboard/settings', icon: Settings, label: 'Réglages' },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-xl border-t border-sidebar-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-sidebar-foreground/50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
