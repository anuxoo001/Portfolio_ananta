import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootScreen({ onDone }) {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooted(true);
      onDone?.();
    }, 2500);
    return () => clearTimeout(timer);
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
            <div className="font-mono text-sm text-neutral-200 leading-relaxed space-y-2">
              <div>SYSTEM: ANANTA_PORTFOLIO_OS v1.0</div>
              <div>USER: GUEST</div>
              <div>ACCESS LEVEL: PUBLIC</div>
              <div className="mt-3 text-neon-cyan font-semibold">BOOT COMPLETE</div>
              <div>WELCOME USER</div>
              <div className="mt-2">&gt; ENTERING MAIN INTERFACE..</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

