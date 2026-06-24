import React from 'react';
import { motion } from 'framer-motion';

export default function Terminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass border border-white/10 rounded-2xl p-6"
    >
      <div className="text-neutral-200">
        <div
          className="text-2xl md:text-4xl font-black uppercase tracking-[0.5em] leading-tight"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
        >
          <span className="inline-block text-white">ANANTA</span>
          <span className="inline-block text-neon-cyan ml-3">KUMAR</span>
          <span className="inline-block text-neon-magenta ml-3">PARIDA</span>
        </div>
      </div>
    </motion.div>
  );
}

