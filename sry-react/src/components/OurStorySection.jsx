import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const STORY_EVENTS = [
  {
    id: 1,
    emoji: '🌟',
    date: 'The Beginning',
    title: 'The Day We Met',
    text: 'I didn\'t know then how much you would mean to me. But something felt different from the first moment.',
    side: 'left',
  },
  {
    id: 2,
    emoji: '💬',
    date: 'Getting Closer',
    title: 'Conversations Until Dawn',
    text: 'Late nights, long talks, laughing about nothing and everything. I realised you were someone special.',
    side: 'right',
  },
  {
    id: 3,
    emoji: '🌸',
    date: 'The Beautiful Moments',
    title: 'When Life Felt Light',
    text: 'You made ordinary days extraordinary. I never wanted those moments to end.',
    side: 'left',
  },
  {
    id: 4,
    emoji: '💔',
    date: 'Where I Went Wrong',
    title: 'I Should Have Known Better',
    text: 'I made mistakes I deeply regret. I wasn\'t the person you deserved, and I\'m truly sorry.',
    side: 'right',
  },
  {
    id: 5,
    emoji: '🙏',
    date: 'Today',
    title: 'This Apology',
    text: 'With all my heart, I\'m asking for your forgiveness — not because I deserve it, but because I need you to know how much I care.',
    side: 'left',
  },
];

function TimelineCard({ event, index }) {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const isLeft = event.side === 'left';
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (inView && lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, delay: 0.3, ease: 'power2.out', transformOrigin: 'top' }
      );
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 md:gap-8 mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <motion.div
        className="flex-1 max-w-sm"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <div
          className="glass-strong rounded-2xl p-5 relative"
          style={{
            border: '1px solid rgba(230,57,70,0.12)',
            boxShadow: '0 4px 24px rgba(74,44,42,0.08)',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">{event.emoji}</span>
            <div>
              <span
                className="text-xs font-sans font-medium tracking-wide uppercase"
                style={{ color: '#E63946' }}
              >
                {event.date}
              </span>
              <h3 className="font-serif text-lg text-text-main mt-0.5 mb-2">{event.title}</h3>
              <p className="font-sans text-sm text-text-sub leading-relaxed">{event.text}</p>
            </div>
          </div>
          {/* Arrow pointer */}
          <div
            className={`absolute top-6 ${isLeft ? '-right-3' : '-left-3'} w-3 h-3 glass-strong rotate-45`}
            style={{ border: `1px solid rgba(230,57,70,0.12)`, borderLeft: isLeft ? 'none' : '', borderTop: isLeft ? 'none' : '' }}
          />
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 300 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
          style={{ background: 'linear-gradient(135deg, #E63946, #FF8FA3)', boxShadow: '0 4px 16px rgba(230,57,70,0.4)' }}
        >
          {index + 1}
        </div>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="flex-1 max-w-sm hidden md:block" />
    </div>
  );
}

export default function OurStorySection() {
  const lineRef = useRef(null);
  const inView = useInView(lineRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView && lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 2.5, ease: 'power2.out', transformOrigin: 'top' }
      );
    }
  }, [inView]);

  return (
    <section
      id="section-story"
      className="py-24 px-4 relative"
      style={{ background: 'linear-gradient(180deg, #FFF8F5 0%, #FDEAE4 60%, #FFF8F5 100%)' }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-cursive text-3xl text-soft-pink mb-2">the journey</p>
        <h2 className="font-serif text-4xl md:text-5xl text-text-main">Our Story</h2>
        <p className="font-sans text-text-sub mt-3 text-base">Every chapter, even the hard ones, made us who we are</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary opacity-40" />
          <span className="text-primary text-lg">❤</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary opacity-40" />
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full timeline-line rounded-full"
          ref={lineRef}
          style={{ transformOrigin: 'top' }}
        />

        {STORY_EVENTS.map((event, i) => (
          <TimelineCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
