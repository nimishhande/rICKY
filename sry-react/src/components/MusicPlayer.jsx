import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMusic, FiVolumeX, FiVolume2, FiPlay, FiPause } from 'react-icons/fi';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const tryPlay = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        audio.play().then(() => setPlaying(true)).catch(() => {});
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('scroll', tryPlay);
      }
    };

    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('scroll', tryPlay, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('scroll', tryPlay);
    };
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="music-player rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        style={{ boxShadow: '0 8px 32px rgba(230,57,70,0.35)' }}
        animate={{ width: expanded ? 180 : 52 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2 px-3 py-3">
          <motion.div
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: 'linear' }}
          >
            <FiMusic className="text-white" size={18} />
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
              >
                <button
                  onClick={toggle}
                  className="text-white hover:scale-110 transition-transform"
                  aria-label={playing ? 'Pause music' : 'Play music'}
                >
                  {playing ? <FiPause size={16} /> : <FiPlay size={16} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white hover:scale-110 transition-transform"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                </button>
                <span className="text-white/80 text-xs font-sans whitespace-nowrap">
                  {playing ? 'Playing ♪' : 'Paused'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sound wave animation */}
      {playing && !expanded && (
        <div className="absolute -top-1 -right-1 flex gap-0.5 items-end h-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-primary rounded-full"
              animate={{ height: ['4px', '12px', '4px'] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
