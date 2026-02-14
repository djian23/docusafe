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
        whileHover={{ scale: 1.04, y: -6, rotateY: 5, rotateX: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      >
        <Card className="group hover:shadow-card-hover hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative">
          {/* Animated gradient border on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[inherit]"
            style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
          />
          <CardContent className="p-4 md:p-6 relative">
            <div className="flex items-start gap-3 md:gap-4">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shrink-0"
                style={{ backgroundColor: `${color}20` }}
                whileHover={{ scale: 1.2, rotate: 15, rotateY: 180 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
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
                <div className="relative">
                  <Progress
                    value={completionPercentage}
                    className="h-1 md:h-1.5"
                  />
                  {/* Glow effect on progress */}
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${completionPercentage}%`,
                      background: `linear-gradient(90deg, ${color}40, ${color}80)`,
                      filter: 'blur(4px)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
