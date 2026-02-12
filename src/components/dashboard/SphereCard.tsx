import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

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
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Card className="group hover:shadow-soft hover:border-primary/50 transition-all duration-200 cursor-pointer">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shrink-0"
                style={{ backgroundColor: `${color}20` }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base text-foreground truncate mb-0.5 md:mb-1">
                  {name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                  {filledTemplates} / {totalTemplates} docs
                </p>
                <Progress
                  value={completionPercentage}
                  className="h-1 md:h-1.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
