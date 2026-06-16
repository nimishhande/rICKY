import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Heart explosion particles
function HeartExplosion({ onDone }) {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const distance = 80 + Math.random() * 120;
      return {
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        emoji: i % 4 === 0 ? '💖' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🌸' : '❤️',
        size: 14 + Math.random() * 18,
        delay: Math.random() * 0.3,
      };
    }),
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl select-none"
          style={{ fontSize: p.size }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.tx,
            y: p.ty,
            scale: [1, 1.2, 0],
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
          onAnimationComplete={p.id === 0 ? onDone : undefined}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

// Ending screen
function EndingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #FFF8F5 0%, #FDEAE4 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Glowing heart */}
      <motion.div
        className="mb-10 relative"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: 'rgba(230,57,70,0.3)', transform: 'scale(1.4)' }}
        />
        <svg viewBox="0 0 100 92" className="w-28 h-28 relative z-10">
          <defs>
            <linearGradient id="endHeart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="100%" stopColor="#FF8FA3" />
            </linearGradient>
          </defs>
          <path
            d="M50 85 C20 68, 2 52, 2 35 C2 20, 13 10, 25 10 C34 10, 43 16, 50 25 C57 16, 66 10, 75 10 C87 10, 98 20, 98 35 C98 52, 80 68, 50 85 Z"
            fill="url(#endHeart)"
          />
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        className="text-center px-8 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="font-cursive text-4xl text-primary mb-6">thank you...</p>
        <h2 className="font-serif text-3xl md:text-4xl text-text-main leading-snug mb-4">
          No matter what happens...
        </h2>
        <p className="font-sans text-text-sub text-lg leading-relaxed">
          Thank you for being part of my life.<br />
          For every smile, every moment, every memory.<br />
          You will always have a piece of my heart. ❤️
        </p>
      </motion.div>

      {/* Floating petals */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="fixed text-2xl pointer-events-none select-none"
          style={{ left: `${10 + i * 11}%`, top: '-5%' }}
          animate={{ top: '110%', x: [0, (i % 2 === 0 ? 20 : -20), 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 5 + i * 0.5, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
        >
          {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '❤️' : '✨'}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function FinalSection() {
  const [exploding, setExploding] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

  const floatingHearts = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${5 + i * 9}%`,
      size: 18 + (i % 4) * 8,
      duration: 4 + (i % 3) * 1.5,
      delay: i * 0.5,
    })),
    []
  );

  const handleClick = useCallback(() => {
    if (exploding || showEnding) return;
    setExploding(true);
  }, [exploding, showEnding]);

  const handleExplosionDone = useCallback(() => {
    setTimeout(() => {
      setExploding(false);
      setShowEnding(true);
    }, 800);
  }, []);

  if (showEnding) {
    return <EndingScreen />;
  }

  return (
    <section
      id="section-final"
      className="relative py-28 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDEAE4 0%, #FFF8F5 50%, #FDEAE4 100%)' }}
    >
      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(230,57,70,0.07) 0%, transparent 65%)' }}
      />

      {/* Floating hearts in section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute select-none"
            style={{ left: h.left, bottom: '-5%', fontSize: h.size, color: '#FF8FA3' }}
            animate={{ bottom: '110%', opacity: [0, 0.5, 0.5, 0], x: [0, 15, -10, 5] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            ❤
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Glowing heart */}
        <motion.div
          className="flex justify-center mb-12 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: 'rgba(230,57,70,0.25)', transform: 'scale(1.5)' }}
            />
            <svg viewBox="0 0 100 92" className="w-32 h-32 relative z-10">
              <defs>
                <linearGradient id="finalHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E63946" />
                  <stop offset="100%" stopColor="#FF8FA3" />
                </linearGradient>
              </defs>
              <path
                d="M50 85 C20 68, 2 52, 2 35 C2 20, 13 10, 25 10 C34 10, 43 16, 50 25 C57 16, 66 10, 75 10 C87 10, 98 20, 98 35 C98 52, 80 68, 50 85 Z"
                fill="url(#finalHeart)"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-main leading-snug mb-6">
            I don't know if you'll<br />forgive me today.
          </h2>
          <p className="font-sans text-text-sub text-lg md:text-xl leading-relaxed mb-4">
            I don't know if you'll forgive me tomorrow.
          </p>
          <p className="font-sans text-text-main text-lg md:text-xl leading-relaxed font-medium">
            But I know one thing.
          </p>
          <p
            className="font-serif text-2xl md:text-3xl mt-4 leading-relaxed"
            style={{ color: '#E63946' }}
          >
            I will never stop caring about you.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            id="start-again-btn"
            onClick={handleClick}
            className="px-12 py-5 text-white font-sans font-semibold text-xl rounded-full shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E63946 0%, #FF8FA3 100%)',
              boxShadow: '0 12px 40px rgba(230,57,70,0.45)',
            }}
            whileHover={{ scale: 1.07, boxShadow: '0 16px 50px rgba(230,57,70,0.6)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Can We Start Again? 💕
          </motion.button>
        </motion.div>
      </div>

      {/* Heart explosion */}
      <AnimatePresence>
        {exploding && (
          <HeartExplosion onDone={handleExplosionDone} />
        )}
      </AnimatePresence>
    </section>
  );
}
