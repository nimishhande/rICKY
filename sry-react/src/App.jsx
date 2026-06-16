import { lazy, Suspense } from 'react';

// Global atmosphere (loaded eagerly — lightweight)
import FallingHearts from './components/FallingHearts';
import Sparkles from './components/Sparkles';
import ScrollProgress from './components/ScrollProgress';
import MusicPlayer from './components/MusicPlayer';
import FloatingNote from './components/FloatingNote';
import SecretHeart from './components/SecretHeart';

// Page sections (lazy loaded for performance)
const HeroSection = lazy(() => import('./components/HeroSection'));
const LetterSection = lazy(() => import('./components/LetterSection'));
const MemoriesSection = lazy(() => import('./components/MemoriesSection'));
const PromisesSection = lazy(() => import('./components/PromisesSection'));
const OurStorySection = lazy(() => import('./components/OurStorySection'));
const FinalSection = lazy(() => import('./components/FinalSection'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: '#FFF8F5' }}>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Global ambient effects (fixed/absolute, non-interactive) */}
      <FallingHearts />
      <Sparkles />

      {/* Floating UI elements */}
      <FloatingNote />
      <SecretHeart />
      <MusicPlayer />

      {/* Main page content */}
      <main>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <LetterSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <MemoriesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PromisesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <OurStorySection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FinalSection />
        </Suspense>
      </main>
    </div>
  );
}
