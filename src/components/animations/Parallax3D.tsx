import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Parallax3DProps {
  children: ReactNode;
  speed?: number;
  rotateOnScroll?: boolean;
  className?: string;
}

export function Parallax3D({ children, speed = 0.3, rotateOnScroll = false, className = '' }: Parallax3DProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX: rotateOnScroll ? rotateX : 0,
        scale,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
