import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;

    const onChange = () => setReduced(!!mq.matches);
    onChange();

    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
};

export default function Navbar({ sections = [] }) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? 'hero');
  const [menuOpen, setMenuOpen] = useState(false);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: '-20% 0px -65% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setMenuOpen(false);

    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y - 84, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto mt-3 w-[min(1200px,96vw)]"
      >
        <div className="glass rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl shadow-neon px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => scrollToId('hero')}
              className="flex items-center gap-3 rounded-2xl px-2 py-1 focus:outline-none"
              aria-label="Go to top"
            >
              <div className="h-9 w-9 rounded-xl border border-neon-cyan/30 bg-black/30 flex items-center justify-center">
                <span className="font-mono text-neon-cyan text-sm">
                  {sections?.[0]?.brand?.split(' ')?.[0] ?? 'A'}
                  <span className="text-neon-magenta">XR</span>
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-neutral-300 font-semibold leading-tight">Ananta Kumar Parida</div>
                <div className="text-[11px] text-neutral-500 font-mono leading-tight">MERN • Java • DSA</div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-4 text-xs">
              {sections.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToId(s.id)}
                    className={[
                      'transition-colors',
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200',
                    ].join(' ')}
                  >
                    <span className="relative inline-flex items-center gap-2 px-2 py-1">
                      <span
                        className={[
                          'h-2 w-2 rounded-full',
                          isActive
                            ? 'bg-neon-cyan shadow-[0_0_22px_rgba(0,255,255,0.7)]'
                            : 'bg-white/20',
                        ].join(' ')}
                      />
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2"
                aria-label="Open menu"
              >
                <motion.div
                  animate={menuOpen ? 'open' : 'closed'}
                  initial={false}
                  className="relative h-5 w-6"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0, opacity: 1 },
                      open: { rotate: 45, y: 6, opacity: 1 },
                    }}
                    className="absolute left-0 top-0 h-[2px] w-6 bg-neon-cyan"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="absolute left-0 top-2.5 h-[2px] w-6 bg-neon-magenta"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0, opacity: 1 },
                      open: { rotate: -45, y: -6, opacity: 1 },
                    }}
                    className="absolute left-0 top-0 h-[2px] w-6 bg-neon-magenta"
                  />
                </motion.div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 8 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2"
              >
                <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                  {sections.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollToId(s.id)}
                        className={[
                          'flex items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] border',
                          isActive
                            ? 'border-neon-cyan/40 bg-neon-cyan/10 text-white'
                            : 'border-white/10 bg-black/20 text-neutral-300 hover:text-white hover:border-white/20',
                        ].join(' ')}
                      >
                        <span className="font-mono">{s.label}</span>
                        <span className={isActive ? 'text-neon-cyan' : 'text-neutral-500'}>›</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}

