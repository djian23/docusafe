import { Card, CardContent } from '@/components/ui/card';

interface AlertCardProps {
  type: 'warning' | 'info' | 'danger';
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AlertCard({ type, icon, title, description, action }: AlertCardProps) {
  const bgColors = {
    warning: 'bg-amber-500/10 border-amber-500/30',
    info: 'bg-primary/10 border-primary/30',
    danger: 'bg-destructive/10 border-destructive/30',
  };

  const textColors = {
    warning: 'text-amber-600',
    info: 'text-primary',
    danger: 'text-destructive',
  };

  return (
    <Card className={`${bgColors[type]} border`}>
      <CardContent className="p-4 flex items-center gap-4">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${textColors[type]}`}>{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className={`text-sm font-medium ${textColors[type]} hover:underline`}
          >
            {action.label}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
