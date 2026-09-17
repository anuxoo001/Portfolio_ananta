import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-cyan transition-[width] duration-100"
        style={{ width: `${p}%`, boxShadow: '0 0 12px rgba(0,255,255,0.6)' }}
      />
    </div>
  );
}

export function FloatingGitHub({ url }) {
  const btnRef = useRef(null);
  useEffect(() => {
    if (!btnRef.current) return;
    const tween = gsap.to(btnRef.current, {
      y: -8, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    return () => tween.kill();
  }, []);
  if (!url) return null;
  return (
    <motion.a
      ref={btnRef}
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open GitHub profile"
      title="GitHub ↗"
      initial={{ opacity: 0, x: -16, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 left-5 z-[60] flex h-12 items-center gap-0 overflow-hidden rounded-full glass border border-white/15 bg-black/60 backdrop-blur-xl pl-3 pr-3 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.35)] hover:pr-4 transition-all duration-300"
    >
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10" />
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-6 w-6 shrink-0 text-white group-hover:text-neon-cyan transition">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-neutral-200 opacity-0 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300">
        GitHub ↗
      </span>
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan border-2 border-black" />
      </span>
    </motion.a>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y > 600);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.round((h.scrollTop / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          title={`Back to top (${pct}%)`}
          className="fixed bottom-5 right-5 z-[60] h-12 w-12 rounded-full glass border border-neon-cyan/30 bg-black/50 backdrop-blur-xl text-neon-cyan shadow-[0_0_25px_rgba(0,255,255,0.25)] hover:scale-105 transition"
        >
          ↑<span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-500">{pct}%</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
