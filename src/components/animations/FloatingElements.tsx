import { motion } from 'framer-motion';

interface FloatingElementsProps {
  className?: string;
}

export function FloatingElements({ className = '' }: FloatingElementsProps) {
  const shapes = [
    { size: 60, x: '10%', y: '15%', delay: 0, duration: 6, color: 'from-primary/20 to-primary/5' },
    { size: 40, x: '80%', y: '20%', delay: 1, duration: 7, color: 'from-violet-500/20 to-violet-500/5' },
    { size: 80, x: '70%', y: '70%', delay: 2, duration: 8, color: 'from-cyan-500/15 to-cyan-500/5' },
    { size: 50, x: '20%', y: '75%', delay: 0.5, duration: 5, color: 'from-blue-500/20 to-blue-500/5' },
    { size: 35, x: '50%', y: '10%', delay: 1.5, duration: 6.5, color: 'from-indigo-500/15 to-indigo-500/5' },
    { size: 45, x: '90%', y: '50%', delay: 0.8, duration: 7.5, color: 'from-purple-500/20 to-purple-500/5' },
  ];

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} backdrop-blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0.5, 1.2, 0.8, 1.1, 0.5],
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -10, 0],
          }}
          transition={{
            delay: shape.delay,
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}
