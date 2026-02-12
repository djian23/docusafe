import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfiniteCarouselProps {
  items: ReactNode[];
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

export function InfiniteCarousel({ items, speed = 30, className = '', direction = 'left' }: InfiniteCarouselProps) {
  const duplicated = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-6"
        animate={{ x: direction === 'left' ? [0, -50 * items.length] : [-50 * items.length, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {duplicated.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
