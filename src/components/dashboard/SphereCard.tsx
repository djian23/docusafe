import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SphereCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalTemplates: number;
  filledTemplates: number;
}

export function SphereCard({ 
  id, 
  name, 
  icon, 
  color, 
  totalTemplates, 
  filledTemplates 
}: SphereCardProps) {
  const completionPercentage = totalTemplates > 0 
    ? (filledTemplates / totalTemplates) * 100 
    : 0;

  return (
    <Link to={`/dashboard/sphere/${id}`}>
      <Card className="group hover:shadow-soft hover:border-primary/50 transition-all duration-200 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${color}20` }}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate mb-1">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {filledTemplates} / {totalTemplates} documents
              </p>
              <Progress 
                value={completionPercentage} 
                className="h-1.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
