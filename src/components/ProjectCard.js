import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

function normalize(projectLike, fallbackProps) {
  if (projectLike && typeof projectLike === 'object' && projectLike.title) return projectLike;
  const { title, category, description, image, tags, liveUrl } = fallbackProps;
  return {
    title, category, description, image,
    gallery: image ? [image] : [],
    tags: tags || [],
    liveUrl,
    githubUrl: '',
    year: '',
    featured: false,
    features: [],
    accent: 'from-neon-cyan/20 via-transparent to-neon-magenta/20',
  };
}

export default function ProjectCard(props) {
  const { project: projectProp, index = 0, view = 'grid', onOpen, onTagClick } = props;
  const project = normalize(projectProp, props);
  const gallery = project.gallery && project.gallery.length ? project.gallery : (project.image ? [project.image] : []);
  const [activeIdx, setActiveIdx] = useState(0);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const go = useCallback((dir) => {
    setActiveIdx((p) => (p + dir + gallery.length) % gallery.length);
  }, [gallery.length]);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 10,
      rotateX: -py * 10,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power2.out',
    });
    el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, x: px * 60, y: py * 60, duration: 0.45, ease: 'power2.out' });
    }
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.6)' });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, x: 0, y: 0, duration: 0.6 });
  };

  const isList = view === 'list';

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className={`proj-reveal group relative glass border border-white/10 rounded-2xl overflow-hidden will-change-transform ${isList ? 'md:flex' : ''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* hover glow + shine */}
      <div ref={glowRef} className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-neon-cyan/20 blur-3xl opacity-0 z-10" />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.12), transparent 55%)' }}
      />
      <div className={`absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${project.accent || 'from-neon-cyan/20 via-transparent to-neon-magenta/20'}`} />

      {/* IMAGE / GALLERY */}
      <div className={`relative overflow-hidden bg-black/30 ${isList ? 'md:w-[42%] h-52 md:h-auto md:min-h-[240px]' : 'h-48'}`}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={gallery[activeIdx]}
            src={gallery[activeIdx]}
            alt={`${project.title} screenshot ${activeIdx + 1}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/logo192.png'; }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-transparent to-transparent" />

        {/* badges */}
        <div className="absolute left-3 top-3 flex gap-2 z-20">
          <span className="rounded-full border border-white/10 bg-black/50 backdrop-blur px-3 py-1 text-[11px] text-neutral-200">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full bg-gradient-to-r from-neon-magenta to-neon-cyan px-3 py-1 text-[11px] font-bold text-black">
              ★ Featured
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 flex gap-2 z-20">
          {project.year && (
            <span className="rounded-full border border-neon-cyan/30 bg-black/50 px-2 py-1 text-[10px] font-mono text-neon-cyan">{project.year}</span>
          )}
          {gallery.length > 1 && (
            <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] font-mono text-white/90">{activeIdx + 1}/{gallery.length}</span>
          )}
        </div>

        {/* gallery controls */}
        {gallery.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Prev photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/90">‹</button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/90">›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {gallery.map((_, i) => (
                <button key={i} aria-label={`Go to photo ${i + 1}`} onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === activeIdx ? 'w-6 bg-neon-cyan' : 'w-1.5 bg-white/40 hover:bg-white/80'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* BODY */}
      <div className={`p-4 relative z-20 ${isList ? 'md:w-[58%]' : ''}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
          {project.liveUrl && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" title="Live" />}
        </div>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed line-clamp-3">{project.description}</p>

        {project.features && project.features.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-[12px] text-neutral-300">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
                <span className="leading-snug">{f}</span>
              </li>
            ))}
            {project.features.length > 3 && (
              <li className="text-[11px] text-neon-cyan/90 font-mono">+{project.features.length - 3} more in details →</li>
            )}
          </ul>
        )}

        {project.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((t) => (
              <button key={t} onClick={() => onTagClick && onTagClick(t)}
                title={`Filter by ${t}`}
                className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[11px] text-neutral-300 hover:border-neon-cyan/40 hover:text-neon-cyan transition">
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-neon-cyan/10 px-3.5 py-2 text-xs font-semibold text-neon-cyan transition hover:bg-neon-cyan/25 hover:shadow-[0_0_20px_rgba(0,255,255,0.35)]">
              ↗ View Live
            </a>
          ) : null}
          <button onClick={() => onOpen && onOpen(project)}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition">
            Details
          </button>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:border-white/25 transition">
              ⌁ GitHub
            </a>
          )}
          {gallery.length > 1 && (
            <span className="ml-auto text-[10px] font-mono text-neutral-500">📷 {gallery.length} photos</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
