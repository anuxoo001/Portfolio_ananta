import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ title, category, description, image, tags = [], liveUrl }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="glass border border-white/10 rounded-2xl overflow-hidden"
    >
      <div className="relative h-36 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-magenta/20">
        <div className="absolute inset-0 opacity-60">
          {image ? (
            <img src={image} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-black/20" />
          )}
        </div>
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-neutral-300">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{description}</p>
        {tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[11px] text-neutral-300">
                {t}
              </span>
            ))}
          </div>
        ) : null}
        {typeof liveUrl !== 'undefined' && (
          <div className="mt-4">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-neon-cyan/10 px-3 py-2 text-xs font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
              >
                View Deployment
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-neutral-400 border border-white/10 opacity-60 cursor-not-allowed"
              >
                Deployment coming soon
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

