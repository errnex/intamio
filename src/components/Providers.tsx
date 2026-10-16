'use client';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect } from 'react';

/** Scroll halus (Lenis) + progress bar. Dimatikan jika pengguna memilih reduced motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } as any });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <MotionConfig reducedMotion="user">
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-sage" style={{ scaleX }} />
      {children}
    </MotionConfig>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}
