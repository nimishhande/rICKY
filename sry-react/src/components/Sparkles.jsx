import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Sparkles() {
  const sparkles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + (i * 5.5) % 90}%`,
      top: `${5 + (i * 7.3) % 90}%`,
      size: 3 + (i % 4) * 2,
      duration: 2 + (i % 4) * 0.8,
      delay: (i * 0.4) % 3,
    })),
    []
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle, rgba(255,143,163,0.8) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
