import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function TypingText({ lines = [] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = lines[lineIndex] ?? '';

  const speed = useMemo(() => ({ typing: 34, deleting: 22, pause: 850 }), []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!deleting) {
        setSubIndex((v) => {
          const next = v + 1;
          if (next >= current.length) {
            setDeleting(true);
            return next;
          }
          return next;
        });
      } else {
        setSubIndex((v) => {
          const next = v - 1;
          if (next <= 0) {
            setDeleting(false);
            setLineIndex((i) => (i + 1) % lines.length);
            return 0;
          }
          return next;
        });
      }
    }, deleting ? speed.deleting : speed.typing);

    return () => clearTimeout(id);
  }, [subIndex, deleting, current, lines.length, speed.deleting, speed.typing]);

  // cursor blink
  const shown = current.slice(0, subIndex);

  return (
    <motion.div
      className="inline-flex items-center gap-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="whitespace-pre-wrap">{shown}</span>
      <span className="ml-1 h-5 w-[2px] bg-neon-cyan/80 animate-pulse" />
    </motion.div>
  );
}

