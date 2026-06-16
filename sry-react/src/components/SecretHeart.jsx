import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretHeart() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="fixed bottom-20 left-6 z-40">
      <motion.button
        className="secret-heart text-3xl select-none border-none bg-transparent p-0"
        onClick={() => setRevealed(true)}
        whileHover={{ scale: 1.3, opacity: 1 }}
        aria-label="A secret message"
        title="Click me 🤫"
      >
        🤍
      </motion.button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="absolute bottom-12 left-0 glass-strong rounded-2xl p-4 shadow-xl"
            style={{
              width: 220,
              border: '1px solid rgba(230,57,70,0.2)',
            }}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="text-2xl mb-2 text-center">💌</div>
            <p className="text-text-main text-sm font-sans leading-relaxed text-center italic">
              "No matter what happens,<br />
              you will always be special."
            </p>
            <button
              onClick={() => setRevealed(false)}
              className="mt-3 text-xs text-text-sub hover:text-primary transition-colors block mx-auto"
            >
              close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
