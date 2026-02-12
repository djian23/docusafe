import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextReveal3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal3D({ children, className = '', delay = 0 }: TextReveal3DProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotateX: 90, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export function WordByWordReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ perspective: 800 }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, rotateY: 90, y: 20 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            type: 'spring',
            stiffness: 150,
            damping: 12,
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function CharacterReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split('');

  return (
    <span className={className} style={{ perspective: 1000 }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
