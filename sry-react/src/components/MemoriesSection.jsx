import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart } from 'react-icons/fi';

const MEMORIES = [
  {
    id: 1,
    title: 'The First Day',
    description: 'The moment everything changed.',
    emoji: '🌅',
    rotate: '-2deg',
    src: '/video1.mp4',
    thumb: null,
    accent: '#FFD6D6',
  },
  {
    id: 2,
    title: 'You Made Me Laugh',
    description: 'The day I knew you were different.',
    emoji: '😂',
    rotate: '1.5deg',
    src: '/video2.mp4',
    thumb: null,
    accent: '#FFE4EC',
  },
  {
    id: 3,
    title: 'Our Quiet Moments',
    description: 'Still my favourite memory.',
    emoji: '🌸',
    rotate: '-1deg',
    src: '/video3.mp4',
    thumb: null,
    accent: '#FFF0D6',
  },
  {
    id: 4,
    title: 'Forever In My Heart',
    description: "You'll always be a part of me.",
    emoji: '💌',
    rotate: '2deg',
    src: '/video4.mp4',
    thumb: null,
    accent: '#E8F5FF',
  },
];

function PolaroidCard({ memory, onOpen }) {
  return (
    <motion.div
      className="polaroid rounded-xl cursor-pointer group"
      style={{
        padding: '16px 16px 48px 16px',
        transform: `rotate(${memory.rotate})`,
        background: 'white',
        maxWidth: 260,
      }}
      whileHover={{
        scale: 1.04,
        rotate: '0deg',
        boxShadow: '0 20px 50px rgba(230,57,70,0.2)',
        zIndex: 10,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onClick={() => onOpen(memory)}
    >
      {/* Thumbnail area */}
      <div
        className="w-full aspect-square rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: memory.accent }}
      >
        <span className="text-5xl mb-2">{memory.emoji}</span>
        {/* Play hint */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.0)' }}
          whileHover={{ background: 'rgba(255,255,255,0.3)' }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(230,57,70,0.85)' }}>
            <span className="text-white text-lg ml-1">▶</span>
          </div>
        </motion.div>
        <p className="text-text-sub text-xs font-sans px-2 text-center">click to watch</p>
      </div>

      {/* Caption */}
      <div className="mt-3 text-center">
        <h3 className="font-serif text-base text-text-main font-semibold leading-tight">{memory.title}</h3>
        <p className="font-sans text-xs text-text-sub mt-1">{memory.description}</p>
      </div>

      {/* Heart decoration */}
      <div className="absolute -top-2 -right-2">
        <FiHeart className="text-primary" size={16} fill="#E63946" />
      </div>
    </motion.div>
  );
}

function VideoModal({ memory, onClose }) {
  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(74,44,42,0.75)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl glass-strong rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(230,57,70,0.9)' }}
              aria-label="Close"
            >
              <FiX className="text-white" size={18} />
            </button>

            <div className="aspect-video bg-black">
              <video
                src={memory.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
                playsInline
              />
            </div>

            <div className="p-6">
              <h3 className="font-serif text-2xl text-text-main">{memory.title}</h3>
              <p className="font-sans text-sm text-text-sub mt-1">{memory.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MemoriesSection() {
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <section
      id="section-memories"
      className="py-24 px-4 relative"
      style={{ background: 'linear-gradient(180deg, #FFF8F5 0%, #FDEAE4 100%)' }}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-cursive text-3xl text-soft-pink mb-2">treasured</p>
        <h2 className="font-serif text-4xl md:text-5xl text-text-main">Our Memories Together</h2>
        <p className="font-sans text-text-sub mt-3 text-base">Moments that will always mean everything to me</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary opacity-40" />
          <span className="text-primary text-lg">❤</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary opacity-40" />
        </div>
      </motion.div>

      {/* Masonry-style polaroid grid */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {MEMORIES.map((memory, i) => (
            <motion.div
              key={memory.id}
              style={{ marginTop: i % 2 === 1 ? '2rem' : 0 }}
            >
              <PolaroidCard memory={memory} onOpen={setSelectedMemory} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedMemory && (
        <VideoModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
      )}
    </section>
  );
}
