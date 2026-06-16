import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

export default function HeroSection() {
  const scrollToLetter = () => {
    document.getElementById('section-letter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="section-hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF8F5 0%, #FDEAE4 50%, #FFF0EC 100%)' }}
    >
      {/* Warm glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,143,163,0.10) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 0.4, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-10">
        {/* Accent */}
        <motion.p
          className="font-cursive text-4xl md:text-5xl text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          a letter from my heart...
        </motion.p>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight"
            style={{ color: '#4A2C2A' }}
          >
            Before you leave...
          </h1>
          <p
            className="mt-5 text-xl md:text-2xl font-sans font-light"
            style={{ color: '#7A5C58' }}
          >
            Can you give me just 2 minutes?
          </p>
        </motion.div>

        {/* Animated Heart SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring', stiffness: 180 }}
          className="relative"
        >
          {/* Glow behind heart */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(230,57,70,0.25) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.svg
            viewBox="0 0 100 92"
            className="w-36 h-36 md:w-44 md:h-44 relative z-10"
            animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <defs>
              <linearGradient id="heroHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E63946" />
                <stop offset="100%" stopColor="#FF8FA3" />
              </linearGradient>
              <filter id="heroGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M50 85 C20 68, 2 52, 2 35 C2 20, 13 10, 25 10 C34 10, 43 16, 50 25 C57 16, 66 10, 75 10 C87 10, 98 20, 98 35 C98 52, 80 68, 50 85 Z"
              fill="url(#heroHeartGrad)"
              filter="url(#heroGlow)"
            />
          </motion.svg>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            id="open-heart-btn"
            onClick={scrollToLetter}
            className="px-10 py-4 rounded-full font-sans font-semibold text-lg text-white shadow-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, #E63946 0%, #FF8FA3 100%)',
              boxShadow: '0 8px 30px rgba(230,57,70,0.4)',
            }}
            whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(230,57,70,0.55)' }}
            whileTap={{ scale: 0.96 }}
          >
            Open My Heart ❤️
          </motion.button>

          {/* Scroll hint */}
          <motion.div
            className="flex flex-col items-center gap-1 opacity-50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-text-sub text-xs font-sans">scroll down</span>
            <FiArrowDown className="text-text-sub" size={16} />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative rose petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 16}%`,
            top: `${15 + (i % 3) * 25}%`,
            fontSize: `${14 + (i % 3) * 8}px`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeInOut',
          }}
        >
          🌸
        </motion.div>
      ))}
    </section>
  );
}
