import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const directionMap = {
  left: { initial: { x: -60, opacity: 0 }, exit: { x: 60, opacity: 0 } },
  right: { initial: { x: 60, opacity: 0 }, exit: { x: -60, opacity: 0 } },
  up: { initial: { y: 30, opacity: 0 }, exit: { y: -30, opacity: 0 } },
  down: { initial: { y: -30, opacity: 0 }, exit: { y: 30, opacity: 0 } },
};

export function PageTransition({ children, className = '', direction = 'up' }: PageTransitionProps) {
  const { initial, exit } = directionMap[direction];

  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={exit}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
        mass: 0.8,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
