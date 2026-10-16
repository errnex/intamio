'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q}>
            <h3>
              <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left font-medium text-ink">
                <span className="transition-colors group-hover:text-sage">{q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-xl leading-none text-sage" aria-hidden>+</motion.span>
              </button>
            </h3>
            <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden" aria-hidden={!isOpen}>
              <p className="max-w-[62ch] pb-5 leading-relaxed text-stone">{a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
