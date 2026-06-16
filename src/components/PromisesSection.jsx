import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';

const PROMISES = [
  { icon: '👂', text: 'I will listen better.', sub: 'Your words matter to me — every single one.' },
  { icon: '💬', text: 'I will communicate more.', sub: 'No more silence when there should be words.' },
  { icon: '🫂', text: 'I will value your feelings.', sub: 'Your emotions are never "too much" for me.' },
  { icon: '🕊️', text: 'I will protect your peace.', sub: 'Being your safe space is my honour.' },
  { icon: '✨', text: 'I will never stop trying.', sub: 'Every day, I choose you — always.' },
  { icon: '🌱', text: 'I will grow alongside you.', sub: 'Together, better, always.' },
];

function PromiseCard({ promise, index }) {
  return (
    <motion.div
      className="group glass-strong rounded-2xl p-6 relative overflow-hidden cursor-default transition-all"
      style={{
        border: '1px solid rgba(230,57,70,0.1)',
        boxShadow: '0 4px 20px rgba(74,44,42,0.06)',
      }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 40px rgba(230,57,70,0.18)',
        borderColor: 'rgba(230,57,70,0.3)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at top-left, rgba(255,143,163,0.08), transparent 70%)' }}
      />

      {/* Heart icon top-right */}
      <motion.div
        className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      >
        <FiHeart size={18} className="text-primary" fill="#E63946" />
      </motion.div>

      {/* Icon */}
      <div className="text-3xl mb-3">{promise.icon}</div>

      {/* Text */}
      <h3 className="font-serif text-xl text-text-main font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
        {promise.text}
      </h3>
      <p className="font-sans text-sm text-text-sub leading-relaxed">{promise.sub}</p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{ background: 'linear-gradient(90deg, #E63946, #FF8FA3)' }}
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      />
    </motion.div>
  );
}

export default function PromisesSection() {
  return (
    <section
      id="section-promises"
      className="py-24 px-4 relative"
      style={{ background: 'linear-gradient(180deg, #FDEAE4 0%, #FFF8F5 100%)' }}
    >
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(230,57,70,0.05) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-cursive text-3xl text-soft-pink mb-2">from my soul to yours</p>
        <h2 className="font-serif text-4xl md:text-5xl text-text-main">My Promises To You</h2>
        <p className="font-sans text-text-sub mt-3 text-base">Not just words — my heartfelt commitments</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary opacity-40" />
          <span className="text-primary text-lg">❤</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary opacity-40" />
        </div>
      </motion.div>

      {/* Promise grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {PROMISES.map((promise, i) => (
          <PromiseCard key={promise.text} promise={promise} index={i} />
        ))}
      </div>
    </section>
  );
}
