import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const NOTES = [
  { text: 'I miss your smile ❤️', emoji: '😊' },
  { text: 'You still mean a lot to me ❤️', emoji: '💕' },
  { text: 'I still care ❤️', emoji: '🌸' },
  { text: 'Every day, I think of you ❤️', emoji: '✨' },
  { text: 'You made life beautiful ❤️', emoji: '🌺' },
];

export default function FloatingNote() {
  const [note, setNote] = useState(null);
  const [noteIdx, setNoteIdx] = useState(0);
  const [position, setPosition] = useState({ x: 20, y: 60 });

  const showNote = useCallback(() => {
    const x = 10 + Math.random() * 60;
    const y = 20 + Math.random() * 50;
    setPosition({ x, y });
    setNote(NOTES[noteIdx % NOTES.length]);
    setNoteIdx((p) => p + 1);
    setTimeout(() => setNote(null), 4200);
  }, [noteIdx]);

  useEffect(() => {
    // Show first note after 8s, then every 18s
    const first = setTimeout(() => {
      showNote();
      const interval = setInterval(showNote, 18000);
      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(first);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {note && (
        <motion.div
          key={note.text + noteIdx}
          className="fixed z-40 pointer-events-none"
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="glass-strong rounded-2xl px-4 py-3 shadow-xl max-w-[200px]"
            style={{ border: '1px solid rgba(230,57,70,0.2)' }}
          >
            <div className="text-xl mb-1">{note.emoji}</div>
            <p className="text-text-main text-sm font-sans leading-snug">{note.text}</p>
            <div
              className="absolute -bottom-2 left-6 w-4 h-4 glass-strong rotate-45"
              style={{ borderRight: '1px solid rgba(230,57,70,0.2)', borderBottom: '1px solid rgba(230,57,70,0.2)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
