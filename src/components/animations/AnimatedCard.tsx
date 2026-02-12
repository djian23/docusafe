import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
  hoverY?: number;
}

export function AnimatedCard({ children, className = '', delay = 0, hoverScale = 1.02, hoverY = -4 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 280,
        damping: 22,
      }}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
