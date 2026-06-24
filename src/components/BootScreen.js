import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const t = now - start;
      const next = Math.min(100, Math.floor((t / 3200) * 100));
      setProgress(next);
      if (next >= 100) {
        setBooted(true);
        onDone?.();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!booted && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04010a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <div className="w-[min(720px,92vw)] rounded-2xl border border-neon-cyan/50 bg-black/40 p-6 shadow-neon">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_22px_rgba(0,255,255,0.7)]" />
              <div className="text-sm text-neon-cyan">SECURE BOOT SEQUENCE</div>
            </div>

            <div className="font-mono text-xs text-neutral-200 leading-relaxed">
              <div>BOOTING SYSTEM...</div>
              <div>INITIALIZING CORE INTERFACE</div>
              <div>
                LOADING MODULES
                <span className="text-neon-magenta"> [{progress}%]</span>
              </div>
            </div>

            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.div
              className="mt-4 flex items-center justify-between text-[11px] text-neutral-400"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <span>LINK: MATRIX-RAIN / PARTICLE-CORE</span>
              <span>STATUS: {progress < 100 ? 'WORKING' : 'READY'}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

