import { useMemo } from 'react';
import { motion } from 'framer-motion';

const HEART_CHARS = ['❤', '♥', '❤', '♡', '❤'];

export default function FallingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      char: HEART_CHARS[i % HEART_CHARS.length],
      left: `${3 + (i * 3.5) % 94}%`,
      size: 10 + (i % 5) * 4,
      duration: 7 + (i % 7) * 1.5,
      delay: (i * 0.38) % 7,
      drift: (i % 3 === 0 ? 1 : -1) * (8 + (i % 4) * 6),
      opacity: 0.3 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{
            left: h.left,
            top: '-5%',
            fontSize: h.size,
            color: h.id % 3 === 0 ? '#E63946' : '#FF8FA3',
            opacity: 0,
          }}
          animate={{
            top: ['−5%', '108%'],
            x: [0, h.drift, -h.drift * 0.5, h.drift * 0.3],
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: [0, h.drift * 0.8, -h.drift * 0.4, h.drift * 0.2],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1],
          }}
        >
          {h.char}
        </motion.span>
      ))}
    </div>
  );
}
