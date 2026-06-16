import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const PARAGRAPHS = [
  {
    id: 'p1',
    text: 'My dearest,',
    style: 'font-cursive text-3xl text-primary mb-2',
  },
  {
    id: 'p2',
    text: "I know I've hurt you. And I know saying \"I'm sorry\" might feel small compared to the pain I caused. But I need you to know — hurting you was never, ever what I wanted.",
    style: 'text-text-main text-lg leading-loose font-sans',
  },
  {
    id: 'p3',
    text: 'You brought light into my world in a way no one else ever has. Every laugh we shared, every quiet moment, every time you looked at me like I mattered — I carry all of it.',
    style: 'text-text-main text-lg leading-loose font-sans',
  },
  {
    id: 'p4',
    text: "I made mistakes. I wasn't as careful with your heart as I should have been. And for that, I am deeply, truly sorry.",
    style: 'text-text-main text-lg leading-loose font-sans italic',
  },
  {
    id: 'p5',
    text: "I don't know if this is enough. I don't know if words can reach where feelings have been broken. But I want you to know — you are worth every effort, every apology, every quiet prayer.",
    style: 'text-text-main text-lg leading-loose font-sans',
  },
  {
    id: 'p6',
    text: 'With all my heart,',
    style: 'font-cursive text-2xl text-primary mt-4',
  },
  {
    id: 'p7',
    text: 'Someone who cares deeply ❤️',
    style: 'font-cursive text-2xl text-soft-pink',
  },
];

function LetterParagraph({ para, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.05 }}
    >
      <p className={para.style}>{para.text}</p>
    </motion.div>
  );
}

export default function LetterSection() {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    const reveal = () => {
      idx++;
      setVisibleCount(idx);
      if (idx < PARAGRAPHS.length) {
        setTimeout(reveal, 900);
      }
    };
    setTimeout(reveal, 400);
  }, [inView]);

  return (
    <section
      id="section-letter"
      className="relative py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #FFF8F5 0%, #FDEAE4 50%, #FFF8F5 100%)' }}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-cursive text-3xl text-soft-pink mb-2">my words to you</p>
        <h2 className="font-serif text-4xl md:text-5xl text-text-main">A Letter From My Heart</h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary opacity-40" />
          <span className="text-primary text-lg">❤</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary opacity-40" />
        </div>
      </motion.div>

      {/* Letter card */}
      <div
        ref={ref}
        className="max-w-2xl mx-auto relative"
      >
        {/* Paper card */}
        <div
          className="paper-texture rounded-3xl shadow-2xl relative overflow-hidden"
          style={{
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 60px rgba(74,44,42,0.15), 0 4px 20px rgba(230,57,70,0.08)',
          }}
        >
          {/* Floral corners */}
          <span className="floral-corner" style={{ top: 16, left: 16 }}>🌸</span>
          <span className="floral-corner" style={{ top: 16, right: 16 }}>🌹</span>
          <span className="floral-corner" style={{ bottom: 16, left: 16 }}>🌺</span>
          <span className="floral-corner" style={{ bottom: 16, right: 16 }}>🌸</span>

          {/* Decorative line at top */}
          <div
            className="w-full h-px mb-8 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, #E63946, transparent)' }}
          />

          {/* Letter paragraphs */}
          <div className="space-y-6">
            {PARAGRAPHS.map((para, i) => (
              <LetterParagraph
                key={para.id}
                para={para}
                index={i}
                isVisible={i < visibleCount}
              />
            ))}
          </div>

          {/* Decorative line at bottom */}
          <div
            className="w-full h-px mt-8 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, #E63946, transparent)' }}
          />
        </div>

        {/* Warm shadow glow beneath card */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full blur-2xl"
          style={{ background: 'rgba(230,57,70,0.12)' }}
        />
      </div>
    </section>
  );
}
