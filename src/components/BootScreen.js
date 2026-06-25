import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootScreen({ onDone }) {
  const [booted, setBooted] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [showFinal, setShowFinal] = useState(false);
  const [progress, setProgress] = useState(0);
  const cursorRef = useRef(false);

  useEffect(() => {
    // Hacker-style lines to type
    const lines = [
      'SECURE BOOT SEQUENCE INITIATED',
      'BOOTING SYSTEM...',
      'INITIALIZING CORE INTERFACE [OK]',
      'LOADING MODULES',
      '' // intentionally blank instead of linking text
    ];

    // Type lines one by one
    let lineIndex = 0;
    let charIndex = 0;
    const typeNextChar = () => {
      const current = lines[lineIndex];
      charIndex++;
      setTypedLines((prev) => {
        const copy = prev.slice(0, lineIndex);
        copy[lineIndex] = current.slice(0, charIndex);
        return copy;
      });

      if (charIndex < current.length) {
        setTimeout(typeNextChar, 24 + Math.random() * 60);
      } else {
        // finished line
        lineIndex++;
        charIndex = 0;
        if (lineIndex === 3) {
          // when LOADING MODULES line typed, animate progress
          animateProgress(0, 85, 40);
        }
        if (lineIndex < lines.length) {
          setTimeout(typeNextChar, 180 + Math.random() * 200);
        } else {
          // all lines done -> show final block then exit
          setTimeout(() => {
            setShowFinal(true);
            setTimeout(() => {
              setBooted(true);
              onDone?.();
            }, 1000);
          }, 600);
        }
      }
    };

    const animateProgress = (from, to, stepMs) => {
      let cur = from;
      const tick = () => {
        cur = Math.min(to, cur + 1);
        setProgress(cur);
        if (cur < to) setTimeout(tick, stepMs);
      };
      tick();
    };

    // start typing
    setTypedLines([]);
    setTimeout(typeNextChar, 400);

    // cursor blink (unused ref but keep for future)
    const blink = setInterval(() => {
      cursorRef.current = !cursorRef.current;
    }, 600);
    return () => clearInterval(blink);
  }, [onDone]);

  const renderProgressMeta = (p) => {
    const total = 8;
    const filled = Math.round((p / 100) * total);
    const bar = '█'.repeat(filled) + '░'.repeat(Math.max(0, total - filled));
    return `[${bar}] ${p}%`;
  };

  return (
    <AnimatePresence>
      {!booted && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04010a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <div className="w-[min(720px,92vw)] rounded-2xl border border-neon-cyan/50 bg-black/40 p-6 shadow-neon">
            <div className="font-mono text-xs text-neutral-200 leading-relaxed">
              {/* Hacker-typing lines */}
              {typedLines.map((l, i) => (
                <div key={i} className={i === 3 ? 'text-neon-magenta' : ''}>
                  {i === 3 ? 'LOADING MODULES ' : ''}{l}{i === 3 ? ` ${renderProgressMeta(progress)}` : ''}
                </div>
              ))}

              {showFinal && (
                <div className="mt-3 text-sm text-neon-cyan font-semibold">
                  <div>SYSTEM: ANANTA_PORTFOLIO_OS v1.0</div>
                  <div>USER: GUEST</div>
                  <div>ACCESS LEVEL: PUBLIC</div>
                  <div className="mt-2">BOOT COMPLETE</div>
                  <div>WELCOME USER</div>
                  <div>&gt; ENTERING MAIN INTERFACE..</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

